<template>
  <div>
    <Titulo
      titulo="Adicionar movimentação financeira"
      texto_link="Voltar para contabilidade"
      link="/contabilidade"
    />

    <contabilidade-form
      :contas="contas"
      :contabilidades="contabilidades"
      :compras="compras"
      :is-edit="false"
    />
  </div>
</template>
<script>
import ContabilidadeForm from '~/components/ContabilidadeForm.vue'
export default {
  components: { ContabilidadeForm },
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ app }) {
    const contas = []
    await app.$fire.firestore
      .collection('contas')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          contas.push({ id: doc.id, ...doc.data() })
        })
      })
    const compras = []
    await app.$fire.firestore
      .collection('compras')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          compras.push({ id: doc.id, ...doc.data() })
        })
      })
    const contabilidades = []
    await app.$fire.firestore
      .collection('contabilidades')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          contabilidades.push({ id: doc.id, ...doc.data() })
        })
      })
    return { contas, contabilidades, compras }
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {},

  methods: {},
}
</script>
