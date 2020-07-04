<template>
  <article class="home">
    <section class="home-step">

    </section>
    <section class="home-step second">

    </section>
    <section class="home-step sponsors">
      <img class="sponsors__image" src="https://www.mis-sp.org.br/images/events/eMus2c3hqybAsMG3ppm7C0oYsUjueHRWzqvhjecj.jpeg" alt="">
    </section>
  </article>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {}
}
</script>

<style lang="scss">
.home {
  // @include set-size(100%, 100%);
}

.home-step {
  @include set-size(100%, 100%);

  &.second {
    background-color: purple;
  }

  &.sponsors {
    background-color: $white;
    .sponsors__image {
      margin: 0 auto;
      width: 82.8%;
      max-width: 1280px;
    }
  }
}
</style>
