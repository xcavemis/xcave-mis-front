<template>
  <div class="experience">
    <div id="pano" ref="panoElement"></div>
  </div>
</template>

<script>
const Marzipano = require('marzipano');
const bowser = require('bowser');
import { VideoAsset } from '@/components/pano/VideoAsset';
// Detect desktop or mobile mode.
if (window.matchMedia) {
  const setMode = function() {
    if (mql.matches) {
      document.body.classList.remove('desktop');
      document.body.classList.add('mobile');
    } else {
      document.body.classList.remove('mobile');
      document.body.classList.add('desktop');
    }
  };
  const mql = matchMedia("(max-width: 500px), (max-height: 500px)");
  setMode();
  mql.addListener(setMode);
} else {
  document.body.classList.add('desktop');
}

// Detect whether we are on a touch device.
document.body.classList.add('no-touch');
window.addEventListener('touchstart', function() {
  document.body.classList.remove('no-touch');
  document.body.classList.add('touch');
});

// Use tooltip fallback mode on IE < 11.
if (bowser.msie && parseFloat(bowser.version) < 11) {
  document.body.classList.add('tooltip-fallback');
}

import { data } from '@/data/scenes.js'

export default {
  name: 'Pano',
  props: {},
  data: () => ({
    viewer: null,
    videoStarted: false,
    VideoAsset: null,
  }),
  mounted(){
    this.$nextTick(this.initPano)
  },
  methods: {
    initPano(){
      let viewerOpts = {
        stageType: 'webgl',
        controls: {
          mouseViewMode: data.settings.mouseViewMode
        }
      };
      console.log(this.$refs)
      // Initialize viewer.
      this.viewer = new Marzipano.Viewer(this.$refs.panoElement, viewerOpts);
      console.log(this.viewer)

      this.$refs.panoElement.addEventListener("click", (e) => {
        var view = this.viewer.view();
        var loc  = view.screenToCoordinates({x : e.clientX, y: e.clientY});
        var position = { yaw: loc.yaw, pitch: loc.pitch};
        console.log(position)
      })

      this.scenes = this.buildScenes()
      this.switchScene(this.scenes[0])
    },
    buildScenes(){
      return data.scenes.map((data) => {
        let isImage = data.type == 'image'
        let urlPrefix = isImage ? "/img/scenes" : "/img/scenes/video";
        let ext = isImage ? `${window.innerWidth < 1280 ? '_mob' : ''}.jpg` : `.mp4`
        let source = null
        if (isImage) {
          source = Marzipano.ImageUrlSource.fromString(
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
          let element = this.createLinkHotspotElement(hotspot);
          scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });

        // Create info hotspots.
        data.infoHotspots.forEach((hotspot) => {
          let element = this.createInfoHotspotElement(hotspot);
          scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });

        return {
          data: data,
          scene: scene,
          view: view
        };
      });
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
    waitForReadyState(element, readyState, interval, done) {
      let timer = setInterval(() => {
        if (element.readyState >= readyState) {
          clearInterval(timer);
          done(null, true);
        }
      }, interval);
    },
    switchScene(scene) {
      this.videoStarted = false
      scene.view.setParameters(scene.data.initialViewParameters);
      scene.scene.switchTo();
    },
    createLinkHotspotElement(hotspot) {
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
        this.switchScene(this.findSceneById(hotspot.target));
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
    createInfoHotspotElement(hotspot) {

      // Create wrapper element to hold icon and tooltip.
      let wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('info-hotspot');

      // Create hotspot/tooltip header.
      let header = document.createElement('div');
      header.classList.add('info-hotspot-header');

      // Create image element.
      let iconWrapper = document.createElement('div');
      iconWrapper.classList.add('info-hotspot-icon-wrapper');
      let icon = document.createElement('img');
      icon.src = 'img/info.png';
      icon.classList.add('info-hotspot-icon');
      iconWrapper.appendChild(icon);

      // Create title element.
      let titleWrapper = document.createElement('div');
      titleWrapper.classList.add('info-hotspot-title-wrapper');
      let title = document.createElement('div');
      title.classList.add('info-hotspot-title');
      title.innerHTML = hotspot.title;
      titleWrapper.appendChild(title);

      // Create close element.
      let closeWrapper = document.createElement('div');
      closeWrapper.classList.add('info-hotspot-close-wrapper');
      let closeIcon = document.createElement('img');
      closeIcon.src = 'img/close.png';
      closeIcon.classList.add('info-hotspot-close-icon');
      closeWrapper.appendChild(closeIcon);

      // Construct header element.
      header.appendChild(iconWrapper);
      header.appendChild(titleWrapper);
      header.appendChild(closeWrapper);

      // Create text element.
      let text = document.createElement('div');
      text.classList.add('info-hotspot-text');
      text.innerHTML = hotspot.text;

      // Place header and text into wrapper element.
      wrapper.appendChild(header);
      wrapper.appendChild(text);

      // Create a modal for the hotspot content to appear on mobile mode.
      let modal = document.createElement('div');
      modal.innerHTML = wrapper.innerHTML;
      modal.classList.add('info-hotspot-modal');
      document.body.appendChild(modal);

      let toggle = () => {
        // wrapper.classList.toggle('visible');
        // modal.classList.toggle('visible');
      };

      // Show content when hotspot is clicked.
      wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

      // Hide content when close icon is clicked.
      modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
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
.experience {
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
