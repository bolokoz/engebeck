<template>
  <v-row>
    <v-col
      v-for="(pagamento, k) in pagamentos"
      :key="k"
      sm="8"
      md="6"
      offset-lg="0"
      lg="3"
    >
      <v-text-field
        v-model="pagamento.data"
        outlined
        :label="`Data pagamento ${pagamento.n}`"
      ></v-text-field>
      <v-text-field
        v-model="pagamento.valor"
        outlined
        :label="`Valor pagamento ${pagamento.n}`"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nParcelas: {
      type: Number,
      required: true,
    },
    parcelas: {
      type: Array,
      required: true,
    },
  },
  computed: {
    parcelas() {
      let pagamentos = []
      for (var i = 0; i < this.nParcelas; ++i) {
        pagamentos.push({ n: i + 1, data: '', valor: '' })
      }
      return pagamentos
    },
  },
}
</script>