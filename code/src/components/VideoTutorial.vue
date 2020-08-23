<template>
    <div class="video-tutorial">
        <section class="video-tutorial__content">
            <div class="modal-close-hit" @click="hide"></div>
            <iframe
                ref="videoPlayer"
                src="https://player.vimeo.com/video/448012777" 
                class="video-tutorial__iframe" 
                width="1280" 
                height="720" 
                frameborder="0" 
                allow="autoplay;" 
                allowfullscreen>
            </iframe>
            <img class="video-tutorial__close" src="~@/assets/images/icons/close.png" @click="hide" alt="Fechar o video da live."> 
        </section>
    </div>
</template>

<script>
import { TweenMax, Quad } from 'gsap';
import Player from '@vimeo/player';
export default {
    data:() => ({
        player: null,
        isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
    }),
    mounted(){
        this.$nextTick(()=>{
            this.player = new Player(this.$refs.videoPlayer, {
                loop: false,
                autoplay: true
            });
    
            this.player?.on('play', () => {});
            this.player?.on('ended', this.hide);
            this.player?.setLoop(false).then(function(loop) {});
        })
    },
    methods: {
        show() {
            TweenMax.set('.video-tutorial__iframe', { display: 'block' })
            TweenMax.set('html, body', { overflow: 'hidden' })
            TweenMax.fromTo('.video-tutorial', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut })
            TweenMax.fromTo('.video-tutorial__close', 0.6, { scale: 0 }, { scale: 1, ease: Quad.easeInOut, delay: 0.8 })
            if (this.isMobile) {
                TweenMax.fromTo('.video-tutorial__iframe', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut, delay: 0.3 })
            } else {
                TweenMax.fromTo('.video-tutorial__iframe', 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.3 })
            }
        },
        hide(){
            TweenMax.set('html, body', { overflow: 'auto' })
            TweenMax.fromTo('.video-tutorial__close', 0.4, { scale: 1 }, { scale: 0, ease: Quad.easeInOut })
            if (this.isMobile) {
                TweenMax.fromTo('.video-tutorial__iframe', 0.6, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, delay: 0.3 , onComplete: () => {
                    TweenMax.set('.video-tutorial__iframe', { display: 'none' })
                    this.$emit('close')
                }})
            } else {
                TweenMax.fromTo('.video-tutorial__iframe', 0.6, { y: '0%' }, { y: '100%', ease: Quad.easeInOut, delay: 0.3, onComplete: () => {
                    TweenMax.set('.video-tutorial__iframe', { display: 'none' })
                    this.$emit('close')
                }})
            }
            TweenMax.fromTo('.video-tutorial', 0.6, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, delay: 0.3 })
            
        },
    },
    beforeDestroy(){
        this.player?.pause().then(() => {})
        this.player?.destroy().then(function() {})
        this.player = null
    }       
}
</script>

<style lang="scss">
.video-tutorial {
    @include set-size(100vw, 100vh);
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
    .video-tutorial__content {
        // @include set-size(65.8vw, 62.5vh);
        // @include set-size(90vw, 80vh);
        @include set-size(100vw, 100vh);
        @include center(absolute);
        overflow: hidden;
        .video-tutorial__iframe {
            @include set-size(90vw, 80vh);
            transform: translateY(100%);
            z-index: 1;
            margin: 80px auto;
            min-height: 535px;
            max-width: 1060px;

            @include minWidth(1680) {
                max-width: 1280px;
            }
            @include maxWidth(768) {
                min-height: 0%;
                height: 40.5%;
                margin: 0;
                @include center(absolute);
            }
            
        }
    
        .video-tutorial__close {
            @include set-size(50px, 50px);
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 10;
            cursor: pointer;
        }
    }
}
</style>