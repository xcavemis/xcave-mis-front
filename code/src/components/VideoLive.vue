<template>
    <div class="video-live">
        <section class="video-live__content">
            <div class="modal-close-hit" @click="hide"></div>
            <!-- <div class="video-live__iframe" v-html="embedPlayer"></div> -->
            <!-- <iframe class="video-live__iframe" :src="`${$store.getters.webinarLink}/embed`" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe> -->
            <div class="embeds-container">
                <iframe ref="iframeEmbed" class="video-live__iframe" :src="`${$store.getters.webinarLink}/embed`" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                <iframe class="video-live__chat" :src="`${$store.getters.webinarLink}/chat`" width="400" height="600" frameborder="0"></iframe>
            </div>
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
        embedPlayer: null,
        conferenceSrc: null
    }),
    created(){
        // this.$store.dispatch('loading', true)
        
    },
    mounted(){
        // console.log('webinarLink', this.$store.getters.webinarLink)
        // console.log('period', this.$store.getters.period)
        this.$nextTick(()=>{
            // this.$refs.iframeEmbed.addEventListener('load', ()=>{
            //     console.log('embedLoad')
            //     this.$store.dispatch('loading', false)
            // })
            // this.buildMeeting()
        })
    },
    methods: {
        buildMeeting(){
            // console.log('webinarLink', this.$store.getters.webinarLink)
            axios.get(`https://vimeo.com/api/oembed.json?url=${this.$store.getters.webinarLink}`)
            .then((res) => {
                const { data, status } = res
                if (status && status == 200) {
                    // console.log('vimeo live res: ', res)
                    this.$store.dispatch('loading', false)
                    this.embedPlayer = data.html
                }
            }).catch(function (error) {
                // handle error
                // console.log(error);
                this.$store.dispatch('loading', false)
            })
            
        },
        show() {
            TweenMax.fromTo('.video-live', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut })
            TweenMax.fromTo('.embeds-container ', 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.3 })
            TweenMax.fromTo('.video-live__close', 0.6, { scale: 0 }, { scale: 1, ease: Quad.easeInOut, delay: 0.8 })
        },
        hide(){
            TweenMax.fromTo('.video-live__close', 0.4, { scale: 1 }, { scale: 0, ease: Quad.easeInOut })
            TweenMax.fromTo('.embeds-container ', 0.6, { y: '0%' }, { y: '100%', ease: Quad.easeInOut, delay: 0.3, onComplete: () => {
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
            @include set-size(65vw, 80vh);
            // transform: translateY(100%);
            z-index: 1;
            // margin: 80px auto;

            iframe {
                @include set-size(100% !important, 100% !important);
            }
            
        }
        .video-live__chat {
            @include set-size(25vw, 80vh);
            // transform: translateY(100%);
            z-index: 1;
            // margin: 80px auto;

            iframe {
                @include set-size(100% !important, 100% !important);
            }
            
        }

        .embeds-container {
            @include set-size(90vw, 80vh);
            transform: translateY(100%);
            margin: 80px auto;
            display: flex;
            align-content: space-around;
            align-items: center;
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