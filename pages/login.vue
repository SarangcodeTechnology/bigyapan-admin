<template>
  <v-app>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="4">
          <v-card class="pa-1">
            <v-card-title>
              <v-img contain src="/images/logo_bigyapan.svg" alt="bigyapan_logo"/>
                <v-divider vertical class="mx-2"></v-divider>
              <h1 class="display-1">CMS Login</h1>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Welcome to login of Bigyapan.com admin panel. Enter the necessary credentials to continue.</p>
              <v-divider></v-divider>
              <v-form>
                <v-text-field v-model="email" :error-messages="usernameErrors"
                              autocomplete="on"
                              autofocus
                              class="py-5"
                              filled
                              hint="example@mydomain.com / example-username / 9812345678"
                              label="Username"
                              placeholder="Enter your username here..."
                              prepend-inner-icon="fas fa-user"
                              @blur="$v.email.$touch()"
                              @input="$v.email.$touch()"
                              v-on:keyup.enter="login"
                ></v-text-field>
                <v-text-field v-model="password" :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                              :error-messages="passwordErrors"
                              :type="showPassword ? 'text' : 'password'"
                              autocomplete="on"
                              class="py-5"
                              filled
                              label="Password"
                              placeholder="Enter your password here..."
                              prepend-inner-icon="fas fa-key"
                              @blur="$v.password.$touch()"
                              @input="$v.password.$touch()"
                              @click:append="showPassword = !showPassword"
                              v-on:keyup.enter="login"
                ></v-text-field>


                <v-divider></v-divider>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn :disabled="$v.$invalid" block color="primary" x-large
                     @click="login">
                <span>Login</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import {validationMixin} from 'vuelidate';
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "Login",
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(8)}
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('Username is required.');
      !this.$v.email.email && errors.push('Enter a valid email format.');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required.');
      !this.$v.password.minLength && errors.push('Password must be minimum 8 characters.');
      return errors;
    }
  },
  methods: {
    login() {
      const temp = this;
      this.$store.dispatch('auth/loginOrRegister', {
        route: "login",
        data: {
          email: temp.email,
          password: temp.password,
        }
      }).then(function (response) {
        temp.$store.commit('auth/SET_USER', response.data.data);
        temp.$router.push("/");
        temp.$store.dispatch("webservice/syncResources");
      }).catch(function (error) {
        console.log(error);
      });
    }
  },

}
</script>

<style scoped>

</style>
