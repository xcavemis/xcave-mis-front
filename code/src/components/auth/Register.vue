<template>
  <div class="register-comp">
    <h3 class="auth__title">ESTAMOS QUASE LÁ.</h3>
    <h4 class="auth__subtitle">
      Para ter acesso à experiência preencha
      <br />seus dados e clique em continuar.
    </h4>
    <form class="register-comp__form">
      <div class="form-field" :class="{'error-field': nameError.length > 0}">
        <input
          id="name"
          v-model="formData.name"
          type="text"
          placeholder="Leonardo Da Vinci"
          name="name"
          @blur="checkForm('name')"
        />
        <label for="name" class="android">NOME</label>
        <small class="error-message" v-html="nameError"></small>
      </div>
      <div class="form-filed__half">
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
        <div class="form-field" :class="{'error-field': phoneError.length > 0}">
          <the-mask
            :mask="['(##) ####-####', '(##) #####-####']"
            id="phone"
            v-model="formData.phone"
            type="tel"
            placeholder="(__) _____-____"
            name="phone"
            @blur.native="checkForm('phone')"
          />
          <label for="phone">CELULAR</label>
          <small class="error-message" v-html="phoneError"></small>
        </div>
      </div>
      <div class="form-filed__half">
        <div class="form-field" :class="{'error-field': passError.length > 0}">
          <input
            id="pass"
            v-model="formData.pass"
            type="password"
            placeholder="******"
            name="pass"
            @blur="checkForm('pass')"
          />
          <label for="pass">SENHA</label>
          <small class="error-message" v-html="passError"></small>
        </div>
        <div class="form-field" :class="{'error-field': passConfirmError.length > 0}">
          <input
            id="passConfirm"
            v-model="formData.passConfirm"
            type="password"
            placeholder="******"
            name="passConfirm"
            @blur="checkForm('passConfirm')"
          />
          <label for="passConfirm">CONFIRMAR SENHA</label>
          <small class="error-message" v-html="passConfirmError"></small>
        </div>
      </div>
      <div class="form-filed__half">
        <div class="form-field" :class="{'error-field': genderError.length > 0}">
          <div class="custom-select gender-select">
            <select id="genderSelect" v-model="formData.gender">
              <option value="-1">GÊNERO</option>
              <option value="1">Feminino</option>
              <option value="2">Masculino</option>
              <option value="3">Prefiro não informar</option>
            </select>
            <label for="genderSelect" v-if="!formData.gender">GÊNERO</label>
          </div>
          <small class="error-message" v-html="genderError"></small>
        </div>
        <div class="form-field" :class="{'error-field': birthError.length > 0}">
          <the-mask
            :mask="['##/##/####']"
            id="birth"
            v-model="formData.birth"
            type="tel"
            placeholder="__/__/____"
            name="birth"
            @blur.native="checkForm('birth')"
          />
          <label for="birth">NASCIMENTO</label>
          <small class="error-message" v-html="birthError"></small>
        </div>
      </div>
      <div class="form-filed__half">
        <div class="form-field" :class="{'error-field': cityError.length > 0}">
          <input
            id="city"
            v-model="formData.city"
            type="text"
            placeholder="Cidade"
            name="city"
            @blur="checkForm('city')"
          />
          <label for="city">CIDADE</label>
          <small class="error-message" v-html="cityError"></small>
        </div>
        <div class="form-field" :class="{'error-field': stateError.length > 0}">
          <div class="custom-select state-select">
            <label for="statesSelect" v-if="!formData.state">ESTADO</label>
            <select id="statesSelect" v-model="formData.state">
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
          <small class="error-message" v-html="stateError"></small>
        </div>
      </div>
      <button
        class="default-button black register-comp__begin-bt"
        type="submit"
        @click="sendData"
        :disabled="!isValid"
      >CONTINUAR</button>
    </form>
  </div>
</template>

<script>
import { TheMask } from "vue-the-mask";
import { TweenMax, Quad } from "gsap";
import Splitting from "splitting";

export default {
  name: "Register",
  components: {
    TheMask,
  },
  watch: {
    formData: {
      handler(newVal, oldVal) {
        // console.log('handler', newVal, oldVal)
        if (newVal.name && newVal.name.length >= 2) this.checkForm("name");
        if (newVal.email && newVal.email.length > 10) this.checkForm("email");
        if (newVal.phone && newVal.phone.length > 9) this.checkForm("phone");
        if (newVal.pass && newVal.pass.length > 5) this.checkForm("pass");
        if (newVal.passConfirm) this.checkForm("confirm-pass");
        if (newVal.birth && newVal.birth.length > 6) this.checkForm("birth");
        if (newVal.gender) this.checkForm("gender");
        if (newVal.city) this.checkForm("city");
        if (newVal.state) this.checkForm("state");
      },
      deep: true,
    },
  },
  data() {
    return {
      errors: [""],
      formData: {
        name: null,
        email: null,
        phone: null,
        pass: null,
        passConfirm: null,
        gender: null,
        birth: null,
        city: null,
        state: null,
      },
      nameError: "",
      emailError: "",
      phoneError: "",
      birthError: "",
      genderError: "",
      passError: "",
      passConfirmError: "",
      cityError: "",
      stateError: "",
      nameValid: false,
      emailValid: false,
      genderValid: false,
      phoneValid: false,
      birthValid: false,
      passValid: false,
      passConfirmValid: false,
      cityValid: false,
      stateValid: false,
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
      TweenMax.set(this.$el, { autoAlpha: 1 })
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
        0.3,
        { scale: 0.8, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, ease: Quad.easeInOut, delay: 0.8 },
        0.01
      );
      TweenMax.fromTo(
        ".register-comp__begin-bt",
        0.6,
        { y: "300%" },
        { y: "0%", ease: Quad.easeInOut, delay: 0.8 }
      );
    },
    hide(){
      TweenMax.to(this.$el, 0.6, { autoAlpha: 0, ease: Quad.easeInOut })
    },
    sendData(e) {
      this.$store.dispatch("loading", true);
      e.preventDefault();
      const birthStrToDate =
        this.formData.birth.substring(4, 8) +
        "-" +
        this.formData.birth.substring(2, 4) +
        "-" +
        this.formData.birth.substring(0, 2);
      const formData = {
        name: this.formData.name,
        email: this.formData.email,
        cellphone: this.formData.phone,
        gender: this.formData.gender,
        plainPassword: this.formData.pass,
        // birthDate: new Date(birthStrToDate),
        birthDate: birthStrToDate,
        city: this.formData.city,
        state: this.formData.state,
        role: "USER",
      };

      this.$store.dispatch("create", formData).then((e) => {
        const { status, data } = e?.response;
        if (status >= 200 && status <= 204) {
          this.$store.dispatch("loading", false);
          this.$emit("go-ticket");
        } else {
          let message = data.message;
          if (status == 409) {
            message = `O e-mail ${this.formData.email} já está em uso.`;
          }
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

      if (type == "pass") {
        if (!this.formData.pass) {
          this.errors.push("A senha é obrigatória");
          this.passError = "*A senha é obrigatória";
          this.passValid = false;
        } else if (this.formData.pass && this.formData.pass.length < 6) {
          this.errors.push("A senha deve conter ao menos 6 dígitos.");
          this.passError = "A senha deve conter ao menos 6 dígitos.";
          this.passValid = false;
        } else {
          this.passError = "";
          this.passValid = true;
        }
      }
      if (type == "confirm-pass") {
        if (!this.formData.passConfirm) {
          this.errors.push("A confirmação da senha é obrigatória");
          this.passError = "*A confirmação da senha é obrigatória";
          this.passValid = false;
        } else if (this.formData.pass !== this.formData.passConfirm) {
          this.errors.push("As senhas devem ser iguais.");
          this.passConfirmError = "As senhas devem ser iguais.";
          this.passConfirmValid = false;
        } else {
          this.passConfirmError = "";
          this.passConfirmValid = true;
        }
      }

      if (type == "gender") {
        if (!this.formData.gender || this.formData.gender == "GÊNERO") {
          this.errors.push("O gênero é obrigatório.");
          this.genderError = "*O gênero é obrigatório.";
          this.genderValid = false;
        } else {
          this.genderError = "";
          this.genderValid = true;
        }
      }

      if (type == "state") {
        if (!this.formData.state || this.formData.state == "ESTADO") {
          this.errors.push("O estado é obrigatório.");
          this.stateError = "*O estado é obrigatório.";
          this.stateValid = false;
        } else {
          this.stateError = "";
          this.stateValid = true;
        }
      }

      if (type == "city") {
        if (!this.formData.city) {
          this.errors.push("A cidade é obrigatória.");
          this.cityError = "*A cidade é obrigatória.";
          this.cityValid = false;
        } else if (this.formData.city.length < 2) {
          this.errors.push("A cidade precisa ter ao menos 3 caracteres.");
          this.cityError = "*A cidade precisa ter ao menos 3 caracteres.";
          this.cityValid = false;
        } else if (!this.containChars(this.formData.city)) {
          this.errors.push("A cidade não pode conter somente números.");
          this.cityError = "*A cidade não pode conter somente números.";
          this.cityValid = false;
        } else {
          this.cityError = "";
          this.cityValid = true;
        }
      }

      if (type == "name") {
        if (!this.formData.name) {
          this.errors.push("O nome é obrigatório.");
          this.nameError = "*O nome é obrigatório.";
          this.nameValid = false;
        } else if (this.formData.name.length < 2) {
          this.errors.push("O nome precisa ter ao menos 2 caracteres.");
          this.nameError = "*O nome precisa ter ao menos 2 caracteres.";
          this.nameValid = false;
        } else {
          this.nameError = "";
          this.nameValid = true;
        }
      }

      if (type == "email") {
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
      }

      if (type == "phone") {
        if (!this.formData.phone) {
          this.errors.push("O telefone é obrigatório.");
          this.phoneError = "*O telefone é obrigatório.";
          this.phoneValid = false;
        } else if (this.formData.phone.length < 10) {
          this.errors.push("Utilize um telefone válido.");
          this.phoneError = "*Utilize um telefone válido.";
          this.phoneValid = false;
        } else {
          this.phoneError = "";
          this.phoneValid = true;
        }
      }

      if (type == "birth") {
        if (!this.formData.birth) {
          this.errors.push("A data é obrigatória.");
          this.birthError = "*A data é obrigatória.";
          this.birthValid = false;
        } else if (!this.validDOB(this.formData.birth)) {
          this.birthValid = false;
        } else {
          this.birthError = "";
          this.birthValid = true;
        }
      }

      this.isValid =
        this.birthValid &&
        this.phoneValid &&
        this.emailValid &&
        this.nameValid &&
        this.passValid &&
        this.passConfirmValid &&
        this.genderValid &&
        this.stateValid &&
        this.cityValid;
    },
    validEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validDOB(birth) {
      let regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
      let birthStr =
        birth.substring(0, 2) +
        "/" +
        birth.substring(2, 4) +
        "/" +
        birth.substring(4, 8);
      if (regex.test(birthStr)) {
        // let dtDOB = new Date(birthStr);
        // let dtCurrent = new Date();

        // if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
        //     this.errors.push('Você precisa ter mais de 18 anos.');
        //     this.birthError = '*Menor de 18 anos.'
        //     return false;
        // }

        // if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {

        //     if (dtCurrent.getMonth() < dtDOB.getMonth()) {
        //         this.errors.push('Você precisa ter mais de 18 anos.');
        //         this.birthError = '*Menor de 18 anos.'
        //         return false;
        //     }
        //     if (dtCurrent.getMonth() == dtDOB.getMonth() && dtCurrent.getDate() < dtDOB.getDate()) {
        //         this.errors.push('Você precisa ter mais de 18 anos.');
        //         this.birthError = '*Menor de 18 anos.'
        //         return false;
        //     }
        // }
        return true;
      } else {
        this.errors.push("Insira uma data válida.");
        this.birthError = "*Insira uma data válida.";
        return false;
      }
    },
    containChars(str){
      let regExp = new RegExp(/^(?=.*[A-Za-z])[A-Za-z\d]{3,}$/)
      return str.match(regExp)
    },
    blockNumbers(e) {
      let key = e.keyCode;
      if (((key >= 48 && key <= 57) && !e.shiftKey)) {
        e.preventDefault();
      }
    }
  },
};
</script>

<style lang="scss">
.register-comp {
  @include set-size(100%, auto);
  overflow: hidden;
  position: relative !important;

  .register-comp__form {
    padding-bottom: 40px;
    overflow: hidden;

    @include minWidth(1440) {
      padding-bottom: 0;
    }
  }

  .register-comp__begin-bt {
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
}
</style>
