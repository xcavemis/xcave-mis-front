<template>
    <div class="video-intro">
        <section class="video-intro__content" @click="hidePlay">
            <!-- <VideoPlayerStream 
                v-on:close="onVideoEnded"
                v-on:played="onVideoIntroPlayed"
                :manifest-key="currentManifestKey"
                :poster="currentPoster"
                :controls="showControls"
                ref="videoStream"
            /> -->
            <!-- <div class="video-intro__iframe" v-html="videoSrc"></div> -->
            <iframe
                v-if="!isMobile"
                ref="videoPlayer"
                class="video-intro__iframe" 
                :src="`https://player.vimeo.com/video/448902595?app_id=122963?autoplay=1&loop=0`" 
                width="100%" 
                height="100%" 
                frameborder="0"  
                allow="autoplay"
                webkitallowfullscreen mozallowfullscreen allowfullscreen>
            </iframe>
            <iframe
                v-if="isMobile"
                ref="videoPlayer"
                class="video-intro__iframe" 
                :src="`https://player.vimeo.com/video/448904011?app_id=122963?autoplay=1&loop=0`" 
                width="100%" 
                height="100%" 
                frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>
            </iframe>
            <!-- <iframe src="https://player.vimeo.com/video/448904011?app_id=122963" width="240" height="426" frameborder="0" allow="autoplay; fullscreen" allowfullscreen title="INTRO-5V"></iframe> -->
            
            <div class="video-intro__block" :class="{'opacity-bg': playing}">
                <img class="video-intro__play" @click="play($event)" src="~@/assets/images/icons/play-big.png" alt="Iniciar o video de introdução."> 
            </div>
            <a
                class="default-button video-intro__skip-button white"
                href="javascript:void(0)"
                @click="skip"
            >PULAR INTRODUÇÃO</a>
        </section>
    </div>
</template>

<script>
import { TweenMax, Quad } from 'gsap';
import Player from '@vimeo/player';
// import VideoPlayerStream from "@/components/VideoPlayerStream";
export default {
    props: ['videoId'],
    components: {
        // VideoPlayerStream,
    },
    data: () => ({
        playing: false,
        videoSrc: '',
        videoDuration: 95,
        currentPoster: require('@/assets/images/intro-poster.jpg'),
        currentManifestKey: 'intro-final',
        showControls: false,
        isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
    }),
    mounted(){
        TweenMax.set('html, body', { cursor: 'pointer' })
        this.$nextTick(()=>{
            this.show()
            this.player = new Player(this.$refs.videoPlayer, {
                loop: false,
                autoplay: true,
                controls: false,
            });

            this.player.on('play', () => {
                // console.log('intro play')
                this.onVideoIntroPlayed()
            });
            this.player.on('ended', this.onVideoEnded);
            this.player.setLoop(false).then(function(loop) {});

            this.player.getDuration().then((seconds) => { this.videoDuration = seconds })
            // this.player.setCurrentTime(90).then(function(seconds) {})

        })
    },
    methods: {
        show() {
            TweenMax.set('html, body', { overflow: 'hidden' })
            TweenMax.set('.video-intro', { autoAlpha: 1 })
            TweenMax.set('.video-intro__play', { autoAlpha: 1 })
            // TweenMax.set('.video-intro__iframe', { y: '0%' })
        },
        hide(){
            // console.log('intro end')
            this.$store.commit("navigateToPano", 1);
            TweenMax.fromTo(this.$el, 1, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, delay: 1, onComplete: () => {
                this.$emit('close') 
                TweenMax.set('.governo-top', { zIndex: 5 })
            }})
            
        },
        onVideoIntroPlayed(){
            this.playing = true
            this.$emit('played')
            TweenMax.to('.video-intro__play', 0.6, { autoAlpha: 0, ease: Quad.easeInOut})
            if (this.$store.getters.user && this.$store.getters.user.introShow)  {
                TweenMax.to('.video-intro__skip-button', 0.6, { display: 'block', autoAlpha: 1, delay: 3 })
            }
        },  
        hidePlay(){
            TweenMax.to('.video-intro__play', 0.6, { autoAlpha: 0, ease: Quad.easeInOut})
        },
        play(e){
            this.player.play().then(() => {
                this.hidePlay()
            })
        },
        skip(e){
            // this.$refs?.videoStream?.skip()
            TweenMax.to('.video-intro__skip-button', 0.4, { autoAlpha: 0, onComplete: ()=>{
                this.player.pause().then(() => {
                    this.player.destroy().then(function() {})
                })
            }})
            this.hide()
            
            // this.player.setCurrentTime(this.videoDuration-1)
        },
        onVideoEnded(e) {
            this.hide()
        }
    },
    beforeDestroy(){
        this.player?.destroy().then(function() {})
        this.player = null
    }    
}
</script>

<style lang="scss">
.video-intro {
    @include set-size(100vw, calc(100vh - 70px));
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 1);
    z-index: 10;
    .video-intro__content {
        @include set-size(100vw, 100vh);
        padding: 0;
        overflow: hidden;
        position: relative;
        cursor: pointer;

        .video-intro__skip-button {
            position: fixed;
            right: 15px;
            bottom: 15px;
            z-index: 500;
            display: none;
            opacity: 0;
            // @include font-size(10);
            padding: 8px 15px;
        }

        
        .video-intro__iframe {
            @include set-size(100vw, 85vh);
            transform: translateY(100%);
            z-index: 0;
            box-sizing: border-box;
            width: 177.77777778vh;
            height: 56.25vw;
            min-width: 100%;
            min-height: 100%;
            @include center(absolute);
            opacity: 1;
        }

        @include maxWidth(1023) {
            height: 100%;

            .video-intro__iframe {
                @include set-size(100%, 100%);
            }
        }
        @include maxWidth(414) {

            .video-intro__iframe {
                margin-top: -5%;
                @include set-size(105%, 120%);
            }
        }

        .video-intro__block {
            @include set-size(100%, 100%);
            position: fixed;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 1;
            transition: background-color 1s linear;
            pointer-events: none;
            touch-action: none;
            
            &.opacity-bg {
                background-color: rgba(0,0,0,0);
                pointer-events: all;
                touch-action: all;
            }

            .video-intro__play {
                @include set-size(80px, 80px);
                @include center(absolute);
                z-index: 10;
                cursor: pointer;
                opacity: 0;
                @include maxWidth(1023) {
                    pointer-events: none;
                    touch-action: none;
                }
            }
        }
    }
}
</style>