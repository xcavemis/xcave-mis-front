<template>
  <article class="home">
    <section class="home-step first-step">
      <img
        class="first-step__logo-mis"
        src="~@/assets/images/logo-mis-exp.png"
        alt="MIS - MUSEU DA ARTE E DO SOM EXPERIENCE"
      />
      <div class="first-step__center-content">
        <img
          class="first-step__center-content__title"
          src="~@/assets/images/logo-da-vinci.png"
          alt="LEONARDO DA VINCI – 500 ANOS DE UM GÊNIO"
        />
        <p
          class="first-step__center-content__description"
        >Embarque numa experiência única e transporte-se para o incrível mundo de um dos maiores inventores de todos os tempos. Nessa versão digital você poderá ver todas as obras em detalhes, terá também acesso à vídeos especiais com informações importantes sobre o Gênio. Com a compra do ingresso você ajuda a manter as atividades do MIS Experience.</p>
        <div class="first-step__center-content__buttons">
          <a
            class="default-button first-step__center-content__button white pulse"
            href="javascript:void(0)"
            @click="goTo"
          >INICIAR EXPERIÊNCIA</a>
          <a
            class="default-button first-step__center-content__button black"
            href="https://www.sympla.com.br/teste-mis-davinci-digital-v1__904158"
            target="_blank"
          >COMPRAR INGRESSO</a>
        </div>
      </div>
      <img class="first-step__ad" src="~@/assets/images/adcontainer_hor.png" />
    </section>
    <section class="home-step second-step"></section>
    <section class="home-step third-step">
      <div class="third-step__center-content">
        <h1 class="third-step__center-content__title">
          Leonardo Da Vinci -
          <br />500 Anos de um Gênio
        </h1>
        <p class="third-step__center-content__description">
          O MIS Experience – criado pelo Governo do Estado de São Paulo, por meio da Secretaria de Cultura e Economia Criativa, e pelo Museu da Imagem e do Som, em parceria com a TV Cultura – inaugura com a exposição Leonardo da Vinci – 500 Anos de um Gênio. Uma experiência imersiva, que possibilitará ao visitante conhecer a vida e o legado de Da Vinci por meio de uma exclusiva galeria com projeções, capaz de promover uma experiência interativa inédita no país. A exposição é patrocinada pelo Bradesco, Cielo, Fiat, Pirelli, Sabesp e Vale.
          <br />
          <br />A mostra, considerada a investigação mais completa e detalhada sobre o trabalho de Leonardo da Vinci, apresenta 18 áreas temáticas que conta a trajetória do grande gênio renascentista e traz réplicas de máquinas desenhadas pelo artista italiano. Os visitantes terão uma experiência multissensorial com animações gráficas em alta definição, combinadas com um conteúdo multimídia e narrativa em áudio, o que permitirá ao público uma vivência divertida, educativa e esclarecedora a pessoas de todas as idades e interesses, sejam elas amantes de arte e da história. Os visitantes também terão a oportunidade de conhecer, pela primeira vez, a mente do homem que lançou as bases para algumas das invenções mais notáveis da sociedade moderna, como o helicóptero, o automóvel, o submarino, o paraquedas e a bicicleta.
          <br />
          <br />Criada em parceria com o Museo Leonardo da Vinci, em Roma, e contando com a colaboração de diversos especialistas e historiadores da Itália e da França, a exposição é criada pela Grande Exhibitions, empresa sediada em Melbourne, na Austrália, com escritórios no Reino Unido e nos EUA.
          <br />
          <br />Leonardo da Vinci - 500 Anos de um Gênio traz ainda os Segredos de Mona Lisa – uma análise da pintura mais famosa do mundo, realizada no Museu do Louvre por Pascal Cotte, renomado engenheiro, pesquisador e fotógrafo de obras de arte.
        </p>
        <a
          class="default-button third-step__center-content__button white"
          href="javascript:void(0)"
          @click="goTo"
        >INICIAR EXPERIÊNCIA</a>
        <a
          class="default-button third-step__center-content__button orange"
          href="https://www.sympla.com.br/teste-mis-davinci-digital-v1__904158"
          target="_blank"
        >COMPRAR INGRESSO</a>
      </div>
      <img class="third-step__ad" src="~@/assets/images/adcontainer_vert.png" v-if="!isMobile" />
      <img
        class="third-step__ad"
        :class="{isMobile: isMobile}"
        src="~@/assets/images/adcontainer_hor.png"
        v-else
      />
    </section>
    <!-- <section class="home-step sponsors">
      <img class="sponsors__image" src="https://www.mis-sp.org.br/images/events/eMus2c3hqybAsMG3ppm7C0oYsUjueHRWzqvhjecj.jpeg" alt="">
    </section>-->
    <!-- <section class="home-step banner">
      <div class="banner__center-content">
        <h1 class="banner__center-content__title">Bem vindo à experiência Digital MIS<br>LEONARDO DA VINCI – 500 ANOS DE UM GÊNIO</h1>
        <a class="banner__center-content__button" href="https://www.sympla.com.br/" target="_blank">COMPRAR INGRESSO</a>
      </div>
    </section>-->
    <Auth ref="authComp" v-if="authShow" />
  </article>
</template>

<script>
import Auth from "@/components/Auth";
export default {
  name: "Home",
  components: { Auth },
  data: () => ({
    authShow: false,
    isMobile: window.innerWidth < 1024,
  }),
  methods: {
    goTo() {
      this.$router.push("/experience");
      this.$store.dispatch("tokenCheck").then((res) => {
        if (
          res &&
          res.status >= 200 &&
          res.status <= 204 &&
          this.validateTime(res.endTime)
        ) {
          this.$router.push("/experience");
        } else {
          this.authShow = true;
          this.$nextTick(() => {
            this.$refs.authComp.show();
          });
        }
      });
    },
    validateTime(date) {
      return new Date(date) - new Date() > 0;
    },
  },
};
</script>

<style lang="scss">
.home {
  // @include set-size(100%, 100%);
  .auth {
    @include center(fixed);
  }
}

.home-step {
  @include set-size(100%, 100vh);

  &.sponsors {
    background-color: $white;
    height: auto;
    .sponsors__image {
      margin: 0 auto;
      width: 82.8%;
      max-width: 1280px;
    }
  }
}

.first-step {
  position: relative;
  background-image: url(~@/assets/images/bg-home-step1.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  .first-step__logo-mis {
    position: absolute;
    top: 97px;
    left: 103px;

    @include maxWidth(1023) {
      width: 100px;
      @include center-x(absolute);
    }
  }

  .first-step__center-content {
    @include center(absolute);
    width: 80vw;
    max-width: 900px;

    .first-step__center-content__title {
      width: 35.1vw;
      margin: 0 auto 40px auto;
    }
    .first-step__center-content__description {
      @include font-scale(1366, 1680, 14, 18);
      font-family: $rob-regular;
      text-align: center;
      color: $white;
      margin: 0;
      text-shadow: 0px 0px 4px #000000;
      line-height: 1.2;
    }

    .first-step__center-content__buttons {
      width: 328px;
      margin: 40px auto 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .first-step__center-content__button {
        min-width: 150px;
      }
    }

    @include maxWidth(1024) {
      width: 95vw;
      margin-top: 3vh;
      .first-step__center-content__title {
        width: 80%;
        @include font-size(15);
        line-height: 19px;
      }

      .first-step__center-content__description {
        width: 90%;
        margin: 0 auto;
        @include font-size(14);
        br {
          display: none;
        }
      }

      .first-step__center-content__buttons {
        margin-top: 5vh;
        display: block;
        .first-step__center-content__button {
          min-width: 0;
          width: 60%;
          @include font-size(12);
          padding: 15px 30px;
          display: block;
          margin: 0 auto 15px auto;
        }
      }
    }
  }
  .first-step__ad {
    position: absolute;
    max-width: 730px;
    width: 90%;

    @include center-x(absolute);
    bottom: 70px;
    @include minWidth(1440) {
      bottom: 50px;
    }
  }
}

.second-step {
  @include set-size(100%, 25.7vw);
  background-image: url(~@/assets/images/bg-home-divide.jpg);
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.third-step {
  position: relative;
  height: auto;
  background: #000000;
  padding: 14.1vh 8.27vw;
  .third-step__center-content {
    // @include center(absolute);
    width: 80vw;
    text-align: left;
    .third-step__center-content__title {
      @include font-size(48);
      line-height: 38px;
      font-family: $gar-regular;
      color: #cd9f3f;
      margin: 0;
    }

    .third-step__center-content__description {
      width: 50vw;
      text-align: left;
      @include font-scale(1366, 1680, 13, 18);
      font-family: $rob-regular;
      // line-height: 30px;
      color: $white;
      margin: 36px 0;
    }

    .third-step__center-content__button {
      margin-right: 25px;
    }
  }
  @include maxWidth(1024) {
    height: auto;
    padding: 30px;
    .third-step__center-content {
      width: 100%;
      @include reset-pos;
      .third-step__center-content__title {
        @include font-size(32);
        line-height: 32px;
        text-align: center;
      }
      .third-step__center-content__description {
        text-align: justify;
        width: 100%;
        margin: 50px auto 24px;
        @include font-size(16);
        line-height: 20px;
      }

      .third-step__center-content__button {
        @include font-size(10);
        margin: 0 5px 24px 0;
        width: 40vw;
      }
    }
  }
}
.third-step__ad {
  &.isMobile {
    max-width: 730px;
    width: 100%;
  }

  @include minWidth(1024) {
    @include center-y(absolute);
    right: 120px;
  }
}

.banner {
  height: 30vh;
  position: relative;
  .banner__center-content {
    @include center(absolute);
    width: 80vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .banner__center-content__title {
      text-align: left;
      @include font-size(30);
      line-height: 44px;
      color: $white;
      margin: 0;
    }

    .banner__center-content__button {
      text-align: center;
      @include font-size(16);
      color: $white;
      padding: 15px 30px;
      background-color: #e0e20c;
      color: $black;
      display: inline-block;
      border-radius: 8px;
    }
  }

  @include maxWidth(1024) {
    height: auto;
    padding: 30px;
    .banner__center-content {
      display: block;
      @include reset-pos;

      .banner__center-content__title {
        @include font-size(20);
        line-height: 24px;
        display: block;
        margin-bottom: 50px;
      }

      .banner__center-content__button {
        @include font-size(14);
        padding: 15px 30px;
        display: block;
      }
    }
  }
}
</style>
