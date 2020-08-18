<template>
  <div class="experience">
    <!-- <PanolensNew ref="pano" v-if="queueLoaded" v-on:info-layer="onInfoLayer" /> -->
    <Pano ref="pano" v-if="queueLoaded" v-on:toggle-map="toggleMap" v-on:info-layer="onInfoLayer" />
    <HeaderControls ref="headerControls" v-on:change-pass="onChangePass" v-on:go-tutorial="openTutorial" v-on:close="changePassClosed"/>
    <FooterControls ref="footerControls" v-on:action="onFooterAction" />
    <VideoLive v-if="isVideoLive && !isMobile" video-id="747181165" v-on:close="videoClosed" ref="videoLive" />
    <Video360
      v-if="isVideo360"
      :video-id="infoModalContent.target"
      v-on:close="videoClosed"
      ref="video360"
    />
    <VideoIntro
      v-if="isVideoIntro"
      video-id="446818239"
      v-on:close="videoIntroClosed"
      v-on:played="onVideoIntroPlayed"
      ref="video360"
    />
    <VideoLearn
      v-if="isVideoLearn"
      :video-id="infoModalContent.target"
      v-on:close="videoClosed"
      ref="videoLearn"
    />
    <VideoTutorial
      v-if="isVideoTutorial"
      v-on:close="videoClosed"
      ref="videoTutorial"
    />
    <AudioPlayer ref="audioPlayer" v-if="isAudioPlayer" />
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
import VideoIntro from "@/components/VideoIntro.vue";
import VideoLearn from "@/components/VideoLearn.vue";
import VideoTutorial from "@/components/VideoTutorial.vue";
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
    VideoIntro,
    VideoLearn,
    VideoTutorial,
    AudioPlayer,
    InfoModal,
    Map,
    Ar,
    ChangePass,
  },
  data: () => ({
    isVideoLive: false,
    isVideo360: false,
    isVideoIntro: true,
    isVideoLearn: false,
    isVideoTutorial: false,
    isInfoModal: false,
    isArModal: false,
    isChangePass: false,
    isMap: false,
    isAudioPlayer: false,
    infoModalContent: null,
    preloader: null,
    queueLoaded: false,
    videoEnded: false,
    verifyTokenTimer: 0,
    countDownTimer: 0,
    isCountDown: false,
    isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  }),
  mounted() {
    this.verifyToken()
    document
      .querySelector(".footer-component")
      .classList.add("footer-component__experience");
  },
  methods: {
    verifyToken(){
      this.$store.dispatch("tokenCheck").then((res) => {
        // console.log('tokenCheck: ', res)
        if (
          res &&
          res.status >= 200 &&
          res.status <= 204 &&
          res.endTime != null &&
          this.validateTime(res.endTime)
        ) {
          // console.log(this.getRestHours(res.endTime))
          // if (this.getRestHours(res.endTime) < 1 && !this.isCountDown) {
          //   clearInterval(this.countDownTimer)
          //   this.countDownTimer = setInterval(()=>{
          //     this.countDownUpdate(res.endTime)
          //   }, 1000)
          //   this.isCountDown = true
          // }
          clearTimeout(this.verifyTokenTimer)
          this.verifyTokenTimer = setTimeout(this.verifyToken, process.env.VUE_APP_CRON)
        } else {
          let message = res.response.data.message
          this.$store.dispatch("warning", {
            show: true,
            text: message,
          });
          clearTimeout(this.verifyTokenTimer)
          this.$router.push({name: 'Home'})
          this.$store.dispatch("logout");
        }
      });
    },
    countDownUpdate(end){
      let countDownDate = new Date(end)
      let now = new Date().getTime();
    
      let distance = countDownDate - now;
      
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (minutes < 10) minutes = `0${minutes}`
      if (seconds < 10) seconds = `0${seconds}`
      
      // console.log(minutes + ":" + seconds);

      this.$store.dispatch('countdown', {
        show: true,
        time: minutes + "m" + seconds + "s"
      })
        
 
    },
    getRestHours(end){
       let countDownDate = new Date(end)
        let now = new Date().getTime();
      
        // Find the distance between now and the count down date
        let distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // console.log('hours', hours)
        return hours
    },
    onVideoIntroPlayed(e) {
      // console.log('onVideoIntroPlayed')
      this.queueLoaded = true
    },
    onVideoIntroEnded(e) {
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
      } 
      // else if (params.type == "map") {
      //   this.isMap = true;
      //   this.$nextTick(() => {
      //     this.$refs?.map[params.value]();
      //   });
      // } 
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
    videoIntroClosed() {
      this.isVideoIntro = false;
      if (this.$store.getters.user && !this.$store.getters.user.introShow) {
        this.$store.dispatch("introShow", this.$store.getters.user.id).then((e) => {
          // console.log('introShow response', e)
        });
      }
      setTimeout(()=>{
        this.isAudioPlayer = true
        this.$nextTick(()=>{
          if (this.$refs?.footerControls?.musicPlaying)
            this.$refs?.audioPlayer?.unmute();
        })
      }, 2000)
    },
    videoClosed() {
      this.isVideoTutorial = false;
      this.isVideoIntro = false;
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
    openTutorial(){
      this.isVideoTutorial = true
      this.$nextTick(() => {
        if (this.$refs?.footerControls?.musicPlaying) {
          this.$refs?.audioPlayer?.mute();
        }
        this.$refs?.videoTutorial?.show();
      });
    },
    changePassClosed() {
      this.isChangePass = false;
    },
    onChangePass() {
      // console.log('onChangePass')
      this.isChangePass = true;
      this.$nextTick(()=>{
        this.$refs?.changePass?.show()
      })
    },
    toggleMap(bool){
      this.isMap = true;
      this.$nextTick(() => {
        this.$refs?.map?.show();
      });
    },
    onInfoLayer(params) {
      // console.log("onInfoLayer", params);
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
          `${process.env.VUE_APP_ASSETSPATH}/assets/obras/${this.infoModalContent?.audio}`
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
  beforeDestroy(){
    clearTimeout(this.verifyTokenTimer)
  }
};
</script>

<style lang="scss">
.experience {
  @include set-size(100%, 100%);
  position: relative;
  @include maxWidth(1023) {
    overflow: hidden;
  }

  .video-intro {
    position: absolute;
    top: 70px;
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
