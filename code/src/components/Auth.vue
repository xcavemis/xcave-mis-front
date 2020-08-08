<template>
  <div class="auth">
    <div class="auth-bg"></div>
    <header class="auth-header">
      <nav class="auth-header__nav">
        <ul class="auth-header__nav-list">
          <li
            class="auth-header__nav-list__item"
            @click="goToTab(0)"
            :class="{'selected': currStep == 0 || user, 'register-show': isRegister && !isRecovery}"
          >CADASTRO</li>
          <li
            class="auth-header__nav-list__item"
            @click="goToTab(1)"
            :class="{'selected': currStep == 1}"
          >LOGIN</li>
          <li
            class="auth-header__nav-list__item"
            @click="goToTab(2)"
            :class="{'selected': currStep == 2}"
          >TICKET</li>
          <li
            class="auth-header__nav-list__item"
            :class="{'selected': currStep == 3, 'recovery-show': isRecovery && !isRegister}"
          >RECUPERAR SENHA</li>
        </ul>
      </nav>
    </header>
    <img class="auth-close" src="~@/assets/images/icons/close.png" @click="hide" alt="Fechar o conteúdo.">
    <div class="auth-container">
      <div class="auth-container__block" v-if="currStep == 0">
        <Register ref="registerComp" v-on:go-ticket="goToTicket" />
      </div>
      <div class="auth-container__block" v-if="currStep == 1">
        <Login ref="loginComp" v-on:go-register="goToRegister" v-on:go-recovery="goToRecovery" v-on:go-ticket="goToTicket" />
      </div>
      <div class="auth-container__block" v-if="currStep == 2">
        <Ticket ref="ticketComp" v-on:logout="hide"/>
      </div>
      <div class="auth-container__block" v-if="currStep == 3">
        <Recovery ref="recoveryComp" v-on:recovery-success="onRecoverySuccess"/>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax, Quad } from "gsap";
import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";
import Ticket from "@/components/auth/Ticket";
import Recovery from "@/components/auth/Recovery";
export default {
  name: "Auth",
  components: {
    Register,
    Login,
    Ticket,
    Recovery,
  },
  data: () => ({
    currStep: 1,
    isRegister: false,
    isRecovery: false,
  }),
  mounted() {
    this.currStep = this.auth ? 2 : 1;
    // console.log("user", this.$store);
  },
  methods: {
    show() {
      TweenMax.fromTo(
        ".auth-bg",
        0.6,
        { y: "100%" },
        { y: "0%", ease: Quad.easeInOut }
      );
      TweenMax.fromTo(
        ".auth-header__nav",
        0.6,
        { y: "-100%" },
        { y: "0%", ease: Quad.easeInOut, delay: 0.4 }
      );
      TweenMax.fromTo(
        ".auth-close",
        0.6,
        { autoAlpha: 0 },
        { autoAlpha: 1, delay: 0.8, ease: Quad.easeInOut }
      );
    },
    hide() {
      TweenMax.fromTo(
        ".auth-container",
        0.4,
        { autoAlpha: 1 },
        { autoAlpha: 0, ease: Quad.easeInOut }
      );
      TweenMax.fromTo(
        ".auth-close",
        0.4,
        { autoAlpha: 1 },
        { autoAlpha: 0, ease: Quad.easeInOut }
      );
      TweenMax.fromTo(
        ".auth-bg",
        0.6,
        { y: "0%" },
        { y: "100%", ease: Quad.easeInOut, delay: 0.4, onComplete: ()=> {
          this.$emit('closed')
        }}
      );
      TweenMax.fromTo(
        ".auth-header__nav",
        0.4,
        { y: "0%" },
        { y: "-100%", ease: Quad.easeInOut }
      );
    },
    goToTab(id) {
      if (this.currStep == id) return
      if (id == 1) {
        this.isRecovery = false
        this.isRegister = false
      }
      if (this.isRecovery && id == 2) return
      if ((id == 0 || id == 1) && this.$store.getters.user) return;
      if (id == 2 && !this.$store.getters.user) return;
      this.hideCurrent(()=>{
        this.currStep = id;
      })
    },
    hideCurrent(cb){
      if (this.currStep == 0) this.$refs.registerComp.hide()
      if (this.currStep == 1) this.$refs.loginComp.hide()
      if (this.currStep == 2) this.$refs.ticketComp.hide()
      if (this.currStep == 3) this.$refs.recoveryComp.hide()

      setTimeout(cb, 1000)
    },
    goToTicket() {
      this.hideCurrent(()=>{
        this.currStep = 2;
      })
    },
    goToRegister() {
      this.hideCurrent(()=>{
        this.currStep = 0;
        this.isRegister = true;
      })
    },
    goToRecovery() {
      this.hideCurrent(()=>{
        this.currStep = 3;
        this.isRecovery = true;
      })
    },
    onRecoverySuccess(){
      this.hideCurrent(()=>{
        this.currStep = 1;
      })
    }
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>>

<style lang="scss">
.auth {
  @include set-size(47.5vw, 78.1vh);
  max-width: 650px;
  max-height: 640px;
  border-radius: 4px;
  overflow: hidden;
  z-index: 10;

  .auth-bg {
    @include set-size(100%, 100%);
    background-image: url(~@/assets/images/bg-login.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(100%);
  }

  
  .auth-close {
    @include set-size(32px, 32px);
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
    cursor: pointer;
    transition: transform 0.4s $ease-in-out;
    
    &:hover {
        transform: rotate(180deg) !important;
    }
  }

  .auth-header {
    @include set-size(100%, auto);
    display: block;
    margin: 40px auto 0 auto;
    position: relative;
    overflow: hidden;


    .auth-header__nav {
      background: transparent;
      box-shadow: none;

      .auth-header__nav-list {
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin: 0 11px;
        padding: 0;

        .auth-header__nav-list__item {
          @include set-size(140px, 54px);
          font-family: $rob-bold;
          @include font-size(10);
          line-height: 54px;
          color: $gray;
          border-bottom: 2px solid $gray;
          animation: border-bottom 0.6s $ease-in-out;
          margin: 0 4px;
          letter-spacing: 0.05rem;
          cursor: pointer;

          &:first-child, &:last-child {
            display: none;
          }

          &.register-show {
            display: inline;
          }
          &.recovery-show {
            display: inline;
          }

          &.selected {
            border-bottom: 2px solid $orange;
          }
        }
      }
    }
  }
  .auth-container {
    @include set-size(100%, calc(100% - 100px));
    display: block;
    position: relative;
    .auth-container__block {
      width: 68%;
      @include center(absolute);
    }
  }

  .auth__title {
    color: $black;
    font-family: $gar-bold;
    @include font-size(32);
    letter-spacing: 0.05rem;
    margin: 0 auto 18px auto;
    span {
      font-family: $gar-bold;
    }
  }
  .auth__subtitle {
    color: $black;
    font-family: $got-medium;
    @include font-size(14);
    letter-spacing: 0.05rem;
    margin: 0 auto 32px auto;
    span {
      font-family: $got-medium;
    }

    strong {
      font-family: $got-black;

      .word {
        font-family: $got-black;
      }
    }
  }

  
  @include maxWidth(1024) {
    max-height: inherit;
    @include set-size(95vw, 70vh);
    z-index: 1000;
    .auth-header {
      margin: 30px auto 0 auto;
    }

    .auth-container {
      overflow: scroll;
      .auth-container__block {
        width: 90%;
        margin: 40px auto 0;
        position: relative;
        transform: inherit;
        left: 0;
        top: 0;
      }
    }

    .auth__title {
      @include font-size(24);
    }
    .auth__subtitle {
      @include font-size(12);
      margin-bottom: 15px;
    }
  }
    
  @include maxWidthAndHeight(1920, 700) {
    @include set-size(95vw, 100vh);
    min-height: 100vh;

    .auth-header {
      margin: 20px auto 0 auto;
    }

    .register-comp {
      .auth__subtitle  {
        margin-bottom: 16px;
      }

      .register-comp__form {
        padding-bottom: 0;
      }
    }
  }
  @include maxWidthAndHeight(1023, 640) {
    @include set-size(95vw, 85vh);
    min-height: 85vh;
  }

}
</style>