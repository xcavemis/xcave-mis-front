<template>
  <div class="experience">
    <Pano ref="pano" v-on:info-layer="onInfoLayer" />
    <HeaderControls ref="headerControls" />
    <FooterControls ref="footerControls" v-on:action="onFooterAction"/>
    <VideoLive v-if="isVideoLive" video-id="c8dFQbj20dg" v-on:close="videoLiveClosed" ref="videoLive" />
    <AudioPlayer ref="audioPlayer" />
  </div>
</template>

<script>
// @ is an alias to /src
import Pano from '@/components/Pano.vue'
import FooterControls from '@/components/pano/FooterControls.vue'
import HeaderControls from '@/components/pano/HeaderControls.vue'
import VideoLive from '@/components/VideoLive.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'

export default {
  name: 'experience',
  components: {
    Pano,
    FooterControls,
    HeaderControls,
    VideoLive,
    AudioPlayer,
  },
  data: () =>({
    isVideoLive: false,
  }),
  mounted(){
    this.$store.dispatch('navigation_status', {
      room: 'militar',
      status: 'visited',
    })
  },
  methods: {
    onFooterAction(params) {
      console.log('onFooterAction', params)
      if (params.type == 'live') {
        this.isVideoLive = true
        this.$nextTick(()=>{
          if (this.$refs?.footerControls?.musicPlaying) this.$refs?.audioPlayer?.mute()
          this.$refs?.videoLive?.show()
        })
      } else if (params.type == 'music') {
        this.$refs?.audioPlayer[params.value ? 'unmute' : 'mute']()
      }
    },
    videoLiveClosed() {
      this.isVideoLive = false
      if (this.$refs?.footerControls?.musicPlaying) this.$refs?.audioPlayer?.unmute()
    },
    onInfoLayer(params) {
      console.log('onInfoLayer: ', params)
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
