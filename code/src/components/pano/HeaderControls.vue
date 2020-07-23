<template>
    <div class="header-controls">
        <div class="header-controls__left">
            <img class="header-controls__logo" src="~@/assets/images/logo-da-vinci.png" alt="LEONARDO DA VINCI – 500 ANOS DE UM GÊNIO" />
        </div>
        <div class="header-controls__center">
            <Timeline />
        </div>
        <div class="header-controls__right">
            <div class="header-controls__right-button" @click="goTutorial">
                <span class="header-controls__button-label">Tutorial</span>
                <img class="header-controls__button-icon" src="~@/assets/images/icons/tutorial.png"/>
            </div>
            <div class="header-controls__right-button" @click="goFullscreen">
                <span class="header-controls__button-label">Tela Cheia</span>
                <img v-if="!fullscreen" class="header-controls__button-icon" src="~@/assets/images/icons/fullscreen-enter.png"/>
                <img v-if="fullscreen" class="header-controls__button-icon" src="~@/assets/images/icons/fullscreen-exit.png"/>
            </div>
        </div>
    </div>
</template>

<script>
import Timeline from '@/components/pano/Timeline.vue'

export default {
    components: {
        Timeline,
    },
    data: () => ({
        fullscreen: false
    }),
    mounted(){
        document.addEventListener("fullscreenchange", this.fullscreenChange);
        document.addEventListener("mozfullscreenchange", this.fullscreenChange);
        document.addEventListener("webkitfullscreenchange", this.fullscreenChange);
        document.addEventListener("msfullscreenchange", this.fullscreenChange);    
    },
    methods: {
        goTutorial(){
            
        },
        fullscreenChange(e) {
            this.fullscreen = !this.fullscreen
        },
        goFullscreen(){
            if (this.fullscreen) {
                this.closeFullscreen()
                return
            }
            const elem = document.querySelector('#app')
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
        },
        closeFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }
    }
}
</script>

<style lang="scss">
.header-controls {
    @include set-size(100%, 100px);
    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 42%, rgba(0, 0, 0, 0) 100%);
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding-top: 30px;

    .header-controls__left {
        width: 16.1%;

        .header-controls__logo {
            width: 100%;
            margin: 0 auto;
        }
    }
    .header-controls__center {
        width: 62.4%;
    }
    .header-controls__right {
        width: 16.1%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .header-controls__right-button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            .header-controls__button-label {
                @include font-scale(1366, 1680, 10, 12);
                font-family: $rob-regular;
                color: $white;
                margin-right: 15px;
                text-shadow: 0px 0px 4px #000000;
            }
            .header-controls__button-icon {
                @include set-size(24px, 24px);
            }

            &:first-child {
                margin-right: 15px;
            }
        }
    }
    @include maxWidth(1024) {
        justify-content: flex-start;
        align-items: flex-start;
        .header-controls__left {
            width: 45%;
            margin-left: 2.5vw;
        }
        .header-controls__center,        
        .header-controls__right {
            display: none;
        }        
    }
}
</style>