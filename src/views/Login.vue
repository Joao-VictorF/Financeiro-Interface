<template>
  <v-container class="pageContainer" fluid>
    <v-row class="rowContainer" align="center" justify="center">
      <v-col class="lgnContainer" lg="5" md="6" sm="7" xs="10" elevation="4">
        <h3 class="lgnTitle">
          Acessar o sistema
        </h3>
        <v-form @submit.prevent="fakeLogin()"
        ref="form" v-model="valid">
          <v-text-field class="inputs"
            color="#21bbcd"
            flat v-model="login.email"
            label="E-mail" required
            :rules="[rules.required, rules.email]"
          ></v-text-field>

          <v-text-field class="inputs"
            color="#21bbcd"
            flat v-model="login.password"
            label="Senha" required
            @click:append="passwordView = !passwordView"
            :type="passwordView ? 'text' : 'password'"
            :append-icon="passwordView ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.minPassword]"
          ></v-text-field>

          <div class="lgnBtnBox">
            <v-btn color="#ff9467" class="lgnBtn" id="lgnBtn"
            depressed type="submit" :disabled="!valid">
              <v-progress-circular
                class="loading"
                v-show="isLoading"
                :size="20"
                :width="3"
                indeterminate
                color="#ffffff"
              ></v-progress-circular>
              entrar
            </v-btn>
          </div>
        </v-form>

        <div class="forgetPasswordBox">
          <router-link :to="{}" class="forgetPassword">
            Esqueceu a sua senha?
          </router-link>
        </div>

      </v-col>
      <v-snackbar
        v-model="error"
        bottom
        color="error"
        multi-line="multi-line"
        :timeout="6000"
      >
        {{ errMessage }}
        <v-btn dark text @click="error = 'false'">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/services';

export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      passwordView: false,
      isLoading: false,
      valid: false,
      errMessage: '',
      error: false,
      rules: {
        required: value => !!value || 'Este campo é obrigatório!',
        minPassword: v => v.length >= 6 || 'A senha deve conter ao menos 6 caracteres!',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Informe um e-mail válido.';
        },
      },
    };
  },
  methods: {
    tryLogin() {
      this.disableBtn(true);
      this.isLoading = true;
      api.post('/nutritionist/login', this.login)
        .then((response) => {
          this.disableBtn(false);
          this.isLoading = false;
          // console.log(response.data.user);
          const name = `${response.data.user.firstName} ${response.data.user.lastName}`;
          const { firstName } = response.data.user;
          const { lastName } = response.data.user;
          const { token } = response.data.user;
          const { address } = response.data.user;
          const { bio } = response.data.user;
          const { birthday } = response.data.user;
          const { cep } = response.data.user;
          const { country } = response.data.user;
          const { crn } = response.data.user;
          const { email } = response.data.user;
          const { gender } = response.data.user;
          const { personalLogo } = response.data.user;
          const { phone } = response.data.user;
          const { photo } = response.data.user;
          const { state } = response.data.user;

          sessionStorage.setItem('name', name);
          sessionStorage.setItem('auth', token);
          sessionStorage.setItem('address', address);
          sessionStorage.setItem('bio', bio);
          sessionStorage.setItem('birthday', birthday);
          sessionStorage.setItem('cep', cep);
          sessionStorage.setItem('country', country);
          sessionStorage.setItem('crn', crn);
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('gender', gender);
          sessionStorage.setItem('personalLogo', personalLogo);
          sessionStorage.setItem('phone', phone);
          sessionStorage.setItem('photo', photo);
          sessionStorage.setItem('state', state);
          sessionStorage.setItem('firstName', firstName);
          sessionStorage.setItem('lastName', lastName);
          this.$router.push('/inicio');
        })
        .catch((err) => {
          this.errMessage = err.response.data.message;
          this.error = true;
          this.disableBtn(false);
          this.isLoading = false;
        });
    },
    fakeLogin() {
      this.isLoading = true;
      this.disableBtn(true);
      setTimeout(() => {
        sessionStorage.setItem('name', 'João Victor');
        sessionStorage.setItem('auth', 'fake_token_etc');
        sessionStorage.setItem('address', 'Rua Santa Tereza');
        sessionStorage.setItem('bio', 'Desenvolvedor');
        sessionStorage.setItem('birthday', '19-10-2001');
        sessionStorage.setItem('cep', '16387');
        sessionStorage.setItem('country', 'Brasil');
        sessionStorage.setItem('email', 'freitasjoaovictor49@gmail.com');
        sessionStorage.setItem('gender', 'male');
        sessionStorage.setItem('personalLogo', '');
        sessionStorage.setItem('phone', '(85) 988232763');
        sessionStorage.setItem('photo', '');
        sessionStorage.setItem('state', 'Ceará (CE)');
        sessionStorage.setItem('firstName', 'João');
        sessionStorage.setItem('lastName', 'Victor');
        this.$router.push('/funcionarios');
      }, 2000);
    },
    disableBtn(state) {
      document.getElementById('lgnBtn').disabled = state;
    },
  },
};
</script>

<style scoped>
  .pageContainer {
    background-image: linear-gradient(to right, #0a9d7f, #11a183, #17a588, #1ca98c, #21ad91);
    min-height: calc(100% + 20px);
  }
  .rowContainer {
    min-height: 100%;
  }
  .lgnContainer {
    height: 400px;
    background-color: #ffffff;
    border-radius: 8px;
  }
  .lgnTitle {
    color: #0a9d7f;
    text-align: center;
    margin: 15px;
    font-size: 20pt;
  }
  .inputs, .forgetPasswordBox, .registerAccountBox {
    width: 90%;
    margin: 15px 0;
    margin: 0 auto;
  }
  .registerAccountBox {
    margin-bottom: 10px;
  }
  .forgetPassword {
    color: #757575;
    text-decoration: none;
  }
  .forgetPassword:hover {
    color: #0a9d7f
  }
  .lgnBtnBox {
    width: 90%;
    margin: 20px auto;
  }
  .lgnBtn {
    color: #ffffff;
    width: 100%;
  }
  .registerAccount {
    color: #757575;
    text-decoration: none;
  }
  .registerAccount:hover {
    color: #0a9d7f
  }
  .loading {
    margin-right: 10px;
  }
</style>
