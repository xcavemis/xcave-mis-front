<template>
  <article class="home">
    <section class="home-step first-step">
      <div class="first-step__center-content">
        <img class="first-step__center-content__title" src="~@/assets/images/logo-da-vinci.png" alt="LEONARDO DA VINCI – 500 ANOS DE UM GÊNIO" />
        <p class="first-step__center-content__description">
          Leonardo da Vinci - 500 Anos de um Gênio traz ainda os Segredos de Mona Lisa – uma análise da<br>
          pintura mais famosa do mundo, realizada no Museu do Louvre por Pascal Cotte,<br>
          renomado engenheiro, pesquisador e fotógrafo de obras de arte.
        </p>
        <div class="first-step__center-content__buttons">
          <a class="default-button first-step__center-content__button white" href="javascript:void(0)" @click="goTo">INICIAR EXPERIÊNCIA</a>
          <a class="default-button first-step__center-content__button black" href="https://www.sympla.com.br/" target="_blank">COMPRAR INGRESSO</a>

        </div>
      </div>
    </section>
    <section class="home-step second-step">
      <div class="second-step__center-content">
        <h1 class="second-step__center-content__title">UMA EXPERIÊNCIA DIGITAL <br>INÉDITA NO BRASIL</h1>
        <p class="second-step__center-content__description">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
        <a class="second-step__center-content__button" href="https://www.sympla.com.br/" target="_blank">COMPRAR INGRESSO</a>
      </div>
    </section>
    <section class="home-step sponsors">
      <img class="sponsors__image" src="https://www.mis-sp.org.br/images/events/eMus2c3hqybAsMG3ppm7C0oYsUjueHRWzqvhjecj.jpeg" alt="">
    </section>
    <section class="home-step banner">
      <div class="banner__center-content">
        <h1 class="banner__center-content__title">Bem vindo à experiência Digital MIS<br>LEONARDO DA VINCI – 500 ANOS DE UM GÊNIO</h1>
        <a class="banner__center-content__button" href="https://www.sympla.com.br/" target="_blank">COMPRAR INGRESSO</a>
      </div>
    </section>
    <Auth ref="authComp" v-if="authShow" />
  </article>
</template>

<script>
import Auth from '@/components/Auth'
export default {
  name: 'Home',
  components: { Auth },
  data: () => ({
    authShow: false
  }),
  methods: {
    goTo() {
      // this.$router.push('/experience')
      this.$store.dispatch("tokenCheck").then(res => {
        console.log('tokenCheck: ', res)
        if (res && res.status == 200 && this.validateTime(res.endTime)) {this.$router.push('/experience')
        } else {
          this.authShow = true
          this.$nextTick(()=>{
            this.$refs.authComp.show()
          })
        }
      });
    },
    validateTime(date){
      return (new Date(date) - new Date()) > 0
    },
  }
}
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

  .first-step__center-content {
    @include center(absolute);
    width: 80vw;

    .first-step__center-content__title {
      width: 35.1vw;
      margin: 0 auto 40px auto;
    }
    .first-step__center-content__description {
      @include font-size(14);
      // line-height: 48px;
      font-family: $rob-regular;
      text-align: center;
      color: $white;
      margin: 0;
      text-shadow: 0px 0px 4px #000000;
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
      .first-step__center-content__title {
        @include font-size(15);
        line-height: 19px;
      }

      .first-step__center-content__button {
        @include font-size(14);
        padding: 15px 30px;
      }
    }
  }
}

.second-step {
  position: relative;
  .second-step__center-content {
    @include center(absolute);
    width: 80vw;
    text-align: left;
    .second-step__center-content__title {
      @include font-size(62);
      line-height: 68px;
      color: $white;
      margin: 0;
    }
    
    .second-step__center-content__description {
      width: 50vw;
      text-align: left;
      @include font-size(24);
      line-height: 30px;
      color: $white;
      margin: 73px 0;
    }

    .second-step__center-content__button {
      text-align: left;
      @include font-size(16);
      color: $white;
      padding: 15px 30px;
      margin: 50px auto 0 auto;
      background-color: #e0e20c;
      color: $black;
      display: inline-block;
      border-radius: 8px;
    }

  }
  @include maxWidth(1024) {
    height: auto;
    padding: 30px;
    .second-step__center-content {
      @include reset-pos;
      .second-step__center-content__title {
        @include font-size(20);
        line-height: 24px;
      }
      .second-step__center-content__description {
        margin: 50px 0 30px 0;
        @include font-size(14);
        line-height: 18px;
      }

      .second-step__center-content__button {
        @include font-size(14);
        padding: 15px 30px;
        margin: 0;
      }
    }
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
