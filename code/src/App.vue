<template>
  <div id="app">
    <Header />
    <transition :name="transitionName">
      <router-view />
    </transition>
    <Loading v-if="$store.getters.loadingShow" />
    <Warning ref="warning" v-if="$store.getters.warningShow.show" :text="$store.getters.warningShow.text" />
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
          this.$router.push("/");
        }
      }
    },
    '$store.getters.warningShow.show': function(val, old){
      if (val != old) {
        if (val == true) {
          this.$nextTick(()=>{
            this.$refs?.warning?.show()
          })
        }
      }
    },
  },
  data: () => ({
    transitionName: 'slide-left',
    firstAccess: true,
  }),
  created() {
    if (this.firstAccess && this.$route.name != "Home") {
      this.$router.push("/");
      this.firstAccess = false
    }
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

    @include maxWidth(1023) {
      width: 0px;
    }
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
