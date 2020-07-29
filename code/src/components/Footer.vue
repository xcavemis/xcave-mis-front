<template>
    <div class="footer-component">
        <div class="footer-component__line"></div>
        <img class="footer-component__sponsors desk" src="~@/assets/images/footer-sponsors.png" alt="Apoio e patrocínio" />
        <img class="footer-component__sponsors mobile" src="~@/assets/images/footer-sponsors-mobile.png" alt="Apoio e patrocínio" />
    </div>
</template>

<style lang="scss">
.footer-component {
  background-color: $black;
  padding: 14.1vh 8.27vw;
  position: relative;
  @include maxWidth(768) {
    padding: 14.1vh 0;
  
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