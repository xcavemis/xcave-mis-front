<template>
  <div class="experience">
    <Pano ref="pano" v-if="queueLoaded" v-on:info-layer="onInfoLayer" />
    <HeaderControls ref="headerControls" />
    <FooterControls ref="footerControls" v-on:action="onFooterAction"/>
    <VideoLive v-if="isVideoLive" video-id="c8dFQbj20dg" v-on:close="videoLiveClosed" ref="videoLive" />
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
  </div>
</template>

<script>
// @ is an alias to /src
import { Preloader } from '@/utils/loaders/Preloader';
import Pano from '@/components/Pano.vue'
import FooterControls from '@/components/pano/FooterControls.vue'
import HeaderControls from '@/components/pano/HeaderControls.vue'
import Map from '@/components/pano/Map.vue'
import VideoLive from '@/components/VideoLive.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import InfoModal from '@/components/InfoModal.vue'
import Ar from '@/components/Ar.vue'

export default {
  name: 'experience',
  components: {
    Pano,
    FooterControls,
    HeaderControls,
    VideoLive,
    AudioPlayer,
    InfoModal,
    Map,
    Ar,
  },
  data: () =>({
    isVideoLive: false,
    isInfoModal: false,
    isArModal: false,
    isMap: false,
    infoModalContent: null,
    preloader: null,
    queueLoaded: false,
  }),
  mounted(){
    this.setupQueue()
    this.$store.dispatch('navigation_status', {
      room: 'militar',
      status: 'visited',
    })
  },
  methods: {
    setupQueue(){
      this.preloader = new Preloader()
      this.preloader.debug = false
      this.preloader.addListener('onComplete', this.loadComplete);
      this.preloader.addListener('onProgress', this.loadProgress);
      this.preloader.queue([
        // models
        { name: 'teste', url: 'models/scene.gltf', type: 'gltf' },
        // textures
        { name: '101', url: '/media/images/codices101.jpg', type: 'texture' },
        { name: '102', url: '/media/images/codices102.jpg', type: 'texture' },
        { name: '103', url: '/media/images/codices103.jpg', type: 'texture' },
      ]);
    },
    loadProgress(details){  
      console.log('Preloader loadProgress: ', details);
      // this.$store.dispatch('loading_progress', details.data * 100)
      // this.$store.dispatch('loaded', true)
    },
    loadComplete(details){  
      console.log('Preloader complete: ', details);
      this.queueLoaded = true
      this.$store.dispatch('assets', details.data)
      // this.$store.dispatch('loaded', true)
    },
    panoGoTo(id) {
      console.log('panoGoTo', id)
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
      console.log('onInfoLayer: ', params)
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
        this.$refs?.audioPlayer?.playTo(`media/audio/guides/${this.infoModalContent?.audio}`)
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
