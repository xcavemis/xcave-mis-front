<template>
    <div class="info-modal">
        <div class="info-modal__crop">
            <section class="info-modal__block">
                <div class="info-modal__preview">
                    <!-- <img class="info-modal__preview-image" :src="`media/images/${content.image}`" v-if="content.image" :alt="content.title"> -->
                    <canvas id="canvas-drag" class="info-modal__preview-image"></canvas>
                </div>
                <div class="info-modal__content">
                    <img class="info-modal__close" src="~@/assets/images/icons/close-info.png" @click="hide" alt="Fechar o conteúdo.">
                    <h3 class="info-modal__content-title" v-if="content.title" v-html="content.title"></h3>
                    <p class="info-modal__content-description" v-if="content.text" v-html="content.text"></p>
                    <a v-if="content.audio" href="javascript:void(0)" class="info-modal__content-play" :class="{'playing': isPlaying}" @click="togglePlay">AUDIO GUIA</a>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { TweenMax, Quad } from 'gsap';

export default {
    props: ['content'],
    data: () => ({
        isPlaying: false
    }),
    mounted(){
        this.$nextTick(()=>{
            require('@/components/pano/DragAndZoom')
        })
    },
    methods: {
        show() {
            TweenMax.set('html, body', { overflow: 'hidden' })
            TweenMax.fromTo('.info-modal', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut })
            TweenMax.fromTo('.info-modal__block', 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.3 })
            TweenMax.fromTo('.info-modal__close', 0.6, { scale: 0 }, { scale: 1, ease: Quad.easeInOut, delay: 0.8 })
        },
        hide(){
            this.$emit('stop-audio')
            TweenMax.fromTo('.info-modal__close', 0.4, { scale: 1 }, { scale: 0, ease: Quad.easeInOut })
            TweenMax.fromTo('.info-modal__block', 0.6, { y: '0%' }, { y: '100%', ease: Quad.easeInOut, delay: 0.3, onComplete: () => {
                this.$emit('close')
                TweenMax.set('html, body', { overflow: 'inherit' })
            }})
            TweenMax.fromTo('.info-modal', 0.6, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, delay: 0.3 })
            
        },
        togglePlay(){
            this.$emit(`${this.isPlaying ? 'pause' : 'play'}-audio`)
            this.isPlaying = !this.isPlaying
        },
    }    
}
</script>

<style lang="scss">
.info-modal {
    @include set-size(100vw, 100vh);
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    .info-modal__crop {
        @include set-size(65.8vw, 62.5vh);
        @include center(absolute);
        overflow: hidden;
        .info-modal__block {
            @include set-size(100%, 100%);
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            transform: translateY(100%);
            background-color: $white;

            .info-modal__preview {
                @include set-size(66.6%, 100%);
                overflow: hidden;
                position: relative;
                .info-modal__preview-image {
                    @include center(absolute);
                }
            }
            .info-modal__content {
                @include set-size(33.3%, 100%);
                padding: 60px 30px 30px 30px;
                background-color: $white;
                text-align: left;
                position: relative;
                .info-modal__content-title {
                    font-family: $gar-bold;
                    @include font-size(32);
                    color: $black;
                }

                .info-modal__content-description {
                    font-family: $got-medium;
                    @include font-size(12);
                    color: $black;
                    height: 52%;
                    overflow-x: hidden;
                    overflow-y: scroll;
                    padding-right: 30px;

                    /* width */
                    &::-webkit-scrollbar {
                     width: 3px;
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
                
                .info-modal__content-play {
                    @include set-size(162px, 32px);
                    text-indent: 47px;
                    line-height: 32px;
                    background-image: url('~@/assets/images/icons/play-info.png');
                    background-repeat: no-repeat;
                    background-size: 32px 32px;
                    background-position: 0% 50%;
                    display: block;
                    position: absolute;
                    left: 30px;
                    bottom: 30px;
                    font-family: $rob-medium;
                    @include font-size(10);
                    cursor: pointer;
                    transition: background-image 0.4s $ease-in-out;
                    color: $gray;

                    &.playing {
                        background-image: url('~@/assets/images/icons/pause-info.png');
                    }
                }

                .info-modal__close {
                    @include set-size(14px, 14px);
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    z-index: 10;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>