<template>
    <div class="warning-comp">
        <div class="warning-comp__content">
            <p class="warning-comp__content-text" v-html="text"></p> 
            <a class="default-button black warning-comp__content-btn" href="javascript:void(0)" @click="close">ENTENDI</a> 
        </div>
    </div>
</template>
<script>
export default {
    props: ['text'],
    methods: {
        show(){
            
        },
        hide(){
            this.$store.dispatch("warning", {
                show: false,
                text: ''
            })
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
    background-color: rgba(0,0,0,0.9);
    z-index: 1000;

    .warning-comp__content {
        width: 100%;
        @include center(absolute);

        .warning-comp__content-text {
            font-family: $rob-bold;
            @include font-size(20);
            color: $white;
        }

        .warning-comp__content-btn {
            width: 150px;
            display: block;
            margin: 32px auto;
        }
    }
}
</style>