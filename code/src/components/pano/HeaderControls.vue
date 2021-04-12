<template>
  <div class="header-controls">
    <div class="header-controls__left" @click="goToHome">
      <img
        class="header-controls__logo"
        src="~@/assets/images/logo-da-vinci.png"
        alt="LEONARDO DA VINCI – 500 ANOS DE UM GÊNIO"
      />
    </div>
    <div class="header-controls__center">
      <Timeline />
    </div>
    <div class="header-controls__right">
      <div class="header-controls__right-button" @click="goTutorial">
        <span class="header-controls__button-label">Tutorial</span>
        <img class="header-controls__button-icon" src="~@/assets/images/icons/tutorial.png" />
      </div>
      <div class="header-controls__right-button" @click="goFullscreen">
        <span class="header-controls__button-label">Tela Cheia</span>
        <img
          v-if="!fullscreen"
          class="header-controls__button-icon"
          src="~@/assets/images/icons/fullscreen-enter.png"
        />
        <img
          v-if="fullscreen"
          class="header-controls__button-icon"
          src="~@/assets/images/icons/fullscreen-exit.png"
        />
      </div>
      <!-- <div class="header-controls__right-user" @click="toggleUser">
        <h5 class="user-name">
          {{userName}}
          <img
            class="icon-small"
            alt="Abrir o rodapé"
            src="~@/assets/images/icons/arrow-up-small.png"
          />
        </h5>
        <div class="user-container">
          <a
            class="default-button header-controls__right-logout white change-pass"
            href="javascript:void(0)"
            @click="chagePass"
          >TROCA DE SENHA</a>
          <a
            class="default-button header-controls__right-logout white"
            href="javascript:void(0)"
            @click="logout"
          >SAIR</a>
        </div>
      </div> -->
      <div class="header-controls__right-burger" @click="toggleMenu">
        <div class="burger-line"></div>
        <div class="burger-line"></div>
        <div class="burger-line"></div>
      </div>
    </div>
    <!-- <div class="header-controls__mobile">
      <Timeline />
    </div> -->
  </div>
</template>

<script>
import Timeline from "@/components/pano/Timeline.vue";
import { TweenMax, Quad } from 'gsap';
export default {
  components: {
    Timeline,
  },
  watch:{
    '$store.getters.user.name': function(val, old){
      if (val != old && val.length > 0) {
        this.userName = `Olá, ${val.split(' ')[0]}`
      }
    }
  },
  data: () => ({
    fullscreen: false,
    userName: '',
    isUserVisible: false,
    isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  }),
  created(){
    if (this.$store.getters.user && this.$store.getters.user.name) {
      this.userName = `Olá, ${this.$store.getters.user.name.split(' ')[0]}`
    }
  },
  mounted() {
    if(!this.isMobile) {
      document.addEventListener("fullscreenchange", this.fullscreenChange);
      document.addEventListener("mozfullscreenchange", this.fullscreenChange);
      document.addEventListener("webkitfullscreenchange", this.fullscreenChange);
      document.addEventListener("msfullscreenchange", this.fullscreenChange);
    }
    TweenMax.to('.governo-top', 0.6, { y: '0%', ease: Quad.easeInOut })
  },
  methods: {
    goToHome(){
      this.$router.push('/')
    },
    toggleMenu(e){
      this.$emit('toggle-menu')
    },
    toggleUser(e){
      if (!this.isUserVisible) {
        TweenMax.set('.user-container', { display: 'block' })
        this.$el.querySelector('.icon-small').classList.add('opened')
        TweenMax.fromTo('.user-container', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut })
      } else {
        this.$el.querySelector('.icon-small').classList.remove('opened')
        TweenMax.fromTo('.user-container', 0.6, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, onComplete: ()=> {
          TweenMax.set('.user-container', { display: 'none' })
        }})

      }
      this.isUserVisible = !this.isUserVisible
    },
    goTutorial() {
      this.$emit('go-tutorial')
    },
    fullscreenChange(e) {
      this.fullscreen = !this.fullscreen;
    },
    goFullscreen() {
      if (this.fullscreen) {
        this.closeFullscreen();
        return;
      }
      const elem = document.querySelector("#app");
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },
    closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    chagePass() {
      this.$emit('change-pass')
    },
  },
};
</script>

<style lang="scss">
.header-controls {
  @include set-size(100%, 100px);
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 42%,
    rgba(0, 0, 0, 0) 100%
  );
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 30px;
  z-index: 3;

  .header-controls__mobile {
    display: none;
  }

  .header-controls__left {
    width: 16.1%;
    padding-left: 15px;

    .header-controls__logo {
      width: 100%;
      margin: 0 auto;

      @include maxWidth(1024) {
        max-width: 330px;
      }
    }
  }
  .header-controls__center {
    width: 62.4%;
    min-width: 690px;
  }
  .header-controls__right {
    width: 20%;
    display: flex;
    // justify-content: space-between;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;

    .header-controls__right-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      margin-left: 15px;
      .header-controls__button-label {
        @include font-scale(1366, 1680, 10, 12);
        font-family: $mont-regular;
        color: $white;
        margin-right: 15px;
        text-shadow: 0px 0px 4px #000000;
      }
      .header-controls__button-icon {
        @include set-size(24px, 24px);
        cursor: pointer;
        opacity: 0.7;
        transform: translateZ(0);
        transition: all 0.2s ease-in-out;
        &:hover {
          opacity: 1;
        }
      }

      &:first-child {
        // margin-right: 15px;
      }
    }

    .header-controls__right-burger {
      display: none;
    }

    .header-controls__right-user {
      cursor: pointer;
      position: relative;

      .user-name {
        @include font-scale(1366, 1680, 10, 12);
        font-family: $rob-regular;
        color: $white;
        margin-right: 15px;
        text-shadow: 0px 0px 4px #000000;
        position: relative;
        padding-right: 15px;
        .icon-small {
          position: absolute;
          @include set-size(9px, 6px);
          cursor: pointer;
          opacity: 1;
          top: 0;
          right: 0px;
          transform: rotate(180deg) translateY(-50%);
          transition: transform 0.4s;
          &.opened {
            transform: rotate(0deg) translateY(50%);
          }
        }
      } 
      
      .user-container { 
        // @include set-size(200px, auto);
        position: absolute;
        bottom: 0;
        right: 5px;
        transform: translateY(100%);
        background-color: rgba(0,0,0,0.5);
        padding: 10px;
        border-radius: 4px;
        display: none;

        &:before {
          content: "";
          position: absolute;
          right: 15px;
          top: -15px;
          width: 0; 
          height: 0; 
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-bottom: 15px solid rgba(0,0,0,0.5);
        }

        .header-controls__right-logout {
          height: 40px;
          padding-top: 0;
          line-height: 40px;
          margin: 10px auto;
          min-width: 100px;
        } 

        .default-button {
          width: 140px;
        }
      }
    }
  }
  
  @include maxWidth(1024) {
    justify-content: space-between;
    align-items: flex-start;

    .header-controls__mobile {
      display: none;
    }
    .header-controls__left {
      width: 45%;
      margin-left: 2.5vw;
      padding: 0;
    }
    .header-controls__center{
      display: none;
    }
    .header-controls__right {
      z-index: 10;
      width: 45px;
      .header-controls__right-user,
      .header-controls__right-button {
        display: none;
      }

      .header-controls__right-burger {
        display: block;
        @include set-size(32px, 32px);

        .burger-line {
          @include set-size(32px, 3px);
          display: block;
          background-color: $white;
          margin-bottom: 6px;
          transition: transform 0.6s $ease-in-out;
          &:first-child{
            margin-top: 6px;
          }
        }

        &.opened {
          .burger-line {
            
            &:first-child{
              transform: translateY(9px);
            }
            &:last-child{
              transform: translateY(-9px);
            }
          }

        }
      }

      .user-container  {
        padding: 10px;
        .change-pass {
          display: none;
        }

        .default-button {
          width: 100px !important;
          height: 32px !important;
          line-height: 32px !important;
          margin: 0  !important;
        }
      }
    }
  }

  @include maxWidth(768) {
    .header-controls__mobile {
      display: block;
      position: absolute;
      top: 130px;
      width: 90%;
      left: 5%;
    }
  }
  @include maxWidth(767) {
    .header-controls__mobile {
      position: absolute;
      top: 90px;
    }
  }
  @include maxWidth(374) {

    .header-controls__mobile {
      top: 70px;
    }

    .header-controls__left {
      width: 45%;
      margin-left: 0;
    }
    .header-controls__right {
      width: 45%;
      justify-content: flex-end;
    }
  }
}
</style>