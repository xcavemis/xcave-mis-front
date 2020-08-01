<template>
    <div class="audio-player"></div>
</template>
<script>
import {Howl, Howler} from 'howler';
export default {
    props: ['path'],
    data: () => ({
        default: '/media/audio/main/default',
        mainSound: null,
        dynamicSound: null,
        stopTimer: 0,
    }),
    mounted(){
        this.mainSound = new Howl({
            src: [`${this.default}.mp3`, `${this.default}.ogg`],
            autoplay: true,
            loop: true,
            volume: 1,
            onend: this.onEnded,
        });
        this.mainSound?.seek(30)
    },
    methods: {
        play(){
            this.dynamicSound?.play();
        },
        pause(){
            this.dynamicSound?.pause();
        },
        stop(){ 
            this.dynamicSound?.fade(1, 0, 1000)
            clearTimeout(this.stopTimer)
            this.stopTimer = setTimeout(()=>{
                this.dynamicSound?.unload()
            }, 1500)
        },
        seekTo(){

        },
        playTo(path){
            this.mute()
            this.dynamicSound?.unload()
            this.$nextTick(()=>{
                this.dynamicSound = new Howl({
                    src: [`${path}`, `${path}`],
                    autoplay: true,
                    volume: 1,
                });
                
                this.dynamicSound?.play();
                console.log('playTo', this.dynamicSound, path)
                this.dynamicSound?.on('load', () => {
                    console.log('dynamicSOund load')
                });
            })
        },
        onEnded(){

        },
        mute(){
            this.mainSound?.fade(1, 0, 0)
        },
        unmute(){
            this.mainSound?.fade(0, 1, 0)
        },
    },
    beforeDestroy(){
        this.mainSound?.stop()
        this.mainSound = null
        this.dynamicSound?.stop()
        this.dynamicSound = null
    }
}
</script>