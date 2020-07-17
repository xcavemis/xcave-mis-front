<template>
    <div class="login-comp">
        <h3 class="auth__title">LOGIN</h3>
        <h4 class="auth__subtitle">Insira os seus dados de usuário e faça<br>login para acessar a experiência.</h4>
        <form class="login-comp__form">
           <div class="form-field" :class="{'error-field': emailError.length > 0}">
                <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="leonardo.da.vinci@mis.com.br"
                name="email"
                @blur="checkForm('email')"
                >
                <label for="email">E-MAIL</label>
                <small class="error-message" v-html="emailError"></small>
            </div>
            <div class="form-field" :class="{'error-field': passError.length > 0}">
                <input
                    id="pass"
                    v-model="formData.pass"
                    type="password"
                    placeholder="SENHA"
                    name="pass"
                    @blur="checkForm('pass')"
                >
                <label for="pass">SENHA</label>
                <small class="error-message" v-html="passError"></small>
            </div>
            <button class="default-button black login-comp__begin-bt" type="submit" @click="sendData" :disabled="!isValid">CONTINUAR</button>
        </form>
        <div class="login-comp__register-disclaimer">
          <div>Ainda não possui um cadastro?</div>
          <a class="default-button white" @click="goToRegister">CADASTRE-SE AQUI</a>
        </div>
    </div>
</template>

<script>
import { TweenMax, Quad } from 'gsap';
import Splitting from "splitting";
export default {
  name: "Login",
  data() {
    return {
      errors: [''],
      formData: {
        email: null,
        pass: null,
      },
      emailError: '',
      passError: '',
      emailValid: false,
      passValid: false,
      isValid: false,
    };
  },
  watch: {
    formData: {
      handler(newVal, oldVal){
        if (newVal.email && newVal.email.length > 10) this.checkForm('email')
        if (newVal.pass && newVal.pass.length > 5) this.checkForm('pass')
      },
     deep: true
    },
  },
  mounted(){
    this.$nextTick(this.show)
  },
  methods: {
    show(){
      const splittingTitle = Splitting({ target: this.$el.querySelector('.auth__title'), by: 'words' })
      const splittingSubtitle = Splitting({ target: this.$el.querySelector('.auth__subtitle'), by: 'words' })

      window.scrollTo(0,0);
      TweenMax.staggerFromTo('.form-field', 0.4, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut, delay: 0.8 }, 0.02)
      TweenMax.staggerFromTo([splittingTitle[0].words, splittingSubtitle[0].words], 0.6, { scale: 1.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: Quad.easeInOut, delay: 0.8 }, 0.01)
      TweenMax.fromTo('.login-comp__begin-bt', 0.6, { y: '300%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.8 })
      TweenMax.fromTo('.login-comp__register-disclaimer', 0.6, { y: '300%' }, { y: '0%', ease: Quad.easeInOut, delay: 0.8 })
    },
    hide(){

    },
    goToRegister(){
      this.$emit('go-register')
    },
    checkForm(type) {
      // e.preventDefault();
      // this.sendData()
      // return
      
      this.errors = [];

      if (type == 'pass') {
          if (this.formData.pass && this.formData.pass.length < 6) {
              this.errors.push('A senha deve conter ao menos 6 dígitos.');
              this.passError = 'A senha deve conter ao menos 6 dígitos.'
              this.passValid = false
          } else {
              this.passError = ''
              this.passValid = true
          }
      }

      if (type == 'email') {
          if (!this.formData.email) {
          this.errors.push('O email é obrigatório.');
          this.emailError = '*O email é obrigatório.'
          this.emailValid = false
          } else if (!this.validEmail(this.formData.email)) {
          this.errors.push('Utilize um email válido.');
          this.emailError = '*Utilize um email válido.'
          this.emailValid = false
          } else {
          this.emailError = ''
          this.emailValid = true
          }
      }

      this.isValid = this.emailValid && this.passValid
  },
    sendData(e) {
      this.$store.dispatch("loading", true)
      e.preventDefault();
      const formData = {
        email: this.formData.email,
        password: this.formData.pass,
      };
      this.$store.dispatch("login", formData).then(e => {
        console.log('login success', e)
        const { status, data, endTime } = e?.response;
         if (status >= 200 && status <= 204) {
          if (this.validateTime(endTime)) {
            this.$router.push('/experience')
          } else {
            this.$emit('go-ticket')
          }
          this.$store.dispatch("loading", false)
        } else {
          let message = data.message
          if (status == 401) {
            message = "E-mail ou senha incorretos.";
          } else if (status == 400) {
            message = "E-mail ou senha inválidos.";
          } else if (status == 404) {
            message = "E-mail não encontrado.";
          } else {
            message = "Erro inesperado no servidor.";
          }
          this.$store.dispatch("warning", {
              show: true,
              text: message
          })
          this.$store.dispatch("loading", false)
        }
        
      });
    },
    validateTime(date){
      return new Date(date) - new Date() > 0
    },
    validEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
  }
};
</script>>

<style lang="scss">
.login-comp {

  @include set-size(100%, auto);
  overflow: hidden;
  position: relative !important;

  .login-comp__form {
    padding-bottom: 40px;
    overflow: hidden;
  }

  .login-comp__register-disclaimer {
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
  }
  
  .login-comp__begin-bt{
    width: 150px;
    display: block;
    margin: 40px auto 20px auto;
    border: 0;
    outline: none;

    &:disabled {
      background-color: rgba(255,255,255,0.8) !important;
      color: #b8b8b8;
    }
  }

  @include maxWidth(1024) {
    .login-comp__register-disclaimer {
      display: block;
      width: 100%;


      > .default-button{
        margin-top: 15px;
      }
    }

    .login-comp__begin-bt{
      margin-top: 15px;
    }
  }
    
}
</style>