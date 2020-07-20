<template>
  <div class="pano-comp">
    <div id="pano" ref="panoElement"></div>
    <!-- <div class="pano-comp-overlay" v-if="!sceneLoaded"></div> -->
  </div>
</template>

<script>
// https://compressjpeg.com/
const Marzipano = require('marzipano');
import { VideoAsset } from '@/components/pano/VideoAsset';
require('@/components/pano/detect.js');
import { data } from '@/data/scenes.js'
const hotspotInfo = require('@/assets/images/icons/hotspot-info.png')
export default {
  name: 'Pano',
  props: {},
  data: () => ({
    viewer: null,
    videoStarted: false,
    VideoAsset: null,
    sceneLoaded: false,
    currentSceneID: 0,
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
            if (bool) {
              console.log('renderComplete', bool)
              this.sceneLoaded = bool
            }
          })
          this.$refs.panoElement.addEventListener("click", (e) => {
            var view = this.viewer.view();
            var loc  = view.screenToCoordinates({x : e.clientX, y: e.clientY});
            var position = { yaw: loc.yaw, pitch: loc.pitch};
            console.log(position)
          })
          
          this.setupControls()

          this.scenes = this.buildScenes()
          
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
        let urlPrefix = isImage ? "/media/images" : "/img/scenes/video";
        let ext = isImage ? `${window.innerWidth < 1280 ? '_mob' : ''}.jpg` : `.mp4`
        let source = null
        if (isImage) {
          source = Marzipano.ImageUrlSource.fromString(
            // `${urlPrefix}/artist_workshop${ext}`
            `${urlPrefix}/${data.id}${ext}`
          );
        } else {
          this.videoAsset = new VideoAsset();
          source = new Marzipano.SingleAssetSource(this.videoAsset)
        }
        let geometry = new Marzipano.EquirectGeometry([{ width: isImage ? 4000 : 1 }]);;


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
          pinFirstLevel: true
        });

        if (!isImage) {
          document.body.addEventListener('click', this.playVideo);
          document.body.addEventListener('touchstart', this.playVideo);
        }

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
    playVideo(){
      if (this.videoStarted) {
        return;
      }
      this.videoStarted = true;

      var video = document.createElement('video');
      video.src = '//www.marzipano.net/media/video/mercedes-f1-1280x640.mp4';
      video.crossOrigin = 'anonymous';


      video.autoplay = true;
      video.loop = true;
      video.muted = true;

      video.playsInline = true;
      video.webkitPlaysInline = true;

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
      scene.scene.switchTo();
    },
    createLinkHotspot(hotspot) {
      let wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('link-hotspot');

      let icon = document.createElement('img');
      icon.src = 'img/link.png';
      icon.classList.add('link-hotspot-icon');

      let transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
      for (let i = 0; i < transformProperties.length; i++) {
        let property = transformProperties[i];
        icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
      }

      wrapper.addEventListener('click', () => {
        this.switchScene(this.findSceneById(hotspot.target), hotspot.direction);
      });

      this.stopTouchAndScrollEventPropagation(wrapper);

      let tooltip = document.createElement('div');
      tooltip.classList.add('hotspot-tooltip');
      tooltip.classList.add('link-hotspot-tooltip');
      tooltip.innerHTML = this.findSceneDataById(hotspot.target).name;

      wrapper.appendChild(icon);
      wrapper.appendChild(tooltip);

      return wrapper;
    },
    createInfoHotspot(hotspot) {
      let wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('info-hotspot');

      let header = document.createElement('div');
      header.classList.add('info-hotspot-header');

      let iconWrapper = document.createElement('div');
      iconWrapper.classList.add('info-hotspot-icon-wrapper');
      let icon = document.createElement('img');
      icon.src = hotspotInfo;
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

      let text = document.createElement('div');
      text.classList.add('info-hotspot-text');
      text.innerHTML = hotspot.text;

      wrapper.appendChild(header);
      wrapper.appendChild(text);

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

}
canvas {
  top: 0;
  left: 0;
}
</style>
