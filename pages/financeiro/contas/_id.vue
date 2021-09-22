<template>
  <div>
    <Titulo
      titulo="Editar fornecedor"
      :subtitulo="`id: ${id}`"
      texto_link="Voltar"
      link="/financeiro/fornecedores"
    />

    <div v-if="item">
      <ContasFormOnly :id="id" :form="item" :is-edit="true" />

      <DadosExtras :form="item" />
    </div>

    <div v-else>
      <h3>Documento não encontrado</h3>
    </div>
  </div>
</template>
<script>
const db = 'contas'
export default {
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ params, app }) {
    const id = params.id
    let item
    const docRef = app.$fire.firestore.collection(db).doc(id)

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          item = doc.data()
        } else {
          app.$notifier.showMessage({
            content: 'Documento não existe',
            color: 'error',
            top: false,
          })
        }
      })
      .catch((error) => {
        app.$notifier.showMessage({
          content: error,
          color: 'error',
          top: false,
        })
      })

    return { id, item }
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

  methods: {},
}
</script>
