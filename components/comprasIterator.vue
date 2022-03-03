<template>
  <div>
    <v-card color="#385F73" dark :loading="loading" :key="compra.id" transition="slide-x-transition">
      <v-card-title v-if="compra.descricao">
        {{ compra.descricao }}
      </v-card-title>

      <v-card-subtitle>
        <p v-if="compra.obs">Obs: {{ compra.obs }}</p>
        <p>Obra: {{ sanitized.obra }}</p>
        <p>Fornecedor: {{ sanitized.fornecedor }}</p>
        <p v-if="compra.pagamentos">
          Data pagamento:
          {{ compra.pagamentos[0].date }}
        </p>

        <p v-if="compra.valorTotal">Valor total : R$ {{ compra.valorTotal }}</p>
      </v-card-subtitle>
      <div class="mx-2">
        <TiposGastos
          :valor="compra.valorTotal"
          :tipos="tipos"
          :tiposGastos="tiposGastos"
          :etapas="etapas"
          @addTipoGasto="addTipoGasto"
          @removerTipoGasto="removerTipoGasto"
        />
      </div>
     
    </v-card>

    
  </div>
</template>

<script>
export default {
  props: {
    compra: {
      default: () => ({}),
      type: Object,
      required: true,
    },
    etapas: {
      type: Array,
      default: () => [],
    },
        tiposGastos: {
      type: Array,
      default: () => [],
    },

    loading: {
      default: false,
      type: Boolean,
    },
  },
  data: () => ({
    tipos: ['Material', 'Serviço', 'Ambos', 'Insumo', 'Outros'],

  }),
  computed: {
    sanitized() {
      let compra = {}
      compra.obra = this.compra.obra?.nome
      compra.fornecedor = this.compra.fornecedor?.nome
      return compra
    },

  },
  methods:{
            addTipoGasto() {
this.$emit('addTipoGasto')
    },
    removerTipoGasto(i) {
      this.$emit('removerTipoGasto',i)
    },
  },
}
</script>
