<template>
  <div class="footer-component" :class="{'footer-component__experience': $route.name == 'Experience'}">
    <div class="footer-component__line" :class="{'experience': $route.name == 'Experience'}" v-if="$route.name != 'Experience'"></div>
    <h3 class="footer-component__title" v-if="$route.name == 'Experience'">EXPERIÊNCIA IMERSIVA DIGITAL:<br><strong>LEONARDO DA VINCI – 500 ANOS DE UM GÊNIO</strong></h3>
    <p class="footer-component__description" v-if="$route.name == 'Experience'">
      <br>
      O MIS Experience, instituição da Secretaria de Cultura e Economia Criativa do Governo do Estado de São Paulo, inaugura a experiência imersiva digital <strong>Leonardo da Vinci – 500 Anos de um Gênio</strong>. Uma plataforma que possibilita ao visitante conhecer a vida e o legado de Da Vinci por meio de uma experiência interativa inédita no país.
      <br>
      <br>
      Criada em parceria com o <strong>Museo Leonardo da Vinci</strong>, em Roma, e contando com a colaboração de diversos especialistas e historiadores da Itália e da França, a exposição foi desenvolvida pela <strong>Grande Exhibitions</strong>, empresa sediada em Melbourne, na Austrália, com escritórios no Reino Unido e nos EUA.
      <br>
      <br>
      A experiência imersiva digital é patrocinada por Cielo e Sabesp; com parceria da TV Cultura; apoio Institucional da Folha; desenvolvimento da experiência digital: Agência EKO e XCAVE Studio; concepção, Grande Exhibitions e Sensory 4 Immersive Experience. Uma realização do MIS Experience e da Secretaria de Economia Criativa do Governo do Estado de São Paulo.
    </p>
    <a @click="closeFooter" class="footer-component__sponsors-close">
      <img
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
    <div class="governo-bot bg-color-1" v-if="$route.name != 'Experience'">
      <div class="governo-bot-content">         
        <img src="https://www.mis-sp.org.br/assets/site/img/gov-sp-logo-white.png" alt="" class="governo-bot-logo">
        <div class="governo-bot-links">
          <ul>
            <li><a target="_blank" href="http://www.cultura.sp.gov.br/ouvidoria">Ouvidoria</a></li>
            <li><a target="_blank" href="http://www.transparencia.sp.gov.br/">Transparência</a></li>
            <li><a target="_blank" href="http://www.sic.sp.gov.br/">SIC</a></li>
          </ul>
        </div>
      </div>
    </div>
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
  padding: 6vh 8.27vw 4vh 8.27vw;
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
  .footer-component__title {
    text-align: left;
    @include font-scale(1366, 1680, 24, 32);
    font-family: $gar-bold;
    color: $white;
    width: 62vw;
    margin: 0 auto;

    @include maxWidth(1023) {
      width: 90vw;
      padding-top: 11vh;
      font-size: 16px;
    }

    strong{
      font-family: $gar-bold;
    }
  }
  > a {
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

    .footer-component__sponsors {
      width: 62vw;
      margin: 40px auto;
    }

    @include maxWidth(1023) {
      height: calc(100% - 80px);
      overflow-y: auto;
    }



    .footer-component__sponsors-close {
      display: block;
      width: 15px;
      position: absolute;
      top: 32px;
      right: 32px;
      cursor: pointer;

      img {
        width: 100%;
      }

      &:hover {
        opacity: 0.7;
      }
      @include maxWidth(768) {
        width: 26px;
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

   &__experience {

    .footer-component__sponsors {
      width: 62vw;
      margin: 40px auto;
    }
  }
}

.governo-bot{
  height:auto;
  padding-bottom:50px;
  margin-top: 70px;
}
.governo-bot-content{
  width:100%;max-width:1640px;height:100px;margin:auto;border-bottom:10px solid #fff;border-bottom-right-radius:10px;

  @include maxWidth(1023) {
    width: 90%;
  }
}
@media only screen and (max-width:600px){
  .governo-bot-content{
  height:auto;text-align:right
  }
}
.governo-bot-links{
  float:right;display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;margin:0 100px
}
.governo-bot-links ul{
  display:-webkit-box;display:-ms-flexbox;display:flex;margin:auto 0 10px
}
.governo-bot-links ul li{
  padding:0 25px;border-right:1px solid #fff
}
.governo-bot-links ul li a{
  font-family: $rob-regular;
  color:#fff
}
.governo-bot-links ul li a:hover{
  color:#e0e20c
}
.governo-bot-links ul li:last-of-type{
  border-right:none
}
@media only screen and (max-width:600px){
  .governo-bot-links ul{
    display:block;width:100%
  }
}
@media only screen and (max-width:992px){
  .governo-bot-links{
    margin:0;float:none
  }
}
.governo-bot-logo{
  height:100%;float:right;margin:auto 0 10px;padding:20px 0 10px
}
@media only screen and (max-width:600px){
  .governo-bot-logo{
    float:none
  }
}
</style>