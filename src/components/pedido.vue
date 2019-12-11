<template>
  <v-container fluid class="pedidoBox" @click="clickPedido">
    <v-row>
      <v-col class="idBox" sm="4" xs="5">
        <h4 class="titlePedido">{{_id}}</h4>

        <v-divider
          class="divider"
          inset light
          vertical
        ></v-divider>
      </v-col>

      <v-col sm="8" xs="7">
        <h4 class="titlePedido">{{name}}</h4>
        <span class="arrival">
          <v-icon class="arrivalIcon">mdi-bell</v-icon> {{arrivalTime}}
        </span>

        <span class="preparation">
          <v-icon class="preparationIcon">mdi-chef-hat</v-icon> {{preparationTime}}
        </span>

        <span class="delivery">
          <v-icon class="deliveryIcon">mdi-check-circle-outline</v-icon> {{deliveryTime}}
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    _id: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    arrivalTime: {
      required: true,
      type: String,
    },
    preparationTime: {
      required: true,
      type: String,
    },
    deliveryTime: {
      required: true,
      type: String,
    },
  },
  methods: {
    clickPedido() {
      this.$emit('openPedido');
    },
  },
};
</script>

<style scoped>
  .pedidoBox {
    background-color:#fff;
    border-radius: 8px;
    margin-top: 10px;
    padding: 0 12px !important;
    cursor: pointer;
  }
  .idBox {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .divider {
    height: 50px;
    border-color:#b5abab !important;
    border-width: .8px;
    margin-left: 11px;
  }
  .titlePedido {
    font-size: 20px;
    font-family: Muli;
  }
  .arrival, .preparation, .delivery {
    font-size: 14px;
  }
  .arrivalIcon, .preparationIcon, .deliveryIcon {
    font-size: 17px;
  }
  .arrival {
    margin-right: 5px;
    color: #989898;
  }
  .arrivalIcon {
    color: #989898;
    margin-right: 2px;
  }
  .preparation {
    margin-right: 5px;
    color: #e7b25b;
  }
  .preparationIcon {
    color: #e7b25b;
    margin-right: 2px;
  }
  .delivery {
    color: #29c259;
  }
  .deliveryIcon {
    color: #29c259;
    margin-right: 2px;
  }
</style>
