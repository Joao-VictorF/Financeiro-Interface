<template>
  <v-card class="funcionario-card mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-avatar
        size="80"
        color="#a8bbbf"
      >
        <v-icon v-if="!imgUrl" class="perfil-icon">mdi-account-outline</v-icon>
        <v-img v-else :src="imgUrl"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{nome}}</v-list-item-title>
        <v-list-item-subtitle>
          {{funcao}}
          <br>
          {{email}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions class="cardBtns">
      <v-btn v-if="Editing" @click="verfuncionario()" class="editarBtn" depressed="">
        Editar funcionario
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    nome: {
      required: true,
      type: String,
    },
    funcao: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    id: {
      required: true,
      type: Number,
    },
    imgUrl: {
      required: false,
      type: String,
    },
    Editing: {
      required: false,
      default: true,
      type: Boolean,
    },
  },
  methods: {
    verfuncionario() {
      const link = `/funcionario/${this.id}`;
      this.$router.push(link);
    },
    iniciarConsulta() {
      const link = `/consulta/${this.id}/1`;
      this.$router.push(link);
    },
  },
};
</script>

<style scoped>
  .funcionario-card {
    height: 100%;
    width: 98%;
    border-radius: 8px !important;
    margin: 0 10px 8px 0;
  }
  .perfil-icon {
    color: #fff;
    transform: scale(1.8);
  }
  .v-btn {
    letter-spacing: 0.0592857143em !important;
  }
  .cardBtns {
    display: flex;
    justify-content: center;
  }
  .editarBtn {
    margin: 0 auto;
    width: 48%;
    text-transform: none;
    border-radius: 25px !important;
    font-size: .8rem;
    font-weight: bold;
    white-space: wrap;
  }
  .editarBtn, .editarIcon  {
    color: #21bbcd;
    margin: 0 3px 0 3px;
  }
</style>
