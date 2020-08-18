<template>
    <div class="video-pano">
        <section class="video-pano__content">
            <div class="modal-close-hit" @click="hide"></div>
            <div class="video-mask">
                <iframe 
                    class="video-pano__iframe"
                    :src="`${assets_path}/assets/videos/${videoId}/index.html?skip-loading`"
                    width="1280" 
                    height="720" 
                    frameborder="0" 
                    title="MIS - Da Vinci Live" 
                    webkitallowfullscreen 
                    mozallowfullscreen 
                    allowfullscreen>
                </iframe>
            </div>
            <img class="video-pano__close" src="~@/assets/images/icons/close.png" @click="hide" alt="Fechar o video da live."> 
        </section>
    </div>
</template>

<script>
import { TweenMax, Quad } from 'gsap';

export default {
    props: ['videoId'],
    data: () => ({
        assets_path: process.env.VUE_APP_ASSETSPATH,
    }),
    methods: {
        show() {
            TweenMax.set('html, body', { overflow: 'hidden' })
            TweenMax.fromTo('.video-pano', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut })
            TweenMax.fromTo('.video-pano__iframe', 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.3 })
            TweenMax.fromTo('.video-pano__close', 0.6, { scale: 0 }, { scale: 1, ease: Quad.easeInOut, delay: 0.8 })
        },
        hide(){
            TweenMax.set('html, body', { overflow: 'auto' })
            TweenMax.fromTo('.video-pano__close', 0.4, { scale: 1 }, { scale: 0, ease: Quad.easeInOut })
            TweenMax.fromTo('.video-pano__iframe', 0.6, { y: '0%' }, { y: '100%', ease: Quad.easeInOut, delay: 0.3, onComplete: () => {
                this.$emit('close')
            }})
            TweenMax.fromTo('.video-pano', 0.6, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, delay: 0.3 })
            
        },
    }    
}
</script>

<style lang="scss">
.video-pano {
     @include set-size(100vw, 100vh);
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.95);
    z-index: 10;
    .video-pano__content {
        // @include set-size(65.8vw, 62.5vh);
        // @include set-size(90vw, 80vh);
        @include set-size(100vw, 100vh);
        @include center(absolute);
        overflow: hidden;

        .video-mask {
            @include set-size(90vw, 80vh);
            overflow: hidden;
            margin: 80px auto;

             @include maxWidth(1023) {
                @include set-size(100vw, 100vh);
                margin-top: 0vh;
            }
        }
        .video-pano__iframe {
            @include set-size(90vw, 88vh);
            transform: translateY(100%);
            z-index: 1;
            margin-top: -8vh;

            @include maxWidth(1023) {
                @include set-size(100vw, 100vh);
                margin-top: 0vh;
            }
        }
    
        .video-pano__close {
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