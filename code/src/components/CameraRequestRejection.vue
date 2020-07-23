<template>
  <div class="camera-reject-comp">
    <div class="camera-reject-comp__content">
     <img src="assets/images/camera-rejection-icon.png" alt="" class="camera-reject-comp__warning">
      <div class="camera-reject-comp__content--text animated-content">
        <div class="animated-item">
          Para visualizar esta<br>
          experiência você precisa<br>
          liberar o uso da câmera. 
        </div>
      </div>
      <a v-if="iOS" class="default-button green" href="javascript:void(0)" @click="hide">TENTAR NOVAMENTE</a>
    </div>
  </div>
</template>

<script>
import { TweenMax, Quad } from "gsap";
export default {
  data() {
    return {
      iOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.show();
    });
  },
  methods: {
    show() {
      TweenMax.fromTo(
        ".camera-reject-comp",
        0.6,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          delay: 0.5,
          ease: Quad.easeInOut,
        }
      );
      TweenMax.staggerFromTo(
        [".animated-content"],
        0.5,
        { y: "40%", autoAlpha: 0 },
        { y: "0%", autoAlpha: 1, ease: Quad.easeInOut },
        0.2
      );
    },
    hide() {
      TweenMax.fromTo(
        ".camera-reject-comp",
        0.4,
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          delay: 0.2,
          ease: Quad.easeInOut,
          onComplete: () => {
            window.location.reload()
          }
        }
      );
      TweenMax.staggerFromTo(
        [".animated-content"],
        0.3,
        { autoAlpha: 1 },
        { autoAlpha: 0, ease: Quad.easeInOut },
        0.1
      );
    }
  }
};
</script>

<style lang="scss">
.camera-reject-comp {
  @include set-size(100%, 100%);
  background-image: url(~@/assets/images/bg-login.jpg);
  background-size: cover;
  background-position: 50% 100%;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;

  @include maxWidth(1023) {
    background-image: url(~@/assets/images/camera-rejection-bg.jpg);
  }

  .camera-reject-comp__content {
    @include center(absolute);
    @include set-size(90vw, 60vh);
    color: $black;
    font-family: $rob-regular;

    .camera-reject-comp__content--text {
      @include font-scale(375, 768, 20, 28);
      line-height: 24px;
      margin: 2vh auto;

      @include minWidth(768) {
        line-height: 32px;
      }
    }

    .default-button {
      @include set-size(170px, 44px);
      font-size: 12px;
      line-height: 44px;
      padding: 0;
    }
  }

  .camera-reject-comp__warning {
    @include set-size(15vw, auto);
    margin: 13vh auto 10px auto;

    @include maxWidth(350) {
      margin: 9vh auto 10px auto;
    }
    
  }
}
</style>