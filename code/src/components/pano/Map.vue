<template>
    <div class="map-comp">
        <img class="map-comp__close" src="~@/assets/images/icons/close-info.png" @click="close" alt="Fechar o conteúdo.">
        <div class="map-comp__crop" ref="mapCrop">
            <div class="map-comp__content" ref="mapContent">
                <img src="~@/assets/images/map-bg.jpg" alt="" class="map-comp__bg">
                <div class="map-comp__markers">
                    <div class="map-comp__marker" 
                        v-for="(mark, idx) of markers" 
                        :key="idx" 
                        @click="goTo(mark.id)"
                        :style="{
                            left: mark.x,
                            top: mark.y
                        }"
                    >
                        <img v-if="mark.type == 'dark'" class="map-comp__marker--icon" src="~@/assets/images/icons/map-marker-dark.png" :alt="mark.title">
                        <img v-if="mark.type == 'light'" class="map-comp__marker--icon" src="~@/assets/images/icons/map-marker-light.png" :alt="mark.title">
                        <span class="map-comp__marker--title">{{mark.title}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { view } from '@/components/pano/DragAndZoom';
import { mapData } from '@/data/map';
import { TweenMax, Quad } from 'gsap';
export default {
    props: ['text'],
    data: () => ({
        mouse: {
            x:  0, 
            y:  0, 
            oldX: 0, 
            oldY: 0, 
            button: false
        },
        zoomEl: null,
        previewElm: null,
        markers: [],
    }),
    mounted(){
        this.markers = mapData.markers
        this.$nextTick(()=>{
            this.mouse = {
                x: this.$refs?.mapCrop?.offsetWidth * 0.5, 
                y: this.$refs?.mapCrop?.offsetHeight * 0.5, 
                oldX: 0, 
                oldY: 0, 
                button: false
            }
            // this.$refs?.mapCrop?.addEventListener('mouseover', this.onOverPreview, false)
            // this.$refs?.mapCrop?.addEventListener('mouseout', this.onOutPreview, false)
            // this.$refs?.mapCrop?.addEventListener("mousemove", this.mouseEvent, {passive: false});
            // this.$refs?.mapCrop?.addEventListener("mousedown", this.mouseEvent, {passive: false});
            // this.$refs?.mapCrop?.addEventListener("mouseup", this.mouseEvent, {passive: false});
            // this.$refs?.mapCrop?.addEventListener("mouseout", this.mouseEvent, {passive: false});
            // this.$refs?.mapCrop?.addEventListener("wheel", this.mouseWheelEvent, {passive: false});
        })
    },
    methods: {
        show(){
            TweenMax.set('html, body', { overflow: 'hidden' })
            TweenMax.to(this.$el, 0.6, { autoAlpha: 1, ease: Quad.easeInOut } )  
            TweenMax.fromTo(this.$refs.mapContent, 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.3 } )  
        },
        hide(){
            TweenMax.fromTo(this.$refs.mapContent, 0.6, { y: '0%' }, { y: '100%', ease: Quad.easeInOut } )  
            TweenMax.to(this.$el, 0.6, { autoAlpha: 0, ease: Quad.easeInOut, onComplete: ()=>{
                this.$emit('map-close')
                TweenMax.set('html, body', { overflow: 'inherit' })
            }})
        },
        goTo(id) {
            this.$emit('navigate-to', id)
            this.close()
        },
        mouseEvent(event) {
            if (event.type === "mousedown") { this.mouse.button = true }
            if (event.type === "mouseup" || event.type === "mouseout") { this.mouse.button = false }
            this.mouse.oldX = this.mouse.x;
            this.mouse.oldY = this.mouse.y;
            this.mouse.x = event.pageX;
            this.mouse.y = event.pageY;
            if(this.mouse.button) { // pan
                this.$refs.mapContent.style.transition = `transform 0s linear`;
                view.pan({x: this.mouse.x - this.mouse.oldX, y: this.mouse.y - this.mouse.oldY});
                view.applyTo(this.$refs.mapContent);
            }
            event.preventDefault();
        },
        mouseWheelEvent(event) {
            const x = event.offsetX - (this.$refs.mapContent.offsetWidth / 2);
            const y = event.offsetY - (this.$refs.mapContent.offsetHeight / 2);
            this.$refs.mapContent.style.transition = `transform 0.2s linear`;
            if (event.deltaY < 0) { 
                view.scaleAt({x, y}, 1.1, 0.4, 1.3);
                view.applyTo(this.$refs.mapContent);
            } else { 
                view.scaleAt({x, y}, 1 / 1.1, 0.4, 1.3);
                view.applyTo(this.$refs.mapContent);
            }
            
            event.preventDefault();
        },
        close(){
            this.hide()
        }
    },
    beforeDestroy(){
        this.mouse = {
            x: this.$refs?.mapCrop?.offsetWidth * 0.5, 
            y: this.$refs?.mapCrop?.offsetHeight * 0.5, 
            oldX: 0, 
            oldY: 0, 
            button: false
        }
        // this.$refs?.mapCrop?.removeEventListener('mouseover', this.onOverPreview, false)
        // this.$refs?.mapCrop?.removeEventListener('mouseout', this.onOutPreview, false)
        // this.$refs?.mapCrop?.removeEventListener("mousemove", this.mouseEvent, {passive: false});
        // this.$refs?.mapCrop?.removeEventListener("mousedown", this.mouseEvent, {passive: false});
        // this.$refs?.mapCrop?.removeEventListener("mouseup", this.mouseEvent, {passive: false});
        // this.$refs?.mapCrop?.removeEventListener("mouseout", this.mouseEvent, {passive: false});
        // this.$refs?.mapCrop?.removeEventListener("wheel", this.mouseWheelEvent, {passive: false});
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
        top: 18.5vh;
        right: 12vw;
        z-index: 10;
        cursor: pointer;
        padding: 5px;
        background-color: rgba(0, 0, 0, 1);
        border-radius: 50%;
        border: 2px solid $gray;
    }

    .map-comp__crop {
        @include set-size(65.8vw, 62.5vh);
        @include center(absolute);
        overflow: hidden;
        border: 1px solid $gray;
        overflow-x: hidden;
        overflow-y: scroll;

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
    .map-comp__content {
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(100%);
        .map-comp__bg {
            @include set-size(100%, auto);
        }

        .map-comp__markers {
            @include set-size(100%, 100%);
            position: absolute;
            top: 0;
            left: 0;
            .map-comp__marker {
                @include set-size(30px, 30px);
                position: absolute;
                transform: translateX(-50%) translateY(-50%);
                cursor: pointer;
                .map-comp__marker--title {
                    opacity: 0;
                    color: $white;
                    font-family: $rob-medium;
                    background-color: rgba(0,0,0,0.5);
                    padding: 5px;
                    transition: opacity 0.4s $ease-in-out;
                }

                .map-comp__marker--icon {
                    width: 100%;
                    margin: 0 auto;
                    box-shadow: 0px 0px 33px #000;
                    border-radius: 50%;
                }

                &:hover {
                    .map-comp__marker--title {
                        opacity: 1;
                    }
                }
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