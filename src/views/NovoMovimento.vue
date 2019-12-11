<template>
   <v-container id="container" fluid>
    <v-row class="perfil-row" align="center" align-content="center" justify="start">
      <v-col cols="10"  >
        <v-breadcrumbs large :items="items" divider=">">
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="start">
      <v-col lg="6">
        <h1 class="titleView">
          Criar movimento
        </h1>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="space-between">
      <v-col class="colsBox" md="6">
        <v-text-field
        color="#21bbcd"
        flat v-model="movimento.descricao"
        label="Descrição"
        ></v-text-field>
      </v-col>

      <v-col class="colsBox" lg="3" md="3">
        <v-text-field
        color="#21bbcd"
        flat v-model="movimento.valor"
        label="Valor (R$)"
        ></v-text-field>
      </v-col>

      <v-col class="colsBox" lg="2" md="2">
         <v-select v-model="movimento.tipo"
          :items="movimentTypes" color="#21bbcd"
          item-text="text" item-value="value"
          label="Tipo"
        ></v-select>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="start">
      <v-col lg="12" md="12" sm="12">
        <h1 class="titleView">
          Selecione o funcionário a qual o movimento pertence
        </h1>
      </v-col>
    </v-row>

    <v-row class="perfil2-row" align="center" align-content="center" justify="center">
      <v-col lg="5" md="5" sm="6" cols="12" style="background-color:#fff; border-radius: 8px; margin: 8px 8px;"
        v-for="(funcionario, index) in funcionarios" :key="index">
        <cardF style="border: none;"
          :id="funcionario.id"
          :nome="funcionario.nome"
          :funcao="funcionario.cargo"
          :email="funcionario.telefone"
          imgUrl="" :Editing="false">
        </cardF>
        <v-switch v-model="funcionarioId" :value="funcionario.id"
        label="Salvar movimento para este funcionário?">
        </v-switch>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center"
    align-content="center" justify="center">
      <v-btn @click="criarMovimento()" id="saveBtn" color="#ff9467" class="salvarBtn" depressed outlined>
        <v-progress-circular
          v-if="loading"
          :size="20"
          :width="2" style="margin-right: 5px;"
          color="#ff9467"
          indeterminate
        ></v-progress-circular>
        Salvar movimento
      </v-btn>
    </v-row>

    <v-row class="perfil-row" align="center"
    align-content="center" justify="center">
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
import cardF from '../components/funcionarioCard.vue';

export default {
  components: {
    cardF,
  },
  data() {
    return {
      funcionarioId: null,
      funcionarios: [],
      movimento: {
        descricao: '',
        valor: null,
        tipo: '',
      },
      movimentTypes: [
        { text: 'Bônus', value: 'P'},
        { text: 'Desconto', value: 'D'}
      ],
      photo: null,
      loading: false,
      success: null,
      message: null,
      gettingFuncionarios: null,
      items: [
        {
          href: '',
          disabled: false,
          link: true,
          text: 'Movimentos',
          to: '/movimentos',
        },
        {
          href: '',
          disabled: true,
          link: false,
          text: 'Criar Movimento',
          to: '',
        },
      ],
      permissions: [
        {
          text: 'Cadastrar novos funcionários',
          permission: false,
        },
        {
          text: 'Editar informações de um funcionário',
          permission: false,
        },
        {
          text: 'Criar movimentos para um funcionário',
          permission: false,
        },
        {
          text: 'Criar folhas de pagamentos',
          permission: false,
        },
      ],
      rules: {
        required: value => !!value || 'Este campo é obrigatório!',
      },
    };
  },
  mounted() {
    this.getFuncionarios();
  },
  methods: {
    criarMovimento() {
      this.loading = true;
      this.disableBtn(true);
      this.movimento.valor = parseFloat(this.movimento.valor);
      api.post(`/movimentos/${this.funcionarioId}`, this.movimento)
        .then((response) => {
          this.loading = false;
          this.success = response.data.success;
          this.message = response.data.message;
          if (this.success) {
            setTimeout(() => {
              this.$router.push('/movimentos');
            }, 2000);
          }
        })
        .catch(() => {
          this.loading = false;
          this.success = false;
          this.message = 'Algo de errado aconteceu';
        });
    },
    getFuncionarios() {
      this.gettingFuncionarios = true;
      api.get('/colaboradores')
        .then((response) => {
          this.gettingFuncionarios = false;
          this.funcionarios = response.data.colaboradores;
          if (this.funcionarios.length === 0) {
            this.success = false;
            this.message = 'Não há nenhum funcionário cadastrado';
          }
        })
        .catch(() => {
          this.gettingFuncionarios = false;
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
    color: #4a4a4a;
  }
  .perfil-row {
    width: 98%;
    margin: 0 auto;
  }
  .perfil2-row {
    width: 96%;
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
    padding: 0px 4px !important;
  }
  .cols3 {
    flex: 0 0 23.6% !important;
    max-width: 45.5% !important;
    margin: 0 5px;
    padding: 0px 4px !important;
  }
  .cols3:last-child {
    margin-right: 20px;
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
    width: 175px;
    text-transform: none;
    border-radius: 25px !important;
    font-size: .9rem;
    font-weight: bold;
    color: #ffffff;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .permissionsCardCol {
    padding: 4px !important;
  }
  .permissionsCard {
    border-radius: 8px;
    height: 65px;
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
