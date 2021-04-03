<template>
    <div class="menu-mobile">
        <div class="menu-mobile-hit" @click="hide"></div>
        <div class="menu-mobile__content">
           <ul class="menu-mobile__items">
                <li class="menu-mobile__item" @click="goLive"><img class="menu-mobile__item-icon" src="~@/assets/images/icons/play-small.png" /><div class="menu-mobile__item-title">Live MIS</div></li>
                <li class="menu-mobile__item" @click="goTutorial"><img class="menu-mobile__item-icon" src="~@/assets/images/icons/tutorial.png" /><div class="menu-mobile__item-title">Tutorial</div></li>
                <li class="menu-mobile__item">
                    <img class="menu-mobile__item-icon" src="~@/assets/images/icons/map.png" /><div class="menu-mobile__item-title">Mapa</div>
                    <ul class="mobile-item__map">
                        <li class="mobile-item__map-item" @click="goPano(1)">Códices</li>
                        <li class="mobile-item__map-item" @click="goPano(4)">Civil</li>
                        <li class="mobile-item__map-item" @click="goPano(9)">Galeria mista</li>
                        <li class="mobile-item__map-item" @click="goPano(29)">Sensorial</li>
                        <li class="mobile-item__map-item" @click="goPano(32)">Militar</li>
                        <li class="mobile-item__map-item" @click="goPano(39)">Monalisa</li>
                    </ul>
                </li>
                <!-- <li class="menu-mobile__item" @click="logout"><img class="menu-mobile__item-icon" src="~@/assets/images/icons/logout.png" /><div class="menu-mobile__item-title">Sair</div></li> -->
           </ul>
        </div>
    </div>
</template>
<script>
import { TweenMax, Quad } from 'gsap';

export default {
    data:() => ({
        opened: false
    }),
    methods: {
        show(){
            this.opened = true
            document.querySelector('.header-controls__right-burger').classList.add('opened')
            this.$el.classList.add('opened')
        },
        hide(cb){
            this.opened = false
            document.querySelector('.header-controls__right-burger').classList.remove('opened')
            this.$el.classList.remove('opened')
            setTimeout(cb, 1000)
        },
        goLive(){
            this.hide(()=>{
                this.$emit("go-live", {
                    type: "live",
                    value: "show",
                });
            })
        },
        goTutorial(){
            this.hide(()=>{
                this.$emit('go-tutorial')
            })
        },
        goPano(id) {
            this.hide(()=>{
                this.$store.commit("navigateToPano", id);
            })
        },
        logout(){
            this.hide(()=>{
                this.$router.push({ name: "Home" });
                this.$store.dispatch("logout");
            })
        },
    }
}
</script>
<style lang="scss">
.menu-mobile {
    @include set-size(100%, 100vh);
    position: fixed;
    top: 76px;
    left: 0;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.6s $ease-in-out;

    &.opened {
        transform: translateX(0%);
    }

    .menu-mobile-hit {
        @include set-size(100%, 100vh);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }

    .menu-mobile__close{

    }

    .menu-mobile__content {
        @include set-size(70%, 100%);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        border-right: 1px solid $white;
        background-color: rgba(0, 0, 0, 0.9);

        .menu-mobile__items {
            @include set-size(100%, 100%);
            padding: 0 0 0 0px;
            .menu-mobile__item {
                border-bottom: 1px solid $white;
                color: $white;
                font-family: $mont-regular;
                @include font-size(16);
                text-align: left;
                padding: 15px 0 15px 15px;

                @include maxWidth(375) {
                    padding: 10px 0 10px 15px;
                }

                &:last-child {
                    border-bottom: none;
                }

                .menu-mobile__item-title {
                    display: inline-block;
                    margin-top: -15px;
                    vertical-align: middle;
                }

                .menu-mobile__item-icon {
                    width: 24px;
                    margin-right: 10px;
                }
            }
        } 
        
        .mobile-item__map {
            @include set-size(100%, 100%);
            padding: 0 0 0 45px;
            .mobile-item__map-item {
                // border-bottom: 1px solid $white;
                color: $white;
                font-family: $mont-regular;
                @include font-size(16);
                text-align: left;
                padding: 10px 0 10px 5px;

                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>