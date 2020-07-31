<template>
  <div class="recovery">
    <h3 class="auth__title recovery">RECUPERAÇÃO DE SENHA</h3>
    <h4 class="auth__subtitle">Informe o email cadastrado</h4>
    <form class="recovery__form">
      <div class="form-field" :class="{'error-field': emailError.length > 0}">
        <input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="leonardo.da.vinci@mis.com.br"
          name="email"
          @blur="checkForm('email')"
        />
        <label for="email">E-MAIL</label>
        <small class="error-message" v-html="emailError"></small>
      </div>
      <button
        class="default-button black recovery__begin-bt"
        type="submit"
        @click="sendData"
        :disabled="!isValid"
      >CONTINUAR</button>
    </form>
    <div class="recovery__register-disclaimer">
      <p>Ainda não possui um cadastro?</p>
      <a class="default-button white" @click="goToRegister">CADASTRE-SE AQUI</a>
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
      emailError: "",
      emailValid: false,
      isValid: false,
    };
  },
  watch: {
    formData: {
      handler(newVal, oldVal) {
        if (newVal.email && newVal.email.length > 10) this.checkForm("email");
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
      const splittingSubtitle = Splitting({
        target: this.$el.querySelector(".auth__subtitle"),
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
        [splittingTitle[0].words, splittingSubtitle[0].words],
        0.6,
        { scale: 1.6, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, ease: Quad.easeInOut, delay: 0.8 },
        0.01
      );
      TweenMax.fromTo(
        ".recovery__begin-bt",
        0.6,
        { y: "300%" },
        { y: "0%", ease: Quad.easeInOut, delay: 0.8 }
      );
      TweenMax.fromTo(
        ".recovery__register-disclaimer",
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

      if (!this.formData.email) {
        this.errors.push("O email é obrigatório.");
        this.emailError = "*O email é obrigatório.";
        this.emailValid = false;
      } else if (!this.validEmail(this.formData.email)) {
        this.errors.push("Utilize um email válido.");
        this.emailError = "*Utilize um email válido.";
        this.emailValid = false;
      } else {
        this.emailError = "";
        this.emailValid = true;
      }

      this.isValid = this.emailValid;
    },
    sendData(e) {
      this.$store.dispatch("loading", true);
      e.preventDefault();
      const formData = {
        email: this.formData.email,
      };
      this.$store.dispatch("login", formData).then((e) => {
        console.log("login success", e);
        this.$router.push("/experience");
        // const { status, data, endTime } = e?.response;
        // if (status >= 200 && status <= 204) {
        //   if (this.validateTime(endTime)) {
        //     this.$router.push("/experience");
        //   } else {
        //     this.$emit("go-ticket");
        //   }
        //   this.$store.dispatch("loading", false);
        // } else {
        //   let message = data.message;
        //   if (status == 401) {
        //     message = "E-mail ou senha incorretos.";
        //   } else if (status == 400) {
        //     message = "E-mail ou senha inválidos.";
        //   } else if (status == 404) {
        //     message = "E-mail não encontrado.";
        //   } else {
        //     message = "Erro inesperado no servidor.";
        //   }
        //   this.$store.dispatch("warning", {
        //     show: true,
        //     text: message,
        //   });
        //   this.$store.dispatch("loading", false);
        // }
      });
    },
    validateTime(date) {
      return new Date(date) - new Date() > 0;
    },
    validEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>>

<style lang="scss">
.recovery {
  @include set-size(100%, auto);
  overflow: hidden;
  position: relative !important;
  .auth__title.recovery {
    @include font-size(28);
  }
  .recovery__form {
    padding-bottom: 40px;
    overflow: hidden;
  }

  .recovery__register-disclaimer {
    width: 380px;
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

    @include minWidth(1440) {
      p {
        text-shadow: 0px 0px 1px #000;
      }
    }
  }

  .recovery__begin-bt {
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

  @include maxWidth(1024) {
    .recovery__register-disclaimer {
      display: block;
      width: 100%;

      > .default-button {
        margin-top: 15px;
      }
    }

    .recovery__begin-bt {
      margin-top: 15px;
    }
  }
}
</style>