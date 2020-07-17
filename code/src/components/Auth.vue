<template>
    <div class="auth">
        <div class="auth-bg"></div>
        <header class="auth-header">
            <nav class="auth-header__nav">
                <ul class="auth-header__nav-list">
                    <li class="auth-header__nav-list__item" @click="goToTab(0)" :class="{'selected': currStep == 0, 'register-show': isRegister}">CADASTRO</li>
                    <li class="auth-header__nav-list__item" @click="goToTab(1)" :class="{'selected': currStep == 1}">LOGIN</li>
                    <li class="auth-header__nav-list__item" @click="goToTab(2)" :class="{'selected': currStep == 2}">TICKET</li>
                </ul>
            </nav>
        </header>
        <div class="auth-container">
            <div class="auth-container__block" v-if="currStep == 0">
                <Register />
            </div>
            <div class="auth-container__block" v-if="currStep == 1">
                <Login v-on:go-register="goToRegister" v-on:go-ticket="goToTicket" />
            </div>
            <div class="auth-container__block" v-if="currStep == 2">
                <Ticket />
            </div>
        </div>
    </div>
</template>

<script>
import { TweenMax, Quad } from 'gsap';
import Register from '@/components/auth/Register';
import Login from '@/components/auth/Login';
import Ticket from '@/components/auth/Ticket';
export default {
    name: "Auth",
    components: {
        Register,
        Login,
        Ticket,
    },
    data: () => ({
        currStep: 1,
        isRegister: false
    }),
    mounted(){
        this.currStep = this.$store.getters.user ? 2 : 1
    },
    methods: {
        show(){
            TweenMax.fromTo('.auth-bg', 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut })
            TweenMax.fromTo('.auth-header__nav', 0.6, { y: '-100%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.4 })
        },
        hide(){

        },
        goToTab(id){
            console.log(this.$store.getters.user)
            if (id == 1 && this.$store.getters.user) return
            if (id == 2 && !this.$store.getters.user) return

            this.currStep = id
        },
        goToTicket(){
            this.currStep = 2
        },
        goToRegister(){
            this.currStep = 0
            this.isRegister = true
        }
    }
}
</script>>

<style lang="scss">
.auth {
    @include set-size(47.5vw, 78.1vh);
    max-width: 650px;
    max-height: 600px;
    border-radius: 4px;
    overflow: hidden;

    .auth-bg {
        @include set-size(100%, 100%);
        background-image: url(~@/assets/images/bg-login.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(100%);
    }

    .auth-header {
        @include set-size(100%, auto);
        display: block;
        margin: 40px auto 0 auto;
        position: relative;
        overflow: hidden;

        .auth-header__nav {
            background: transparent;
            box-shadow: none;
            
            .auth-header__nav-list {
                display: flex;
                align-items: baseline;
                justify-content: center;
                margin: 0 11px;

                .auth-header__nav-list__item {
                    @include set-size(140px, 54px);
                    font-family: $rob-bold;
                    @include font-size(10);
                    line-height: 54px;
                    color: $gray;
                    border-bottom: 2px solid $gray;
                    animation: border-bottom 0.6s $ease-in-out;
                    margin: 0 4px;
                    letter-spacing: 0.05rem;

                    &:first-child{
                        display: none;
                    }

                    &.register-show {
                        display: inline;
                    }

                    &.selected {
                        border-bottom: 2px solid $orange;
                    }
                }
            }
        }
    }
    .auth-container {
        @include set-size(100%, calc(100% - 100px));
        display: block;
        position: relative;
        .auth-container__block {
            width: 68%;
            @include center(absolute);
        }
    }

    .auth__title{
        color: $black;
        font-family: $gar-bold;
        @include font-size(32);
        letter-spacing: 0.05rem;
        margin: 0 auto 18px auto;    
        span {
            font-family: $gar-bold;
        }
    }
    .auth__subtitle{
        color: $black;
        font-family: $got-medium;
        @include font-size(14);
        letter-spacing: 0.05rem;
        margin: 0 auto 32px auto;    
        span {
            font-family: $got-medium;
        }

        strong{
            font-family: $got-black;

            .word {
                font-family: $got-black;
            }
        }
    }
}
</style>