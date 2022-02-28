<template>
  <div>
    <v-speed-dial
      v-model="fab"
      right
      bottom
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-account-circle </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="yellow" @click="edit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark color="green" @click="update">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn fab dark color="indigo" @click="$emit('next')">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-card color="#385F73" dark>
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
    loading: {
      default: false,
      type: Boolean,
    },
  },
  data: () => ({
    tipos: ['Material', 'Serviço', 'Ambos', 'Insumo', 'Outros'],

    direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition',
    i: 0,
    tiposGastos: [],
  }),
  computed: {
    sanitized() {
      let compra = {}
      compra.obra = this.compra.obra?.nome
      compra.fornecedor = this.compra.fornecedor?.nome
      return compra
    },
  },
  methods: {
    addTipoGasto() {
      this.tiposGastos.push({
        etapa: '',
        subetapa: '',
        valor: '',
        tipo: '',
      })
    },
    removerTipoGasto(i) {
      this.tiposGastos.splice(i, 1)
    },
    edit() {
      this.$router.push({
        path: `/compras/${this.compra.id}`,
      })
    },
    async update() {
      this.loading = true

      // work around for combobox not returning object correctly
      this.localForm.etapa = this.local.etapa

      const modificacao = {
        modifiedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        modifiedBy: this.authUser,
        saldoNota: this.saldoNota,
        saldoPago: this.saldoPago,
        ...this.localForm,
      }
      console.log(modificacao)
      //   console.log('modify', this.id, modificacao)
      await this.$fire.firestore
        .collection(db)
        .doc(this.id)
        .update(modificacao)
        .then(() => {
          this.$notifier.showMessage({
            content: 'Item modificado ',
            color: 'info',
            top: false,
          })
        })
        .catch((error) => {
          console.log(error)
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
          this.$router.push({
            path: '/compras',
          })
        })
    },
  },
}
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
.v-speed-dial {
  position: absolute;
  z-index: 100;
}

#create .v-btn--floating {
  position: relative;
}

#card {
  /* height: 80vh; */
}
</style>