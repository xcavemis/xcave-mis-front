<template>
    <div class="timeline-comp">
        <div class="timeline-comp__marker"
            @click="goTo('codices101')"
            :class="{'current': $store.getters.navigationStatus.codices == 'current', 'visited': $store.getters.navigationStatus.codices == 'visited', 'visited-current': $store.getters.navigationStatus.codices == 'visited-current'}"
        >
            <div class="timeline-comp__marker-icon"></div>
            <p class="timeline-comp__marker-label">Códices</p>
        </div>
        <div class="timeline-comp__divide"></div>
        <div class="timeline-comp__marker"
            @click="goTo('civil201')"
            :class="{'current': $store.getters.navigationStatus.civil == 'current', 'visited': $store.getters.navigationStatus.civil == 'visited', 'visited-current': $store.getters.navigationStatus.civil == 'visited-current'}"
        >
            <div class="timeline-comp__marker-icon"></div>
            <p class="timeline-comp__marker-label">Civil</p>
        </div>
        <div class="timeline-comp__divide"></div>
        <div class="timeline-comp__marker"
            @click="goTo('mixed301')"
            :class="{'current': $store.getters.navigationStatus.mixed == 'current', 'visited': $store.getters.navigationStatus.mixed == 'visited', 'visited-current': $store.getters.navigationStatus.mixed == 'visited-current'}"
        >
            <div class="timeline-comp__marker-icon"></div>
            <p class="timeline-comp__marker-label">Galeria Mista</p>
        </div>
        <div class="timeline-comp__divide"></div>
        <div class="timeline-comp__marker"
            @click="goTo('projection501')"
            :class="{'current': $store.getters.navigationStatus.sensorial == 'current', 'visited': $store.getters.navigationStatus.sensorial == 'visited', 'visited-current': $store.getters.navigationStatus.sensorial == 'visited-current'}"
        >
            <div class="timeline-comp__marker-icon"></div>
            <p class="timeline-comp__marker-label">Sensorial</p>
        </div>
        <div class="timeline-comp__divide"></div>
        <div class="timeline-comp__marker"
            @click="goTo('military601')"
            :class="{'current': $store.getters.navigationStatus.militar == 'current', 'visited': $store.getters.navigationStatus.militar == 'visited', 'visited-current': $store.getters.navigationStatus.militar == 'visited-current'}"
        >
            <div class="timeline-comp__marker-icon"></div>
            <p class="timeline-comp__marker-label">Militar</p>
        </div>
        <div class="timeline-comp__divide"></div>
        <div class="timeline-comp__marker"
            @click="goTo('monalisa-colors701')"
            :class="{'current': $store.getters.navigationStatus.monalisa == 'current', 'visited': $store.getters.navigationStatus.monalisa == 'visited', 'visited-current': $store.getters.navigationStatus.monalisa == 'visited-current'}"
        >
            <div class="timeline-comp__marker-icon"></div>
            <p class="timeline-comp__marker-label">Monalisa </p>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goTo(id) {
            this.$store.commit('navigateToPano', id)
        },
    }
}
</script>

<style lang="scss">
.timeline-comp {
    @include set-size(100%, 100%);
    display: flex;
    justify-content: center;
    align-items: center;

    .timeline-comp__marker {
        @include set-size(34px, 34px);
        border: 2px solid $white;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.2);
        position: relative;
        cursor: pointer;

        .timeline-comp__marker-icon {
            @include set-size(5px, 5px);
            border-radius: 50%;
            background-color: #999999;
            @include center(absolute);
            transition: background-color 0.6s $ease-in-out;
        }
        .timeline-comp__marker-label {
            width: 80px;
            @include font-scale(1366, 1680, 10, 12);
            @include center-x(absolute);
            font-family: $rob-regular;
            color: #999999;
            transition: color 0.6s $ease-in-out;
            bottom: -100%;
            text-shadow: 0px 0px 4px #000000;

            @include minWidth(1680) {
                margin-bottom: -3px;
            }
        }

        &.current {
            .timeline-comp__marker-icon {
                background-color: $orange;
            }

            .timeline-comp__marker-label {
                color: $orange;
            }
        }

        &.visited {
            .timeline-comp__marker-icon {
                background-color: transparent;
                border-radius: 0;
                transform: rotate(45deg) translateX(-100%) translateY(-20%);
                height: 8px;
                width: 5px;
                border-bottom: 2px solid #ffffff;
                border-right: 2px solid #ffffff;
            }

            .timeline-comp__marker-label {
                color: $white;
            }
        }

        &.visited-current {
            .timeline-comp__marker-icon {
                background-color: transparent;
                border-radius: 0;
                transform: rotate(45deg) translateX(-100%) translateY(-20%);
                height: 8px;
                width: 5px;
                border-bottom: 2px solid $orange;
                border-right: 2px solid $orange;
            }

            .timeline-comp__marker-label {
                color: $orange;
            }
        }
    }
    .timeline-comp__divide {
        @include set-size(100px, 2px);
        background-color: $white;
    }   
}
</style>