<template>
  <div class="ticket-comp">
    <h3 class="auth__subtitle auth__subtitle-name">
      Olá,
      <strong v-if="user && user.name">{{user.name.split(' ')[0]}}</strong>
    </h3>
    <div v-if="!ticketIsValid">
      <h3 class="auth__title">VALIDE SEU TICKET</h3>
      <h4 class="auth__subtitle auth__subtitle-desc">Digite seu código de acesso</h4>
    </div>
    <div v-if="ticketIsValid">
      <h3 class="auth__title">TUDO PRONTO.</h3>
      <h4 class="auth__subtitle auth__subtitle-desc">Seu ticket vale 24horas.</h4>
    </div>
    <form class="ticket-comp__form">
      <div class="form-field" :class="{'error-field': codeError.length > 0}" v-if="!ticketIsValid">
        <input
          id="code"
          v-model="formData.code"
          type="text"
          placeholder="nOIhpFLDyLvwAB-G5uX6"
          name="code"
          @blur="checkForm('code')"
        />
        <label for="code">CÓDIGO DO TICKET</label>
        <small class="error-message" v-html="codeError"></small>
      </div>
      <div class="buttons-container" v-if="!ticketIsValid">
        <div
          class="default-button white ticket-comp__begin-bt"
          @click="logout"
        >SAIR</div>
        <button
          class="default-button black ticket-comp__begin-bt"
          type="submit"
          @click="verifyTicket"
          :disabled="!isValid"
        >CONTINUAR</button>
      </div>
      <div class="buttons-container" v-if="ticketIsValid">
        <div
          class="default-button white ticket-comp__begin-bt"
          @click="logout"
        >VOLTAR DEPOIS</div>
        <button
          class="default-button black ticket-comp__begin-bt"
          type="submit"
          @click="sendData"
          :disabled="!isValid"
        >INICIAR AGORA</button>
      </div>
    </form>
    <div class="ticket-comp__register-disclaimer">
      <p>
        Ainda não tem ingresso
        <br />para experiência digital?
      </p>
      <a
        class="default-button black"
        href="https://davincidigital.byinti.com/"
        target="_blank"
      >COMPRAR INGRESSO DIGITAL</a>
    </div>
  </div>
</template>

<script>
import { TweenMax, Quad } from "gsap";
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
      ticketIsValid: false,
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
      TweenMax.set(this.$el, { autoAlpha: 1 })
      window.scrollTo(0, 0);
      TweenMax.staggerFromTo(
        ".form-field",
        0.4,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: Quad.easeInOut, delay: 0.8 },
        0.02
      );
      TweenMax.fromTo(
        [
          '.auth__title',
          ".auth__subtitle-name",
          ".auth__subtitle-desc"
        ],
        0.6,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: Quad.easeInOut, delay: 0.8 },
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
    hide() {
      TweenMax.to(this.$el, 0.6, { autoAlpha: 0, ease: Quad.easeInOut })
    },
    logout(){
      this.$store.dispatch("loading", true);
      this.$store.dispatch("logout").then(e =>{
        this.$store.dispatch("loading", false);
        this.$emit('logout')
      });
    },
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
    verifyTicket(e) {
      this.$store.dispatch("loading", true);
      e.preventDefault();
      const formData = {
        userId: this.user.id,
        ticketNumber: this.formData.code,
      };
      this.$store.dispatch("verifyTicket", formData).then((e) => {
        const { status, data, endTime } = e?.response;
          // console.log('RES verify ticket: ', e.response)
        if (status >= 200 && status <= 204) {
          this.$store.dispatch("loading", false);
          this.ticketIsValid = true
        } else {
          let message = data.message;
          this.$store.dispatch("warning", {
            show: true,
            text: message,
          });
          this.$store.dispatch("loading", false);
        }
      });
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

    .buttons-container {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      @include maxWidth(1023) {
        width: 100%;
      }
    }
  }

  .ticket-comp__register-disclaimer {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $black;
    font-family: $mont-light;
    @include font-size(14);
    span {
      font-family: $mont-light;
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
      width: 40vw;
      margin: 15px 0;
    }
  }
}
</style>