<template>
  <div id="app">
    <Header />
    <router-view/>
    <Loading v-if="$store.getters.loadingShow" />
    <Warning v-if="$store.getters.warningShow.show" :text="$store.getters.warningShow.text" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading'
import Warning from '@/components/Warning'

export default {
  components: { Header, Footer, Loading, Warning },
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
    console.log(this.$store.getters.warning)
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

  .governo-top {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
  }
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
