<template>
    <div class="info-modal">
        <div class="modal-close-hit" @click="hide"></div>
        <div class="info-modal__crop">
            <section class="info-modal__block">
                <div class="info-modal__preview">
                    <img class="info-modal__preview-image" @click="removeInstructions" ref="imageToDrag" :src="`${assets_path}/assets/obras/${imgSrc}`" v-if="imgSrc" :alt="content.title">
                    <!-- <canvas id="canvas-drag" class="info-modal__preview-image"></canvas> -->
                    <div class="info-modal__preview-instructions">
                        <img class="info-modal__preview-icon" src="~@/assets/images/icons/hand.png" @click="hide" alt="CLIQUE E ARRASTE PARA VISUALIZAR">
                        <p class="info-modal__preview-text">CLIQUE E ARRASTE<br>PARA VISUALIZAR</p>
                    </div>
                    <div class="info-modal__controls" v-if="!isMobile">
                        <img
                            ref="zoomOutBtn"
                            class="info-modal__controls__button-icon"
                            alt="Afastar imagem"
                            @mouseleave="zoomOut($event)"
                            @mousedown="zoomOut($event)"
                            @mouseup="zoomOut($event)"
                            src="~@/assets/images/icons/zoom-out.png"
                        />
                        <input ref="rangeZoom" class="info-modal__controls__range-input" type="range" min="1" max="2" step="0.05" value="0"  v-model="sliderZoom">
                        <img
                            ref="zoomInBtn"
                            class="info-modal__controls__button-icon"
                            alt="Aproximar imagem"
                            @mouseleave="zoomIn($event)"
                            @mousedown="zoomIn($event)"
                            @mouseup="zoomIn($event)"
                            src="~@/assets/images/icons/zoom-in.png"
                        />
                    </div>
                    <div class="info-modal__preview-prev" v-if="content.image.length > 1 && curreImgIdx != 0" @click="prevImage"></div>
                    <div class="info-modal__preview-next" @click="nextImage" v-if="content.image.length > 1 &&  curreImgIdx != content.image.length - 1"></div>
                    <Loading v-if="imageLoading" />
                </div>
                <div class="info-modal__content">
                    <img v-if="!isMobile" class="info-modal__close" src="~@/assets/images/icons/close-info.png" @click="hide" alt="Fechar o conteúdo.">
                    <img v-if="isMobile" class="info-modal__close" src="~@/assets/images/icons/close.png" @click="hide" alt="Fechar o conteúdo.">
                    <h3 class="info-modal__content-title" v-if="content.title" v-html="content.title"></h3>
                    <p class="info-modal__content-description" v-if="content.text" v-html="content.text"></p>
                    <a v-if="content.audio" href="javascript:void(0)" class="info-modal__content-play" :class="{'playing': isPlaying}" @click="togglePlay">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
                            <path id="circle" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" d="M50,2.9L50,2.9C76,2.9,97.1,24,97.1,50v0C97.1,76,76,97.1,50,97.1h0C24,97.1,2.9,76,2.9,50v0C2.9,24,24,2.9,50,2.9z"/>
                        </svg>
                        <div class="loader-2 center" v-if="audioLoading"><span></span></div>
                        AUDIO GUIA
                    </a>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { TweenMax, Quad } from 'gsap';
import Panzoom from '@panzoom/panzoom';
import Loading from '@/components/Loading';

export default {
    props: ['content'],
    components: {
        Loading
    },
    data: () => ({
        isPlaying: false,
        mouse: {x: 0, y: 0, oldX: 0, oldY: 0, button: false},
        zoomEl: null,
        assets_path: process.env.VUE_APP_ASSETSPATH,
        previewElm: null,
        imgSrc: null,
        curreImgIdx: 0,
        pressedTimer: 0,
        sliderZoom: 0,
        circle: null,
        circleLength: 0,
        isInstructions: true,
        audioLoading: false,
        imageLoading: true,
        isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    }),
    watch: {
        sliderZoom: function(val, old) {
            // console.log('sliderZoom', val)
        },
        '$store.getters.audioTime': function(val, old) {
            if (val != old) {
                let calc = this.circleLength - ( val * this.circleLength );
                if (calc > 0) {
                    this.audioLoading = false
                }
                this.circle.setAttribute('stroke-dashoffset', calc)
            }
        },
        '$store.getters.audio_end': function(val, old) {
            if (val != old && val == true) {
                this.isPlaying = false
            }
        }
    },
    mounted(){
        this.imgSrc = this.content.image[0]
        setTimeout(this.removeInstructions, 3000)
        this.$nextTick(()=>{
            this.circle = document.getElementById('circle')
            if (this.circle) {

                this.circleLength = this.circle.getTotalLength()
                this.circle.setAttribute('stroke-dasharray', this.circleLength)
                this.circle.setAttribute('stroke-dashoffset', this.circleLength)
            }

            this.$refs.imageToDrag.addEventListener('load', this.onImageLoaded)
            this.previewElm = this.$el.querySelector('.info-modal__preview')
            if (!this.isMobile) {
                // this.previewElm.addEventListener('mouseover', this.onOverPreview, false)
                // this.previewElm.addEventListener('mouseout', this.onOutPreview, false)
                //  this.$refs.imageToDrag.addEventListener('click', this.removeInstructions, false)
            } else {
                // this.previewElm.addEventListener('touchstart', this.removeInstructions, false)
            }
        })
    },
    methods: {
        removeInstructions(){
            this.isInstructions = false
            TweenMax.to('.info-modal__preview-instructions', 0.6, { autoAlpha: 0, ease: Quad.easeInOut, onComplete: ()=>{
                TweenMax.set('.info-modal__preview-instructions', { display: 'none' })
            }})
        },
        onImageLoaded(){
            this.setInitialSize()
            this.panzoom = Panzoom(this.$refs.imageToDrag, {
                maxScale: 2,
                minScale: 1,
                // startX:-this.$refs.imageToDrag.offsetWidth / 2,
                // startY:-this.$el.offsetHeight / 2,
                contain: 'outside',
            })
            this.$refs.imageToDrag.addEventListener('panzoomchange', this.panzoomChange)
            
            // window.addEventListener('wheel', this.panzoom.zoomWithWheel)
            if (!this.isMobile) {
                this.previewElm.addEventListener('wheel', this.mouseWheelEvent)
                this.$refs.rangeZoom?.addEventListener('input', this.inputChange)
            }
        },
        panzoomChange(event) {
            if (this.isInstructions && (event.detail.x != 0 || event.detail.y != 0 || event.detail.scale != 1)) this.removeInstructions()
            // console.log(event.detail) // => { x: 0, y: 0, scale: 1 }
        },
        zoomIn(e){
            if (e.type == "mousedown") {
                clearInterval(this.pressedTimer);
                this.pressedTimer = setInterval(() => {
                    if (this.panzoom.getScale() > 2) return
                    this.panzoom?.zoom(this.panzoom.getScale() + 0.01, { animate: true })
                    this.sliderZoom = this.panzoom.getScale()
                });
            } else {
                clearInterval(this.pressedTimer);
            }
        },
        zoomOut(e){
            if (e.type == "mousedown") {
                clearInterval(this.pressedTimer);
                this.pressedTimer = setInterval(() => {
                    if (this.panzoom.getScale() < 1) return
                    this.panzoom?.zoom(this.panzoom.getScale() - 0.01, { animate: true })
                    this.sliderZoom = this.panzoom.getScale()
                });
            } else {
                clearInterval(this.pressedTimer);
            }
        },
        inputChange(event) {
            this.panzoom?.zoom(event.target.valueAsNumber, { animate: true })
        },
        nextImage() {
            if (this.curreImgIdx < this.content.image.length) this.curreImgIdx++
            this.updateSrc()
        },
        prevImage() {
            if (this.curreImgIdx > 0) this.curreImgIdx--
            this.updateSrc()
        },
        updateSrc(){
            this.imageLoading = true
            this.$refs?.imageToDrag?.removeEventListener('load', this.setInitialSize)
            TweenMax.to(this.$refs.imageToDrag, 0.4, { autoAlpha: 0, ease: Quad.easeInOut, onComplete: ()=>{
                this.imgSrc = this.content.image[this.curreImgIdx]
                this.$nextTick(()=>{
                    this.panzoom.reset()
                    this.sliderZoom = this.panzoom.getScale()
                    this.$refs.imageToDrag?.addEventListener('load', this.setInitialSize)
                })
            }})
        },
        setInitialSize(){
            if (this.$refs.imageToDrag.offsetWidth > this.$refs.imageToDrag.offsetHeight) {
                this.$refs.imageToDrag.style.width = 'auto'
                this.$refs.imageToDrag.style.height = '130%'
            } else if (this.$refs.imageToDrag.offsetWidth < this.$refs.imageToDrag.offsetHeight) {
                this.$refs.imageToDrag.style.width = '130%'
                this.$refs.imageToDrag.style.height = 'auto'
            }
            TweenMax.to(this.$refs.imageToDrag, 0.6, { autoAlpha: 1, delay: 0.6,ease: Quad.easeInOut, onComplete: ()=> {
                this.imageLoading = false
            }})
        },
        mouseWheelEvent(event) {
            this.panzoom.zoomWithWheel(event)
            this.sliderZoom = this.panzoom.getScale()
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
            TweenMax.fromTo('.info-modal__close', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut, delay: 0.8 })
        },
        hide(){
            this.$emit('stop-audio')
            TweenMax.fromTo('.info-modal__close', 0.4, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut })
            TweenMax.fromTo('.info-modal__block', 0.6, { y: '0%' }, { y: '100%', ease: Quad.easeInOut, delay: 0.3, onComplete: () => {
                this.$emit('close')
                TweenMax.set('html, body', { overflow: 'inherit' })
            }})
            TweenMax.fromTo('.info-modal', 0.6, { autoAlpha: 1 }, { autoAlpha: 0, ease: Quad.easeInOut, delay: 0.3 })
            
        },
        togglePlay(){
            this.audioLoading = true
            this.$emit(`${this.isPlaying ? 'pause' : 'play'}-audio`)
            this.isPlaying = !this.isPlaying
        },
    },
    beforeDestroy(){
        this.mouse = {x: 0, y: 0, oldX: 0, oldY: 0, button: false}
        this.zoomEl = null
        // view.reset()
        this.panzoom?.destroy()
        this.previewElm?.removeEventListener('wheel', this.mouseWheelEvent)
        this.$refs.rangeZoom?.removeEventListener('input', this.inputChange)
        this.previewElm?.removeEventListener('mouseover', this.onOverPreview, false)
        this.previewElm?.removeEventListener('mouseout', this.onOutPreview, false)
        this.$refs?.imageToDrag?.removeEventListener('load', this.setInitialSize)
        this.$refs.imageToDrag?.removeEventListener('load', this.onImageLoaded)
        this.$refs?.imageToDrag?.removeEventListener('panzoomchange', this.panzoomChange)
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
    z-index: 5; 
    @include maxWidth(1024) {
        height: 100%;
    }
    .info-modal__crop {
        @include set-size(65.8vw, 535px);
        @include center(absolute);
        overflow: hidden;
        min-height: 535px;
        max-width: 1060px;


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

                .loading-comp {
                    @include set-size(100%, 100%);
                    position: absolute;

                    .loading-comp__content {
                        margin-top: -25px;
                    }
                }
                .info-modal__preview-image {
                    @include set-size(auto, auto);
                    opacity: 0;
                    display: block;
                    @include minWidth(1023) {
                        // transition: transform 0.1s linear !important, left 0.1s linear !important;
                        // -webkit-transition: transform 0.1s linear !important, left 0.1s linear !important;
                    }
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

                .info-modal__preview-prev,
                .info-modal__preview-next {
                    @include set-size(32px, 32px);
                    @include center-y(absolute);
                    background-repeat: no-repeat;
                    background-size: 60% 60%;
                    background-color: rgba(0,0,0,0.2);
                    border-radius: 50%;
                    border: 2px solid $white;
                    cursor: pointer;
                    transition: transform 0.4s $ease-in-out;

                    &:hover{
                        transform: scale(1.1) translateY(-45%);
                        // animation: arrowLoop 0.8s linear infinite;
                    }

                    @keyframes arrowLoop {
                        0% {
                            background-position: 50% 50%;
                        }
                        50% {
                            background-position: 60% 50%;
                        }
                        100% {
                            background-position: 50% 50%;
                        }
                    }
                }
                .info-modal__preview-prev {
                    background-image: url(~@/assets/images/icons/arrow-prev.png);
                    left: 15px;
                    background-position: 40% 50%;
                }
                .info-modal__preview-next {
                    background-image: url(~@/assets/images/icons/arrow-next.png);
                    right: 15px;
                    background-position: 60% 50%;
                }

                .info-modal__controls { 
                    @include set-size(100%, 40px);
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    background-color: rgba(0,0,0,0.1);
                    .mg-r {
                        margin-right: 20px;
                    }
                    .info-modal__controls__button-icon { 
                        @include set-size(22px, 22px);
                        margin: 10px 10px;
                        cursor: pointer;
                        opacity: 0.7;
                        transform: translateZ(0) scale(1);
                        transition: all 0.2s ease-in-out;
                        &:hover {
                            opacity: 1;
                            transform: translateZ(0) scale(1.1);
                        }
                    } 

                    .info-modal__controls__range-input {
                        width: 160px
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
                        background-color: $white;
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
                padding: 40px 30px 30px 30px;
                background-color: $white;
                text-align: left;
                position: relative;
                .info-modal__content-title {
                    font-family: $gar-bold;
                    @include font-size(24);
                    color: $black;
                    margin-top: 0;
                }

                .info-modal__content-description {
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

                    /* width */
                    &::-webkit-scrollbar {
                         width: 10px;
                        @include maxWidth(1023) {
                            width: 2px;
                        }
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

                    svg {
                        height: 100%;
                        @include center-y(absolute);
                        left: 0;
                        path {
                            stroke-width: 7px;
                            stroke: $orange;
                        }
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
        }

        @include maxWidth(1024) {
            @include set-size(95vw, 95%);
            max-width: 630px;
            .info-modal__block {
                justify-content: space-around;
                 align-items: flex-start;
                 flex-wrap: wrap;
                 overflow-y: scroll;
                .info-modal__preview {
                    width: 100%;
                    height: 50vh;
                }

                .info-modal__content {
                    width: 100%;
                    padding: 5vw;
                    height: auto;

                    .info-modal__content-description {
                        @include font-size(15);
                        line-height: 19px;
                    }

                    .info-modal__close {
                        position: fixed;
                        @include set-size(32px, 32px)
                    }

                    .info-modal__content-play {
                        position: relative;
                        left: 0;
                        bottom: 0;
                    }
                }
            }
        }

        @include maxWidth(374) {
            .info-modal__block {
                height: 80%;
                margin-top: 50px;
            }
        }
    }

    
}

/* Loader 2 */
.loader-2 {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
	height: 32px;
	width: 32px;
	-webkit-animation: loader-2-1 3s linear infinite;
	        animation: loader-2-1 3s linear infinite;
}
@-webkit-keyframes loader-2-1 {
	0%   { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes loader-2-1 {
	0%   { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
.loader-2 span {
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
	clip: rect(16px, 32px, 32px, 0);
	-webkit-animation: loader-2-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-2-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-2-2 {
	0%   { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes loader-2-2 {
	0%   { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
.loader-2 span::before {
	content: "";
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
	border: 3px solid transparent;
	border-top: 3px solid #FFF;
	border-radius: 50%;
	-webkit-animation: loader-2-3 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-2-3 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-2-3 {
	0%   { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes loader-2-3 {
	0%   { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
.loader-2 span::after {
	content: "";
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
	border: 3px solid rgba(255, 255, 255, .5);
	border-radius: 50%;
}
</style>