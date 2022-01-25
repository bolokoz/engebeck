<template>
  <div>
    <Titulo
      titulo="Listar pagamentos individuais"
      texto_link="Voltar para compras"
      link="/compras"
    />

    <ListaPagamentos :compras="compras" />
  </div>
</template>

<script>
export default {
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ app }) {
    const compras = []
    await app.$fire.firestore
      .collection('compras')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          compras.push({ id: doc.id, ...doc.data() })
        })
      })

    return { compras }
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
