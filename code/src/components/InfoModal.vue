<template>
    <div class="info-modal">
        <div class="info-modal__crop">
            <section class="info-modal__block">
                <div class="info-modal__preview">
                    <img class="info-modal__preview-image" ref="imageToDrag" :src="`https://hml.exposicaodavinci500anos.com.br/assets/obras/${imgSrc}`" v-if="imgSrc" :alt="content.title">
                    <!-- <canvas id="canvas-drag" class="info-modal__preview-image"></canvas> -->
                    <div class="info-modal__preview-instructions">
                        <img class="info-modal__preview-icon" src="~@/assets/images/icons/hand.png" @click="hide" alt="CLIQUE E ARRASTE PARA VISUALIZAR">
                        <p class="info-modal__preview-text">CLIQUE E ARRASTE<br>PARA VISUALIZAR</p>
                    </div>
                    <ul v-if="content.image && content.image.length > 1" class="info-modal__preview-buttons">
                        <li class="info-modal__preview-button" v-for="idx of content.image.length" :key="idx" @click="changeImage(idx)"></li>
                    </ul>
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
// import { dragAndZoom } from '@/components/pano/DragAndZoom';
import { view } from '@/components/pano/DragAndZoom';
    // require('@/components/pano/DragAndZoom')

export default {
    props: ['content'],
    data: () => ({
        isPlaying: false,
        mouse: {x: 0, y: 0, oldX: 0, oldY: 0, button: false},
        zoomEl: null,
        previewElm: null,
        imgSrc: null,
        isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    }),
    mounted(){
        console.log(this.content.image)
        this.imgSrc = this.content.image[0]
        this.$nextTick(()=>{
            this.$refs.imageToDrag.addEventListener('load', this.setInitialSize)
            this.previewElm = this.$el.querySelector('.info-modal__preview')
            // const _canvas = this.$el.querySelector('#canvas-drag')
            // dragAndZoom(
            //     _canvas, 
            //     {
            //         w: previewElm.offsetWidth,
            //         h: previewElm.offsetHeight
            //     },
            //     `media/images/${this.content.image}`
            // )
            this.zoomEl = this.$el.querySelector('.info-modal__preview-image')
            if (!this.isMobile) {
                this.previewElm.addEventListener('mouseover', this.onOverPreview, false)
                this.previewElm.addEventListener('mouseout', this.onOutPreview, false)
                this.previewElm.addEventListener("mousemove", this.mouseEvent, {passive: false});
                this.previewElm.addEventListener("mousedown", this.mouseEvent, {passive: false});
                this.previewElm.addEventListener("mouseup", this.mouseEvent, {passive: false});
                this.previewElm.addEventListener("mouseout", this.mouseEvent, {passive: false});
                this.previewElm.addEventListener("wheel", this.mouseWheelEvent, {passive: false});
            } else {
                
            }
        })
    },
    methods: {
        changeImage(id) {
            this.imgSrc = this.content.image[id-1]
            this.$nextTick(()=>{
                this.$refs.imageToDrag?.addEventListener('load', this.setInitialSize)
            })
        },
        setInitialSize(){
            if (this.$refs.imageToDrag.offsetWidth > this.$refs.imageToDrag.offsetHeight) {
                this.$refs.imageToDrag.style.width = 'auto'
                this.$refs.imageToDrag.style.height = '130%'
            } else if (this.$refs.imageToDrag.offsetWidth < this.$refs.imageToDrag.offsetHeight) {
                this.$refs.imageToDrag.style.width = '130%'
                this.$refs.imageToDrag.style.height = 'auto'
            }
        },
        mouseEvent(event) {
            if (event.type === "mousedown") { this.mouse.button = true }
            if (event.type === "mouseup" || event.type === "mouseout") { this.mouse.button = false }
            this.mouse.oldX = this.mouse.x;
            this.mouse.oldY = this.mouse.y;
            this.mouse.x = event.pageX;
            this.mouse.y = event.pageY;
            if(this.mouse.button) { // pan
                this.zoomEl.style.transition = `transform 0s linear`;
                view.pan({x: this.mouse.x - this.mouse.oldX, y: this.mouse.y - this.mouse.oldY});
                view.applyTo(this.zoomEl);
            }
            event.preventDefault();
        },
        mouseWheelEvent(event) {
            const x = event.offsetX - (this.zoomEl.offsetWidth / 2);
            const y = event.offsetY - (this.zoomEl.offsetHeight / 2);
            this.zoomEl.style.transition = `transform 0.2s linear`;
            if (event.deltaY < 0) { 
                view.scaleAt({x, y}, 1.1, 0.56, 6.5);
                view.applyTo(this.zoomEl);
            } else { 
                view.scaleAt({x, y}, 1 / 1.1, 0.56, 6.5);
                view.applyTo(this.zoomEl);
            }
            
            event.preventDefault();
        },
        onOverPreview(e){
            TweenMax.to('.info-modal__preview-instructions', 0.6, { autoAlpha: 0, ease: Quad.easeInOut, onComplete: ()=>{
                TweenMax.set('.info-modal__preview-instructions', { display: 'none' })
            }})
        },
        onOutPreview(e){
            TweenMax.set('.info-modal__preview-instructions', { display: 'block' })
            TweenMax.to('.info-modal__preview-instructions', 0.4, { autoAlpha: 1, ease: Quad.easeInOut })
        },
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
    },
    beforeDestroy(){
        this.mouse = {x: 0, y: 0, oldX: 0, oldY: 0, button: false}
        this.zoomEl = null
        view.reset()
        this.previewElm.removeEventListener('mouseover', this.onOverPreview, false)
        this.previewElm.removeEventListener('mouseout', this.onOutPreview, false)
        this.previewElm.removeEventListener("mousemove", this.mouseEvent, {passive: false});
        this.previewElm.removeEventListener("mousedown", this.mouseEvent, {passive: false});
        this.previewElm.removeEventListener("mouseup", this.mouseEvent, {passive: false});
        this.previewElm.removeEventListener("mouseout", this.mouseEvent, {passive: false});
        this.previewElm.removeEventListener("wheel", this.mouseWheelEvent, {passive: false});
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
                background-color: #333;
                .info-modal__preview-image {
                    @include set-size(auto, auto);
                    // @include set-size(100%, auto);
                    // @include center(absolute);
                    pointer-events: none;
                }

                .info-modal__preview-instructions{
                    @include center(absolute);
                    
                    .info-modal__preview-icon{
                        @include set-size(40px, auto);
                        margin: 0 auto;
                    }

                    .info-modal__preview-text{
                        font-family: $rob-medium;;
                        @include font-size(10);
                        color: $white;
                        text-align: center;
                        margin: 12px auto 0 auto;
                        text-shadow: 0px 0px 4px #000000;
                    }

                }

                .info-modal__preview-buttons{
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 50px;
                    background-color: rgba(0,0,0,0.2);
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    .info-modal__preview-button{
                        width: 20px;
                        height: 20px;
                        background-color: $orange;
                        border-radius: 50%;
                        margin: 15px 5px;
                        cursor: pointer;
                        transition: opacity 0.4s $ease-in-out;
                        opacity: 1;
                        &:hover {
                            opacity: 0.7;
                        }
                    }
                    
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
                    @include font-size(15);
                    line-height: 17px;;
                    color: $black;
                    height: 52%;
                    overflow-x: hidden;
                    overflow-y: scroll;
                    padding-right: 30px;

                    h2 {
                        margin: 0;
                        font-size: 16px;
                    }

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

        @include maxWidth(1024) {
            @include set-size(95vw, 70vh);

            .info-modal__block {
                justify-content: space-around;
                 align-items: flex-start;
                 flex-wrap: wrap;
                 overflow-y: scroll;
                .info-modal__preview {
                    width: 100%;
                }

                .info-modal__content {
                    width: 100%;
                    padding: 5vw;

                    .info-modal__close {
                        position: fixed;
                    }
                }
            }
        }
    }
}
</style>