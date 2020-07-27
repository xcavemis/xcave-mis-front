<template>
    <div class="loading-comp">
        <div class="loading-comp__content">
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
                <strong>CARREGANDO</strong><br>
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
    background-color: rgba(0,0,0,0.3);
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
}
</style>