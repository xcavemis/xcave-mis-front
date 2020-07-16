<template>
    <div class="login-comp">
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
            // TweenMax.fromTo('.auth-bg', 0.6, { y: '100%' }, { y: '0%', ease: Quad.easeInOut })
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
.login-comp {
    
}
</style>