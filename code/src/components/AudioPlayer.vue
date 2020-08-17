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
        updateTimer: 0,
        tracks: [
            '/media/audio/main/t1',
            '/media/audio/main/t2',
            '/media/audio/main/t3',
            '/media/audio/main/t4',
            '/media/audio/main/t5',
            '/media/audio/main/t6',
            '/media/audio/main/t7',
            '/media/audio/main/t8',
            '/media/audio/main/t9',
            '/media/audio/main/t10',
            '/media/audio/main/t11',
        ],
        trackIndex: 9,
        isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    }),
    mounted(){
        if (!this.isMobile) {
            this.mainSound = new Howl({
                src: [`${this.tracks[this.trackIndex]}.mp3`],
                autoplay: true,
                loop: true,
                volume: 0.4,
                onend: this.onEnded,
            });
        }
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
                    volume: 10,
                });
                
                this.dynamicSound?.play();
                this.$store.commit('audio_end', false)
                clearInterval(this.updateTimer)
                this.updateTimer = setInterval(()=>{
                    if (!this.$store.getters.audio_ended && this.dynamicSound) {
                        let currentTime = this.dynamicSound?.seek();
                        let maxduration = this.dynamicSound?.duration();
                        let calc = currentTime / maxduration;
                        this.$store.commit('audioTime', !isNaN(calc) ? calc : 0)
                    }
                }, 250)
                this.dynamicSound?.on('load', () => {
                    // console.log('dynamicSOund load')
                });
                this.dynamicSound?.on('end', () => {
                    this.$store.commit('audio_end', true)
                });
            })
        },
        onEnded(){
            this.mainSound?.unload()
            this.$nextTick(()=>{
                this.trackIndex++
                if (this.trackIndex == this.tracks.length) this.trackIndex = 0
                this.mainSound = new Howl({
                    src: [`${this.tracks[this.trackIndex]}.mp3`],
                    autoplay: true,
                    loop: true,
                    volume: 0.4,
                });
                
                this.mainSound?.play();
                this.mainSound?.on('load', () => {
                    // console.log('mainSound load')
                });
                this.mainSound?.on('end', () => {
                    this.onEnded()
                });
                console.log('main track update: ', `${this.tracks[this.trackIndex]}.mp3`)
            })
        },
        mute(){
            this.mainSound?.fade(1, 0, 0)
        },
        unmute(){
            this.mainSound?.fade(0, 0.4, 0)
        },
        destroyDynamic(){
            clearInterval(this.updateTimer)
            this.dynamicSound?.stop()
            this.dynamicSound?.unload()
            this.dynamicSound = null
        }
    },
    beforeDestroy(){
        clearInterval(this.updateTimer)
        this.mainSound?.stop()
        this.mainSound = null
        this.dynamicSound?.stop()
        this.dynamicSound = null
    }
}
</script>