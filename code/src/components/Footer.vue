<template>
  <div class="footer-component">
    <div class="footer-component__line"></div>
    <a @click="closeFooter">
      <img
        class="footer-component__sponsors close"
        src="~@/assets/images/icons/close-info.png"
        alt="Esconder patrocinadores"
      />
    </a>

    <img
      class="footer-component__sponsors desk"
      src="~@/assets/images/footer-sponsors.png"
      alt="Apoio e patrocínio"
    />
    <img
      class="footer-component__sponsors mobile"
      src="~@/assets/images/footer-sponsors-mobile.png"
      alt="Apoio e patrocínio"
    />
  </div>
</template>
<script>
export default {
  methods: {
    closeFooter() {
      document
        .querySelector(".footer-component__experience")
        .classList.remove("open");
    },
  },
};
</script>
<style lang="scss">
.footer-component {
  background-color: $black;
  padding: 14.1vh 8.27vw;
  position: relative;
  a {
    display: none;
  }

  &__experience {
    padding: 7vh 8.27vw;
    position: fixed;
    height: auto;
    bottom: -100%;
    width: 100vw;
    transition: bottom 0.8s ease-in-out;
    &.open {
      bottom: 0;
    }

    a {
      display: block;
      width: 15px;
      position: absolute;
      top: 16px;
      right: 8vw;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }
  }
  @include maxWidth(768) {
    padding: 0;
  }
  .footer-component__line {
    @include set-size(calc(100% - 16.52vw), 1px);
    @include center-x(absolute);
    top: 0;
    background-color: $white;
  }

  .footer-component__sponsors {
    @include set-size(100%, auto);
    margin: 0 auto;

    &.mobile {
      display: none;
    }

    @include maxWidth(768) {
      &.mobile {
        display: block;
      }
      &.desk {
        display: none;
      }
    }
  }
}
</style>