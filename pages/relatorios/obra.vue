<template>
  <div>
    <v-container class="mx-0 px-0">
      <h1 class="font-weight-regular">Relatório gastos por obra</h1>

      <v-card>
        <v-sheet tile height="54" class="d-flex pa-2">
          <v-select
            v-model="obraId"
            dense
            :items="obras"
            outlined
            item-text="nome"
            item-value="id"
            clearable
            hide-details
            label="Obra"
            class=""
          ></v-select>

          <v-spacer></v-spacer>
          <v-btn color="primary" @click.stop="procurar"> Procurar </v-btn>
        </v-sheet>

        <div class="container">
          <bar-chart v-if="loaded" :chart-data="chartData" :options="options" />
        </div>

        <!-- <div class="container">
          <pie-chart
            v-if="selected.length > 0"
            :chart-data="pieChartData"
            :options="pieOptions"
          />
        </div> -->
        <!-- <v-sheet>
          <v-card-text v-show="compras.length > 0">
            <v-expansion-panels popout>
              <v-expansion-panel v-for="(etapa, i) in etapas" :key="i">
                <v-expansion-panel-header>
                  {{ etapa.name }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list>
                    <v-list-group
                      v-for="item in etapa.subetapas"
                      :key="item.name"
                      v-model="item.active"
                      :prepend-icon="item.icon"
                      no-action
                    >
                      <template #activator>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </template>

                      <v-list-item
                        v-for="child in item.items"
                        :key="child.title"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="child.title"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-group>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-sheet> -->
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  data() {
    return {
      obras: [],
      compras: [],
      loading: false,
      loaded: false,
      obraId: '',
      categorias: null,
      selected: [],
      desktopHeaders: [
        { text: 'Descrição', value: 'descricao' },
        { text: 'Fornecedor', value: 'fornecedor.nome' },
        { text: 'Valor', value: 'valorTotal' },
        { text: 'Data criada', value: 'createdAt', align: 'end' },
        { text: 'Completo', value: 'completo', width: 30, align: 'end' },
        {
          text: 'Editar',
          value: 'actions',
          sortable: false,
          align: 'end',
          width: 30,
        },
      ],
      mobileHeaders: [
        { text: 'Descrição', value: 'descricao' },
        { text: 'Fornecedor', value: 'fornecedor' },
        { text: 'Editar', value: 'actions', sortable: false, align: 'end' },
      ],
    }
  },
  computed: {
    etapas() {
      return [...new Set(this.compras.map((compra) => compra.etapa))]
    },
    pieChartData() {
      return {
        labels: this.filterBySelected.map((d) => d?.description),
        datasets: [
          {
            data: this.filterBySelected.map((d) => d.value),
          },
        ],
      }
    },

    chartData() {
      return {
        labels: this.sumByMonth.map((d) => d.x),

        datasets: [
          {
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            // borderColor: 'rgb(54, 162, 235)',
            // borderWidth: 1,
            label: this.obras.find((el) => el.id === this.obraId).nome,
            data: this.sumByMonth.map((d) => d.y),
          },
        ],
      }
    },

    monthsAvailable() {
      return [
        ...new Set(this.pagamentos.map((d) => d.date.slice(0, -3)).sort()),
      ]
    },

    eachMonth() {
      const result = []
      this.monthsAvailable.forEach((month) => {
        this.pagamentos
          .filter((d) => d.date.includes(month))
          .forEach((pag) => {
            result.push({
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              // borderColor: 'rgb(54, 162, 235)',
              // borderWidth: 1,
              label: pag.description,
              data: pag.value,
            })
          })
      })
      return result
    },

    sumByMonth() {
      const result = []
      this.monthsAvailable.forEach((month) => {
        // result[month] = this.pagamentos.filter((pagamamento) =>
        //   pagamento.date.includes(month)
        // )
        result.push({
          x: DateTime.fromISO(month).setLocale('pt-BR').toFormat('LLLL yyyy'),
          y: this.pagamentos
            .filter((d) => d.date.includes(month)) // gets only from each month
            .reduce((a, b) => +a + +b.value, 0) // sums all
            .toFixed(2), // 2 digits decimal
        })
      })
      return result
    },

    pagamentos() {
      const array = []
      // gets every buy
      this.compras.forEach((compra) => {
        // gets every payment from buy
        compra?.pagamentos.forEach((pagamento) => {
          array.push({
            date: pagamento.date,
            value: pagamento.valor,
            method: pagamento?.metodo,
            payer: pagamento?.conta,
            payer_id: pagamento?.conta.id,
            description: compra?.descricao,
          })
        })
      })
      return array
    },

    results() {
      return this.pagamentos.map((d) => ({ x: d.date, y: d.value }))
    },

    options() {
      return {
        // onClick(e, item) {
        //   console.log(item[0]._index)
        //   this.filterByMonth(item[0]._index)
        // },
        title: {
          text:
            'Total ' +
            Number(this.totalGeral).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }),
          fontSize: 20,
          fontColor: '#fff',
          display: true,
        },
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              let label = data.datasets[tooltipItem.datasetIndex].label || ''

              if (label) {
                // console.log(label)
                // label = DateTime.fromISO(label)
                //   .setLocale('pt-BR')
                //   .toFormat('LLL yyyy')
                label += ': '
              }
              label += Number(tooltipItem.yLabel).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
              return label
            },
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                // Include a dollar sign in the ticks
                callback(value) {
                  return value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                },
              },
            },
          ],
        },
      }
    },
    pieOptions() {
      return {}
    },

    // subEtapas() {
    //   const subetapas = new Map()
    //   subetapas.set()
    // },
    totalGeral() {
      return this.pagamentos.reduce((a, b) => +a + +b.value, 0).toFixed(2)
    },
  },
  mounted() {
    this.read()
  },
  methods: {
    filterByMonth(index) {
      const monthSelected = this.monthsAvailable[index]
      this.selected = this.pagamentos.filter((d) =>
        d.date.includes(monthSelected)
      )
    },
    read() {
      this.loading = true
      this.$fire.firestore
        .collection('obras')
        .get()
        .then((snap) => {
          this.obras = []
          snap.forEach((doc) => {
            this.obras.push({ id: doc.id, ...doc.data() })
          })
        })
        .catch(() => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
        })
    },

    procurar() {
      this.loading = true
      this.$fire.firestore
        .collection('compras')
        .where('obra.id', '==', this.obraId)
        .get()
        .then((snap) => {
          this.compras = []
          snap.forEach((doc) => {
            this.compras.push({ id: doc.id, ...doc.data() })
          })
        })
        .catch(() => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
          this.categorias = ''
          this.loaded = true
        })
    },
  },
}
</script>
