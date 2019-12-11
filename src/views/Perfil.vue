<template>
   <v-container id="container" v-resize="onResize" fluid>
    <v-row class="perfil-row" align="center" align-content="center" justify="start">
      <v-col cols="10"  >
        <v-breadcrumbs large :items="items" divider=">">
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="space-between">
      <v-col lg="6">
        <h1 class="titleView">
          Meu Dados
        </h1>
      </v-col>
      <!-- <v-spacer></v-spacer> -->
      <v-col lg="1" md="1" sm="2" cols="2">
        <v-icon color="#21bbcd" size="50">mdi-settings-outline</v-icon>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="center">
      <v-col class="text-center colsBox perfil-image" lg="3" md="3" cols="4">
        <v-avatar color="#21bbcd" size="120">
          <img v-if="Nutri.photo" :src="Nutri.photo">
          <span v-else class="white--text abbreviation">{{nameAbbreviation}}</span>
        </v-avatar>
        <br>
        <v-btn class="editarBtn" depressed outlined>
          <v-icon class="editarIcon">mdi-pencil</v-icon> Alterar foto
        </v-btn>
      </v-col>

      <v-col lg="9" md="9" cols="8">
        <v-row class="perfil-row" align="center" align-content="center" justify="space-between">
          <!-- row 1 -->
          <v-col class="colsBox cols12" lg="12" md="12" cols="12">
            <v-text-field
             color="#21bbcd"
             :rules="[rules.required]"
             flat v-model="Nutri.name"
             label="Nome Completo"
            ></v-text-field>
          </v-col>
          <!-- row 2 -->
          <v-col class="colsBox cols6" lg="5" md="6" cols="12">
            <v-text-field
             color="#21bbcd" disabled
             flat v-model="Nutri.birthday"
             label="Data de Nascimento"
            ></v-text-field>
          </v-col>

          <v-col class="colsBox cols6" lg="5" md="6" cols="12">
            <v-text-field
             color="#21bbcd"
             flat v-model="Nutri.phone"
             :rules="[rules.required]"
             label="Telefone"
            ></v-text-field>
          </v-col>
          <!-- row 3 -->
          <v-col class="colsBox cols6LastRow" lg="5" md="6" cols="12">
            <v-text-field
             color="#21bbcd" disabled
             flat v-model="Nutri.email"
             label="Email"
            ></v-text-field>
          </v-col>

          <v-col class="colsBox cols6LastRow" lg="5" md="6" cols="12">
            <v-text-field
             color="#21bbcd"
             disabled
             flat v-model="Nutri.cargo"
             label="Cargo"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="center">
      <v-btn color="#ff9467" class="salvarBtn" depressed outlined>
        Salvar
      </v-btn>
    </v-row>
    <br>
    <br>
    <v-row class="perfil-row" align="center" align-content="center" justify="start">
      <v-col lg="6">
        <h1 class="titleView">
          Alterar senha
        </h1>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="center">
      <v-col class="colsBox cols12 passCol6" lg="6" md="6" sm="12">
        <v-text-field
          color="#21bbcd"
          :append-icon="password1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="password1 = !password1"
          :type="password1 ? 'text' : 'password'"
          flat v-model="Password.old"
          label="Senha antiga"
        ></v-text-field>
      </v-col>
      <v-col class="colsBox cols12 passCol6" lg="6" md="6" sm="12">
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="center">
      <v-col class="colsBox cols12 passCol6" lg="5" md="5" sm="12">
        <v-text-field
          color="#21bbcd"
          :append-icon="password2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="password2 = !password2"
          flat v-model="Password.new"
          label="Nova senha"
          hint="Informe uma senha pelo menos 8 caracteres"
          :type="password2 ? 'text' : 'password'"
        ></v-text-field>
      </v-col>

      <v-col class="colsBox cols12 passCol6" lg="5" md="5" sm="12">
        <v-text-field
          color="#21bbcd"
          :append-icon="password3 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="password3 = !password3"
          flat v-model="Password.newConfirm"
          label="Confirme a nova senha"
          hint="Confirme a senha anterior"
          :type="password3 ? 'text' : 'password'"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="center">
      <v-btn color="#ff9467" class="salvarBtn" depressed outlined>
        Salvar
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/services';

export default {
  data() {
    return {
      Nutri: {
        name: '',
        birthday: '',
        phone: '',
        email: '',
        photo: '',
        cargo: 'Desenvolvedor',
      },
      Password: {
        old: '',
        new: '',
        newConfirm: '',
      },
      password1: false,
      password2: false,
      password3: false,
      items: [
        {
          href: '/inicio',
          disabled: false,
          link: true,
          text: 'Inicio',
          to: '/inicio',
        },
        {
          href: '',
          disabled: true,
          link: false,
          text: 'Meus Dados',
          to: '',
        },
      ],
      width: Number,
      nameAbbreviation: null,
      genders: [
        { text: 'Masculino', value: 'male' },
        { text: 'Feminino', value: 'female' },
        { text: 'Outro', value: 'other' },
      ],
      rules: {
        birthday: v => v.length === 10 || 'Informe uma data de nascimento válida!',
        phone: v => v.length === 14 || v.length === 15 || 'Informe um número de telefone válido!',
        required: value => !!value || 'Este campo é obrigatório!',
        minPassword: v => v.length >= 6 || 'A senha deve conter ao menos 6 caracteres!',
      },
    };
  },
  mounted() {
    this.onResize();
    this.getPerfil();
  },
  methods: {
    onResize() {
      this.width = document.getElementById('container').offsetWidth;
    },
    getPerfil() {
      this.Nutri.name = sessionStorage.getItem('name');
      this.Nutri.address = sessionStorage.getItem('address');
      this.Nutri.bio = sessionStorage.getItem('bio');
      this.Nutri.birthday = sessionStorage.getItem('birthday');
      // this.Nutri. = sessionStorage.getItem('cep');
      this.Nutri.country = sessionStorage.getItem('country');
      // this.Nutri. = sessionStorage.getItem('crn');
      this.Nutri.email = sessionStorage.getItem('email');
      this.Nutri.gender = sessionStorage.getItem('gender');
      // this.Nutri. = sessionStorage.getItem('personalLogo');
      this.Nutri.phone = sessionStorage.getItem('phone');
      this.Nutri.photo = sessionStorage.getItem('photo');
      this.Nutri.state = sessionStorage.getItem('state');

      const firstName = window.sessionStorage.getItem('firstName');
      const lastName = window.sessionStorage.getItem('lastName');
      this.nameAbbreviation = `${firstName[0]}${lastName[0]}`;
    },
  },
  watch: {
    width: function tamanho() {
      if (this.width > 1350) {
        document.getElementsByClassName('row4col2')[0].style.marginRight = '18px';
      } else if (this.width > 1180) {
        document.getElementsByClassName('row4col2')[0].style.marginRight = '18px';
      } else if (this.width > 960) {
        document.getElementsByClassName('row4col2')[0].style.marginRight = '15px';
      } else if (this.width > 940) {
        document.getElementsByClassName('row4col2')[0].style.marginRight = '12px';
      } else if (this.width > 765) {
        document.getElementsByClassName('row4col2')[0].style.marginRight = '12px';
      }
    },
  },
};
</script>

<style scoped>
  .titleView {
    font-family: Muli;
    font-size: 36px !important;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #4a4a4a;
  }
  .perfil-row {
    width: 98%;
    margin: 0 auto;
  }
  .perfil-image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .abbreviation {
    font-size: 30pt;
  }
  .colsBox {
    background-color: #ffffff;
    border-radius: 8px;
  }
  .cols12, .cols6, .cols6LastRow, .row4col2 {
    padding: 0px 4px !important;
  }
  .cols12, .cols6 {
    margin-bottom: 8px;
  }
  .cols6, .cols6LastRow {
    flex: 0 0 49.5% !important;
    max-width: 49.5% !important;
  }
  .row4col1 {
    flex: 0 0 62% ;
    max-width: 71%;
    margin-right: 8px;
  }
  .row4col2 {
    flex: 0 0 35.5% ;
    max-width: 40%;
    margin-right: 20px;
    margin-bottom: 8px;
  }
  .colBio {
    flex: 0 0 98.2%;
    max-width: 100%;
    margin-right: 14px;
  }
  .passCol6 {
    flex: 0 0 48.5%;
    max-width: 50%;
    margin-left: 4px;
    margin-right: 4px;
  }
  .editarBtn {
    margin: 0 auto;
    width: 70%;
    text-transform: none;
    border-radius: 25px !important;
    border: solid 2px #e7eced;
    background-color: #ffffff !important;
    font-size: .8rem;
    color: #21bbcd;
    margin-top: 10px;
    border-radius: 25px;
  }
  .salvarBtn {
    margin: 0 auto;
    width: 145px;
    text-transform: none;
    border-radius: 25px !important;
    font-size: .9rem;
    font-weight: bold;
    color: #ffffff;
    margin-top: 20px;
  }
  @media screen and (max-width: 1265px) {
    .row4col1 {
      margin-right: 8px;
    }
    .row4col2 {
      margin-right: 18px;
    }
  }
  @media screen and (max-width: 1180px) {
    .row4col1 {
      flex: 0 0 62.1% ;
      margin-right: 8px;
    }
    .row4col2 {
      flex: 0 0 35% ;
      margin-right: 18px;
    }
  }
  @media screen and (max-width: 1040px) {
    .row4col1 {
      flex: 0 0 62.1% ;
      margin-right: 8px;
    }
    .row4col2 {
      flex: 0 0 34.7% ;
      margin-right: 18px;
    }
  }
  @media screen and (max-width: 960px) {
    .row4col1 {
      flex: 0 0 66% ;
      max-width: 71%;
      margin-right: 5px;
    }
    .row4col2 {
      flex: 0 0 30.7% ;
      max-width: 40%;
    }
  }
  @media screen and (max-width: 837px) {
    .row4col1 {
      flex: 0 0 66% ;
      max-width: 71%;
      margin-right: 4px;
    }
    .row4col2 {
      flex: 0 0 29.9% ;
      max-width: 40%;
    }
  }
  @media screen and (max-width: 675px) {
    .row4col1 {
      flex: 0 0 66% ;
      max-width: 71%;
      margin-right: 3px;
    }
    .row4col2 {
      flex: 0 0 29% ;
      max-width: 40%;
    }
  }
</style>
