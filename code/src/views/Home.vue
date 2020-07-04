<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Pano />
  </div>
</template>

<script>
// @ is an alias to /src
import Pano from '@/components/Pano.vue'

export default {
  name: 'Home',
  components: {
    Pano
  }
}
</script>
