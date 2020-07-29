<template>
  <div class="experience">
    <!-- <Pano ref="pano" v-if="queueLoaded" v-on:info-layer="onInfoLayer" /> -->
    <!-- <Panolens ref="pano" v-if="queueLoaded" v-on:info-layer="onInfoLayer"/> -->
    <PanolensNew ref="pano" v-if="queueLoaded" v-on:info-layer="onInfoLayer"/>
    <HeaderControls ref="headerControls" />
    <FooterControls ref="footerControls" v-on:action="onFooterAction"/>
    <VideoLive v-if="isVideoLive" video-id="c8dFQbj20dg" v-on:close="videoLiveClosed" ref="videoLive" />
    <Video360 v-if="isVideo360" :video-id="infoModalContent.target" v-on:close="videoLiveClosed" ref="video360" />
    <VideoLearn v-if="isVideoLearn" :video-id="infoModalContent.target" v-on:close="videoLiveClosed" ref="videoLearn" />
    <AudioPlayer ref="audioPlayer" />
    <InfoModal 
      ref="infoModal" 
      v-if="isInfoModal"
      :content="infoModalContent" 
      v-on:close="infoLayerClosed"
      v-on:stop-audio="onStopAudio" 
      v-on:pause-audio="onPauseAudio" 
      v-on:play-audio="onPlayAudio"/>
      <Map ref="map" 
        v-if="isMap"
        v-on:navigate-to="panoGoTo"
        v-on:map-close="mapClosed"
      />
      <Ar 
        ref="arModal"
        v-if="isArModal" 
      />
      <!-- <video v-if="!videoEnded" class="video-intro" autoplay muted ref="videoIntro">
        <source src="media/videos/da-vinci-intro-small.mp4" type="video/mp4"> -->
        <!-- <source src="mov_bbb.ogg" type="video/ogg"> -->
      <!-- </video> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { Preloader } from '@/utils/loaders/Preloader';
import Pano from '@/components/Pano.vue'
import Panolens from '@/components/Panolens.vue'
import PanolensNew from '@/components/PanolensNew.vue'
import FooterControls from '@/components/pano/FooterControls.vue'
import HeaderControls from '@/components/pano/HeaderControls.vue'
import Map from '@/components/pano/Map.vue'
import VideoLive from '@/components/VideoLive.vue'
import Video360 from '@/components/Video360.vue'
import VideoLearn from '@/components/VideoLearn.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import InfoModal from '@/components/InfoModal.vue'
import Ar from '@/components/Ar.vue'
import { data } from '@/data/scenes.js';
// import createjs from 'preload-js';
export default {
  name: 'experience',
  components: {
    Pano,
    Panolens,
    PanolensNew,
    FooterControls,
    HeaderControls,
    VideoLive,
    Video360,
    VideoLearn,
    AudioPlayer,
    InfoModal,
    Map,
    Ar,
  },
  data: () =>({
    isVideoLive: false,
    isVideo360: false,
    isVideoLearn: false,
    isInfoModal: false,
    isArModal: false,
    isMap: false,
    infoModalContent: null,
    preloader: null,
    queueLoaded: true,
    videoEnded: false,
    isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  }),
  mounted(){
    
    // this.setupQueue()
    // this.$nextTick(()=>{
      // this.$store.dispatch("loading", true)
      
      // this.$refs.videoIntro.addEventListener('ended', this.onVideoIntroEnded, true)
    // })
  },
  methods: {
    // setupQueue(){
    //   // this.preloader = new Preloader()
    //   // this.preloader.debug = false
    //   // this.preloader.addListener('onComplete', this.loadComplete);
    //   // this.preloader.addListener('onProgress', this.loadProgress);
    //   const assetsToLoad = []
    //   data.scenes.map((scene, index) => {
    //     let isImage = scene.type == 'image'
    //     let urlPrefix = `https://hml.exposicaodavinci500anos.com.br/assets${this.isMobile ? '/mob' : ''}`
    //     let ext = isImage ? `.jpg` : `.mp4`
    //     if (index < 6) {
    //       if (scene.type == 'image') {
    //         assetsToLoad.push(
    //           { 
    //             id: scene.id, 
    //             src: `${urlPrefix}/${scene.src}${ext}`, 
    //             type: 'image' 
    //           }
    //           // { 
    //           //   name: id, 
    //           //   url: `${urlPrefix}/${scene.src}${ext}`, 
    //           //   type: 'texture' 
    //           // },
    //         )
    //       }
    //     }
    //   })
    //   this.queue = new createjs.LoadQueue()
    //   this.queue.on('complete', this.onLoadComplete);
    //   this.queue.loadManifest(assetsToLoad)
    //   this.queue.load()
    //   // this.preloader.queue(assetsToLoad);
    // },
    // onLoadComplete(event) {
    //   // console.log('onLoadComplete', event);
    //     // Get Blob object instead of a formatted result
    //     const assetsLoaded = []
    //     data.scenes.map((scene, index) => {
    //       if (index < 6) {
    //         let blob = this.queue.getResult(scene.id, true);
    //         assetsLoaded.push({
    //           name: scene.id,
    //           url: blob,
    //           type: 'image'
    //         })
    //       }
    //     })
    //     this.$store.dispatch('assets', assetsLoaded)
    // },
    loadProgress(details){  
      console.log('Preloader loadProgress: ', details.data);
      if (details.data > 0.3) {
        // this.$store.dispatch("loading", false)
        this.queueLoaded = true
        this.$store.dispatch("loading", false)
      }
      // this.$store.dispatch('loading_progress', details.data * 100)
      // this.$store.dispatch('loaded', true)
    },
    loadComplete(details){  
      // console.log('Preloader complete: ', details);
      this.$store.dispatch('assets', details.data)
      // this.queueLoaded = true
      // this.$store.dispatch('loaded', true)
    },
    onVideoIntroEnded(e){
      // console.log('onVideoIntroEnded', e)
      this.videoEnded = true
    },
    panoGoTo(id) {
      // console.log('panoGoTo', id)
      this.$refs?.pano?.goToScene(id)
    },
    mapClosed(){
      this.isMap = false
    },
    onFooterAction(params) {
      // console.log('onFooterAction', params)
      if (params.type == 'live') {
        this.isVideoLive = true
        this.$nextTick(()=>{
          if (this.$refs?.footerControls?.musicPlaying) this.$refs?.audioPlayer?.mute()
          this.$refs?.videoLive?.show()
        })
      } else if (params.type == 'music') {
        this.$refs?.audioPlayer[params.value ? 'unmute' : 'mute']()
      } else if (params.type == 'map') {
        this.isMap = true
        this.$nextTick(()=>{
          this.$refs?.map[params.value]()
        })
      } else if (params.type == 'navigate') {
        this.$refs?.pano[params.value]()
      } else if (params.type == 'zoom') {
        this.$refs?.pano[params.value]()
      } else if (params.type == 'move') {
        this.$refs?.pano[params.value]()
      }
    },
    videoLiveClosed() {
      this.isVideoLive = false
      if (this.$refs?.footerControls?.musicPlaying) this.$refs?.audioPlayer?.unmute()
    },
    infoLayerClosed() {
      this.isInfoModal = false
      if (this.$refs?.footerControls?.musicPlaying) this.$refs?.audioPlayer?.unmute()
    },
    onInfoLayer(params) {
      if (params.type == 'content') {
        this.infoModalContent = params
        this.isInfoModal = true
        this.$nextTick(()=>{
          if (this.$refs?.footerControls?.musicPlaying) this.$refs?.audioPlayer?.mute()
          this.$refs?.infoModal?.show()
        })
      } else if (params.type == 'ar') {
        this.infoModalContent = params
        this.isArModal = true
        this.$nextTick(()=>{
          this.$refs?.arModal?.show()
        })
      } else if (params.type == 'panorama') {
        this.infoModalContent = params
        this.isVideo360 = true
        this.$nextTick(()=>{
          this.$refs?.video360?.show()
        })
      } else if (params.type == 'learn') {
        this.infoModalContent = params
        this.isVideoLearn = true
        this.$nextTick(()=>{
          this.$refs?.videoLearn?.show()
        })
      }
    },
    onStopAudio(){
      this.infoModalContent.audioLoaded = null
      this.$refs?.audioPlayer?.stop()
      this.$nextTick(()=>{
        if (this.$refs?.footerControls?.musicPlaying) this.$refs?.audioPlayer?.unmute()
      })
    },
    onPauseAudio(){
      this.$refs?.audioPlayer?.pause()
    },
    onPlayAudio(){
      if (!this.infoModalContent.audioLoaded) {
        this.$refs?.audioPlayer?.playTo(`https://hml.exposicaodavinci500anos.com.br/assets/obras/${this.infoModalContent?.audio}`)
      } else {
        this.$refs?.audioPlayer?.play()
      }
      this.infoModalContent.audioLoaded = true
    }
  }
}
</script>

<style lang="scss">
.experience {
  @include set-size(100%, 100%);
  position: relative;

  .video-intro {
    @include set-size(100%, 100%);
    position: absolute;
    top: 0;
    left: 0;
  }

  .footer-controls {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .header-controls {
    position: absolute;
    left: 0;
    top: 70px;
  }

}
</style>
