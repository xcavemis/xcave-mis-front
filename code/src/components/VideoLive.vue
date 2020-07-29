<template>
    <div class="video-live">
        <section class="video-live__content">

                <!-- src="https://player.vimeo.com/video/{video_id}" -->
            <iframe 
                class="video-live__iframe"
                :src="`//www.youtube.com/embed/${videoId}?autoplay=1`"
                width="1280" 
                height="720" 
                frameborder="0" 
                title="MIS - Da Vinci Live" 
                webkitallowfullscreen 
                mozallowfullscreen 
                allowfullscreen>
            </iframe>
            <img class="video-live__close" src="~@/assets/images/icons/close.png" @click="hide" alt="Fechar o video da live.">
        </section>
    </div>
</template>

<script>
import { TweenMax, Quad } from 'gsap';

export default {
    props: ['videoId'],
    methods: {
        show() {
            TweenMax.fromTo('.video-live', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut })
            TweenMax.fromTo('.video-live__iframe', 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.3 })
            TweenMax.fromTo('.video-live__close', 0.6, { scale: 0 }, { scale: 1, ease: Quad.easeInOut, delay: 0.8 })
        },
        hide(){
            TweenMax.fromTo('.video-live__close', 0.4, { scale: 1 }, { scale: 0, ease: Quad.easeInOut })
            TweenMax.fromTo('.video-live__iframe', 0.6, { y: '0%' }, { y: '100%', ease: Quad.easeInOut, delay: 0.3, onComplete: () => {
                this.$emit('close')
            }})
            TweenMax.fromTo('.video-live', 0.6, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, delay: 0.3 })
            
        },
    }    
}
</script>

<style lang="scss">
.video-live {
     @include set-size(100vw, 100vh);
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
    .video-live__content {
        // @include set-size(65.8vw, 62.5vh);
        // @include set-size(90vw, 80vh);
        @include set-size(100vw, 100vh);
        @include center(absolute);
        overflow: hidden;
        .video-live__iframe {
            @include set-size(90vw, 80vh);
            transform: translateY(100%);
            z-index: 1;
            margin: 80px auto;
            
        }
    
        .video-live__close {
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