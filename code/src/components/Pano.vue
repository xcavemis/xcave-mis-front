<template>
  <div class="pano-comp">
      <!-- :src="`http://169.254.189.77:8081/index.html#media=${panoIndex}`" -->
    <iframe 
      :src="`https://hml.exposicaodavinci500anos.com.br/assets/pano-viewer/index.html#media=${panoIndex}`"
      class="pano-comp__iframe"
      width="100%" 
      height="100%" 
      frameborder="0" 
      cross-origin="anonymous"
      title="MIS - Da Vinci Live" 
      webkitallowfullscreen 
      mozallowfullscreen 
      allowfullscreen
      allow="accelerometer; gyroscope;"
      v-if="isPano"
      >
    </iframe>
  </div>
</template>

<script>
import { data } from '@/data/scenes.js';

export default {
  data: () => ({
    panoIndex: 0,
    iOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    isPano: false
  }),
  watch: {
    "$store.getters.navigateToPano": function (val, old) {
      if (val != old) {
        // console.log('navigateToPano', val)
        this.goToScene(val)
      }
    },
  },
  async mounted() {
    window.addEventListener('message', event => {
      
      if(typeof event.data === 'string' && event.data.indexOf('id') > -1) {
        let content = JSON.parse(event.data)
        // console.log('content', content)
        if (content.id == 'toggleMap') {
          this.$emit("toggle-map", true)
        } else if (content.id == 'nextPano' || content.id == 'prevPano') {
          // let infoData =  this.findContentById(content.id)
          // this.$emit("info-layer", infoData)
        } else {
          let infoData =  this.findContentById(content.id)
          this.$emit("info-layer", infoData)
        }
      }
    }); 
    this.isPano = true  
    // setTimeout(()=>{
    // }, 3000)
  },
  methods: {
    goToScene(id){
      this.panoIndex = id
    },
    findContentById(id) {
      // console.log('findContentById: ', data)
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
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: $black;

  #viewer { background-color: #FFFFFF; z-index:1; position:absolute; width: 100%; height: 100%; top: 0; }
  #preloadContainer { z-index:2; position:relative; width:100%; height:100%; opacity:0; transition: opacity 0.5s; -webkit-transition: opacity 0.5s; -moz-transition: opacity 0.5s; -o-transition: opacity 0.5s;}

  .pano-comp__iframe {
    @include set-size(100%, calc(100% - 70px));
    position: absolute;
    top: 70px;
    left: 0;

    @include maxWidth(1023) {
      @include set-size(100%, calc(100% - 70px));
      top: 80px;
      
    }
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
