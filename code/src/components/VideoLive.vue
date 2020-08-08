<template>
    <div class="video-live">
        <section class="video-live__content">
            <div class="video-live__iframe" v-html="embedPlayer"></div>

                <!-- src="https://player.vimeo.com/video/{video_id}" -->
            <!-- <iframe 
                class="video-live__iframe"
                :src="`//www.youtube.com/embed/${videoId}?autoplay=1`"
                width="1280" 
                height="720" 
                frameborder="0" 
                title="MIS - Da Vinci Live" 
                webkitallowfullscreen 
                mozallowfullscreen 
                allowfullscreen>
            </iframe> -->
            <img class="video-live__close" src="~@/assets/images/icons/close.png" @click="hide" alt="Fechar o video da live.">
        </section>
    </div>
</template>

<script>
import axios from "axios";
import { TweenMax, Quad } from 'gsap';

export default {
    props: ['videoId'],
    data: () => ({
        embedPlayer: null
    }),
    created(){
        this.$store.dispatch('loading', true)
        axios.get(`https://vimeo.com/api/oembed.json?url=${this.$store.getters.webinarLink}&width=1280&height=720&responsive=true`)
        .then((res) => {
            const { data, status } = res
            if (status && status == 200) {
                this.$store.dispatch('loading', false)
                this.embedPlayer = data.html
            }
        }).catch(function (error) {
            // handle error
            console.log(error);
            this.$store.dispatch('loading', false)
        })
        
    },
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

            iframe {
                @include set-size(100%, 100%);
            }
            
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