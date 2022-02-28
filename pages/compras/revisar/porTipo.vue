<template>
  <div>
    <comprasIterator
      :compra="comprasSemTipo[i]"
      :loading="loading"
      :etapas="etapas"
      @next="next"
    />
  </div>
</template>


<script>
const db = 'compras'

export default {
  data() {
    return {
      compras: [],
      etapas: [],
      loading: false,
      i: 0,
    }
  },
  mounted() {
    this.read()
  },
  computed: {
    comprasSemTipo() {
      return this.compras.filter((x) => !x.hasOwnProperty('tiposGastos'))
    },
  },
  methods: {
    read() {
      this.loading = true
      this.$fire.firestore
        .collection(db)
        .limit(10)
        .get()
        .then((snap) => {
          this.compras = []
          snap.forEach((doc) => {
            this.compras.push({ id: doc.id, ...doc.data() })
          })
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
        })
      this.etapas = []
      this.$fire.firestore
        .collection('etapas')
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            Object.values(doc.data()).forEach((d) => this.etapas.push(d))
          })
        })
    },
    next() {
      this.i++
    },
  },
}
</script>
