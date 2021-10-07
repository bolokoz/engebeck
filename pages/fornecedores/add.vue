<template>
  <div>
    <Titulo
      titulo="Adicionar Fornecedor"
      texto_link="Voltar para fornecedores"
      link="/fornecedores"
    />

    <FornecedoresFormOnly :is-edit="false" :fornecedores="fornecedores" />
  </div>
</template>
<script>
export default {
  middleware: 'securePage',
  transition: 'fade',
  async asyncData({ app }) {
    const fornecedores = []
    await app.$fire.firestore
      .collection('fornecedores')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          fornecedores.push({ id: doc.id, ...doc.data() })
        })
      })

    return { fornecedores }
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  mounted() {},
}
</script>
