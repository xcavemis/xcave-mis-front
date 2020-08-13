<template>
  <div class="footer-component" :class="{'footer-component__experience': $route.name == 'Experience'}">
    <div class="footer-component__line" :class="{'experience': $route.name == 'Experience'}"></div>
    <p class="footer-component__description" v-if="$route.name == 'Experience'">
      <br>
      EXPERIÊNCIA IMERSIVA DIGITAL: <strong>LEONARDO DA VINCI – 500 ANOS DE UM GÊNIO</strong>
      <br>
      <br>
      O MIS Experience, instituição da Secretaria de Cultura e Economia Criativa do Governo do Estado de São Paulo, inaugura a experiência imersiva digital <strong>Leonardo da Vinci – 500 Anos de um Gênio</strong>. Uma plataforma que possibilita ao visitante conhecer a vida e o legado de Da Vinci por meio de uma experiência interativa inédita no país.
      <br>
      <br>
      Criada em parceria com o <strong>Museo Leonardo da Vinci</strong>, em Roma, e contando com a colaboração de diversos especialistas e historiadores da Itália e da França, a exposição foi desenvolvida pela <strong>Grande Exhibitions</strong>, empresa sediada em Melbourne, na Austrália, com escritórios no Reino Unido e nos EUA.
      <br>
      <br>
      A experiência imersiva digital é patrocinada por Cielo e Sabesp; com parceria da TV Cultura; apoio Institucional da Folha; desenvolvimento da experiência digital: Agência EKO e XCAVE Studio; concepção, Grande Exhibitions e Sensory 4 Immersive Experience. Uma realização do MIS Experience e da Secretaria de Economia Criativa do Governo do Estado de São Paulo.
    </p>
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
  // padding: 14.1vh 8.27vw 9vh 8.27vw;
  padding: 2vh 8.27vw 2vh 8.27vw;
  position: relative;
  z-index: 4;

  .footer-component__description {
    text-align: left;
    @include font-scale(1366, 1680, 13, 16);
    font-family: $rob-regular;
    color: $white;
    width: 62vw;
    margin: 0 auto;

    @include maxWidth(1023) {
      width: 90vw;
      padding-top: 5vh;
    }

    strong{
      font-family: $rob-bold;
    }
  }
  a {
    display: none;
  }

  &__experience {
    padding: 5vh 8.27vw 0vh 8.27vw;
    position: fixed;
    height: auto;
    bottom: -100%;
    width: 100vw;
    transition: bottom 0.8s ease-in-out;
    z-index: 100;
    &.open {
      bottom: 0;
    }

    @include maxWidth(1023) {
      height: calc(100% - 80px);
      overflow-y: auto;
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
      @include maxWidth(768) {
        a {
          top: 15vh;
          width: 32px;
        }
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

    &.experience {
      @include set-size(100%, 1px);
    }
  }

  .footer-component__sponsors {
    @include set-size(100%, auto);
    margin: 0 auto;

    &.mobile {
      display: none;
    }

    @include maxWidth(768) {
      &.mobile {
        @include set-size(90%, auto);
        padding-top: 32px;
        display: block;
      }
      &.desk {
        display: none;
      }
    }
  }
}
</style>