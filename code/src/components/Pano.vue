<template>
  <div class="experience">
    <div id="pano" ref="panoElement"></div>
  </div>
</template>

<script>
const Marzipano = require('marzipano');
const bowser = require('bowser');
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
  }),
  mounted(){
    this.$nextTick(this.initPano)
  },
  methods: {
    initPano(){
      // Viewer options.
      let viewerOpts = {
        controls: {
          mouseViewMode: data.settings.mouseViewMode
        }
      };
      console.log(this.$refs)
      // Initialize viewer.
      this.viewer = new Marzipano.Viewer(this.$refs.panoElement, viewerOpts);
      console.log(this.viewer)

      this.$refs.panoElement.addEventListener("click", (e) => {

        // // http://www.marzipano.net/reference/Viewer.html#view dapat dari view di index.js
        var view = this.viewer.view();
        var loc  = view.screenToCoordinates({x : e.clientX, y: e.clientY});
        var position = { yaw: loc.yaw, pitch: loc.pitch};
        console.log(position)
        // // http://www.marzipano.net/reference/Viewer.html#scene dapat dari scene
        // console.log(view.screenToCoordinates({x : e.clientX, y: e.clientY}));
        // console.log(view._yaw + " - " + view._pitch);
        // var sceness = viewer.scene();
        // sceness.hotspotContainer().createHotspot(imgHotspot, position);
      })

      // Create scenes.
      this.scenes = this.buildScenes()
      this.switchScene(this.scenes[0])
    },
    buildScenes(){
      return data.scenes.map((data) => {
        let urlPrefix = "/img/scenes";
        let source = Marzipano.ImageUrlSource.fromString(
          urlPrefix + "/" + data.id + ".jpg"
        );
        // let geometry = new Marzipano.CubeGeometry(data.levels);
        let geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);;

        const limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100*Math.PI/180);
        const view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

        let scene = this.viewer.createScene({
          source: source,
          geometry: geometry,
          view: view,
          pinFirstLevel: true
        });

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
    switchScene(scene) {
      scene.view.setParameters(scene.data.initialViewParameters);
      scene.scene.switchTo();
    },
    createLinkHotspotElement(hotspot) {

      // Create wrapper element to hold icon and tooltip.
      let wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('link-hotspot');

      // Create image element.
      let icon = document.createElement('img');
      icon.src = 'img/link.png';
      icon.classList.add('link-hotspot-icon');

      // Set rotation transform.
      let transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
      for (let i = 0; i < transformProperties.length; i++) {
        let property = transformProperties[i];
        icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
      }

      // Add click event handler.
      wrapper.addEventListener('click', () => {
        this.switchScene(this.findSceneById(hotspot.target));
      });

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
      this.stopTouchAndScrollEventPropagation(wrapper);

      // Create tooltip element.
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

      let toggle = function() {
        wrapper.classList.toggle('visible');
        modal.classList.toggle('visible');
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
<style scoped lang="scss">
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

  canvas {
    top: 0;
    left: 0;
  }
}
</style>
