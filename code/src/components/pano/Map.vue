<template>
    <div class="map-comp">
        <div class="modal-close-hit" @click="hide"></div>
        <!-- <img class="map-comp__close" src="~@/assets/images/icons/close-info.png" @click="close" alt="Fechar o conteúdo."> -->
        <div class="map-comp__crop" ref="mapCrop">
            <div class="map-comp__content">
                <div class="map-overflow" ref="mapContent">
                    <img src="~@/assets/images/map-bg.jpg" alt="" class="map-comp__bg">
                    <div class="map-comp__markers">
                        <div class="map-comp__marker" 
                            v-for="(mark, idx) of markers" 
                            :key="idx" 
                            @click="goTo(idx + 1)"
                            :style="{
                                left: mark.x,
                                top: mark.y
                            }"
                        >
                            <img v-if="mark.type == 'dark'" class="map-comp__marker--icon" src="~@/assets/images/icons/map-marker-dark.png" :alt="mark.title">
                            <img v-if="mark.type == 'light'" class="map-comp__marker--icon" src="~@/assets/images/icons/map-marker-light.png" :alt="mark.title">
                            <span class="map-comp__marker--title" :class="mark.class">{{mark.title}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="map-comp__text">
                <img class="info-modal__close" src="~@/assets/images/icons/close-info.png" @click="hide" alt="Fechar o conteúdo.">
                <h3 class="map-comp__text-title">MAPA INTERATIVO</h3>
                <p class="map-comp__text-description">Lorem ipsim</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapData } from '@/data/map';
import { TweenMax, Quad } from 'gsap';
import Panzoom from '@panzoom/panzoom'
export default {
    props: ['text'],
    data: () => ({
        zoomEl: null,
        previewElm: null,
        markers: [],
        isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    }),
    mounted(){
        this.markers = mapData.markers
        
    },
    methods: {
        show(){
            TweenMax.set('html, body', { overflow: 'hidden' })
            TweenMax.to(this.$el, 0.6, { autoAlpha: 1, ease: Quad.easeInOut } )  
            TweenMax.fromTo(this.$refs.mapCrop, 0.6, { y: '150%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.3, onComplete: ()=>{
                this.$nextTick(()=>{
                    this.panzoom = Panzoom(this.$refs.mapContent, {
                        maxScale: 1.8,
                        // minScale: 1,
                        // startScale: 1,
                        contain: 'outside',
                    })
                    // window.addEventListener('wheel', this.panzoom.zoomWithWheel)
                    if (!this.isMobile) {
                        this.$el.addEventListener('wheel', this.mouseWheelEvent)
                    }
                    // TweenMax.to('.map-comp__content', 0.6, { autoAlpha: 1, ease: Quad.easeInOut})
                })
            }})  
        },
        hide(){
            // TweenMax.fromTo(this.$refs.mapContent, 0.6, { y: '0%' }, { y: '100%', ease: Quad.easeInOut } )  
            TweenMax.to(this.$el, 0.6, { autoAlpha: 0, ease: Quad.easeInOut, onComplete: ()=>{
                this.$emit('map-close')
                TweenMax.set('html, body', { overflow: 'inherit' })
            }})
        },
        mouseWheelEvent(event) {
            console.log('mousewheel')
            this.panzoom.zoomWithWheel(event)
            event.preventDefault();
        },
        goTo(id) {
            this.$emit('navigate-to', id)
            this.close()
        },
        close(){
            this.hide()
        }
    },
    beforeDestroy(){
        this.panzoom?.destroy()
        this.panzoom = null
        this.$refs.mapContent?.removeEventListener('wheel', this.mouseWheelEvent)
    }
}
</script>
<style lang="scss">
.map-comp {
    @include set-size(100%, 100vh);
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.9);
    z-index: 1000;

    .map-comp__close {
        @include set-size(32px, 32px);
        position: fixed;
        top: 15px;
        right: 15px;
        z-index: 10;
        cursor: pointer;
        padding: 5px;
        background-color: rgba(0, 0, 0, 1);
        border-radius: 50%;
        border: 2px solid $gray;
    }

    .map-comp__crop {
        // @include set-size(65.8vw, 62.5vh);
        @include set-size(892px, 579px);
        @include center(absolute);
        overflow: hidden;
        min-height: 579px;
        max-width: 1060px;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        // overflow: hidden;
        // border: 1px solid $gray;
        // overflow-x: hidden;
        // overflow-y: scroll;

        /* width */
        &::-webkit-scrollbar {
            width: 10px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
            background: transparent; 
        }
        
        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: #cccccc; 
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
            background: #e4e4e4; 
        }
    }
    .map-comp__content {
        @include set-size(558px, 100%);
        background-color: #333;

        .map-overflow {
            overflow: hidden;
            position: relative;
        }
        .map-comp__bg {
            @include set-size(100%, auto);
            display: block;
        }

        .map-comp__markers {
            @include set-size(100%, 100%);
            @include center(absolute);
            .map-comp__marker {
                @include set-size(16px, 16px);
                position: absolute;
                transform: translateX(-50%) translateY(-50%);
                cursor: pointer;
                z-index: 0;
                .map-comp__marker--title {
                    opacity: 0;
                    color: $white;
                    background-color: rgba(0,0,0,0.5);
                    padding: 4px 7px;
                    transition: opacity 0.4s $ease-in-out;
                    border-radius: 4px;
                    font-family: $rob-regular;
                    @include center-y(absolute);
                    @include font-size(14);
                    margin-left: 7px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    touch-action: none;
                    pointer-events: none;

                    &.invert {
                        margin-right: 23px;
                        right: 0;
                    }
                }

                .map-comp__marker--icon {
                    width: 100%;
                    margin: 0 auto;
                    // box-shadow: 0px 0px 33px rgba(0, 0, 0, 0.7);
                    border-radius: 50%;
                }

                &:hover {
                    z-index: 1000;
                    .map-comp__marker--title {
                        opacity: 1;
                    }
                }
            }
        }
    }

    .map-comp__text {
        @include set-size(344px, 100%);
        padding: 40px 30px 30px 30px;
        background-color: $white;
        text-align: left;
        position: relative;
        .map-comp__text-title {
            font-family: $traj-bold;
            @include font-size(24);
            color: $black;
            margin-top: 0;
        }

        .map-comp__text-description {
            font-family: $mont-medium;
            @include font-size(13);
            line-height: 20px;
            color: $black;
            height: 72%;
            overflow-x: hidden;
            overflow-y: scroll;
            padding-right: 30px;

            // @include minHeight(730) {
            //     height: 65%;
            // }

            h2 {
                margin: 0;
                font-size: 16px;
            }

            strong {
                font-family: $mont-regular;
            }
        }
        .info-modal__close {
            @include set-size(20px, 20px);
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 10;
            cursor: pointer;
            transition: transform 0.4s $ease-in-out;
            
            &:hover {
                transform: rotate(180deg) !important;
            }
        }
    }

    .map-comp__hit-container {
        @include set-size(70vw, 80vh);
        @include center(absolute);
        z-index: 2;
        border: 2px solid $gray;
    }
}
</style>