<template>
  <div id="app">
    <Header />
    <transition :name="transitionName">
      <router-view />
    </transition>
    <Loading v-if="$store.getters.loadingShow" />
    <Warning v-if="$store.getters.warningShow.show" :text="$store.getters.warningShow.text" />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Warning from "@/components/Warning";

export default {
  components: { Header, Footer, Loading, Warning },
  watch: {
    $route(to, from) {
      if (to !== from) {
        if (!this.auth && to.name != "Home") {
          // this.$router.push("/");
        }
      }
    },
  },
  data: () => ({
    transitionName: 'slide-left'
  }),
  // beforeRouteUpdate (to, from, next) {
  //   const toDepth = to.path.split('/').length
  //   const fromDepth = from.path.split('/').length
  //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  //   next()
  // },
  created() {
    this.$store.dispatch("autoLogin").then((res) => {
      // console.log("auto login: ", res);
      if (!this.auth && this.$route.name != "Home") {
        // this.$router.push("/");
      }
    });
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.user;
    },
  },
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
    transform: translateY(-100%);
  }

  /* width */
  &::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #cccccc;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e4e4e4;
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
