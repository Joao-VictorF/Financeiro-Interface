<template>
  <v-container fluid>
    <!-- Titulo e btn de novo funcionario -->
    <v-row class="funcionarios-row" align="center" align-content="center" justify="space-between">
      <v-col lg="4">
        <h1 class="titleView">
          Funcionarios
        </h1>
      </v-col>
      <v-col lg="3" md="3">
        <v-btn class="btn-novo-funcionario" color="#ff9467"
        @click="novofuncionario()" rounded outlined depressed>
          Novo funcionário
        </v-btn>
      </v-col>
    </v-row>
    <!-- search input -->
    <v-row class="search-input-row" align="center" align-content="center" justify="start">
      <v-col lg="4" md="6" sm="6" cols="12">
        <v-text-field
          hide-details clearable
          class="search-input"
          prepend-inner-icon="mdi-magnify"
          flat background="#ffffff"
          label="Buscar funcionario" solo
        ></v-text-field>
      </v-col>
    </v-row>
    <br>
    <!-- funcionarios -->
    <div class="loading" v-if="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="#21bbcd"
        indeterminate
      ></v-progress-circular>
    </div>

    <v-row v-else class="funcionarios-row" no-gutters align="center"
    align-content="center" justify="start">
      <v-col lg="4" md="6" sm="6" cols="12"
        v-for="(funcionario, index) in funcionarios" :key="index">
        <cardF
          :id="funcionario.id"
          :nome="funcionario.nome"
          :funcao="funcionario.cargo"
          :email="funcionario.telefone"
          imgUrl="">
        </cardF>
      </v-col>
    </v-row>
    <br>
    <!-- paginação -->
    <v-row class="funcionarios-row" align="center" align-content="center" justify="center">
      <v-snackbar
        v-model="error"
        bottom right
        color="error"
        multi-line="multi-line"
        :timeout="12000"
      >
        <b class="errors">{{message}} <span class="emoji">&#128543;</span></b><br>
        <v-btn dark text @click="error = false">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-snackbar>
    </v-row>

  </v-container>
</template>

<script>
import cardF from '../components/funcionarioCard.vue';
import api from '@/services';

export default {
  components: {
    cardF,
  },
  data() {
    return {
      page: 1,
      funcionarios: [],
      message: null,
      error: false,
      loading: true,
    };
  },
  methods: {
    novofuncionario() {
      this.$router.push('/novo-funcionario');
    },
    getfuncionarios() {
      this.loading = true;
      api.get('/colaboradores')
        .then((response) => {
          this.loading = false;
          this.funcionarios = response.data.colaboradores;
          if (this.funcionarios.length === 0) {
            this.error = true;
            this.message = 'Não há nenhum funcionário cadastrado';
          }
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
          this.message = 'Algo de errado aconteceu';
        });
    },
  },
  mounted() {
    this.getfuncionarios();
  },
};
</script>

<style scoped>
  /* Dados do perfil */
  .perfil-row {
    width: 98%;
    margin: 0 auto;
  }
  .perfil-image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 210px;
  }
  .colsBox {
    background-color: #ffffff;
    border-radius: 8px;
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
  .salvarBtn {
    margin: 0 auto;
    width: 145px;
    text-transform: none;
    border-radius: 25px !important;
    font-size: .9rem;
    font-weight: bold;
    color: #ffffff;
  }
  /*  */
  .titleView {
    font-size: 36px !important;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #4a4a4a;
  }
  .weekCard {
    width: 150px;
    height: 130px;
    margin: 0 5px 10px;
    border-radius: 8px;
  }
  .v-input--selection-controls.v-input, .v-input--selection-controls {
    margin-top: 8px;
  }
  .weekCheckbox .v-input__control .v-input__slot div .v-label {
    font-size: 12px !important;
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
  .btn-novo-funcionario {
    width: 99%;
    text-transform: none;
    font-size: 18px;
    font-weight: bold;
    left: 8px;
  }
  .search-input-row {
    border-radius: 25px;
    background-color: #a8bbbf;
    width: 97%;
    margin: 0 auto;
  }
  .funcionarios-row {
    width: 98%;
    margin: 0 auto;
  }
  .search-input {
    border-radius: 25px;
  }
  .loading {
    display: flex;
    justify-content: center;
    margin: 50px 0px;
  }
</style>
