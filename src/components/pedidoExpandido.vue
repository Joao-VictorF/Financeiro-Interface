<template>
  <v-container class="pedidoBox" fluid>
    <div>
      <v-row class="firstRow" align-content="center">
        <v-col class="idBox" sm="3" xs="5">
          <h4 class="titlePedido">{{pedido.id}}</h4>

          <v-divider
            class="divider"
            inset light
            vertical
          ></v-divider>
        </v-col>

        <v-col sm="9" xs="7" class="secondColumn">
          <h4 class="titlePedido">{{pedido.name}}</h4>
          <v-btn class="printBtn" rounded outlined color="#ff9467">
            <v-icon class="printerIcon">mdi-printer</v-icon>
            Imprimir
          </v-btn>
        </v-col>

      </v-row>

      <v-row align-content="start">
        <v-col sm="6">
          <h5 class="secondRowTitle">Endereço</h5>
          <p class="secondRowText">{{pedido.address.street}}</p>
          <p class="secondRowText">{{pedido.address.referencePoint}}</p>
        </v-col>

        <v-col sm="6">
          <h5 class="secondRowTitle">Contato</h5>
          <p class="secondRowText">{{pedido.contact.phone}}</p>
          <p class="secondRowText">{{pedido.contact.email}}</p>
        </v-col>
      </v-row>

      <v-row class="itensTableRow" justify="center">
        <v-col class="text-center" sm="2">
          Qnt.
        </v-col>
        <v-col class="text-center" sm="4">
          Item
        </v-col>

        <v-col class="text-center" sm="3">
          Preço und.
        </v-col>
        <v-col class="text-center" sm="3">
          Total
        </v-col>
      </v-row>

      <v-row v-if="pedido.type.localeCompare('new') == 0" justify="center">
        <v-col sm="12">
          <v-divider></v-divider>
        </v-col>

        <v-col class="acceptPedido" sm="12">
          Aceitar pedido?
        </v-col>

        <v-col class="acceptBtnsBox" sm="12">
          <v-btn class="acceptBtn" rounded outlined color="#ff9467">
            Sim
          </v-btn>
          <v-btn class="acceptBtn noBtn" rounded color="#989898">
            Não
          </v-btn>
        </v-col>

        <v-col sm="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row class="itensRow" v-for="item in pedido.items"
        :key="item.name" >
        <v-col class="text-center" sm="2">
          {{item.num}}
        </v-col>
        <v-col class="text-center" sm="4">
          {{item.name}}
        </v-col>

        <v-col class="text-center" sm="3">
          R$ {{item.price}}
        </v-col>
        <v-col class="text-center" sm="3">
          R$ {{item.num * item.price}}
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script>
export default {
  props: {
    pedido: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style scoped>
  .pedidoBox {
    height: 62%;
    width: 94%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    overflow-y: auto;
  }
  .firstRow {
    background-color: #fff;
    border-radius: 8px;
  }
  .idBox {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .divider {
    height: 50px;
    border-color:#b5abab !important;
    border-width: .8px;
    margin-left: 11px;
  }
  .idBox, .secondColumn {
    padding: 0;
  }
  .secondColumn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .titlePedido {
    font-size: 20px;
    font-family: Muli;
  }
  .printBtn {
    margin-right: 12px;
  }
  .printerIcon {
    color: #ff9467;
    margin-right: 5px;
  }
  .secondRowTitle {
    font-family: Muli;
    font-size: 18px;
  }
  .secondRowText {
    margin-bottom: 0;
  }
  .acceptBtnsBox {
    display: flex;
    justify-content: center;
  }
  .acceptPedido {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 0;
  }
  .acceptBtn {
    width: 140px;
    font-weight: bold;
    margin: 0 5px;
  }
  .noBtn {
    color: #ffffff;
  }
  .itensTableRow {
    background-color: #d0e1e5;
    border-radius: 25px
  }
  .itensRow {
    background-color: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
  }

</style>
