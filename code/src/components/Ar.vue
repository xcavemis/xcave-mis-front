<template>
  <div class="ar-modal user-action-none">
    <div class="ar-modal__crop">
      <div class="ar-modal__block">
        <video autoplay="true" muted playsinline width="100%" height="100%" id="video-camera"></video>
        <div class="ar-modal__mask"></div>
        <Renderer ref="rendererRef" :content="content"/>
      </div>
      <CameraRequestRejection v-if="showRequestWarning"/>
    </div>
    <img class="ar-modal__close" src="~@/assets/images/icons/close.png" @click="hide" alt="Fechar o conteúdo.">
    <Loading ref="arLoadingRef" v-if="loading"/>
  </div>
</template>

<script>
import { TweenMax, Quad } from "gsap";
import CameraRequestRejection from '@/components/CameraRequestRejection'
import Loading from '@/components/Loading'
import Renderer from '@/components/ar/Renderer'

export default {
  props:['content'],
  components: {
    CameraRequestRejection, 
    Loading, 
    Renderer,
  },
  watch: {
    '$store.getters.xr_registered': function(val, old) {
      if (val != old) {
        this.$refs?.rendererRef?.show()
      }
    }
  },
  data() {
    return {
      isVideoObject: false,
      showRequestWarning: false,
      loading: false,
      stream: null,
      iOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    }
  },
  async mounted(){
    if (this.iOS) await this.getMotionEventAuth()
    this.video = document.getElementById( 'video-camera' );
    this.getVideo()
    this.video.addEventListener( "loadedmetadata", (e) => {

    })
  },
  methods: {
    show() {
      TweenMax.set('html, body', { overflow: 'hidden' })
      TweenMax.fromTo('.ar-modal', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut })
      TweenMax.fromTo('.ar-modal__block', 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.3 })
      TweenMax.fromTo('.ar-modal__close', 0.6, { scale: 0 }, { scale: 1, ease: Quad.easeInOut, delay: 0.8 })
      if (this.$store.getters.xr_registered) {
        this.$refs?.rendererRef?.show()
      }
    },
    hide(){
      TweenMax.fromTo('.ar-modal__close', 0.4, { scale: 1 }, { scale: 0, ease: Quad.easeInOut })
      TweenMax.fromTo('.ar-modal__block', 0.6, { y: '0%' }, { y: '100%', ease: Quad.easeInOut, delay: 0.3, onComplete: () => {
          this.$emit('close')
          TweenMax.set('html, body', { overflow: 'inherit' })
      }})
      TweenMax.fromTo('.ar-modal', 0.6, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, delay: 0.3 })
        
    },
    getMotionEventAuth(){
        return new Promise(resolve => {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission().then(permissionState => {
                if (permissionState === 'granted') {
                    // window.addEventListener('deviceorientation', () => {});
                    resolve(true)
                } else {
                    resolve(false)
                }
                }).catch(console.error);
            }
        })
        // console.log('DeviceMotionEvent', DeviceMotionEvent)
        
    },
    getVideo() {
      if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {
        const constraints = { video: { facingMode: 'environment' } };
        navigator.mediaDevices.getUserMedia( constraints ).then(( stream ) => {
          this.video.srcObject = stream;
          this.stream = stream
          this.video.play();
          this.$store.dispatch('xr_registered', true)
          TweenMax.to('.ar-modal__mask', 0.6, { autoAlpha: 0, delay: 0.4, ease: Quad.easeInOut })
        }).catch(( error ) => {
          this.showRequestWarning = true
          console.error( 'Unable to access the camera/webcam.', error );
        });
      } else {
        console.error( 'MediaDevices interface not available.' );
      }
    },
    restart(){
      this.video.play();
    }
  },
  beforeDestroy() {
    this.stream?.getTracks().forEach(function(track) {
      track.stop();
    });
  }
}
</script>

<style lang="scss">
.ar-modal {
  @include set-size(100vw, 100vh);
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 10;
    
  .ar-modal__crop{
    @include set-size(90vw, 80vh);
    @include center(absolute);
    overflow: hidden;
    background-color: $black;

    @include maxWidth(1024) {
      @include set-size(95vw, 70%);
    }

    .ar-modal__block {
      @include set-size(100%, 100%);
      transform: translateY(100%);
      background-color: $white;
    }

  }
  .ar-modal__close {
    @include set-size(50px, 50px);
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
    cursor: pointer;
  }
  #video-camera {
    @include set-size(100%, 100%);
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
  }

  .ar-modal__mask,  .video-comp {
    @include set-size(100vw, 100vh);
    @include center(absolute);
    z-index: 12;
  }

  .ar-modal__mask {
    // background-image: url(~@/assets/images/bg.jpg);
    background-size: cover;
    background-position: 50% 100%;
  }
}
</style>