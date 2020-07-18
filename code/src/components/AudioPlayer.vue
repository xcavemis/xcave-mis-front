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
        dynamicSound: null
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
        console.log(this.mainSound)
    },
    methods: {
        play(){
            this.dynamicSound?.play();
        },
        pause(){
            this.dynamicSound?.pause();
        },
        seekTo(){

        },
        playTo(path){
            this.dynamicSound?.unload()
            this.dynamicSound = new Howl({
                src: [`${path}.mp3`, `${path}.ogg`],
                autoplay: true,
                loop: false,
                volume: 0.5,
            });
            this.dynamicSound?.once('load', () => {
                this.sound?.play();
            });
        },
        onEnded(){

        },
        mute(){
            this.mainSound?.fade(1, 0, 1000)
        },
        unmute(){
            this.mainSound?.fade(0, 1, 1000)
        },
    }
}
</script>