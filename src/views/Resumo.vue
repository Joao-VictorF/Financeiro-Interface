<template>
  <v-container fluid>
    <!-- breadcumbs -->
    <v-row class="resumo-row" align="center" align-content="center" justify="start">
      <v-col lg="3" sm="6">
        <v-breadcrumbs large :items="items" divider=">">
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-row class="resumo-row" align="center" align-content="center" justify="space-between">
      <v-col lg="3" v-for="card in firstRowCards" :key="card.text">
        <v-card class="firstcards" outlined>
          <span class="firstcardsTitle">{{card.text}}</span>
          <span class="firstcardsValue">{{card.value}}</span>
          <span class="firstcardsSuffix">{{card.sufix}}</span>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="resumo-row" align="center" align-content="center" justify="space-between">
      <v-col lg="5">
        <v-card outlined>
          <apexchart class="pizzaChart" type="pie" width=380
          :options="pizzaOptions" :series="pizzaSeries" />
        </v-card>
      </v-col>

      <v-col lg="7">
        <v-card outlined>
          <apexchart type=line heihgt=100 :options="lineOptions" :series="lineSeries" />
        </v-card>
      </v-col>
    </v-row>

    <v-row class="resumo-row" align="center" align-content="center" justify="space-between">
      <v-col lg="7">
        <v-card outlined>
          <apexchart type=bar height=300 :options="barOptions" :series="barSeries" />
        </v-card>
      </v-col>

      <v-col lg="5">
        <v-card outlined>
          <apexchart type=area height=350 :options="areaOptions" :series="areaSeries" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      items: [
        {
          href: '/inicio',
          disabled: false,
          link: true,
          text: 'Inicio',
          to: '/inicio',
        },
        {
          href: '',
          disabled: true,
          link: false,
          text: 'Resumo',
          to: '',
        },
      ],
      firstRowCards: [
        {
          text: 'Média de tempo de espera',
          value: 6,
          sufix: 'minutos',
        },
        {
          text: 'Média de avaliação',
          value: 4.8,
          sufix: 'estrelas',
        },
        {
          text: 'Média de faturamento/dia',
          value: 500.00,
          sufix: 'reais',
        },
        {
          text: 'Tempo online',
          value: 82,
          sufix: 'horas',
        },
      ],

      pizzaSeries: [44, 55, 13, 43, 22],
      pizzaOptions: {
        labels: ['Blue', 'Green', 'Orange', 'Red', 'Purple'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      },

      lineSeries: [{
        name: 'Pratos',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      }],
      lineOptions: {
        chart: {
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Pratos vendidos por mês',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
      },

      barSeries: [
        {
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43, 21, 49],
        },
        {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27, 33, 12],
        }, {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14, 15, 13],
        },
      ],
      barOptions: {
        chart: {
          stacked: true,
          stackType: '100%',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        }],
        xaxis: {
          categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2',
            '2012 Q3', '2012 Q4',
          ],
        },
        fill: {
          opacity: 1,
        },

        legend: {
          position: 'right',
          offsetX: 0,
          offsetY: 50,
        },
      },

      areaSeries: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      areaOptions: {
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00', '2018-09-19T01:30:00', '2018-09-19T02:30:00',
            '2018-09-19T03:30:00', '2018-09-19T04:30:00', '2018-09-19T05:30:00',
            '2018-09-19T06:30:00',
          ],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      },
    };
  },
  methods: {
  },
};
</script>

<style scoped>
  .home {
    width: 100vw;
    height: 100vh;
    background-color: #edf3f4;
    text-align: center; font-size: 32pt
  }
  .resumo-row {
    width: 98%;
    margin: 0 auto;
  }
  .firstcards {
    height: 160px;
    border-radius: 8px;
  }
  .firstcardsTitle {
    font-size: 20px;
    color: #4a4a4a;
    text-align: center;
    width: 100%;
    display: block;
    margin-top: 10px;
  }
  .firstcardsValue, .firstcardsSuffix {
    color: #21bbcd;
    text-align: center;
    width: 100%;
    /* display: block; */
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .firstcardsValue {
    font-size: 36px;
  }
  .firstcardsSuffix {
    font-size: 18px;
  }
  .charts {
    /* height: 420px; */
  }
  .pizzaChart {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
</style>
