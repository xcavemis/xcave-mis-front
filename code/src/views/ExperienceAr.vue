<template>
  <div class="experience">
    <Ar :content="infoModalContent" ref="arModal" v-if="isArModal" v-on:close="arClosed" />
    <div class="ar-buttons">
      <a
        class="default-button black"
        href="javascript:void(0)"
        @click="openAR('drum')"
      >DRUM</a>
      <a
        class="default-button black"
        href="javascript:void(0)"
        @click="openAR('heli')"
      >HELICOPTER</a>
      <a
        class="default-button black"
        href="javascript:void(0)"
        @click="openAR('boat')"
      >BARCO</a>
      <a
        class="default-button black"
        href="javascript:void(0)"
        @click="openAR('bike')"
      >BIKE</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Ar from "@/components/Ar.vue";
import { data } from "@/data/scenes.js";
export default {
  name: "experience",
  components: {
    Ar,
  },
  data: () => ({
    isArModal: false,
    infoModalContent: null,
    preloader: null,
    queueLoaded: true,
    isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  }),
  mounted() {
    document
      .querySelector(".footer-component")
      .classList.add("footer-component__experience");
  },
  methods: {
    openAR(id) {
      if (id == 'drum') {
        this.infoModalContent = {
          id: "A-305",
          title: "Realidade Aumentada",
          type: 'ar',
          model: 'Drum.gltf',
          id: 'drum',
          ext: 'gltf',
          scale: 1,
          scaleFactor: 1,
          auto_rotate: true,
          lights: {
            ambientIntensity: 1.5,
            pointIntensity: 1.2,
            directionalIntensity: 2,
          },
          camera: {
            x: 0,
            y: 60,
            z: 130
          },
          shadow: {
            z: -40
          }
        };
      } else if (id == 'boat') {
        this.infoModalContent = {
          id: "RA-4",
          title: "Realidade Aumentada",
          type: 'ar',
          model: 'boat.gltf',
          ext: 'gltf',
          scale: 0.01,
          scaleFactor: 0.01,
          auto_rotate: true,
          lights: {
            ambientIntensity: 0.6,
            pointIntensity: 0.1,
            directionalIntensity: 0.5,
          },
          camera: {
            x: 0,
            y: 80,
            z: 300
          },
          shadow: {
            z: -40
          }
        }
      } else if (id == 'bike') {
        this.infoModalContent = {
          id: "RA-1",
          title: "Realidade Aumentada",
          type: 'ar',
          model: 'bike.gltf',
          ext: 'gltf',
          scale: 1,
          scaleFactor: 1,
          auto_rotate: true,
          lights: {
            ambientIntensity: 0.8,
            pointIntensity: 0.6,
            directionalIntensity: 0.8,
          },
          camera: {
            x: 0,
            y: 60,
            z: 130
          },
          shadow: {
            z: -40
          }
        }
      } else {
        this.infoModalContent = {
          id: "A-305",
          title: "Realidade Aumentada",
          type: 'ar',
          model: 'helicopter.gltf',
          id: 'heli',
          ext: 'gltf',
          scale: 1,
          scaleFactor: 1,
          auto_rotate: false,
          lights: {
            ambientIntensity: 0.6,
            pointIntensity: 0.1,
            directionalIntensity: 0.8,
          },
          camera: {
            x: 0,
            y: 80,
            z: 300
          },
          shadow: {
            z: -120
          }
        };
      }
      this.isArModal = true;
      this.$nextTick(() => {
        this.$refs?.arModal?.show();
      });
    },
    arClosed() {
      this.isArModal = false;
    },
  },
};
</script>

<style lang="scss">
.experience {
  @include set-size(100%, 100%);
  position: relative;

  .ar-buttons {
    @include center-x(fixed);
    bottom: 4vh;
    display: flex;
    justify-content: space-around;

    .default-button {
       margin-right: 1.5vw;
    }
  }
}
</style>
