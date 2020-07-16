<template>
    <div class="auth">
        <div class="auth-bg"></div>
        <header class="auth-header">
            <nav class="auth-header__nav">
                <ul class="auth-header__nav-list">
                    <li class="auth-header__nav-list__item">CADASTRO</li>
                    <li class="auth-header__nav-list__item">LOGIN</li>
                    <li class="auth-header__nav-list__item">TICKET</li>
                </ul>
            </nav>
        </header>
        <div class="auth-container">
            <div class="auth-container__block">
                <Register />
            </div>
        </div>
    </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
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
    data() {
        return {};
    },
    methods: {
        show(){
            TweenMax.fromTo('.auth-bg', 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut })
        },
        hide(){

        },
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
        @include set-size(100%, 100px);
        display: block;
        margin: 0 auto;
        position: relative;

        .auth-header__nav {
            .auth-header__nav-list {
                display: flex;
                align-items: baseline;
                justify-content: center;
                margin: 0 11px;

                .auth-header__nav-list__item {

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
        margin: 0 auto 18px auto;    
        span {
            font-family: $gar-bold;
        }
    }
    .auth__subtitle{
        color: $black;
        font-family: $got-medium;
        @include font-size(14);
        margin: 0 auto 32px auto;    
        span {
            font-family: $got-medium;
        }
    }
}
</style>