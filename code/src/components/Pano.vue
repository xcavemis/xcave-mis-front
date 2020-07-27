<template>
  <div class="pano-comp">
    <video v-if="currentVideo == 'projection501Video'" ref="projection501Video" autoplay="true" playsinline="true" webkitplaysinline="true" muted="muted" crossorigin="anonymous" loop="true">
      <source src="media/videos/mercedes-f1-1280x640.mp4">
    </video>
    <video v-if="currentVideo == 'projection502Video'" ref="projection502Video" autoplay="true" playsinline="true" webkitplaysinline="true" muted="muted" crossorigin="anonymous" loop="true">
      <source src="media/videos/rua.mp4">
    </video>
    <div id="pano" ref="panoElement"></div>
    <!-- <div class="pano-comp-overlay" v-if="!sceneLoaded"></div> -->
  </div>
</template>

<script>
const Marzipano = require('marzipano');
import { VideoAsset } from '@/components/pano/VideoAsset';
require('@/components/pano/detect.js');
import { data } from '@/data/scenes.js';
import { transitionFunctions } from '@/components/pano/transitionFunctions';
import { easings } from '@/components/pano/easing';
const hotspotInfo = require('@/assets/images/icons/hotspot-info.png')
const hotspotAr = require('@/assets/images/icons/hotspot-ar.png')
const hotspotLink = require('@/assets/images/icons/hotspot-link.png')
export default {
  name: 'Pano',
  props: {},
  data: () => ({
    viewer: null,
    videoStarted: false,
    VideoAsset: null,
    sceneLoaded: false,
    currentSceneID: 0,
    currentVideo: '',
    isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  }),
  mounted(){
    this.$nextTick(()=>{
      this.initPano()
    })
  },
  methods: {
    initPano(){
      let viewerOpts = {
        stageType: 'webgl',
        antialias: true,
        controls: {
          mouseViewMode: data.settings.mouseViewMode
        }
      };
      if (this.$refs.panoElement) {
        this.viewer = new Marzipano.Viewer(this.$refs.panoElement, viewerOpts);
        // console.log('this.viewer', this.viewer.stage())
        if ( this.viewer) {

          this.viewer.stage().addEventListener('renderInvalid', (bool)=>{
            if (bool) {
              console.log('renderComplete', bool)
            }
          })
          this.viewer.stage().addEventListener('renderComplete', (bool)=>{
            if (bool) this.sceneLoaded = bool
          })
          this.$refs.panoElement.addEventListener("click", (e) => {
            var view = this.viewer.view();
            var loc  = view.screenToCoordinates({x : e.clientX, y: e.clientY});
            var position = { yaw: loc.yaw, pitch: loc.pitch};
            console.log(position)
          })
          
          this.setupControls()

          this.scenes = this.buildScenes()
          console.log(this.scenes)
          
          const startScene = this.scenes[this.currentSceneID]
          this.switchScene(startScene, startScene.data.initialViewParameters)
        }
      }
    },
    setupControls(){
      const viewUpElement = document.querySelector('#viewUp');
      const viewDownElement = document.querySelector('#viewDown');
      const viewLeftElement = document.querySelector('#viewLeft');
      const viewRightElement = document.querySelector('#viewRight');
      const viewInElement = document.querySelector('#viewIn');
      const viewOutElement = document.querySelector('#viewOut');
      const viewPrevElement = document.querySelector('#viewPrev');
      const viewNextElement = document.querySelector('#viewNext');

      const velocity = 0.3;
      const friction = 3;

      const controls = this.viewer.controls();
      controls.registerMethod('upElement',    new Marzipano.ElementPressControlMethod(viewUpElement,     'y', -velocity, friction), true);
      controls.registerMethod('downElement',  new Marzipano.ElementPressControlMethod(viewDownElement,   'y',  velocity, friction), true);
      controls.registerMethod('leftElement',  new Marzipano.ElementPressControlMethod(viewLeftElement,   'x', -velocity, friction), true);
      controls.registerMethod('rightElement', new Marzipano.ElementPressControlMethod(viewRightElement,  'x',  velocity, friction), true);
      controls.registerMethod('inElement',    new Marzipano.ElementPressControlMethod(viewInElement,  'zoom', -velocity, friction), true);
      controls.registerMethod('outElement',   new Marzipano.ElementPressControlMethod(viewOutElement, 'zoom',  velocity, friction), true);
      controls.registerMethod('leftArrowK',   new Marzipano.KeyControlMethod(37, 'x', -velocity, friction), true);
      controls.registerMethod('rightArrowK',  new Marzipano.KeyControlMethod(39, 'x', velocity, friction), true);
      controls.registerMethod('upArrowK',     new Marzipano.KeyControlMethod(38, 'y', -velocity, friction), true);
      controls.registerMethod('ddownArrowK',  new Marzipano.KeyControlMethod(40, 'y', velocity, friction), true);
      controls.registerMethod('plusK',        new Marzipano.KeyControlMethod(107, 'zoom', -velocity, friction), true);
      controls.registerMethod('minusK',       new Marzipano.KeyControlMethod(109, 'zoom', velocity, friction), true);
      controls.registerMethod('wK',           new Marzipano.KeyControlMethod(87, 'y', -velocity, friction), true);
      controls.registerMethod('aK',           new Marzipano.KeyControlMethod(65, 'x', -velocity, friction), true);
      controls.registerMethod('sK',           new Marzipano.KeyControlMethod(83, 'y', velocity, friction), true);
      controls.registerMethod('dK',           new Marzipano.KeyControlMethod(68, 'x', velocity, friction), true);

      viewNextElement.addEventListener('click', this.nextScene, true)
      viewPrevElement.addEventListener('click', this.prevScene, true)
    },
    buildScenes(){
      return data.scenes.map((data) => {
        let isImage = data.type == 'image'
        let urlPrefix = isImage ? `/media/images/${this.isMobile ? '/mob' : ''}` : "/img/scenes/video";
        // let urlPrefix = isImage ? `https://hml.exposicaodavinci500anos.com.br/assets${this.isMobile ? '/mob' : ''}` : "/img/scenes/video";
        let ext = isImage ? `.jpg` : `.mp4`
        let source = null
        let opts = [
            { width: this.isMobile ? 2048 : 16344 },
          ]
        if (isImage) {
          let imageName = data.id.substring(data.id.length - 3, data.id.length)
          source = Marzipano.ImageUrlSource.fromString(
            `${urlPrefix}/${data.src}${ext}`
            // this.$store.getters.assets[imageName].image.currentSrc
          );
        } else {
          this.videoAsset = new VideoAsset();
          source = new Marzipano.SingleAssetSource(this.videoAsset)
          opts = [
            { width: 1 }
          ]
        }
        let geometry = new Marzipano.EquirectGeometry(opts);


        const limiter = isImage ? 
          Marzipano.RectilinearView.limit.traditional(data.faceSize, 100*Math.PI/180) :
          Marzipano.RectilinearView.limit.vfov(90*Math.PI/180, 90*Math.PI/180);

        const view = isImage ? 
          new Marzipano.RectilinearView(data.initialViewParameters, limiter) :
          new Marzipano.RectilinearView({ fov: Math.PI/2 }, limiter);

        let scene = this.viewer.createScene({
          source: source,
          geometry: geometry,
          view: view,
          pinFirstLevel: false
        });

        // if (!isImage) {
        //   document.body.addEventListener('click', () => { this.playVideo(data) }, true);
        //   document.body.addEventListener('touchstart', () => { this.playVideo(data) }, true);
          // document.body.addEventListener('click', () => { this.playVideo(`${urlPrefix}/${data.src}${ext}`) }, true);
          // document.body.addEventListener('touchstart', () => { this.playVideo(`${urlPrefix}/${data.src}${ext}`) }, true);
        // }

        // Create link hotspots.
        data.linkHotspots.forEach((hotspot) => {
          let element = this.createLinkHotspot(hotspot);
          scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });

        // Create info hotspots.
        data.infoHotspots.forEach((hotspot) => {
          let element = this.createInfoHotspot(hotspot);
          scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });

        return {
          data: data,
          scene: scene,
          view: view
        };
      });
    },
    goToScene(id){
      const _scene = this.findSceneById(id)
      if (_scene) this.switchScene(_scene, _scene.data.initialViewParameters);
    },
    prevScene(){
      if (this.currentSceneID > 0) this.currentSceneID--
      const prevScene = this.scenes[this.currentSceneID]
      this.switchScene(prevScene, prevScene.data.initialViewParameters)
    },
    nextScene(){
      if (this.currentSceneID < this.scenes.length-1) this.currentSceneID++
      const nextScene = this.scenes[this.currentSceneID]
      this.switchScene(nextScene, nextScene.data.initialViewParameters)
    },
    playVideo(src){
      if (this.videoStarted) {
        return;
      }
      this.videoStarted = true;

      var video = document.createElement('video');
      video.src = data;
      // video.src = '//www.marzipano.net/media/video/mercedes-f1-1280x640.mp4';
      video.crossOrigin = 'anonymous';

      video.autoplay = true;
      video.loop = true;
      video.muted =  true;

      video.playsInline = true;
      video.webkitPlaysInline = true;
      video.currentTime = 0
      video.play();

      this.waitForReadyState(video, video.HAVE_ENOUGH_DATA, 100, () => {
        this.videoAsset.setVideo(video);
      });
    },
    showInfoHotspotLayer(e, content) {
      this.$emit('info-layer', content)
    },
    waitForReadyState(element, readyState, interval, done) {
      let timer = setInterval(() => {
        if (element.readyState >= readyState) {
          clearInterval(timer);
          done(null, true);
        }
      }, interval);
    },
    switchScene(scene, direction) {
      this.videoStarted = false
      // scene.view.setParameters(scene.data.initialViewParameters);
      scene.view.setParameters(direction);
      console.log('scene', scene)
      // scene.scene.switchTo({
      //   transitionDuration: 1000,
      //   transitionUpdate: transitionFunctions.opacity(easings.easeInOutQuad)
      // });
      scene.scene.switchTo();
      this.updateMenuNavigation(scene)
      setTimeout(()=>{
        this.$store.dispatch("loading", false)
      }, 1500)
    },
    updateMenuNavigation(scene) {
      let sceneName = scene.data.groupId
      const currScene = this.$store.getters.visitedScenes[sceneName]
      const currSceneList = currScene.arr
      if (currSceneList.indexOf(scene.data.id) < 0) {
        currSceneList.push(scene.data.id)
        this.$store.dispatch('visited_scenes', {
          room: sceneName,
          arr: currSceneList
        })
      }
      Object.keys(this.$store.getters.navigationStatus).forEach(room => {
        let scn = this.$store.getters.visitedScenes[room]

        if (sceneName == room && scn.arr.length == scn.len) {
          this.$store.dispatch('navigation_status', {
            room: sceneName,
            status: 'visited-current',
          })
        } else if (sceneName != room && scn.arr.length == scn.len) {
          this.$store.dispatch('navigation_status', {
            room: sceneName,
            status: 'visited',
          })
        } else if (sceneName == room && scn.arr.length < scn.len) {
          this.$store.dispatch('navigation_status', {
            room: sceneName,
            status: 'current',
          })
        } 
      })

    },
    createLinkHotspot(hotspot) {
      let wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('link-hotspot');

      let icon = document.createElement('img');
      icon.src = hotspotLink;
      icon.classList.add('link-hotspot-icon');

      let transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
      for (let i = 0; i < transformProperties.length; i++) {
        let property = transformProperties[i];
        icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
      }

      wrapper.addEventListener('click', (e)=> { this.onSwitchScene(e, hotspot) });

      this.stopTouchAndScrollEventPropagation(wrapper);
      let tooltip = document.createElement('div');
      tooltip.classList.add('hotspot-tooltip');
      tooltip.classList.add('link-hotspot-tooltip');
      tooltip.innerHTML = this.findSceneDataById(hotspot.target).name;

      wrapper.appendChild(icon);
      wrapper.appendChild(tooltip);

      return wrapper;
    },
    onSwitchScene(e, hotspot){
      this.$store.dispatch("loading", true)
      this.currentVideo = ''
      console.log('hotspot', hotspot)
      if (hotspot.target.indexOf('Video') > -1){
        if (this.videoStarted) {
          return;
        }
        this.videoStarted = true;
        this.currentVideo = hotspot.target
        this.$nextTick(()=>{
          const video = this.$refs[this.currentVideo]
          video.crossOrigin = 'anonymous';
          video.autoplay = true;
          video.loop = true;
          video.muted =  true;
          video.playsInline = true;
          video.webkitPlaysInline = true;
          // video.currentTime = 0
          console.log(video)
          video.play()
          this.waitForReadyState(video, video.HAVE_ENOUGH_DATA, 100, () => {
            this.videoAsset.setVideo(video);
            console.log('video ready')
          });
        })
      }
      this.switchScene(this.findSceneById(hotspot.target), hotspot.direction);
      e.preventDefault()
    },
    createInfoHotspot(hotspot) {
      let wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('info-hotspot');
      if (hotspot.type == 'ar') wrapper.classList.add('info-hotspot-ar');

      let header = document.createElement('div');
      header.classList.add('info-hotspot-header');

      let iconWrapper = document.createElement('div');
      iconWrapper.classList.add('info-hotspot-icon-wrapper');
      let icon = document.createElement('img');
      icon.src = hotspot.type == 'content' ? hotspotInfo : hotspotAr;
      icon.classList.add('info-hotspot-icon');
      iconWrapper.appendChild(icon);

      let titleWrapper = document.createElement('div');
      titleWrapper.classList.add('info-hotspot-title-wrapper');
      let title = document.createElement('div');
      title.classList.add('info-hotspot-title');
      title.innerHTML = hotspot.title;
      titleWrapper.appendChild(title);

      header.appendChild(iconWrapper);
      header.appendChild(titleWrapper);

      wrapper.appendChild(header);

      wrapper.querySelector('.info-hotspot-header').addEventListener('click', (e) => {
        this.showInfoHotspotLayer(e, hotspot)
      }, false);

     this.stopTouchAndScrollEventPropagation(wrapper);

      return wrapper;
    },
    stopTouchAndScrollEventPropagation(element) {
      let eventList = [ 'touchstart', 'touchmove', 'touchend', 'touchcancel',
                        'wheel', 'mousewheel' ];
      for (let i = 0; i < eventList.length; i++) {
        element.addEventListener(eventList[i], function(event) {
          event.stopPropagation();
        });
      }
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
    }
  }
}
  
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
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  background-color: $black;

  .experience-overlay {
    @include set-size(100%, 100%);
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
  }
}

#pano {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;

}
canvas {
  top: 0;
  left: 0;
}
</style>
