<template>
    <div class="video-live">
        <section class="video-live__content">
            <div class="modal-close-hit" @click="hide"></div>
            <!-- <div class="video-live__iframe" v-html="embedPlayer"></div> -->
            <div class="video-live__iframe" ref="iframeContainer"></div>

                <!-- src="https://player.vimeo.com/video/{video_id}" -->
            <!-- <iframe 
                v-if="conferenceSrc"
                class="video-live__iframe"
                :src="conferenceSrc"
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
        embedPlayer: null,
        conferenceSrc: null
    }),
    created(){
        this.$store.dispatch('loading', true)
        // axios.get(`https://api.clickmeeting.com/v1/conferences/${this.$store.getters.webinarLink}`)
        // https://embed.clickmeeting.com/embed_conference.html?r=1714776743922933
        // https://api.clickmeeting.com/v1/conferences/747181165
       
        // axios.get(`https://api.clickmeeting.com/v1/conferences/active`, {
        //     headers: {
        //         'X-Api-Key': 'us3c6da3157287163fa7ad5ca97e3cda1077a6a44b',
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // })
        // .then((res) => {
        //     const { data, status } = res
        //     if (status && status == 200) {
        //         res.data.map(data => {
        //             let { room_pin } = data
        //             if (room_pin == this.videoId) {
        //                 this.buildMeeting(room_pin)
        //                 return
        //             }
        //         })
        //         // this.embedPlayer = data.html
        //     }
        // }).catch((error) => {
        //     // handle error
        //     console.log(error);
        //     this.$store.dispatch('loading', false)
        // })
        // axios.get(`https://vimeo.com/api/oembed.json?url=${this.$store.getters.webinarLink}`)
        // .then((res) => {
        //     const { data, status } = res
        //     if (status && status == 200) {
        //         this.$store.dispatch('loading', false)
        //         this.embedPlayer = data.html
        //     }
        // }).catch(function (error) {
        //     // handle error
        //     console.log(error);
        //     this.$store.dispatch('loading', false)
        // })
        
    },
    mounted(){
        this.$nextTick(()=>{
            this.buildMeeting(this.videoId)
        })
    },
    methods: {
        buildMeeting(room_pin) {
            const _cc_obj = document.createElement ( "iframe" );
            _cc_obj.id = "clickmeetingFlashroomIframe";
            _cc_obj.src = `https://xcavelive.clickmeeting.com/${room_pin}?popup=off&lang=pt&xlang=pt`;
            _cc_obj.frameBorder = "0";
            _cc_obj.allow = "microphone; camera; fullscreen; autoplay";
            _cc_obj.allowfullscreen = "true";
            _cc_obj.webkitallowfullscreen = "true";
            _cc_obj.mozallowfullscreen = "true";
            _cc_obj.oallowfullscreen  = "true";
            _cc_obj.msallowfullscreen = "true";
            _cc_obj.style.border = "none";
            _cc_obj.width = "1280";
            _cc_obj.height = "720";
            _cc_obj.style.display = "block";

            if( typeof(__cm_room_width) != "undefined" ) _cc_obj.width = __cm_room_width;
            if( typeof(__cm_room_height) != "undefined" ) _cc_obj.height = __cm_room_height;
            _cc_obj.onload = ()=> {
                this.$store.dispatch('loading', false)
            }
            this.$refs.iframeContainer.appendChild(_cc_obj)
        },
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
                @include set-size(100% !important, 100% !important);
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