<template>
  <div class="footer-controls">
    <a
      class="default-button footer-controls__logout white"
      href="javascript:void(0)"
      @click="logout"
    >SAIR DA EXPERIÊNCIA</a>
    <div class="footer-controls__left">
      <div class="footer-controls__left-button" @click="toggleMusic">
        <div class="footer-controls__button-icon sound-bar">
          <div id="bar-1" class="bar" :class="{'no-anim': !this.musicPlaying}"></div>
          <div id="bar-2" class="bar" :class="{'no-anim': !this.musicPlaying}"></div>
          <div id="bar-3" class="bar" :class="{'no-anim': !this.musicPlaying}"></div>
          <div id="bar-4" class="bar" :class="{'no-anim': !this.musicPlaying}"></div>
          <div id="bar-5" class="bar" :class="{'no-anim': !this.musicPlaying}"></div>
          <div id="bar-6" class="bar" :class="{'no-anim': !this.musicPlaying}"></div>
        </div>
        <span class="footer-controls__button-label">Música de Fundo</span>
      </div>
      <div class="footer-controls__left-button live-button" @click="goLive">
        <img class="footer-controls__button-icon" src="~@/assets/images/icons/play-small.png" />
        <span class="footer-controls__button-label">Live</span>
      </div>
    </div>
    <div class="footer-controls__center">
      <div class="footer-controls__center-group">
        <span class="footer-controls__button-label mg-r">Anterior</span>
        <img
          id="viewPrev"
          class="footer-controls__button-icon"
          alt="Sala anterior"
          @click="navigateTo('prev')"
          src="~@/assets/images/icons/arrow-prev.png"
        />
      </div>
      <div class="footer-controls__center-group">
        <span class="footer-controls__button-label mg-l mg-r">Zoom</span>
        <img
          id="viewIn"
          class="footer-controls__button-icon mg-r"
          alt="Aproximar imagem"
          @mouseleave="onZoom($event, 'zoomIn')"
          @mousedown="onZoom($event, 'zoomIn')"
          @mouseup="onZoom($event, 'zoomIn')"
          src="~@/assets/images/icons/zoom-in.png"
        />
        <img
          id="viewOut"
          class="footer-controls__button-icon"
          alt="Afastar imagem"
          @mouseleave="onZoom($event, 'zoomOut')"
          @mousedown="onZoom($event, 'zoomOut')"
          @mouseup="onZoom($event, 'zoomOut')"
          src="~@/assets/images/icons/zoom-out.png"
        />
      </div>
      <div class="footer-controls__center-group">
        <span class="footer-controls__button-label mg-l mg-r">Navegação</span>
        <img
          id="viewLeft"
          class="footer-controls__button-icon mg-r"
          alt="Mover para a esquerda"
          @mouseleave="moveTo($event, 'left')"
          @mousedown="moveTo($event, 'left')"
          @mouseup="moveTo($event, 'left')"
          src="~@/assets/images/icons/arrow-left.png"
        />
        <img
          id="viewUp"
          class="footer-controls__button-icon mg-r"
          alt="Mover para cima"
          @mouseleave="moveTo($event, 'up')"
          @mousedown="moveTo($event, 'up')"
          @mouseup="moveTo($event, 'up')"
          src="~@/assets/images/icons/arrow-up.png"
        />
        <img
          id="viewRight"
          class="footer-controls__button-icon mg-r"
          alt="Mover para direita"
          @mouseleave="moveTo($event, 'right')"
          @mousedown="moveTo($event, 'right')"
          @mouseup="moveTo($event, 'right')"
          src="~@/assets/images/icons/arrow-right.png"
        />
        <img
          id="viewDown"
          class="footer-controls__button-icon"
          alt="Mover para baixo"
          @mouseleave="moveTo($event, 'down')"
          @mousedown="moveTo($event, 'down')"
          @mouseup="moveTo($event, 'down')"
          src="~@/assets/images/icons/arrow-down.png"
        />
      </div>
      <div class="footer-controls__center-group">
        <span class="footer-controls__button-label mg-l mg-r">Mapa</span>
        <img
          class="footer-controls__button-icon"
          alt="Próxima sala"
          @click="goToMap"
          src="~@/assets/images/icons/map.png"
        />
      </div>
      <div class="footer-controls__center-group">
        <img
          id="viewNext"
          class="footer-controls__button-icon mg-l mg-r"
          alt="Próxima sala"
          @click="navigateTo('next')"
          src="~@/assets/images/icons/arrow-next.png"
        />
        <span class="footer-controls__button-label">Próximo</span>
      </div>
    </div>
    <div class="footer-controls__right">
      <div class="footer-controls__right-group" @click="openFooter">
        <img
          class="footer-controls__button-icon icon-small mg-l mg-r"
          alt="Abrir o rodapé"
          src="~@/assets/images/icons/arrow-down-small.png"
        />
        <img
          class="footer-controls__button-icon mg-l mg-r"
          alt="Abrir o rodapé"
          src="~@/assets/images/logo-mis-exp.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { gsap, TweenMax, Quad } from "gsap";

export default {
  data: () => ({
    musicPlaying: true,
    pressedTimer: 0,
  }),
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll(e) {
      this.openFooter = window.scrollY > 100;
    },
    toggleMusic() {
      this.musicPlaying = !this.musicPlaying;
      this.$emit("action", {
        type: "music",
        value: this.musicPlaying,
      });
    },
    goLive() {
      this.$emit("action", {
        type: "live",
        value: "show",
      });
    },
    navigateTo(direction) {
      this.$emit("action", {
        type: "navigate",
        value: direction,
      });
    },
    moveTo(e, direction) {
      if (e.type == "mousedown") {
        clearInterval(this.pressedTimer);
        this.pressedTimer = setInterval(() => {
          this.$emit("action", {
            type: "move",
            value: direction,
          });
        });
      } else {
        clearInterval(this.pressedTimer);
      }
    },
    goToMap() {
      this.$emit("action", {
        type: "map",
        value: "show",
      });
    },
    onZoom(e, direction) {
      if (e.type == "mousedown") {
        clearInterval(this.pressedTimer);
        this.pressedTimer = setInterval(() => {
          this.$emit("action", {
            type: "zoom",
            value: direction,
          });
        });
      } else {
        clearInterval(this.pressedTimer);
      }
    },
    openFooter() {
      const footer = document.querySelector(".footer-component__experience");
      footer.classList.add("open");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.footer-controls {
  @include set-size(100%, 70px);
  background-color: $black;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;

  .footer-controls__left {
    @include set-size(16.1%, 100%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .footer-controls__left-button {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .footer-controls__button-icon {
        @include set-size(18px, 18px);
      }

      &:first-child {
        margin-right: 15px;
      }

      .footer-controls__button-label {
        @include font-scale(1366, 1680, 10, 12);
        font-family: $rob-regular;
        color: $white;
        margin-left: 15px;
        text-shadow: 0px 0px 4px #000000;
      }
    }
  }
  .footer-controls__center {
    @include set-size(62.4%, 100%);
    display: flex;
    justify-content: center;
    align-items: center;

    .footer-controls__center-group {
      display: flex;
      justify-content: center;
      align-items: center;

      .mg-l {
        margin-left: 15px;
      }
      .mg-r {
        margin-right: 15px;
      }

      .footer-controls__button-icon {
        @include set-size(24px, 24px);
        cursor: pointer;
        opacity: 0.7;
        transform: translateZ(0) scale(1);
        transition: all 0.2s ease-in-out;
        &:hover {
          opacity: 1;
          transform: translateZ(0) scale(1.1);
        }
      }
      .footer-controls__button-label {
        @include font-scale(1366, 1680, 10, 12);
        font-family: $rob-regular;
        color: #999999;
        text-shadow: 0px 0px 4px #000000;
      }
    }
  }
  .footer-controls__right {
    @include set-size(16.1%, 100%);
    display: flex;
    justify-content: center;
    align-items: center;

    .footer-controls__right-group {
      display: flex;
      justify-content: center;
      align-items: initial;
      cursor: pointer;
      .mg-l {
        margin-left: 15px;
      }
      .mg-r {
        margin-right: 15px;
      }

      .footer-controls__button-icon {
        @include set-size(110px, auto);

        &.icon-small {
          @include set-size(14px, 14px);
          cursor: pointer;
          opacity: 1;
          transform: translateZ(0) scale(1);
          transition: all 0.2s ease-in-out;
          &:hover {
            opacity: 0.6;
            transform: translateZ(0) scale(1.1);
          }
        }
      }
    }
  }
  .footer-controls__logout {
    display: none;
  }
  @include maxWidth(1024) {
    .footer-controls__logout {
      display: block;

      position: absolute;
      width: 90%;
      bottom: 80px;
    }
    .footer-controls__center {
      display: none;
    }
    .footer-controls__left,
    .footer-controls__right {
      width: 50%;

      .live-button {
        display: none;
      }
    }

    .footer-controls__left {
      margin-left: 2.5vw;
    }
  }
}

.sound-bar {
  @include set-size(22px, 18px);
  overflow: hidden;
  height: 18px;
  width: 40px;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
}
.bar {
  @include set-size(2px, 1px);
  display: inline-block;
  background-color: #b18039;
  bottom: 0;
  position: absolute;

  &#bar-1 {
    left: 0;
    animation: danceHeight1 0.6s running alternate linear infinite;
  }
  &#bar-2 {
    left: 4px;
    animation: danceHeight2 0.6s running alternate linear infinite;
  }
  &#bar-3 {
    left: 8px;
    animation: danceHeight3 0.6s running alternate linear infinite;
  }
  &#bar-4 {
    left: 12px;
    animation: danceHeight4 900ms running alternate linear infinite;
  }
  &#bar-5 {
    left: 16px;
    animation: danceHeight5 1200ms running alternate linear infinite;
  }
  &#bar-6 {
    left: 20px;
    animation: danceHeight6 1500ms running alternate linear infinite;
  }

  &#bar-1,
  &#bar-2,
  &#bar-3,
  &#bar-4,
  &#bar-5,
  &#bar-6 {
    &.no-anim {
      animation: none;
    }
  }
}

@keyframes danceHeight1 {
  from {
    height: 1px;
  }
  to {
    height: 22px;
  }
}
@keyframes danceHeight2 {
  from {
    height: 1px;
  }
  to {
    height: 15px;
  }
}
@keyframes danceHeight3 {
  from {
    height: 1px;
  }
  to {
    height: 30px;
  }
}
@keyframes danceHeight4 {
  from {
    height: 1px;
  }
  to {
    height: 20px;
  }
}
@keyframes danceHeight5 {
  from {
    height: 1px;
  }
  to {
    height: 15px;
  }
}
@keyframes danceHeight6 {
  from {
    height: 1px;
  }
  to {
    height: 15px;
  }
}
</style>