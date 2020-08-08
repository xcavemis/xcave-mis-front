<template>
  <div class="experience">
    <!-- <PanolensNew ref="pano" v-if="queueLoaded" v-on:info-layer="onInfoLayer" /> -->
    <Pano ref="pano" v-if="queueLoaded" v-on:info-layer="onInfoLayer" />
    <HeaderControls ref="headerControls" v-on:change-pass="onChangePass" v-on:close="changePassClosed"/>
    <FooterControls ref="footerControls" v-on:action="onFooterAction" />
    <VideoLive v-if="isVideoLive && !isMobile" video-id="c8dFQbj20dg" v-on:close="videoClosed" ref="videoLive" />
    <Video360
      v-if="isVideo360"
      :video-id="infoModalContent.target"
      v-on:close="videoClosed"
      ref="video360"
    />
    <VideoLearn
      v-if="isVideoLearn"
      :video-id="infoModalContent.target"
      v-on:close="videoClosed"
      ref="videoLearn"
    />
    <AudioPlayer ref="audioPlayer" />
    <InfoModal
      ref="infoModal"
      v-if="isInfoModal"
      :content="infoModalContent"
      v-on:close="infoLayerClosed"
      v-on:stop-audio="onStopAudio"
      v-on:pause-audio="onPauseAudio"
      v-on:play-audio="onPlayAudio"
    />
    <Map ref="map" v-if="isMap && !isMobile" v-on:navigate-to="panoGoTo" v-on:map-close="mapClosed" />
    <Ar :content="infoModalContent" ref="arModal" v-if="isArModal" v-on:close="arClosed" />
    <!-- <video v-if="!videoEnded" class="video-intro" autoplay muted ref="videoIntro">
    <source src="media/videos/da-vinci-intro-small.mp4" type="video/mp4">-->
    <!-- <source src="mov_bbb.ogg" type="video/ogg"> -->
    <!-- </video> -->
    <ChangePass ref="changePass" v-if="isChangePass" v-on:close="changePassClosed"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import { Preloader } from '@/utils/loaders/Preloader';
import ChangePass from "@/components/auth/ChangePass";
import Pano from "@/components/Pano.vue";
import FooterControls from "@/components/pano/FooterControls.vue";
import HeaderControls from "@/components/pano/HeaderControls.vue";
import Map from "@/components/pano/Map.vue";
import VideoLive from "@/components/VideoLive.vue";
import Video360 from "@/components/Video360.vue";
import VideoLearn from "@/components/VideoLearn.vue";
import AudioPlayer from "@/components/AudioPlayer.vue";
import InfoModal from "@/components/InfoModal.vue";
import Ar from "@/components/Ar.vue";
import { data } from "@/data/scenes.js";
export default {
  name: "experience",
  components: {
    Pano,
    FooterControls,
    HeaderControls,
    VideoLive,
    Video360,
    VideoLearn,
    AudioPlayer,
    InfoModal,
    Map,
    Ar,
    ChangePass,
  },
  data: () => ({
    isVideoLive: false,
    isVideo360: false,
    isVideoLearn: false,
    isInfoModal: false,
    isArModal: false,
    isChangePass: false,
    isMap: false,
    infoModalContent: null,
    preloader: null,
    queueLoaded: true,
    videoEnded: false,
    isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  }),
  mounted() {
    this.$store.dispatch("tokenCheck").then((res) => {
      if (
        res &&
        res.status >= 200 &&
        res.status <= 204 &&
        res.endTime != null &&
        this.validateTime(res.endTime)
      ) {
        
      } else {
        // this.$router.push({name: 'Home'})
      }
    });
    document
      .querySelector(".footer-component")
      .classList.add("footer-component__experience");
  },
  methods: {
    onVideoIntroEnded(e) {
      // console.log('onVideoIntroEnded', e)
      this.videoEnded = true;
    },
    panoGoTo(id) {
      // console.log('panoGoTo', id)
      this.$refs?.pano?.goToScene(id);
    },
    mapClosed() {
      this.isMap = false;
    },
    onFooterAction(params) {
      // console.log('onFooterAction', params)
      if (params.type == "live") {
        this.isVideoLive = true;
        this.$nextTick(() => {
          if (this.$refs?.footerControls?.musicPlaying)
            this.$refs?.audioPlayer?.mute();
          this.$refs?.videoLive?.show();
        });
      } else if (params.type == "music") {
        this.$refs?.audioPlayer[params.value ? "unmute" : "mute"]();
      } else if (params.type == "map") {
        this.isMap = true;
        this.$nextTick(() => {
          this.$refs?.map[params.value]();
        });
      } 
      // else if (params.type == "navigate") {
      //   this.$refs?.pano[params.value]();
      // } else if (params.type == "zoom") {
      //   this.$refs?.pano[params.value]();
      // } else if (params.type == "move") {
      //   this.$refs?.pano[params.value]();
      // }
    },
    arClosed() {
      this.isArModal = false;
      this.isVideoLive = false;
      this.isVideo360 = false;
      this.isVideoLearn = false;
    },
    videoClosed() {
      this.isVideoLive = false;
      this.isVideo360 = false;
      this.isVideoLearn = false;
      if (this.$refs?.footerControls?.musicPlaying)
        this.$refs?.audioPlayer?.unmute();
    },
    infoLayerClosed() {
      this.isInfoModal = false;
      this.$refs?.audioPlayer?.destroyDynamic();
      if (this.$refs?.footerControls?.musicPlaying)
        this.$refs?.audioPlayer?.unmute();
    },
    changePassClosed() {
      this.isChangePass = false;
    },
    onChangePass() {
      console.log('onChangePass')
      this.isChangePass = true;
      this.$nextTick(()=>{
        this.$refs?.changePass?.show()
      })
    },
    onInfoLayer(params) {
      console.log("onInfoLayer", params);
      if (params.type == "content") {
        this.infoModalContent = params;
        this.isInfoModal = true;
        this.$nextTick(() => {
          if (this.$refs?.footerControls?.musicPlaying)
            this.$refs?.audioPlayer?.mute();
          this.$refs?.infoModal?.show();
        });
      } else if (params.type == "ar") {
        this.infoModalContent = params;
        this.isArModal = true;
        this.$nextTick(() => {
          this.$refs?.arModal?.show();
        });
      } else if (params.type == "panorama") {
        this.infoModalContent = params;
        this.isVideo360 = true;
        this.$nextTick(() => {
          if (this.$refs?.footerControls?.musicPlaying)
            this.$refs?.audioPlayer?.mute();
          this.$refs?.video360?.show();
        });
      } else if (params.type == "learn") {
        this.infoModalContent = params;
        this.isVideoLearn = true;
        this.$nextTick(() => {
          if (this.$refs?.footerControls?.musicPlaying)
            this.$refs?.audioPlayer?.mute();
          this.$refs?.videoLearn?.show();
        });
      }
    },
    onStopAudio() {
      this.infoModalContent.audioLoaded = null;
      this.$refs?.audioPlayer?.stop();
      this.$nextTick(() => {
        if (this.$refs?.footerControls?.musicPlaying)
          this.$refs?.audioPlayer?.unmute();
      });
    },
    onPauseAudio() {
      this.$refs?.audioPlayer?.pause();
    },
    onPlayAudio() {
      if (!this.infoModalContent.audioLoaded) {
        this.$refs?.audioPlayer?.playTo(
          `https://hml.exposicaodavinci500anos.com.br/assets/obras/${this.infoModalContent?.audio}`
        );
      } else {
        this.$refs?.audioPlayer?.play();
      }
      this.infoModalContent.audioLoaded = true;
    },
    validateTime(date) {
      return new Date(date) - new Date() > 0;
    },
  },
};
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
