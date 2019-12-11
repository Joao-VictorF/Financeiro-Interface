<template>
  <v-container fluid>
    <v-row class="funcionarios-row" align="center" align-content="center" justify="space-between">
      <v-col lg="4">
        <h1 class="titleView">
          Movimentos
        </h1>
      </v-col>
      <v-col lg="3" md="3">
        <v-btn class="btn-novo-funcionario" color="#ff9467"
        @click="novoMovimento()" rounded outlined depressed>
          Novo movimento
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
          label="Buscar movimento" solo
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

    <v-row v-else-if="!loading" class="funcionarios-row funcionariosHeader" align="center"
    align-content="center" justify="start">
      <v-col class="text-center" lg="3" md="3" sm="3" cols="12">
        Funcionário
      </v-col>

      <v-col class="text-center" lg="3" md="3" sm="3" cols="12">
        Descrição
      </v-col>

      <v-col class="text-center" lg="3" md="3" sm="3" cols="12">
        Valor
      </v-col>

      <v-col class="text-center" lg="3" md="3" sm="3" cols="12">
        Tipo
      </v-col>

    </v-row>

    <v-row class="funcionarios-row" align="center" style="background-color: #fff; margin-top: 8px;"
    align-content="center" justify="start"  v-for="(movimento, index) in movimentos" :key="index">
      <v-col class="text-center" lg="3" md="3" sm="3" cols="12">
        {{movimento.nomeColaborador}}
      </v-col>

      <v-col class="text-center" lg="3" md="3" sm="3" cols="12">
        {{movimento.descricao}}
      </v-col>

      <v-col class="text-center" lg="3" md="3" sm="3" cols="12">
        R$ {{movimento.valor}}
      </v-col>

      <v-col style="display: flex; justify-content: center;"
      class="text-center" lg="3" md="3" sm="3" cols="12">
        <div v-if="movimento.movimentoType.localeCompare('P') == 0" class="bonus">
          Bônus
        </div>
        <div v-else class="desconto">
          Desconto
        </div>
      </v-col>
    </v-row>
    <br>
    <!-- paginação -->
    <v-row class="funcionarios-row" align="center" align-content="center" justify="center">
      <v-col lg="4" md="6" sm="6" cols="6">
        <v-pagination v-if="movimentos.length > 10"
          circle v-model="page" color="#21bbcd"
          prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right"
          :length="6"
        ></v-pagination>
      </v-col>
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
import api from '@/services';

export default {
  data() {
    return {
      page: 1,
      movimentos: [],
      message: null,
      error: false,
      loading: true,
    };
  },
  methods: {
    novoMovimento() {
      this.$router.push('/novo-movimento');
    },
    getmovimentos() {
      this.loading = true;
      api.get('/movimentos')
        .then((response) => {
          this.loading = false;
          this.movimentos = response.data.movimentos;
          if (this.movimentos.length === 0) {
            this.error = true;
            this.message = 'Não há nenhum movimento cadastrado';
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
    this.getmovimentos();
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
  .funcionariosHeader {
    background-color: #d0e1e5;
    border-radius: 8px;
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
  .bonus, .desconto {
    width: 55%;
    color: #fff;
    padding: 2px;
    border-radius: 8px;
  }
  .bonus {
    background-color: forestgreen;
  }
  .desconto {
  background-color: firebrick;
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
