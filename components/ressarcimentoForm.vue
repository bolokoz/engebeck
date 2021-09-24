<template>
  <v-form ref="form">
    <!-- <h3 class="my-3 font-weight-bold">Escolha as datas</h3> -->
    <!-- <h4 class="my-3 font-weight-bold">De {{ dates[0] }} até {{ dates[1] }}</h4> -->
    <v-row justify="center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-date-picker v-model="dates" range locale="pt-BR"></v-date-picker>
      </v-col>

      <v-col cols="12" sm="6" md="6" lg="6">
        <v-select
          v-model="obra"
          :items="obras"
          label="Obra"
          dense
          item-text="nome"
          item-value="id"
          outlined
        ></v-select>

        <v-select
          v-model="recebedor"
          :items="contas"
          label="Conta recebedora"
          item-text="nome"
          dense
          outlined
        ></v-select>
        <!-- <v-select
          v-model="devedor"
          :items="contas"
          label="Conta devedora"
          item-text="nome"
          dense
          outlined
        ></v-select> -->
      </v-col>
      <v-col cols="12">
        <v-data-table
          v-model="selected"
          :headers="desktopHeaders"
          :items="items"
          item-key="key"
          sort-by="date"
          show-select
          sort-desc
          no-results-text="Nada encontrado"
          no-data-text="Banco de dados vazio"
          loading-text="Carregando dados..."
        >
          <template #item.date="{ item }">
            {{ new Date(item.date).toLocaleString('pt-BR').split(' ')[0] }}
          </template>
          <template #item.valor="{ item }"> R$ {{ item.valor }} </template>
          <template #item.pagador="{ item }"> {{ item.pagador }} </template>
          <template #item.actions="{ item }">
            <!-- <v-icon
                    v-if="telefone"
                    small
                    class="mr-2"
                    @click="whatsapp(item)"
                  >
                    mdi-phone
                  </v-icon> -->
            <!-- <v-icon small class="mr-2" @click="email(item)">
                    mdi-mail
                  </v-icon> -->
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    isEdit: {
      default: false,
      type: Boolean,
    },
    obras: {
      type: Array,
      default: () => [],
    },
    contas: {
      type: Array,
      default: () => [],
    },
    compras: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      selected: [],
      dates: [
        new Date(Date.now()).toISOString().substr(0, 10),
        new Date(Date.now() + 1).toISOString().substr(0, 10),
      ],
      desktopHeaders: [
        { text: 'Obra', value: 'obra' },
        { text: 'Valor', value: 'valor' },
        { text: 'Pagador', value: 'pagador' },
        { text: 'Data ', value: 'date', align: 'end' },
        {
          text: 'Editar',
          value: 'actions',
          sortable: false,
          align: 'end',
          width: 30,
        },
      ],
      mobileHeaders: [
        { text: 'Obra', value: 'obra' },
        { text: 'Data', value: 'date' },
        { text: 'Editar', value: 'actions', sortable: false, align: 'end' },
      ],
      devedor: {},
      recebedor: {},
      obra: {},
    }
  },

  computed: {
    items() {
      return this.pagamentos.filter(
        (e) =>
          e.obraId === this.obra &&
          e.date > new Date(this.dates[0]) &&
          e.date < new Date(this.dates[1]) &&
          e.pagador === this.recebedor
      )
    },
    pagamentos() {
      const pagamentos = []
      this.compras.forEach((compra) => {
        compra.pagamentos.forEach((pagamento) => {
          const item = {}
          item.obra = compra.obra.nome
          item.obraId = compra.obra.id
          item.valor = pagamento.valor
          item.key = pagamento.valor + '_' + pagamento.date
          item.date = new Date(pagamento.date)
          item.pagador = pagamento.conta.nome
          item.pagadorId = pagamento.conta.id
          item.metodo = pagamento.metodo
          pagamentos.push(item)
        })
      })
      return pagamentos
    },
  },

  methods: {},
}
</script>
