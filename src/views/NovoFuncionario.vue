<template>
   <v-container id="container" fluid>
    <v-row class="perfil-row" align="center" align-content="center" justify="start">
      <v-col cols="10"  >
        <v-breadcrumbs large :items="items" divider=">">
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="start">
      <v-col lg="10">
        <h1 class="titleView" v-if="!isEditing">
          Novo funcionario
        </h1>
        <h1 v-else class="titleView">
          Editar funcionario
        </h1>
      </v-col>

      <v-col style="display: flex; justify-content: end;" v-if="this.$route.params.id" lg="2">
        <v-btn @click="deletarFuncionário()" id="deleteBtn"
        color="red" style="color:#fff; width: 100px;" depressed>
        <v-progress-circular
          v-if="loading"
          :size="20"
          :width="2" style="margin-right: 5px;"
          color="#fff"
          indeterminate
        ></v-progress-circular>
        Excluir
      </v-btn>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="center">
      <v-col class="text-center colsBox perfil-image" lg="3" md="3" cols="4">
        <v-avatar color="#21bbcd" size="120">
          <img v-if="photo" :src="photo">
          <span v-else-if="nameAbbreviation" class="white--text abbreviation">{{nameAbbreviation}}</span>
          <span v-else class="white--text abbreviation">
            <v-icon class="perfil-icon">mdi-account-outline</v-icon>
          </span>

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
             flat v-model="Funcionario.nome"
             label="Nome Completo"
            ></v-text-field>
          </v-col>
          <!-- row 2 -->
          <v-col class="colsBox cols6" lg="5" md="6" cols="12">
            <v-text-field
             color="#21bbcd" v-mask="'###.###.###-##'"
             flat v-model="Funcionario.cpf"
             label="CPF"
            ></v-text-field>
          </v-col>

          <v-col class="colsBox cols6" lg="5" md="6" cols="12">
            <v-text-field
             color="#21bbcd"
             flat :rules="[rules.required]"
             label="E-mail"
            ></v-text-field>
          </v-col>
          <!-- row 3 -->
          <v-col class="colsBox cols6LastRow" lg="5" md="6" cols="12">
            <v-text-field
             color="#21bbcd"
             flat v-model="Funcionario.cargo"
             label="Cargo"
            ></v-text-field>
          </v-col>

          <v-col class="colsBox cols6LastRow" lg="5" md="6" cols="12">
            <v-text-field
             color="#21bbcd"
             flat v-model="Funcionario.salario"
             label="Salário (R$)"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row >

    <v-row class="perfil-row" align="center" align-content="center" justify="center">
      <v-col class="colsBox cols3" lg="3" md="3">
        <v-text-field
        color="#21bbcd" v-mask="['(##) ####-####', '(##) #####-####']"
        flat v-model="Funcionario.telefone"
        label="Telefone"
        ></v-text-field>
      </v-col>

      <v-col class="colsBox cols3" lg="3" md="3">
        <v-text-field
        color="#21bbcd"
        flat v-model="Funcionario.bairro"
        label="Bairro"
        ></v-text-field>
      </v-col>

      <v-col class="colsBox cols3" lg="3" md="3">
        <v-text-field
        color="#21bbcd"
        flat v-model="Funcionario.endereco"
        label="Endereço"
        ></v-text-field>
      </v-col>

      <v-col class="colsBox cols3" lg="3" md="3">
        <v-text-field
        color="#21bbcd" v-mask="'#####-###'"
        flat v-model="Funcionario.cep"
        label="CEP"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="start">
      <v-col lg="6">
        <h1 class="titleView">
          Permissões
        </h1>
      </v-col>
    </v-row>

    <v-row class="perfil2-row" align="center" align-content="center" justify="">
      <v-col class="permissionsCardCol" lg="6" md="6" sm="6" v-for="p in permissions" :key="p.text">
        <v-card class="permissionsCard" outlined>
          <v-switch color="#0a9d7f"
            hide-details
            v-model="p.permission"
            :label="p.text"
          ></v-switch>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="center">
      <v-btn v-if="!isEditing" @click="criarFuncionário()" id="saveBtn" color="#ff9467" class="salvarBtn" depressed outlined>
        <v-progress-circular
          v-if="loading"
          :size="20"
          :width="2" style="margin-right: 5px;"
          color="#ff9467"
          indeterminate
        ></v-progress-circular>
        Salvar
      </v-btn>

      <v-btn v-else @click="editarFuncionário()" id="saveBtn" color="#ff9467" class="salvarBtn" depressed outlined>
        <v-progress-circular
          v-if="loading"
          :size="20"
          :width="2" style="margin-right: 5px;"
          color="#ff9467"
          indeterminate
        ></v-progress-circular>
        Salvar
      </v-btn>
    </v-row>

    <v-row class="perfil-row" align="center" align-content="center" justify="center">
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
      Funcionario: {
        nome: '',
        cpf: '',
        cargo: '',
        telefone: '',
        endereco: '',
        bairro: '',
        cep: '',
        salario: null,
      },
      photo: null,
      loading: false,
      success: null,
      message: null,
      isEditing: false,
      items: [
        {
          href: '',
          disabled: false,
          link: true,
          text: 'Funcionarios',
          to: '/funcionarios',
        },
        {
          href: '',
          disabled: true,
          link: false,
          text: 'Novo Funcionário',
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
      nameAbbreviation: null,
      rules: {
        phone: v => v.length === 14 || v.length === 15 || 'Informe um número de telefone válido!',
        required: value => !!value || 'Este campo é obrigatório!',
      },
    };
  },
  mounted() {
    const colabID = this.$route.params.id;
    if (colabID) {
      this.getPerfil(colabID);
    }

  },
  methods: {
    getPerfil(id) {
      api.get(`/colaboradores/${id}`, this.Funcionario)
        .then((response) => {
          this.Funcionario = response.data.colaborador;
          this.success = response.data.success;
          this.message = response.data.message;
          this.isEditing = true;
        })
        .catch(() => {
          this.success = false;
          this.message = 'Algo de errado aconteceu';
        });
    },
    criarFuncionário() {
      this.loading = true;
      this.disableBtn(true);
      // eslint-disable-next-line radix
      this.Funcionario.salario = parseInt(this.Funcionario.salario);
      api.post('/colaboradores/1', this.Funcionario)
        .then((response) => {
          this.loading = false;
          this.success = response.data.success;
          this.message = response.data.message;
          if (this.success) {
            setTimeout(() => {
              this.$router.push('/funcionarios');
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
    editarFuncionário() {
      this.loading = true;
      this.disableBtn(true);
      // eslint-disable-next-line radix
      this.Funcionario.salario = parseInt(this.Funcionario.salario);
      api.put(`/colaboradores/${this.$route.params.id}`, this.Funcionario)
        .then((response) => {
          this.loading = false;
          this.success = response.data.success;
          this.message = response.data.message;
          if (this.success) {
            setTimeout(() => {
              this.$router.push('/funcionarios');
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
    deletarFuncionário() {
      this.loading = true;
      // eslint-disable-next-line radix
      api.delete(`/colaboradores/${this.$route.params.id}`)
        .then((response) => {
          this.loading = false;
          this.success = response.data.success;
          this.message = response.data.message;
          if (this.success) {
            setTimeout(() => {
              this.$router.push('/funcionarios');
            }, 2000);
          }
        })
        .catch(() => {
          this.loading = false;
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
  .perfil-icon {
    color: #fff;
    transform: scale(2.8);
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
    width: 145px;
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
