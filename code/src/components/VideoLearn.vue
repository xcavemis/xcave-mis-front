<template>
    <div class="video-learn">
        <section class="video-learn__content">
            <iframe
                class="video-learn__iframe" 
                :src="`https://player.vimeo.com/video/${videoId}`" 
                width="1280" 
                height="720" 
                frameborder="0" 
                allow="autoplay; 
                fullscreen" 
                allowfullscreen>
            </iframe>
            <!-- <iframe
                class="video-learn__iframe"
                :src="`//www.youtube.com/embed/${videoId}?autoplay=1&rel=0`"
                width="1280" 
                height="720" 
                frameborder="0" 
                title="MIS - Da Vinci Live" 
                webkitallowfullscreen 
                mozallowfullscreen 
                allowfullscreen>
            </iframe> -->
            <img class="video-learn__close" src="~@/assets/images/icons/close.png" @click="hide" alt="Fechar o video da live."> 
        </section>
    </div>
</template>

<script>
import { TweenMax, Quad } from 'gsap';

export default {
    props: ['videoId'],
    methods: {
        show() {
            TweenMax.set('.video-learn__iframe', { display: 'block' })
            TweenMax.set('html, body', { overflow: 'hidden' })
            TweenMax.fromTo('.video-learn', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut })
            TweenMax.fromTo('.video-learn__iframe', 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.3 })
            TweenMax.fromTo('.video-learn__close', 0.6, { scale: 0 }, { scale: 1, ease: Quad.easeInOut, delay: 0.8 })
        },
        hide(){
            TweenMax.set('html, body', { overflow: 'auto' })
            TweenMax.fromTo('.video-learn__close', 0.4, { scale: 1 }, { scale: 0, ease: Quad.easeInOut })
            TweenMax.fromTo('.video-learn__iframe', 0.6, { y: '0%' }, { y: '100%', ease: Quad.easeInOut, delay: 0.3, onComplete: () => {
                TweenMax.set('.video-learn__iframe', { display: 'none' })
                this.$emit('close')
            }})
            TweenMax.fromTo('.video-learn', 0.6, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, delay: 0.3 })
            
        },
    }    
}
</script>

<style lang="scss">
.video-learn {
    @include set-size(100vw, 100vh);
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
    .video-learn__content {
        // @include set-size(65.8vw, 62.5vh);
        // @include set-size(90vw, 80vh);
        @include set-size(100vw, 100vh);
        @include center(absolute);
        overflow: hidden;
        .video-learn__iframe {
            @include set-size(90vw, 80vh);
            transform: translateY(100%);
            z-index: 1;
            margin: 80px auto;
            
        }
    
        .video-learn__close {
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