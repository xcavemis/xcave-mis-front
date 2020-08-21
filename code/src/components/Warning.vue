<template>
    <div class="warning-comp">
        <!-- <img
          class="warning-comp__logo"
          src="~@/assets/images/logo-da-vinci.png"
          alt="LEONARDO DA VINCI – 500 ANOS DE UM GÊNIO"
        /> -->
        <div class="warning-comp__content">
            <img class="warning-comp__close" src="~@/assets/images/icons/close.png" @click="close" alt="Fechar o conteúdo.">
            <img
                class="warning-comp__warning"
                src="~@/assets/images/icons/warning.png"
                alt="Aviso"
            />
            <p class="warning-comp__content-text" v-html="text"></p> 
            <!-- <a class="default-button white warning-comp__content-btn" href="javascript:void(0)" @click="close">VOLTAR</a>  -->
        </div>
    </div>
</template>
<script>
import { TweenMax, Quad } from 'gsap';
export default {
    props: ['text'],
    methods: {
        show(){
            TweenMax.to('.warning-comp__content', 0.6, { autoAlpha: 1, ease: Quad.easeInOut, onComplete: ()=>{}})
        },
        hide(){
            TweenMax.to('.warning-comp__content', 0.4, { autoAlpha: 0, ease: Quad.easeInOut, onComplete: ()=>{
                this.$store.dispatch("warning", {
                    show: false,
                    text: ''
                })
            }})
        },
        close(){
            this.hide()
        }
    }
}
</script>
<style lang="scss">
.warning-comp {
    @include set-size(100%, 100vh);
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0);
    z-index: 1000;

    .warning-comp__logo {
        width: 35.1vw;
        margin: 40px auto 40px auto;
        max-width: 480px;

        @include maxWidth(1023) {
            width: 70vw;
        }
    }

    .warning-comp__content {
        padding: 50px;
        background-color: rgba(0,0,0,0.9);
        @include center(absolute);
        border-radius: 8px;
        opacity: 0;

        @include maxWidth(768) {
            width: 80vw;
            padding: 40px;
        }

        .warning-comp__close {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 30px;
            cursor: pointer;
        }

        .warning-comp__warning {
            margin: 0 auto;
            @include set-size(50px, 50px);
        }

        .warning-comp__content-text {
            font-family: $rob-bold;
            @include font-size(14);
            color: $white;
        }

        .warning-comp__content-btn {
            width: 150px;
            display: block;
            margin: 32px auto 0 auto;
        }
    }
}
</style>