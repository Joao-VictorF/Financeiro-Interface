<template>
   <v-container id="container" fluid>
    <v-row class="folhas-row" align="center" align-content="center" justify="start">
      <v-col cols="10"  >
        <v-breadcrumbs large :items="items" divider=">">
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-row class="folhas-row" align="center" align-content="center" justify="center">
      <v-col lg="6" md="8">
        <h1 class="titleView">
          Criar uma folha de pagamentos
        </h1>
      </v-col>
    </v-row>

    <v-row class="folhas-row" align="center" align-content="center" justify="center">
      <v-col lg="7" md="8" class="picker">
        <v-date-picker v-model="date" landscape locale="pt-br" full-width
        type="month" color="#21bbcd" header-color="#0a9d7f">
        </v-date-picker>
      </v-col>
    </v-row>

    <v-row class="folhas-row" align="center" align-content="center" justify="center">
      <v-btn @click="saveFolha()" id="saveBtn" color="#ff9467" class="salvarBtn" depressed outlined>
        <v-progress-circular
          v-if="loading" style="margin-right: 5px;"
          :size="20"
          :width="2"
          color="#ff9467"
          indeterminate
        ></v-progress-circular>
        Salvar
      </v-btn>
    </v-row>

    <v-row class="folha-row" align="center" align-content="center" justify="center">
      <v-snackbar v-if="success"
        v-model="success"
        bottom right
        color="success"
        multi-line="multi-line"
        :timeout="12000"
      >
        <b class="errors">{{message}} <span class="emoji">&#128516;</span></b><br>
        <v-btn dark text @click="success = false">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-snackbar>

      <v-snackbar v-else v-model="success"
        bottom right
        color="error"
        multi-line="multi-line"
        :timeout="12000"
      >
        <b class="errors">{{message}} <span class="emoji">&#128543;</span></b><br>
        <v-btn dark text @click="success = false">
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
      date: null,
      success: null,
      loading: false,
      message: null,
      folha: {
        mes: null,
        ano: null,
      },
      items: [
        {
          href: '/',
          disabled: false,
          link: true,
          text: 'Folhas de Pagamentos',
          to: '/folhas',
        },
        {
          href: '',
          disabled: true,
          link: false,
          text: 'Nova folha',
          to: '',
        },
      ],
    };
  },
  methods: {
    saveFolha() {
      // eslint-disable-next-line radix
      this.folha.mes = parseInt(this.date.slice(5, 7));
      // eslint-disable-next-line radix
      this.folha.ano = parseInt(this.date.slice(0, 4));


      this.loading = true;
      this.disableBtn(true);
      api.post('/folhas', this.folha)
        .then((response) => {
          this.loading = false;
          this.success = response.data.success;
          this.message = response.data.message;
          if (this.success) {
            setTimeout(() => {
              this.$router.push('/folhas');
            }, 2000);
          }
        })
        .catch(() => {
          this.loading = false;
          this.disableBtn(false);
          this.success = false;
          this.message = 'Algo de errado aconteceu';
        });
    },
    disableBtn(state) {
      document.getElementById('saveBtn').disabled = state;
    },
  },
};
</script>

<style scoped>
  .titleView {
    font-family: Muli;
    font-size: 36px !important;
    font-weight: bold;
    text-align: center;
    color: #4a4a4a;
  }
  .picker {
    display: flex;
    justify-content:center;
  }
  .folhas-row {
    width: 98%;
    margin: 0 auto;
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
    margin-bottom: 50px;
  }
</style>
