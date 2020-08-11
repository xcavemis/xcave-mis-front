<template>
    <div class="video-intro">
        <section class="video-intro__content">
            <iframe
                ref="videoPlayer"
                class="video-intro__iframe" 
                :src="`https://player.vimeo.com/video/${videoId}`" 
                width="100%" 
                height="100%" 
                frameborder="0"  
                allow="autoplay"
                allowfullscreen>
            </iframe>
            <div class="video-intro__block" :class="{'opacity-bg': playing}">
                <img class="video-intro__play" @click="play" src="~@/assets/images/icons/play-big.png" alt="Iniciar o video de introdução."> 
            </div>
        </section>
    </div>
</template>

<script>
import { TweenMax, Quad } from 'gsap';
import Player from '@vimeo/player';
export default {
    props: ['videoId'],
    data: () => ({
        playing: false
    }),
    mounted(){
        TweenMax.set('html, body', { cursor: 'pointer' })
        this.$nextTick(()=>{
            this.show()
            this.player = new Player(this.$refs.videoPlayer, {
                loop: false,
                autoplay: true
            });

            this.player.on('play', () => {
                
                
            });
            this.player.on('ended', this.onVideoEnded);
            this.player.setLoop(false).then(function(loop) {
            });
            // this.player.setCurrentTime(90).then(function(seconds) {})

            // this.player.getVideoTitle().then(function(title) {
            //     console.log('title:', title);
            // });
        })
    },
    methods: {
        show() {
            TweenMax.set('html, body', { overflow: 'hidden' })
            TweenMax.set('.video-intro', { autoAlpha: 1 })
            TweenMax.set('.video-intro__play', { autoAlpha: 1 })
            TweenMax.set('.video-intro__iframe', { y: '0%' })
        },
        hide(){
            this.$store.commit("navigateToPano", 1);
            TweenMax.fromTo(this.$el, 1, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, delay: 1, onComplete: () => {
                this.$emit('close')
            }})
            
        },
        play(e){
            this.playing = true
            this.player.play()
            TweenMax.to('.video-intro__play', 0.6, { autoAlpha: 0, ease: Quad.easeInOut })
            this.$emit('played')
        },
        onVideoEnded(e) {
            this.hide()
        }
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
        }

        .video-intro__block {
            @include set-size(100%, 100%);
            position: fixed;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 1;
            transition: background-color 1s linear;
            &.opacity-bg {
                background-color: rgba(0,0,0,0);
            }

            .video-intro__play {
                @include set-size(80px, 80px);
                @include center(absolute);
                z-index: 10;
                cursor: pointer;
                opacity: 0;
                // pointer-events: none;
                // touch-action: none;
            }
        }
    }
}
</style>