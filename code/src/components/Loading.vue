<template>
    <div class="loading-comp">
        <div class="loading-comp__content">
            <!-- <div class="loader"></div> -->
            <!-- <svg class="loading-comp__content-icon" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
                <g id="Group_22" data-name="Group 22" transform="translate(-11253 -786)">
                    <rect id="Rectangle_21" data-name="Rectangle 21" width="80" height="80" transform="translate(11253 786)" fill="none"/>
                    <circle id="Ellipse_7" data-name="Ellipse 7" cx="10" cy="10" r="10" transform="translate(11283 786)" fill="#dca036"/>
                    <circle id="Ellipse_8" data-name="Ellipse 8" cx="10" cy="10" r="10" transform="translate(11313 816)" fill="#dca036"/>
                    <circle id="Ellipse_9" data-name="Ellipse 9" cx="10" cy="10" r="10" transform="translate(11253 816)" fill="#dca036"/>
                    <circle id="Ellipse_10" data-name="Ellipse 10" cx="10" cy="10" r="10" transform="translate(11283 846)" fill="#dca036"/>
                </g>
            </svg>     -->
            <p class="loading-comp__content-text">
                <!-- <strong>CARREGANDO</strong><br> -->
            </p>  
        </div>
    </div>
</template>

<style lang="scss">
.loading-comp {
    @include set-size(100%, 100vh);
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.05);
    z-index: 1000;

    .loading-comp__content {
        width: 100%;
        @include center(absolute);

        .loading-comp__content-icon {
            @include set-size(80px, 80px);
            margin: 0 auto 40px auto;
            animation: loadingRotate 3.4s infinite;

            @keyframes loadingRotate {
                0% {
                    transform: rotate(0deg) scale(1);
                    filter: blur(0);
                }
                25% {
                    filter: blur(1px);
                    transform: rotate(90deg) scale(0.5);
                }
                50% {
                    filter: blur(0);
                    transform: rotate(180deg) scale(1);
                }
                75% {
                    filter: blur(1px);
                    transform: rotate(270deg) scale(0.5);
                }
                100% {
                    filter: blur(0);
                    transform: rotate(360deg) scale(1);
                }
            }
        }
        .loading-comp__content-text {
            font-family: $got-black;
            color: $orange;
            font-size: 16px;
            // strong {
            //     color: $yellow-text;
            //     font-size: 18px;
            //     line-height: 20px;
            // }
        }
    }

    .loader,
    .loader:before,
    .loader:after {
        border-radius: 50%;
        width: 1.5em;
        height: 1.5em;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation: load7 1.8s infinite ease-in-out;
        animation: load7 1.8s infinite ease-in-out;
    }
    .loader {
        color: $orange;
        font-size: 10px;
        margin: 80px auto;
        position: relative;
        text-indent: -9999em;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
    .loader:before,
    .loader:after {
        content: '';
        position: absolute;
        top: 0;
    }
    .loader:before {
        left: -3.5em;
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }
    .loader:after {
        left: 3.5em;
    }
    @-webkit-keyframes load7 {
    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
        box-shadow: 0 2.5em 0 0;
    }
    }
    @keyframes load7 {
    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
        box-shadow: 0 2.5em 0 0;
    }
    }

}
</style>