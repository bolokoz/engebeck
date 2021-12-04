<template>
  <div>
    <Titulo
      titulo="Adicionar compra simples"
      texto_link="Voltar para compras"
      link="/compras"
    />

    <CompraSimplesForm
      :obras="obras"
      :fornecedores="fornecedores"
      :contas="contas"
      :etapas="etapas"
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

    const etapas = []
    await app.$fire.firestore
      .collection('etapas')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          Object.values(doc.data()).forEach((d) => etapas.push(d))
        })
      })

    return { obras, fornecedores, etapas, contas }
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
