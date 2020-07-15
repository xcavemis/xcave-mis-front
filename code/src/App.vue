<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  components: { Header, Footer },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    user(){
      return this.$store.getters.user
    }
  },
  created() {
    this.$store.dispatch("autoLogin").then(res => {
      console.log('auto login: ', res)
    });
  }
}
</script>
<style lang="scss">
#app {
  @include set-size(100%, 100%);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
