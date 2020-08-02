<template>
  <div class="ticket-comp">
    <h3 class="auth__subtitle auth__subtitle-name">
      Olá,
      <strong>{{user.name}}</strong>
    </h3>
    <h3 class="auth__title">VALIDE SEU TICKET SYMPLA</h3>
    <h4 class="auth__subtitle auth__subtitle-desc">Digite seu código de acesso</h4>
    <form class="ticket-comp__form">
      <div class="form-field" :class="{'error-field': codeError.length > 0}">
        <input
          id="code"
          v-model="formData.code"
          type="text"
          placeholder="RYD83PECCG"
          name="code"
          @blur="checkForm('code')"
        />
        <label for="code">CÓDIGO SYMPLA</label>
        <small class="error-message" v-html="codeError"></small>
      </div>
      <button
        class="default-button black ticket-comp__begin-bt"
        type="submit"
        @click="sendData"
        :disabled="!isValid"
      >CONTINUAR</button>
    </form>
    <div class="ticket-comp__register-disclaimer">
      <p>
        Ainda não tem ingresso
        <br />para experiência digital?
      </p>
      <a
        class="default-button white"
        href="https://www.sympla.com.br/teste-mis-davinci-digital-v1__904158"
        target="_blank"
      >COMPRAR INGRESSO DIGITAL</a>
    </div>
  </div>
</template>

<script>
import { TweenMax, Quad } from "gsap";
import Splitting from "splitting";
export default {
  name: "Login",
  data() {
    return {
      errors: [""],
      formData: {
        email: null,
      },
      codeError: "",
      codeValid: false,
      isValid: false,
    };
  },
  watch: {
    formData: {
      handler(newVal, oldVal) {
        if (newVal.code) this.checkForm("code");
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(this.show);
  },
  methods: {
    show() {
      const splittingTitle = Splitting({
        target: this.$el.querySelector(".auth__title"),
        by: "words",
      });
      const splittingSubtitleName = Splitting({
        target: this.$el.querySelector(".auth__subtitle-name"),
        by: "words",
      });
      const splittingSubtitle = Splitting({
        target: this.$el.querySelector(".auth__subtitle-desc"),
        by: "words",
      });

      window.scrollTo(0, 0);
      TweenMax.staggerFromTo(
        ".form-field",
        0.4,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: Quad.easeInOut, delay: 0.8 },
        0.02
      );
      TweenMax.staggerFromTo(
        [
          splittingTitle[0].words,
          splittingSubtitle[0].words,
          splittingSubtitleName[0].words,
        ],
        0.6,
        { scale: 1.6, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, ease: Quad.easeInOut, delay: 0.8 },
        0.01
      );
      TweenMax.fromTo(
        ".ticket-comp__begin-bt",
        0.6,
        { y: "300%" },
        { y: "0%", ease: Quad.easeInOut, delay: 0.8 }
      );
      TweenMax.fromTo(
        ".ticket-comp__register-disclaimer",
        0.6,
        { y: "300%" },
        { y: "0%", ease: Quad.easeInOut, delay: 0.8 }
      );
    },
    hide() {},
    goToRegister() {
      this.$emit("go-register");
    },
    checkForm(type) {
      // e.preventDefault();
      // this.sendData()
      // return

      this.errors = [];

      if (type == "code") {
        if (!this.formData.code) {
          this.errors.push("Código obrigatório");
          this.codeError = "*Código obrigatório";
          this.codeValid = false;
        } else if (this.formData.code && this.formData.code.length < 6) {
          this.errors.push("O código deve conter 10 dígitos.");
          this.codeError = "O código deve conter 10 dígitos.";
          this.codeValid = false;
        } else {
          this.codeError = "";
          this.codeValid = true;
        }
      }

      this.isValid = this.codeValid;
    },
    sendData(e) {
      this.$store.dispatch("loading", true);
      e.preventDefault();
      const formData = {
        userId: this.user.id,
        ticketNumber: this.formData.code,
      };
      this.$store.dispatch("checkIn", formData).then((e) => {
        const { status, data } = e?.response;
        if (status >= 200 && status <= 204) {
          this.$router.push("/experience");
          this.$store.dispatch("loading", false);
        } else {
          let message = data.message;
          if (status == 404) {
            message = "Ticket não encontrado no Sympla.";
          }
          this.$store.dispatch("warning", {
            show: true,
            text: message,
          });
          this.$store.dispatch("loading", false);
        }
      });
    },
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>>

<style lang="scss">
.ticket-comp {
  @include set-size(100%, auto);
  overflow: hidden;
  position: relative !important;

  .ticket-comp__form {
    padding-bottom: 40px;
    overflow: hidden;
  }

  .ticket-comp__register-disclaimer {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $black;
    font-family: $got-medium;
    @include font-size(14);
    span {
      font-family: $got-medium;
    }

    p {
      text-shadow: 0px 0px 1px #000;
    }
  }

  .ticket-comp__begin-bt {
    width: 150px;
    display: block;
    margin: 40px auto 20px auto;
    border: 0;
    outline: none;

    &:disabled {
      background-color: rgba(255, 255, 255, 0.8) !important;
      color: #b8b8b8;
      cursor: not-allowed;
    }
  }

  @include maxWidth(1023) {
    .ticket-comp__register-disclaimer {
      display: block;
      width: 100%;

      > .default-button {
        margin-top: 15px;
      }
    }

    .ticket-comp__begin-bt {
      margin-top: 15px;
    }
  }
}
</style>