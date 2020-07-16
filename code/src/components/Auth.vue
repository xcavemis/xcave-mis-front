<template>
  <div class="auth">
      <div class="auth-bg"></div>
    <form class="" @submit.prevent="onSubmit">
      <div :class="{invalid: $v.email.$error}">
        <h6 v-if="!$v.email.email">Por favor forneça um emial válido.</h6>
        <input
          type="email"
          placeholder="email"
          id="email"
          @blur="$v.email.$touch()"
          v-model="email"
        />
      </div>

      <div :class="{invalid: $v.password.$error}">
        <input
          type="password"
          placeholder="senha"
          id="password"
          @blur="$v.password.$touch()"
          v-model="password"
        />
      </div>

      <div>
        <button type="submit" :disabled="$v.$invalid">login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { TweenMax, Quad } from 'gsap';
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    }
  },
  methods: {
        show(){
            TweenMax.fromTo('.auth-bg', 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut })
        },
        hide(){

        },
        onSubmit: function() {
        {
            const { email, password } = this;
            const formData = {
                email,
                password
            };
            this.$store.dispatch("login", formData).then(response => {
                console.log('login success', response)
            });
        }
    }
  }
};
</script>>

<style lang="scss">
.auth {
    @include set-size(47.5vw, 78.1vh);
    max-width: 650px;
    max-height: 600px;
    border-radius: 4px;
    overflow: hidden;

    .auth-bg {
        @include set-size(100%, 100%);
        background-image: url(~@/assets/images/bg-login.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        transform: translateY(100%);
    }
}
.input.invalid input {
  border: 1px solid red;
}
</style>