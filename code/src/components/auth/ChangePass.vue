<template>
  <div class="change-pass-comp">
    <div class="change-pass__container">
      <h3 class="auth__title">TROCA DE SENHA</h3>
      <h4 class="auth__subtitle">
        Insira abaixo um nova senha.
      </h4>
      <form class="change-pass-comp__form">
        <div class="form-field" :class="{'error-field': oldPassError.length > 0}">
          <input
            id="oldPass"
            v-model="formData.oldPass"
            type="password"
            placeholder="SENHA ATUAL"
            name="pass"
            @blur="checkForm('oldPass')"
          />
          <label for="pass">SENHA ATUAL</label>
          <small class="error-message" v-html="oldPassError"></small>
        </div>
        <div class="form-field" :class="{'error-field': oldPassError.length > 0}">
          <input
            id="newPass"
            v-model="formData.newPass"
            type="password"
            placeholder="NOVA SENHA"
            name="pass"
            @blur="checkForm('newPass')"
          />
          <label for="pass">NOVA SENHA</label>
          <small class="error-message" v-html="newPassError"></small>
        </div>
        <div class="form-field" :class="{'error-field': newPassConfirmError.length > 0}">
          <input
            id="passConfirm"
            v-model="formData.newPassConfirm"
            type="password"
            placeholder="CONFIRMAR NOVA SENHA"
            name="passConfirm"
            @blur="checkForm('newPassConfirm')"
          />
          <label for="passConfirm">CONFIRMAR NOVA SENHA</label>
          <small class="error-message" v-html="newPassConfirmError"></small>
        </div>
        <button
          class="default-button black change-pass-comp__begin-bt"
          type="submit"
          @click="sendData"
          :disabled="!isValid"
        >CONTINUAR</button>
      </form>
      <img class="change-pass__close" src="~@/assets/images/icons/close.png" @click="hide" alt="Fechar o conteúdo.">
    </div>
  </div>
</template>

<script>
import { TheMask } from "vue-the-mask";
import { TweenMax, Quad } from "gsap";

export default {
  name: "Register",
  components: {
    TheMask,
  },
  watch: {
    formData: {
      handler(newVal, oldVal) {
        if (newVal.oldPass && newVal.oldPass.length > 5) this.checkForm("oldPass");
        if (newVal.newPass && newVal.newPass.length > 5) this.checkForm("newPass");
        if (newVal.newPassConfirm) this.checkForm("newPassConfirm");
      },
      deep: true,
    },
  },
  data() {
    return {
      errors: [""],
      formData: {
        oldPass: null,
        newPass: null,
        newPassConfirm: null,
      },
      oldPassError: "",
      newPassError: "",
      newPassConfirmError: "",
      oldPassValid: false,
      newPassValid: false,
      newPassConfirmValid: false,
      isValid: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.show();
    });
  },
  methods: {
    show() {
      TweenMax.fromTo(
        this.$el,
        0.6,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: Quad.easeInOut }
      );
    },
    hide() {
      TweenMax.fromTo(
        this.$el,
        0.4,
        { autoAlpha: 1 },
        { autoAlpha: 0, ease: Quad.easeInOut, onComplete: ()=>{
          this.$emit('close')
        } }
      );
    },
    sendData(e) {
      this.$store.dispatch("loading", true);
      e.preventDefault();
      const formData = {
        oldPassword: this.formData.oldPass,
        newPassword: this.formData.newPass,
      };

      this.$store.dispatch("changePass", formData).then((e) => {
        const { status, data } = e?.response;
        if (status >= 200 && status <= 204) {
          this.$store.dispatch("loading", false);
          this.$store.dispatch("warning", {
            show: true,
            text: 'Senha alterada com sucesso.',
          });
          this.hide()
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
    checkForm(type) {
      // e.preventDefault();
      // this.sendData()
      // return

      this.errors = [];

      if (type == "oldPass") {
        if (!this.formData.oldPass) {
          this.errors.push("A senha é obrigatória");
          this.oldPassError = "*A senha é obrigatória";
          this.oldPassValid = false;
        } else if (this.formData.oldPass && this.formData.oldPass.length < 6) {
          this.errors.push("A senha deve conter ao menos 6 dígitos.");
          this.oldPassError = "A senha deve conter ao menos 6 dígitos.";
          this.oldPassValid = false;
        } else {
          this.oldPassError = "";
          this.oldPassValid = true;
        }
      }
      if (type == "newPassConfirm") {
        if (!this.formData.newPassConfirm) {
          this.errors.push("A confirmação da senha é obrigatória");
          this.newPassError = "*A confirmação da senha é obrigatória";
          this.newPassValid = false;
        } else if (this.formData.newPass !== this.formData.newPassConfirm) {
          this.errors.push("As senhas devem ser iguais.");
          this.newPassConfirmError = "As senhas devem ser iguais.";
          this.newPassConfirmValid = false;
        } else {
          this.newPassConfirmError = "";
          this.newPassConfirmValid = true;
        }
      }
      if (type == "newPass") {
        if (!this.formData.newPass) {
          this.errors.push("A confirmação da senha é obrigatória");
          this.newPassError = "*A confirmação da senha é obrigatória";
          this.newPassValid = false;
        } else if (this.formData.newPass !== this.formData.newPass) {
          this.errors.push("As senhas devem ser iguais.");
          this.newPassError = "As senhas devem ser iguais.";
          this.newPassValid = false;
        } else {
          this.newPassError = "";
          this.newPassValid = true;
        }
      }

      this.isValid = this.newPassValid && this.newPassConfirmValid
    },
  },
};
</script>

<style lang="scss">
.change-pass-comp {
  @include set-size(100%, 100%);
  overflow: hidden;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  .change-pass__close {
    @include set-size(32px, 32px);
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
    cursor: pointer;
    transition: transform 0.4s $ease-in-out;
    
    &:hover {
        transform: rotate(180deg) !important;
    }
  }

  .change-pass__container {
    @include set-size(47.5vw, 78.1vh);
    @include center(absolute);
    max-width: 650px;
    max-height: 640px;
    border-radius: 4px;
    overflow: hidden;
    background-image: url(~@/assets/images/bg-login.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    padding: 70px 30px;
    // transform: translateY(100%);
  }

  .change-pass-comp__form {
    padding-bottom: 40px;
    overflow: hidden;
    width: 70%;
    margin: 0 auto;

    @include minWidth(1440) {
      padding-bottom: 0;
    }
  }

  .change-pass-comp__begin-bt {
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

  .submit-container {
    margin: 2.9vh auto 0 auto;
    text-align: left;
    width: 84.5%;

    a {
      color: $black;
      // @include font-size(13);
      // line-height: 15px;
    }
  }

  .auth__title {
    color: $black;
    font-family: $gar-bold;
    @include font-size(32);
    letter-spacing: 0.05rem;
    margin: 0 auto 18px auto;
    span {
      font-family: $gar-bold;
    }
  }
  .auth__subtitle {
    color: $black;
    font-family: $got-medium;
    @include font-size(14);
    letter-spacing: 0.05rem;
    margin: 0 auto 32px auto;
    span {
      font-family: $got-medium;
    }

    strong {
      font-family: $got-black;

      .word {
        font-family: $got-black;
      }
    }
  }
}
</style>
