<template>
  <v-container>
    <v-btn @click="addParcela" text small color="primary"
      >Adicionar parcela</v-btn
    >
    <div v-if="parcelado">
      <v-btn @click="removeParcela" text small color="warning"
        >Remover parcela</v-btn
      >

      Saldo a pagar: {{ saldo }}

      <v-row>
        <v-col
          v-for="(pagamento, k) in parcelas"
          :key="k"
          sm="8"
          md="6"
          offset-lg="0"
          lg="2"
        >
          <v-card color="grey lighten-4" class="pa-2">
            <v-text-field
              v-model.number="pagamento.valor"
              type="number"
              prefix="R$"
              outlined
              :label="`Valor pagamento ${pagamento.n}`"
            ></v-text-field>
            <v-menu
              v-model="pagamento.menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="pagamento.data"
                  label="Data prevista pagamento"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                outlined
                v-model="pagamento.data"
                @input="pagamento.menu = false"
              ></v-date-picker>
            </v-menu>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import EscolherData2 from './EscolherData2.vue'
export default {
  components: { EscolherData2 },
  props: {
    parcelas: {
      type: Array,
      required: true,
      default: [],
    },
  },
  data() {
    return {
      menu: false,
    }
  },
  methods: {
    addParcela() {
      this.nParcelas++
      let pagamento = { n: this.nParcelas, data: '', valor: '', menu: false }
      this.form.parcelas.push(pagamento)
    },
    removeParcela() {
      this.nParcelas--
      this.form.parcelas.pop()
    },
  },

  computed: {
    saldo() {
      let saldo = +this.form?.valor
      let pago = 0

      for (let i = 0; i < this.form.parcelas.length; i++) {
        pago += this.form.parcelas.valor[i]
      }
      return saldo - pago
    },
    parcelado() {
      return this.form.parcelas?.length > 0 ? true : false
    },
  },
}
</script>