<template>
  <v-container fluid>
    <v-row class="folha-row" align="center" align-content="center" justify="space-between">
      <v-col lg="6">
        <h1 class="titleView">
          Folhas de Pagamentos
        </h1>
      </v-col>

      <v-col lg="2" md="3">
        <v-btn class="btn-nova-folha" color="#ff9467"
        @click="novaFolha()" outlined depressed rounded>
          Nova Folha
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="week-row"
      align="center" align-content="center" justify="start">
      <v-col class="categories-col" cols="12">
        <v-tabs
          fixed-tabs hide-slider
          background-color="transparent"
          >
          <v-tab @click="folhaSelecionada = folha" v-for="folha in folhas" :key="folha.name">{{folha.mes}}/{{folha.ano}}</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row class="folhas-month-row"
      no-gutters align="center" align-content="center" justify="center">

      <v-col lg="4" class="loading" v-if="loading">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#21bbcd"
          indeterminate
        ></v-progress-circular>
      </v-col>
      <v-col cols="12" v-else>
        <v-row class="folha-row folha-selected"
          align="center" align-content="center" justify="center">
          <v-col lg="12" md="12" class="folhaTitle">
            Folha referente a {{folhaSelecionada.mes}}/{{folhaSelecionada.ano}}
          </v-col>

          <v-col lg="4" md="4" class="folhaSubtitles">
            Total em salários<br>R$ {{folhaSelecionada.totalSalarios}}
          </v-col>

          <v-col lg="4" md="4" class="folhaSubtitles">
            Total em bônus<br>R$ {{folhaSelecionada.totalProventos}}
          </v-col>

          <v-col lg="4" md="4" class="folhaSubtitles">
            Total em descontos<br>R$ {{folhaSelecionada.totalDescontos}}
          </v-col>

          <v-col v-if="folhaSelecionada.movimentos.length > 0" lg="11" md="11" sm="11" class="folhaTitle">
            <v-divider></v-divider>
          </v-col>

          <v-col v-if="folhaSelecionada.movimentos.length > 0" lg="12" md="12" class="folhaTitle">
            Movimentos feitos nessa folha
          </v-col>

          <v-row v-if="folhaSelecionada.movimentos.length > 0" class="folha-row" align="center" align-content="center" justify="center">
            <v-col class="folhaSubtitles" lg="3" md="3">
              Nome do funcionário
            </v-col>

            <v-col class="folhaSubtitles" lg="3" md="3">
              Descrição do movimento
            </v-col>

            <v-col class="folhaSubtitles" lg="3" md="3">
              Valor
            </v-col>

            <v-col class="folhaSubtitles" lg="3" md="3">
              Tipo do movimento
            </v-col>
          </v-row>

          <v-row v-for="movement in folhaSelecionada.movimentos" :key="movement.id"
          class="folha-row movements" align="center" align-content="center" justify="center">
            <v-col class="folhaSubtitles" lg="3" md="3">
              {{movement.nomeColaborador}}
            </v-col>

            <v-col class="folhaSubtitles" lg="3" md="4">
              {{movement.descricao}}
            </v-col>

            <v-col class="folhaSubtitles" lg="3" md="2">
              R$ {{movement.valor}}
            </v-col>

            <v-col style="display: flex; justify-content: center;" class="folhaSubtitles" lg="3" md="3">
              <div v-if="movement.movimentoType.localeCompare('P') == 0" class="bonus">
                Bônus
              </div>
              <div v-else class="desconto">
                Desconto
              </div>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="folha-row" align="center" align-content="center" justify="center">
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
      folhas: [],
      loading: true,
      message: '',
      error: null,
      folhaSelecionada: {
        mes: 'Mês',
        ano: 'Ano',
        totalDescontos: 'R$ xx.xx',
        totalProventos: 'R$ xx.xx',
        totalSalarios: 'R$ xx.xx',
        movimentos: [],
      },
    };
  },
  methods: {
    novaFolha() {
      this.$router.push('/nova-folha');
    },
    getFolhas() {
      this.loading = true;
      api.get('/folhas')
        .then((response) => {
          this.loading = false;
          if (response.data.folhas === null) {
            this.error = true;
            this.message = 'Não há nenhuma folha cadastrada';
          } else {
            this.folhas = response.data.folhas;
            this.folhaSelecionada = this.folhas[0];
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
    this.getFolhas();
  },
};
</script>

<style scoped>
  .titleView {
    font-size: 36px;
    font-weight: bold;
    color: #4a4a4a;
  }
  .loading {
    display: flex;
    justify-content: center;
    margin: 50px 0px;
  }
  .folhaTitle {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: #4a4a4a;
  }
  .folhaSubtitles {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #4a4a4a;
  }
  .week-row {
    width: 98%;
    margin: 0 auto;
  }
  .btn-nova-folha {
    width: 99%;
    text-transform: none;
    font-size: 18px;
    font-weight: bold;
    left: 8px;
  }
  .movements {
    background-color: #fff;
    border-radius: 25px;
  }
  .folhas-month-row {
    border-radius: 8px;
    background-color: #d0e1e5;
    width: 98%;
    margin: 0 auto;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
  }
  .folha-row {
    width: 98%;
    margin: 0 auto;
  }
  .folha-selected {
    margin: 20px 10px;
    border-radius: 25px;
    background-color: #fff;
  }
  .search-input {
    border-radius: 25px;
  }
  .categories-col {
    padding: 0 !important;
  }
  .blue-icon:first-child {
    border: none;
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
  .blue-icon {
    border-left: 2px solid #e7eced;
    color: #21bbcd;
    margin: 0 5px;
    padding-left: 10px;
    height: 90%;
  }
  .iconsCol {
    justify-content: flex-end;
    display: flex;
  }
  .pagination, .options {
    display: flex;
    justify-content: center;
  }
  .pagination {
    margin: 20px 0;
  }
</style>
