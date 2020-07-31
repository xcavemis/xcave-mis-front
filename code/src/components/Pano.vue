<template>
  <div class="pano-comp">
    <iframe 
      :src="`https://hml.exposicaodavinci500anos.com.br/assets/panorama-view/index.html`"
      class="pano-comp__iframe"
      width="100%" 
      height="100%" 
      frameborder="0" 
      cross-origin="anonymous"
      title="MIS - Da Vinci Live" 
      webkitallowfullscreen 
      mozallowfullscreen 
      allowfullscreen>
    </iframe>
  </div>
</template>

<script>
import { data } from '@/data/scenes.js';
export default {
  created() {
    window.addEventListener('message', event => {
      console.log(typeof event.data)
      if(typeof event.data === 'string' && event.data.indexOf('codi') > -1) {
        let content = event.data.split('_')
        console.log('message', content, this.findSceneDataById(content[0])); 
        const scene = this.findSceneDataById(content[0])
        const id = content[2]
        const type = content[1]
        scene.infoHotspots?.map((info) => {
          if (info?.id == id) {
            this.$emit("info-layer", info)
            return
          }
        })
      }
  }); 
  },
  methods: {
    findSceneDataById(id) {
      for (let i = 0; i < data.scenes.length; i++) {
        if (data.scenes[i].id === id) {
          return data.scenes[i];
        }
      }
      return null;
    },
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

  .pano-comp__iframe {
    @include set-size(100%, 100%);
    position: absolute;
    top: 0;
    left: 0;
  }

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
