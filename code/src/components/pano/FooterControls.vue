<template>
  <div class="footer-controls">
    <div class="footer-controls__console-container" v-if="!isMobile">

      <!-- <div class="footer-controls__console" v-if="$store.getters.countdown.show">
        <p class="footer-controls__console-text ticket-text">
          O SEU TICKET VAI EXPIRAR<br>
          EM {{$store.getters.countdown.time}}.<br>
          CONTINUE A EXPERIÊNCIA<br>
          ADQUIRINDO UM NOVO INGRESSO.
        </p>
        <a class="footer-controls__console-button ticket-button" target="_blank" href="https://davincidigital.byinti.com/">COMPRAR INGRESSO</a>
      </div> -->
      <!-- <div class="footer-controls__console" v-if="(isLiveShow && liveEnabled && $store.getters.period && $store.getters.period.end) || (isLiveShow && (!this.$store.getters.period || (this.$store.getters.period && !this.$store.getters.period.end)) && commonUserLiveEnabled)"> -->
      <div class="footer-controls__console" v-if="(isLiveShow && liveEnabled && $store.getters.period && $store.getters.period.end)">
        <p class="footer-controls__console-text">
          UMA LIVE COM O EDUCATIVO<br>
          DO MIS EXPERIENCE<br>
          ACONTECE NESTE MOMENTO.
        </p>
        <a class="footer-controls__console-button" @click="goLive" href="javascript:void(0)">ENTRAR NA LIVE</a>
      </div>
    </div>
    <div class="footer-controls__grad"></div>
    <div class="footer-controls__left">
      <div class="footer-controls__left-button audio-button" @click="toggleMusic">
        <div class="footer-controls__button-icon sound-bar">
          <!-- <div id="bar-1" class="bar" :class="{'no-anim': !this.musicPlaying}"></div> -->
          <div id="bar-2" class="bar" :class="{'no-anim': !this.musicPlaying}"></div>
          <div id="bar-3" class="bar" :class="{'no-anim': !this.musicPlaying}"></div>
          <div id="bar-4" class="bar" :class="{'no-anim': !this.musicPlaying}"></div>
          <!-- <div id="bar-5" class="bar" :class="{'no-anim': !this.musicPlaying}"></div> -->
          <!-- <div id="bar-6" class="bar" :class="{'no-anim': !this.musicPlaying}"></div> -->
        </div>
        <span class="footer-controls__button-label">Música de Fundo</span>
      </div>
      <div class="footer-controls__left-button live-button" @click="goLive" v-if="isLiveShow && this.$store.getters.period && this.$store.getters.period.end">
        <img v-if="liveEnabled" class="footer-controls__button-icon" src="~@/assets/images/icons/play-small.png" />
        <img v-if="!liveEnabled" class="footer-controls__button-icon" src="~@/assets/images/icons/play-small-disable.png" />
        <span class="footer-controls__button-label">Live MIS</span>
        <span v-if="!liveEnabled" class="live-status"><span class="desc">PRÓXIMA SESSÃO</span> {{liveStatus}}</span>
        <!-- <span v-if="!liveEnabled" class="live-status"><span class="desc">NENHUMA SESSÃO ATIVA</span></span> -->
        <span v-if="liveEnabled && $store.getters.period" class="live-status live-enabled">{{liveStatus}}</span>
      </div>
      <div class="footer-controls__left-button live-button" @click="goLive" v-if="!isLiveShow && this.$store.getters.period && this.$store.getters.period.end">
        <img class="footer-controls__button-icon" src="~@/assets/images/icons/play-small-disable.png" />
        <span class="footer-controls__button-label">Live MIS</span>
        <span class="live-status"><span class="desc">NENHUMA SESSÃO ATIVA</span></span>
      </div>
      <div class="footer-controls__left-button live-button" @click="goLive" v-if="isLiveShow && (!this.$store.getters.period || (this.$store.getters.period && !this.$store.getters.period.end))">
        <img class="footer-controls__button-icon" src="~@/assets/images/icons/play-small.png" />
        <span class="footer-controls__button-label">Live MIS</span>
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
        <div class="footer-controls__right-group__label">SOBRE A EXPOSIÇÃO</div>
        <img
          class="footer-controls__button-icon icon-small"
          alt="Abrir o rodapé"
          src="~@/assets/images/icons/arrow-up-small.png"
        />
      </div>
      <div class="footer-controls__right-group mg-r">
        <img
          class="footer-controls__button-icon logos-img"
          alt="Abrir o rodapé"
          src="~@/assets/images/logo-mis-exp-gov.svg"
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
    isLiveShow: true,
    liveStatus: '',
    liveEnabled: true,
    commonUserLiveEnabled: false,
    verifyLiveTimer: 0,
    isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
  }),
  mounted() {
    if (!this.isMobile && this.$store.getters.period && this.$store.getters.period.end) {
      console.log('period', this.$store.getters.period)
      this.verifyLiveStatus()
      clearInterval(this.verifyLiveTimer)
      this.verifyLiveTimer = setInterval(()=>{
        this.verifyLiveStatus()
      }, 1000)
    } else {
      // if (!this.isMobile) {
      //   clearInterval(this.verifyLiveTimer)
      //   this.verifyLiveTimer = setInterval(()=>{
      //     this.commonUserLiveEnabled = this.checkLiveTime()
      //   }, 1000)
      // }
    }
    // window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    verifyLiveStatus(){
      if (this.$store.getters.period && this.$store.getters.period.end) {
        let isValidPeriod = this.validateTime(this.$store.getters.period.start, this.$store.getters.period.end)

        const start = new Date(this.$store.getters.period.start)
        const hour = start.getHours()
        const minutes = start.getMinutes()
        let day = start.getDate()
        if (day < 10)  day = `0${day}`
        let month = start.getMonth() + 1
        if (month < 10)  month = `0${month}`

        this.liveEnabled = this.isStartTime(start)

        if (isValidPeriod && this.$store.getters.webinarLink) {
          this.isLiveShow = true
          if (this.liveEnabled) {
            this.liveStatus = `PARTICIPE AO VIVO`
          } else {
            this.liveStatus = `${hour}:00`
            // this.liveStatus = `${day}/${month} - ${hour}:00`
          }
        } else {
          this.isLiveShow = false
          this.liveEnabled = false
        }
        // console.log('liveStatus', this.liveStatus, this.liveEnabled)
      }
    },
    checkLiveTime() {
      const d = new Date();
      const hours = d.getHours();
      const mins = d.getMinutes();
      const day = d.getDay();

      const weekDay = (day >= 2 && day <= 5)
      const weekendDay = (day == 0 || day == 6)
      const firstWeekLive = (hours == 13 && mins >= 15) || (hours == 14 && mins <= 15)
      const secondWeekLive = (hours == 17 && mins >= 45) || (hours == 18 && mins <= 45)
      const firstWeekendLive = (hours == 13 && mins >= 30) || (hours == 14 && mins <= 30)
      const secondWeekendLive = (hours == 15 && mins <= 59)
      const thirdWeekendLive = (hours == 16 && mins >= 30) || (hours == 17 && mins <= 30)
      //  terça a sexta (13h15 e 17h45) e três aos finais de semana (13h30, 15h e 16h30).
      // console.log('weekDay', weekDay)
      // console.log('firstWeekLive', firstWeekLive)
      // console.log('secondWeekLive', secondWeekLive)
      // console.log('weekendDay', weekendDay)
      // console.log('firstWeekendLive', firstWeekendLive)
      // console.log('secondWeekendLive', secondWeekendLive)
      // console.log('thirdWeekendLive', thirdWeekendLive)
      return  (weekDay && (firstWeekLive || secondWeekLive)) || weekendDay && (firstWeekendLive || secondWeekendLive || thirdWeekendLive)
    },
    isStartTime(start) {
      return new Date().getTime() - start.getTime() > 0;
    },
    validateTime(start, end) {
      // return new Date(end) - new Date(start) > 0;
      return new Date(end) - new Date(start) > 0 && new Date(end) - new Date() > 0;
    },
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
      if (!this.liveEnabled) return
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
      this.$store.dispatch("mute", true);
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
  beforeDestroy(){
    clearInterval(this.verifyLiveTimer)
  }
};
</script>

<style lang="scss">
.footer-controls {
  @include set-size(100%, 70px);
  background-color: transparent;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  z-index: 3;
  pointer-events: none;
  touch-action: none;

  .footer-controls__console-container{
    position: absolute;
    left: 20px;
    bottom: 80px;
    .footer-controls__console{
      display: block; 
      text-align: left;
      margin-bottom: 15px;;
  
      .footer-controls__console-text{
        position: relative;
        padding-left: 15px;
        @include font-size(10);
        font-family: $mont-regular;
        color: $white;
        text-shadow: 0px 0px 4px rgba(0,0,0,0.8);
        
  
        &:before {
          content: "";
          @include set-size(10px, 10px);
          border-radius: 50%;
          position: absolute;
          top: 7px;
          left: 0px;
          background-color: #b00000;
          animation: pulseLive 1.4s infinite;
        }
        &.ticket-text {
          &:before {
            background-color: #b18039;
          }
        }
      }
      .footer-controls__console-button{
        @include font-size(9);
        font-family: $mont-regular;
        color: $white;
        text-align: left;
        border: 2px solid #ac7d3a;
        padding: 5px 10px;
        border-radius: 6px;
        margin-left: 15px;
        transition: all 0.6s;
        pointer-events: all;
        touch-action: initial;
        text-shadow: 0px 0px 4px rgba(0,0,0,0.5);
        &:hover {
          background-color: #ac7d3a;
          color: $black;
          text-shadow: 0px 0px 4px rgba(0,0,0,0);
        }

        &.ticket-button {
          border: 2px solid $white;
          background-color: $white;
          color: $black;

          &:hover {
            background-color: #ac7d3a;
            border: 2px solid #ac7d3a;
            color: $black;
            text-shadow: 0px 0px 4px rgba(0,0,0,0);
          }
        }
      }
  
    }
    
  }

  .footer-controls__grad {
    @include set-size(100%, 7px);
    position: absolute;
    top: -5px;
    left: 0;
    background: black;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 55%, rgba(0, 0, 0, 1) 100%);
    touch-action: none;
    pointer-events: none;
  }

  @include maxWidth(1024) {
    background-color: $black;
  }
  @include maxWidth(374) {
    height: 50px;

  }

  .footer-controls__left {
    @include set-size(25%, 100%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    pointer-events: all;
    touch-action: initial;
     @include maxWidth(1440) {
       min-width: 310px;
     }
    .footer-controls__left-button {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .footer-controls__button-icon {
        @include set-size(18px, 18px);
      }

      &:first-child {
        margin: 0 15px;

        .footer-controls__button-label {
          margin-left: 10px;
        }
      }

      .footer-controls__button-label {
        @include font-size(10);
        font-family: $mont-regular;
        color: $white;
        margin-left: 8px;
        text-shadow: 0px 0px 4px #000000;

      }
      .live-status {
        font-family: $mont-regular;
        color: $white;
        font-size: 7px;
        margin-left: 8px;

        > .desc {
          color: #999999;
        }
      }

      .live-enabled {
        position: relative;
        padding-left: 15px;
        color: $white;
        &:before {
          content: "";
          @include set-size(10px, 10px);
          border-radius: 50%;
          @include center-y(absolute);
          left: 0px;
          background-color: #b00000;
          animation: pulseLive 1.4s infinite;
        }
      }

      @include maxWidth(1440) {
        &:first-child {
          margin: 0 10px;

          .footer-controls__button-label {
            margin-left: 8px;
          }
        }

        .live-status {
          margin-left: 6px;
        }

      }
    }
  }
  .footer-controls__center {
    @include set-size(40%, 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    touch-action: none;

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
    @include set-size(30%, 100%);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    pointer-events: all;
    touch-action: initial;

    .mg-l {
        margin-left: 15px;
      }
      .mg-r {
        margin-right: 15px;
      }

    .footer-controls__right-group {
      display: flex;
      justify-content: flex-end;
      align-items: initial;
      cursor: pointer;
      

      .footer-controls__right-group__label {
        width: 120px;
        font-size: 9px;
        font-family: $rob-regular;
        color: #999999;
        text-shadow: 0px 0px 4px #000000;
      }

      .footer-controls__button-icon {
        @include set-size(100%, auto);

        .cls-1,.cls-3{
          fill:#fff;
        }
        .cls-2{
          fill:#231f20;
        }
        .cls-3{
          fill-rule:evenodd;
        }

        &.icon-small {
          @include set-size(9px, 6px);
          cursor: pointer;
          opacity: 1;
          transform: scale(1);
          transition: all 0.2s ease-in-out;
          margin-top: -6px;
          margin-right: 25px;
          &:hover {
            // opacity: 0.6;
            // transform: translateZ(0) scale(1.1);
          }
        }


        &.logos-img{
          min-width: 220px;
        }

        @include maxWidth(1200) {
          @include set-size(auto, 30px);
          &.logos-img{
            min-width: 160px;
          }

          .footer-controls__right-group__label {
            @include set-size(40vw, auto);
          }
          &.icon-small {
            // margin-top: 7px;
          }
        }
         @include maxWidth(768) {
          &.icon-small {
            margin-top: 2px;
          }
        }
      }
    }
  }
  .footer-controls__logout {
    display: none;
  }
  @include maxWidth(1024) {
    height: 50px;

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
      width: 100vw;
      justify-content: space-between;
      
      .audio-button,
      .live-button {
        display: none;
      }

      .footer-controls__right-group {
        .footer-controls__button-icon {
          @include set-size(50vw, auto);
          max-width: 290px;
        }
      }
    }

    .footer-controls__left {
      margin-left: 2.5vw;
      display: none;
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
  bottom: 4px;
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

@keyframes pulseLive {
  0% {
    transform: translateY(-50%) scale(1)
  }
  50% {
    transform: translateY(-50%) scale(0.8)
  }
  100% {
    transform: translateY(-50%) scale(1)
  }
}
</style>