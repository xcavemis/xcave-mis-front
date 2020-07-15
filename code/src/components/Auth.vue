<template>
  <div class="auth">
    <form class @submit.prevent="onSubmit">
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
    @include set-size(85vh, 85vh);
    background: $white;
}
.input.invalid input {
  border: 1px solid red;
}
</style>