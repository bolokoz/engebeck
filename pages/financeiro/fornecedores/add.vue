<template>
  <div>
    <Titulo
      titulo="Adicionar Fornecedor"
      texto_link="Voltar para fornecedores"
      link="/financeiro/fornecedores"
    />

    <FornecedoresFormOnly :is-edit="false" :tipos-fornecedores="lista" />
  </div>
</template>
<script>
export default {
  middleware: 'securePage',
  transition: 'fade',
  async asyncData({ app }) {
    let lista = []
    await app.$fire.firestore
      .collection('listas')
      .doc('fornecedores')
      .get()
      .then((doc) => {
        if (doc.exists) {
          lista = doc.data().tipos
        }
      })

    return { lista }
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
}
</script>
