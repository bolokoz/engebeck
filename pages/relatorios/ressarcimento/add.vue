<template>
  <div>
    <Titulo
      titulo="Adicionar compra"
      texto_link="Voltar para compras"
      link="/compras"
    />

    <RessarcimentoForm
      :obras="obras"
      :contas="contas"
      :compras="compras"
      :is-edit="false"
    />
  </div>
</template>

<script>
export default {
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ app }) {
    const obras = []
    await app.$fire.firestore
      .collection('obras')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          obras.push({ id: doc.id, ...doc.data() })
        })
      })
    const fornecedores = []
    await app.$fire.firestore
      .collection('fornecedores')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          fornecedores.push({ id: doc.id, ...doc.data() })
        })
      })
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

    return { obras, contas, compras }
  },
  data() {
    return {
      items: [],
      loading: false,
    }
  },
  computed: {},

  mounted() {},
  methods: {},
}
</script>
