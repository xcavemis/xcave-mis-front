<template>
  <div class="pano-comp">
    <div id="pano" class="panolens-container"></div>
    <div id="progress">
      <div ref="bar" id="bar"></div>
    </div>
  </div>
</template>

<script>
const THREE = require("three");
import { TweenMax, Quad } from "gsap";
const PANOLENS = require("@/utils/panolens/panolens.js");
import { data } from "@/data/scenes.js";
const hotspotInfo = require("@/assets/images/icons/hotspot-info.png");
const hotspotAr = require("@/assets/images/icons/hotspot-ar.png");
const hotspotLink = require("@/assets/images/icons/hotspot-link.png");
import createjs from "preload-js";
export default {
  name: "Pano",
  props: {},
  data: () => ({
    viewer: null,
    sceneLoaded: false,
    currentSceneID: 0,
    viewer: null,
    panos: {},
    isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    currentPano: null,
    firstSceneLoaded: false,
    textureLoader: new THREE.TextureLoader(),
  }),
  watch: {
    "$store.getters.navigateToPano": function (val, old) {
      if (val != old) {
        this.buildScene(val, null);
      }
    },
  },
  mounted() {
    // this.$store.dispatch("loading", true)
    this.$nextTick(() => {
      this.initPano();
    });
  },
  methods: {
    initPano() {
      this.viewer = new PANOLENS.Viewer({
        container: this.$el.querySelector(".panolens-container"),
        output: "console",
        autoHideInfospot: false,
        controlButtons: [],
      });
      this.controls = this.viewer.getControl();
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.5;
      this.controls.screenSpacePanning = true;
      this.controls.minFov = 18;
      this.controls.maxFov = 70;

      this.buildScene("codices101", [4979.33, -341.24, -138.51]);
      this.viewer.addUpdateCallback(this.update);
    },
    update() {
      this.controls?.update();
    },
    buildScene(key, direction) {
      this.$refs.bar.classList.remove("hide");
      TweenMax.to(".panolens-infospot", 0.6, {
        autoAlpha: 0,
        ease: Quad.easeInOut,
      });
      const scene = this.findSceneDataById(key);
      const _pano = this.panos[scene.id];
      if (_pano) {
        if (direction) {
          const { x, y, z } = new THREE.Vector3(
            direction[0],
            direction[1],
            direction[2]
          ).normalize();
          this.viewer.camera.position.set(x, -y, -z);
        }
        _pano.fadeIn(200);
        _pano.fadeOut(200);
        this.viewer.setPanorama(_pano);
        this.updateMenuNavigation(scene);
        return;
      }
      let isImage = scene.type == "image";
      let urlPrefix = isImage
        ? `https://hml.exposicaodavinci500anos.com.br/assets${
            this.isMobile ? "/mob" : ""
          }`
        : "https://hml.exposicaodavinci500anos.com.br/assets/videos";
      let ext = isImage ? `.jpg` : `.mp4`;
      let id = scene.id.substring(scene.id.length - 3, scene.id.length);
      // console.log(`${urlPrefix}/${scene.src}${ext}`)
      console.log(this.$store.getters.assets);
      let currentPano = isImage
        ? new PANOLENS.ImagePanorama(
            this.$store.getters.assets[id]
              ? URL.createObjectURL(this.$store.getters.assets[id].url)
              : `${urlPrefix}/${scene.src}${ext}`
          )
        : new PANOLENS.VideoPanorama(`${urlPrefix}/${scene.src}${ext}`, {
            autoplay: true,
            muted: true,
          });

      currentPano.addEventListener("progress", this.onProgressUpdate);

      const { edgeLength } = currentPano;
      const radius = edgeLength / 2;
      const baseScale = 200;

      scene.infoHotspots?.map((info) => {
        let pos = info.vec3
          ? new THREE.Vector3(info.vec3[0], info.vec3[1], info.vec3[2])
          : new THREE.Vector3(Math.random() * 1000, -1355.19, -4649.08);
        const infoSpot = new PANOLENS.Infospot(
          info.type == "content" ? 150 : 400,
          info.type == "content"
            ? require("@/assets/images/icons/hotspot-info.png")
            : info.type == "learn"
            ? require("@/assets/images/icons/hotspot-learn.png")
            : info.type == "panorama"
            ? require("@/assets/images/icons/hotspot-360.png")
            : info.type == "ar"
            ? require("@/assets/images/icons/hotspot-ar.png")
            : require("@/assets/images/icons/hotspot-link.png")
        );
        infoSpot.addHoverText(
          info.title,
          info.type == "panorama" || info.type == "learn" ? 80 : 50
        );
        infoSpot.position.copy(pos);
        infoSpot.addEventListener("click", (e) => {
          // if (info.type == 'content' || info.type == 'panorama' || info.type == 'learn') {
          if (info.type != "link") {
            this.showInfoHotspotLayer(info);
          } else if (info.type == "link") {
            this.navigateTo(info);
          }
        });
        currentPano.add(infoSpot);
      });

      if (!this.panos[scene.id]) {
        this.panos[scene.id] = currentPano;
      } else {
        this.viewer.setPanorama(this.panos[scene.id]);
        this.updateMenuNavigation(scene);
        return;
      }

      this.viewer.add(currentPano);
      this.viewer.setPanorama(currentPano);
      currentPano.addEventListener("load", (e) => {
        if (!this.firstSceneLoaded) {
          // this.loadAllScenes()
          this.setupQueue();
        }
        this.viewer.setPanorama(currentPano);
        this.updateMenuNavigation(scene);
        this.currentPano = currentPano;

        this.firstSceneLoaded = true;
      });
    },
    setupQueue() {
      // this.preloader = new Preloader()
      // this.preloader.debug = false
      // this.preloader.addListener('onComplete', this.loadComplete);
      // this.preloader.addListener('onProgress', this.loadProgress);
      const assetsToLoad = [];
      data.scenes.map((scene, index) => {
        let isImage = scene.type == "image";
        let urlPrefix = `https://hml.exposicaodavinci500anos.com.br/assets${
          this.isMobile ? "/mob" : ""
        }`;
        let ext = isImage ? `.jpg` : `.mp4`;
        if (index < 6) {
          if (scene.type == "image") {
            assetsToLoad.push(
              {
                id: scene.id,
                src: `${urlPrefix}/${scene.src}${ext}`,
                type: "image",
              }
              // {
              //   name: id,
              //   url: `${urlPrefix}/${scene.src}${ext}`,
              //   type: 'texture'
              // },
            );
          }
        }
      });
      this.queue = new createjs.LoadQueue();
      this.queue.on("complete", this.onLoadComplete);
      this.queue.loadManifest(assetsToLoad);
      this.queue.load();
      // this.preloader.queue(assetsToLoad);
    },
    onLoadComplete(event) {
      // console.log('onLoadComplete', event);
      // Get Blob object instead of a formatted result
      const assetsLoaded = {};
      data.scenes.map((scene, index) => {
        if (index < 6) {
          let blob = this.queue.getResult(scene.id, true);
          if (!assetsLoaded[scene.id]) {
            assetsLoaded[scene.id] = {
              name: scene.id,
              url: blob,
              type: "image",
            };
          }
        }
      });
      this.$store.dispatch("assets", assetsLoaded);
    },
    onProgressUpdate(event) {
      let percentage = (event.progress.loaded / event.progress.total) * 100;
      // console.log('onProgressUpdate', percentage)
      this.$refs.bar.style.width = percentage + "%";
      if (percentage >= 100) {
        this.$refs.bar.classList.add("hide");
        setTimeout(() => {
          this.$refs.bar.style.width = 0;
        }, 1000);
      }
    },
    navigateTo(info) {
      // this.$store.dispatch("loading", true)
      this.buildScene(info.target, info.direction.vec3);
    },
    goToScene(id) {
      this.buildScene(id, null);
    },
    prev() {
      if (this.currentSceneID > 0) this.currentSceneID--;
      const prevScene = data.scenes[this.currentSceneID];
      this.buildScene(prevScene.id, prevScene.initialViewParameters.vec3);
    },
    next() {
      if (this.currentSceneID < data.scenes.length - 1) this.currentSceneID++;
      const nextScene = data.scenes[this.currentSceneID];
      this.buildScene(nextScene.id, nextScene.initialViewParameters.vec3);
    },
    zoomIn() {
      const control = this.viewer.getControl();
      control.object.fov =
        control.object.fov > control.minFov
          ? control.object.fov - 0.1
          : control.minFov;
      control.object.updateProjectionMatrix();
    },
    zoomOut() {
      const control = this.viewer.getControl();
      control.object.fov =
        control.object.fov < control.maxFov
          ? control.object.fov + 0.1
          : control.maxFov;
      control.object.updateProjectionMatrix();
    },
    left() {
      this.viewer.getControl().rotateLeft(-0.001);
    },
    up() {
      this.viewer.getControl().rotateUp(-0.001);
    },
    right() {
      this.viewer.getControl().rotateLeft(0.001);
    },
    down() {
      this.viewer.getControl().rotateUp(0.001);
    },
    showInfoHotspotLayer(content) {
      this.$emit("info-layer", content);
    },
    updateMenuNavigation(scene) {
      let sceneName = scene.groupId;
      const currScene = this.$store.getters.visitedScenes[sceneName];
      const currSceneList = currScene.arr;
      if (currSceneList.indexOf(scene.id) < 0) {
        currSceneList.push(scene.id);
        this.$store.dispatch("visited_scenes", {
          room: sceneName,
          arr: currSceneList,
        });
      }
      Object.keys(this.$store.getters.navigationStatus).forEach((room) => {
        let scn = this.$store.getters.visitedScenes[room];

        if (sceneName == room && scn.arr.length == scn.len) {
          this.$store.dispatch("navigation_status", {
            room: sceneName,
            status: "visited-current",
          });
        } else if (sceneName != room && scn.arr.length == scn.len) {
          this.$store.dispatch("navigation_status", {
            room: sceneName,
            status: "visited",
          });
        } else if (sceneName == room && scn.arr.length < scn.len) {
          this.$store.dispatch("navigation_status", {
            room: sceneName,
            status: "current",
          });
        }
      });
    },
    findSceneById(id) {
      for (let i = 0; i < this.scenes.length; i++) {
        if (this.scenes[i].data.id === id) {
          return this.scenes[i];
        }
      }
      return null;
    },
    findSceneDataById(id) {
      for (let i = 0; i < data.scenes.length; i++) {
        if (data.scenes[i].id === id) {
          return data.scenes[i];
        }
      }
      return null;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pano-comp {
  @include set-size(100%, 100%);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -ms-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  -ms-content-zooming: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: $black;

  .experience-overlay {
    @include set-size(100%, 100%);
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
  }

  #progress {
    position: absolute;
    width: 100%;
    height: 5px;
    z-index: 10;
    top: 70px;
  }

  #bar {
    background-color: #b18039;
    height: 100%;
    transition: width 0.1s ease;
  }

  #bar.hide {
    opacity: 0;
    transition: opacity 1s ease;
  }
}

#pano {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  overflow: hidden;
  background-color: #000;
}
canvas {
  top: 0;
  left: 0;
}
</style>
