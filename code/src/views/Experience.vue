<template>
  <div class="experience">
    <Pano />
    <HeaderControls />
    <FooterControls />
  </div>
</template>

<script>
// @ is an alias to /src
import Pano from '@/components/Pano.vue'
import FooterControls from '@/components/pano/FooterControls.vue'
import HeaderControls from '@/components/pano/HeaderControls.vue'

export default {
  name: 'experience',
  components: {
    Pano,
    FooterControls,
    HeaderControls,
  },
  mounted(){
    this.$store.dispatch('navigation_status', {
      room: 'militar',
      status: 'visited',
    })
  }
}
</script>

<style lang="scss">
.experience {
  @include set-size(100%, 100%);
  position: relative;

  .footer-controls {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .header-controls {
    position: absolute;
    left: 0;
    top: 70px;
  }
}
</style>
