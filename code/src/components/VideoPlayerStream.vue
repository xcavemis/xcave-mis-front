<template>
  <div class="video-player" ref="videoContainer">
    <video
      class="shaka-video"
      width="1920"
      :poster="poster"
      ref="video"
      playsinline
      loop="false"
    ></video>
    <!-- <img src="assets/images/loading.gif" alt="Airmax cloud" class="video-player__anim-container">   -->
    <img :src="poster" alt="" class="video-player__poster">
    <img src="~@/assets/images/icons/play-big.png" alt="" class="video-player__play-icon" @click="firstPlay">
    <div class="video-controls" v-if="controls">
        <div class="video-controls__buttons" >
            <a href="javascript:void(0)" class="video-controls__buttons--play"></a>
        </div>
        <div class="video-controls__seek" @click="onSeek">
            <div class="video-controls__seek--bar"></div>
            <div class="video-controls__seek--track"></div>
            <div class="video-controls__seek--button"></div>
        </div>
    </div>
  </div>
</template>

<script>
import "shaka-player/dist/controls.css";
import shaka from "shaka-player/dist/shaka-player.ui.js";
import { TweenMax, Quad } from 'gsap'

const onErrorEvent = (event) => {
    // Extract the shaka.util.Error object from the event.
    onError(event.detail);
}


const onError = (error) => {
    // Log the error.
    console.error("Error code", error.code, "object", error);
}

export default {
    props:['manifestKey', 'poster', 'controls'],
    components: {},
    data(){
        return {
            player: null,
            shakaPlayer: null,
            duration: 0,
            time: 0,
            playing: false,
            isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
            isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
            playerLayer: true,
        } 
    },
    mounted() {
        this.$nextTick(() => {
            this.initShaka();
            if (this.controls) {
                document.querySelector('.video-controls__buttons').addEventListener('touchstart', this.togglePlay)
                document.querySelector('.video-controls__seek').addEventListener('touchmove', (e) => { this.onMove(e) } , true)
            }
            this.show()
        });
    },
    methods: {
        show(){
            TweenMax.set('html, body', { overflow: 'hidden' })
            TweenMax.to('.video-player__play-icon', 0.8, { autoAlpha: 1, ease: Quad.easeInOut })
        },
        hide(cb){
            this.pause()
            TweenMax.to(this.$el, 0.8, { y: '100%', ease: Quad.easeInOut, onComplete: ()=>{
                TweenMax.set('.video-controls', { autoAlpha: 0 })
                TweenMax.set('.video-player__play-icon', { display: 'block', scale: 1 })
                cb ()
            }})
        },
        async initPlayer() {
            const support = await shaka.Player.probeSupport();
            // console.log('initPlayer', support)
            // const manifestUri = `/dash/${this.manifestKey}/manifest${support.manifest.mpd ? '.mpd' : '.m3u8'}`;
            const manifestUri = `${process.env.VUE_APP_ASSETSPATH}/assets/videos/dash/${this.manifestKey}${this.isMobile ? '/mob' : ''}/manifest${support.manifest.mpd ? '.mpd' : '.m3u8'}`;
            // console.log('initPlayer manifestUri', manifestUri)
            // console.log(support)
            // Create a Player instance.
            this.shakaPlayer = new shaka.Player(this.$refs.video);
            // this.shakaPlayer.configure({
            //     streaming: {
            //         timeout: 10000,
            //         maxAttempts: 10,
            //     }
            // });
            this.shakaPlayer.addEventListener("error", onErrorEvent);
            this.loadSource(manifestUri).then((elem) => {
                // console.log("The video has now been loaded!", elem);
                window.player = elem;
                this.player = elem;
            }).catch(onError);
        },
        loadSource(src){
            const supportsMSE = typeof MediaSource !== 'undefined';
            return new Promise((resolve) => {
                if (supportsMSE) {
                    this.shakaPlayer.load(src)
                        .then(() => {
                            resolve(this.shakaPlayer.getMediaElement());
                        });
                } else {
                    const domElem = document.querySelector('.shaka-video')
                    domElem.src = src;

                    setTimeout(() => {
                        resolve(domElem);
                    }, 100);
                }
            });
        },
        initShaka() {
            shaka.polyfill.installAll();

            if (shaka.Player.isBrowserSupported()) {
                this.initPlayer();
            } else {
                console.log("Browser not supported!");
            }
        },
        skip(){
            this.pause()
            this.ended()
            // this.seek(this.player.duration)
        },
        onMove(e){
            // console.log(e)
            const barW = document.querySelector(".video-controls__seek").offsetWidth
            const touchPercentage = (e.touches[0].clientX - (barW * 0.25)) / barW;
            const timePercentage = this.player.duration * touchPercentage;
            this.seek(timePercentage);
        },
        firstPlay(){
            TweenMax.to('.video-player__poster', 0.6, { autoAlpha: 0, ease: Quad.easeInOut })
            this.$emit('played')
            if (this.controls) {
                this.togglePlay()
            } else {
                this.play()
            }
            if (this.controls) TweenMax.to('.video-controls', 0.6, { autoAlpha: 1, ease: Quad.easeInOut })
            TweenMax.to('.video-player__play-icon', 0.4, { scale: 0, ease: Quad.easeOut, onComplete: ()=> {
                TweenMax.set('.video-player__play-icon', { display: 'none' })
            }})
        },
        onSeek(e) {
            const touchPercentage =
                e.offsetX /
                document.querySelector(".video-controls__seek").offsetWidth;
            const timePercentage = this.duration * touchPercentage;
            this.seek(timePercentage);
        },
        update() {
            if (this.player && this.playing) {
                this.duration = this.player.duration;
                this.time = this.player.currentTime;
                const percentage = (this.time / this.duration) * 100
                if (this.controls) {
                    const track = document.querySelector(".video-controls__seek--track")
                    if (track) {
                        TweenMax.set(".video-controls__seek--track", { width: percentage + '%', onUpdate: ()=> {
                            TweenMax.set(".video-controls__seek--button", { left: track.offsetWidth })
                        }})
                    }
                }
                

                if (percentage >= 99.5) {
                    if (this.controls) this.togglePlay()
                    this.ended()
                }
            }
            window.requestAnimationFrame(this.update);
        },
        togglePlay(){
            const button = document.querySelector('.video-controls__buttons--play')
            if (button.classList.contains('paused')) {
                this.pause()
                button.classList.remove('paused')
            } else {
                this.play()
                button.classList.add('paused')
            }
        },
        play() {
            if (!this.player) return;
            this.update();
            this.player.play();
            this.playing = true
            // console.log("play", this.player);
        },
        pause() {
            if (!this.player) return;
            window.cancelAnimationFrame(this.update);
            this.player.pause();
            this.playing = false;
        },
        seek(n) {
            if (!this.player) return;
            this.player.currentTime = n
        },
        ended() {
            // console.log('ended')
            this.pause()
            if (this.endedCallback) this.endedCallback();
            window.cancelAnimationFrame(this.update);
            this.$emit('close')
            // this.seek(0)
            // TweenMax.fromTo(this.$el, 1, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, delay: 1, onComplete: () => {
            // }})
        },
        mute() {
            if (!this.player) return;
            if (this.player.isMuted()) {
                this.player.unMute();
            } else {
                this.player.mute();
            }
        },
        secsToTime(n) {
            const minutes = String(Math.floor(n / 60));
            const seconds = String(Math.floor(n % 60)).padStart(2, "0");

            return `${minutes}:${seconds}`;
        },
    },
    beforeDestroy(){
        this.shakaPlayer?.removeEventListener("error", onErrorEvent);
        this.shakaPlayer = null
    }
};
</script>

<style lang="scss">
.video-player {
  @include set-size(100%, 100%);
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  background-color: $black;
}

.video-player__poster {
    @include set-size(100%, 100%);
    position: absolute;
    top: 0;
    left: 0;
    background-color: $black;
    @include maxWidth(1023) {
        @include set-size(auto, 100%);
        @include center-x(absolute);
    }
}

.video-player__play-icon {
    @include center(absolute);
    @include set-size(7vw, 7vw);
    z-index: 1;

    @include maxWidth(1023) {
        @include set-size(17vw, 17vw);

    }
}

.video-player__anim-container {
    @include set-size(18.2vw, auto);
    position: absolute;
    z-index: 2;
    top: 3.5vh;
    right: 4.6vw;
    filter: invert(100%);
}
.video-controls {
    @include set-size(100%, 50px);
    position: relative;
    padding: 0 6.4vw 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include center-x(absolute);
    bottom: 10px;
    z-index: 1;   
    opacity: 0;

}
.video-controls__buttons {
    padding: 3.2vw;
    .video-controls__buttons--play {
        @include set-size(32px, 32px);
        background-image: url('/assets/images/icons/gallery-play-icon-small.png');
        background-repeat: no-repeat;
        background-size: 13px 16px;
        background-position: 50% 50%;
        display: block;

        &.paused {
            background-image: url('/assets/images/icons/gallery-pause-icon-small.png');
        }
    }
    
}

.video-controls__seek {
    @include set-size(calc(100% - 6.4vw), 32px);
    position: relative;
    .video-controls__seek--bar {
        @include set-size(100%, 2px);
        @include center-y(absolute);
        background-color: rgba(255,255,255,0.5);
    }
    .video-controls__seek--track {
        @include set-size(0, 2px);
        @include center-y(absolute);
        background-color: rgba(255,255,255,1);

    }
    .video-controls__seek--button {
        @include set-size(12px, 12px);
        @include center-y(absolute);
        // background-color: $green-button;
        border-radius: 50%;
    }
}

.video-player__button-back{
    background-color: $white;
    color: $black;
    // font-family: $medium;
    font-size: 12px;
    line-height: 32px; 
    border-radius: 4px;
    display: block;
    @include set-size(90px, 32px);
    text-align: center;
    position: absolute;
    z-index: 3;
    top: 8.3vw;
    left: 5.5vw;

}

.shaka-video {
  width: 100%;

  @include maxWidth(1023) {
    height: 100%;
  }
}
</style>
