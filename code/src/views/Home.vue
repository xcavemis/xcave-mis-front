<template>
  <article class="home">
    <section class="home-step first-step">
      <!-- <VideoPlayerStream /> -->
      <!-- <ShaderBg v-if="$route.name == 'Home' && !isMobile" /> -->
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
        <p class="first-step__center-content__description" >
          Transporte-se para o incrível mundo de um dos maiores gênios de todos os tempos, Leonardo Da Vinci. Uma experiência multissensorial com animações gráficas em alta definição, realidade aumentada, lives educativas, imagens em alta resolução, áudio e vídeos. Conheça a história completa, em detalhes, da vida do mestre Da Vinci, em um ambiente digital e imersivo. Ao comprar o ingresso você ajuda a manter as atividades do MIS Experience.
        </p>
        <div class="first-step__center-content__buttons">
          <a
            class="default-button first-step__center-content__button white"
            href="javascript:void(0)"
            @click="goTo"
          >INICIAR EXPERIÊNCIA</a>
          <a
            class="default-button first-step__center-content__button black"
            href="https://davincidigital.byinti.com/"
            target="_blank"
          >COMPRAR INGRESSO</a>
        </div>
        <img class="first-step__ad" src="~@/assets/images/adcontainer_hor.png" />
      </div>
    </section>
    <section class="home-step second-step"></section>
    <section class="home-step third-step">
      <div class="third-step__center-content">
        <h1 class="third-step__center-content__title">
          Leonardo Da Vinci -
          <br />500 Anos de um Gênio
        </h1>
        <p class="third-step__center-content__description">
          O MIS Experience, instituição da Secretaria de Cultura e Economia Criativa do Governo do Estado de São Paulo, apresenta a exposição digital <strong>Leonardo Da Vinci: 500 Anos de um Gênio</strong>. De modo totalmente imersivo, o visitante conhece a vida e o legado do artista italiano por meio de uma experiência inédita no país.
          <br />
          <br />Criada em parceria com o <strong>Museo Leonardo Da Vinci</strong>, de Roma, em colaboração com diversos especialistas e historiadores da Itália e da França, a exposição é desenvolvida pela <strong>Grande Exhibitions</strong>, empresa sediada em Melbourne, na Austrália, com escritórios no Reino Unido e nos EUA.
          <br />
          <br />Esta é a mais completa e detalhada mostra sobre o trabalho de <strong>Leonardo Da Vinci</strong>. São 18 áreas temáticas, que contam a trajetória do grande gênio renascentista, apresentando réplicas de máquinas que foram desenhadas pelo artista. Os visitantes têm a oportunidade de conhecer a mente do homem que lançou as bases para algumas das invenções mais notáveis da sociedade moderna, como o helicóptero, o automóvel, o submarino, o paraquedas e a bicicleta. O conteúdo apresentado permite uma experiência multissensorial com animações gráficas em alta definição, combinadas com uma plataforma digital. Assim, o público, de todas as idades, pode vivenciar a história de maneira divertida, educativa e esclarecedora.
          <br />
          <br /><strong>Leonardo da Vinci - 500 Anos de um Gênio</strong>, ainda apresenta os <strong>Segredos de Mona Lisa</strong> – uma análise da pintura mais famosa do mundo, realizada no <strong>Museu do Louvre</strong> por Pascal Cotte, renomado engenheiro, pesquisador e fotógrafo de obras de arte.
          <br />
          <br />A experiência imersiva digital é patrocinada por Cielo e Sabesp; com parceria da TV Cultura; apoio Institucional da Folha; desenvolvimento da experiência digital: Agência EKO e XCAVE Studio; concepção, Grande Exhibitions e Sensory 4 Immersive Experience. Uma realização do MIS Experience e da Secretaria de Economia Criativa do Governo do Estado de São Paulo.
        </p>
        <div class="third-step__center-content__buttons">
          <a
            class="default-button third-step__center-content__button white"
            href="javascript:void(0)"
            @click="goTo"
          >INICIAR EXPERIÊNCIA</a>
          <a
            class="default-button third-step__center-content__button orange"
            href="https://davincidigital.byinti.com/"
            target="_blank"
          >COMPRAR INGRESSO</a>
        </div>
      </div>
      <img class="third-step__ad desk" src="~@/assets/images/adcontainer_vert.png" />
      <img
        class="third-step__ad mob"
        src="~@/assets/images/adcontainer_hor.png"
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
    <Auth ref="authComp" v-if="authShow" v-on:closed="onAuthClosed" />
  </article>
</template>

<script>
import Auth from "@/components/Auth";
import { TweenMax, Quad } from 'gsap';
import Splitting from "splitting";
// import VideoPlayerStream from "@/components/VideoPlayerStream";
// import ShaderBg from "@/components/ShaderBg";
export default {
  name: "Home",
  components: { 
    Auth, 
    // VideoPlayerStream,
    // ShaderBg 
  },
  data: () => ({
    authShow: false,
    isMobile: window.innerWidth < 1024,
  }),
  mounted(){
    TweenMax.set('html, body', { overflow: 'auto' })
    this.$nextTick(()=>{
      this.show()
    })
  },
  methods: {
    show(){ 
      
      this.splittingTitle = Splitting({
        target: this.$el.querySelector(".first-step__center-content .first-step__center-content__description"),
        by: "lines",
      });
      TweenMax.fromTo(this.$el, 1, { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.6, ease: Quad.easeInOut, onComplete: ()=> {

        TweenMax.fromTo('.governo-top', 0.6, { y: '-100%' }, { y: '0%', delay: 0.8, ease: Quad.easeInOut })
        TweenMax.fromTo('.first-step__logo-mis', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.4, ease: Quad.easeInOut })
        TweenMax.fromTo('.first-step__center-content .first-step__center-content__title', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.6, ease: Quad.easeInOut})
        TweenMax.fromTo('.first-step__center-content .first-step__center-content__description', 1, { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.8, ease: Quad.easeInOut})
        TweenMax.fromTo('.first-step__ad', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, delay: 1.4, ease: Quad.easeInOut})
        this.splittingTitle[0].lines.map((line, index) => {
          TweenMax.fromTo(
            line,
              0.6,
              { autoAlpha: 0 },
              { autoAlpha: 1, ease: Quad.easeInOut, delay: 0.8 + (index / 10) }
          );
        })
        TweenMax.staggerFromTo('.first-step__center-content .first-step__center-content__button', 0.6, { y: '150%' }, { y: '0%', ease: Quad.easeInOut, delay: 1.2}, 0.1, ()=>{
          // setTimeout(()=>{
          //   document.querySelector('.first-step__center-content__button.white').classList.add('pulse')
          // }, 1000)
        })
      }})
    },
    goTo() {
      
      this.$store.dispatch("tokenCheck").then((res) => {
        if (
          res &&
          res.status >= 200 &&
          res.status <= 204 &&
          res.endTime != null &&
          this.validateTime(res.endTime)
        ) {
          this.$store.dispatch("autoLogin").then((res) => {
            console.log('autoLogin home', res)
            if (res &&
                res.user &&
                res.hasHoursAvaliable
              ) {
                this.$router.push("/experience");
            } else {
              this.showAuth()
            }
          });
        } else {
          this.showAuth()
        }
      });
      // document.body.scrollTo(0,0)
      // TweenMax.set('html, body', { overflowY: 'hidden', delay: 0.6})
      // this.authShow = true;
      // this.$nextTick(() => {
      //   this.$refs?.authComp?.show();
      // });
    },
    showAuth(){
      document.body.scrollTo(0,0)
      TweenMax.set('html, body', { overflowY: 'hidden', delay: 0.6})
      this.authShow = true;
      this.$nextTick(() => {
        this.$refs?.authComp?.show();
      });
    },
    onAuthClosed(){
      TweenMax.set('html, body', { overflowY: 'auto'})
      this.authShow = false;
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
  background-color: $black;
  opacity: 0;
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

  @include maxWidth(1023) {
    height: 95vh;
  }
  
  .shader-bg {
    // opacity: 0;
  }

  .first-step__logo-mis {
    width: 200px;
    position: absolute;
    top: 97px;
    left: 103px;
    opacity: 0;

    @include maxWidth(1366) {
      width: 240px;
    }

    @include maxWidth(768) {
      @include center-x(absolute);
      top: 130px;
    }
    @include maxHeight(767) {
      width: 130px;
      top: 97px;
    }
  }

  .first-step__center-content {
    @include center(absolute);
    width: 80vw;
    max-width: 900px;
    margin-top: 5vh;

    .first-step__center-content__title {
      width: 35.1vw;
      margin: 0 auto 40px auto;
      opacity: 0;
      max-width: 480px;
    }
    .first-step__center-content__description {
      @include font-scale(1366, 1680, 14, 17);
      font-family: $rob-regular;
      text-align: center;
      color: $white;
      margin: 0;
      text-shadow: 0px 0px 4px #000000;
      line-height: 1.2;
      .word {
        opacity: 0;
        .char {
          opacity: 0;
        }
      }
    }

    .first-step__center-content__buttons {
      width: 328px;
      margin: 40px auto 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;

      .first-step__center-content__button {
        min-width: 150px;
        transform: translateY(150%);
      }
    }

    @include maxWidth(768) {
      width: 95vw;
      margin-top: 5vh;
      .first-step__center-content__title {
        width: 80%;
        @include font-size(15);
        line-height: 19px;
      }

      .first-step__center-content__description {
        width: 90%;
        margin: 0 auto;
        @include font-size(13);
        br {
          display: none;
        }
      }

      .first-step__center-content__buttons {
        margin-top: 5vh;
        // display: block;
        .first-step__center-content__button {
          min-width: 0;
          width: 45%;
          @include font-size(10);
          padding: 15px;
          // display: block;
          margin: 0 auto 15px auto;
        }
      }
    }

    @include maxWidth(375) {
      margin-top: 8vh;
      .first-step__center-content__title {
        margin: 0 auto 20px auto;
      }

      .first-step__center-content__description {
        @include font-size(12);
      }

      .first-step__center-content__buttons {
        margin-top: 3vh;
        // display: block;
        .first-step__center-content__button {
          min-width: 0;
          width: 45%;
          @include font-size(10);
          padding: 15px;
          // display: block;
          margin: 0 auto 5px auto;
        }
      }
    }
  }
  .first-step__ad {
    // position: absolute;
    margin-top: 10vh;
    max-width: 730px;
    width: 90%;
    opacity: 0;
    @include maxHeight(700) {
      margin-top: 7vh;
    }
    @include maxHeight(580) {
      max-width: 500px;
    }

    // @include center-x(absolute);
    // bottom: 70px;
    @include minWidth(1440) {
      // bottom: 50px;
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

      strong{
        font-family: $rob-bold;
      }
    }
   

    .third-step__center-content__button {
      margin-right: 25px;
    }
  }
  @include maxWidth(1023) {
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

       .third-step__center-content__buttons {
          display: flex;
          justify-content: space-around;
       }

      .third-step__center-content__button {
        @include font-size(10);
        margin: 0 0 24px 0;
        width: 40vw;
      }
    }
  }
  @include maxWidth(375) {
    .third-step__center-content {
      .third-step__center-content__title {
        @include font-size(28);
        line-height: 28px;
      }
      .third-step__center-content__description {
        @include font-size(14);
        line-height: 18px;
      }

      .third-step__center-content__button {
        @include font-size(9);
        margin: 0 0 24px 0;
        width: 38vw;
      }
    }
  }
}
.third-step__ad {
  &.isMobile {
    
  }

  &.desk {
    display: none;
  } 

  &.mob {
    display: block;
    max-width: 730px;
    width: 100%;
  }

  @include minWidth(1024) {
    @include center-y(absolute);
    right: 120px;

    &.desk {
      display: block;
    } 
    &.mob {
      display: none;
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
