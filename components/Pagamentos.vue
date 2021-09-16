<template>
  <v-container>
    <v-row justify="center">
      <v-expansion-panels inset>
        <v-expansion-panel v-for="(pagamento, i) in pagamentos" :key="i">
          <v-expansion-panel-header class="font-weight-bold grey lighten-2"
            >Pagamento {{ i + 1 }}</v-expansion-panel-header
          >
          <v-expansion-panel-content class="grey lighten-3">
            <v-row class="my-2">
              <v-col cols="12" sm="6" md="6" offset-lg="0" lg="6">
                <v-date-picker
                  outlined
                  full-width
                  v-model="pagamento.data"
                  locale="pt-BR"
                ></v-date-picker>
              </v-col>

              <v-col cols="12" sm="6" md="6" offset-lg="0" lg="6">
                <v-autocomplete
                  v-model="pagamento.metodo"
                  :items="metodo"
                  outlined
                  label="Método pagamento"
                ></v-autocomplete>

                <v-autocomplete
                  v-model="pagamento.conta"
                  outlined
                  return-object
                  item-text="nome"
                  :items="contas"
                  label="Selecionar conta pagadora"
                ></v-autocomplete>

                <v-text-field
                  v-model.number="pagamento.valor"
                  prefix="R$"
                  outlined
                  label="Valor total"
                ></v-text-field>

                <v-btn color="red" @click="removerPagamento(i)"
                  >Remover este pagamento</v-btn
                >
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-btn @click="addPagamento">Adicionar pagamento</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    pagamentos: {
      type: Array,
    },
    contas: {
      default: [],
      type: Array,
    },
  },
  data() {
    return {
      menu: false,
      localPagamentos: [],
      nPagamentos: 1,
      metodo: ['PIX', 'TED', 'DOC', 'BOLETO', 'DINHEIRO', 'CARTAO'],
    }
  },
  methods: {
    addPagamento() {
      this.localPagamentos.push({
        data: '',
        valor: 0,
        conta: 0,
        metodo: '',
      })
      this.$emit('update:pagamentos', this.localPagamentos)
    },
    removerPagamento(i) {
      this.localPagamentos.pop(i)
      this.$emit('update:pagamentos', this.localPagamentos)
    },
  },

  computed: {
    // localPagamentos() {
    //   return this.pagamentos
    // },
  },

  mounted() {
    this.localPagamentos = this.pagamentos
  },
}
</script>