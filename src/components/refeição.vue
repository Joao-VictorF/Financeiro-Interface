<template>
  <div>
    <v-row class="refeicao" align="center" align-content="center">
      <v-col lg="10" md="9" cols="8">
        {{nome}}
      </v-col>

      <v-col class="text-center" lg="2" md="3" cols="4">
        <v-row align="center" align-content="center" justify="start">
          <v-col cols="4">
            <v-icon class="blue-icon">mdi-pencil</v-icon>
          </v-col>

          <v-col cols="4">
            <v-icon class="blue-icon">mdi-content-duplicate</v-icon>
          </v-col>

          <v-col cols="4" class="delete-icon">
            <v-icon class="blue-icon">mdi-delete</v-icon>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    nome: {
      required: true,
      type: String,
    },
    id: {
      required: true,
      type: String,
    },
  },
};
</script>

<style scoped>
  .blue-icon {
    color: #21bbcd;
    cursor: pointer;
  }
  .delete-icon {
    padding-left: 0;
    padding-right: 24px;
  }
  .refeicao {
    height: 45px;
    margin-bottom: 8px !important;
    border-radius: 8px;
    background: #ffffff;
    width: 98%;
    margin: 0 auto;
  }
</style>
