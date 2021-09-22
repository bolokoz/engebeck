<template>
  <div>
    <Titulo
      titulo="Editar obra"
      :subtitulo="`Conta de id: ${id}`"
      texto_link="Voltar para obra"
      link="/obras"
    />
    <div v-if="item">
      <ObrasFormOnly :id="id" :form="item" :is-edit="true" />

      <DadosExtras :form="item" />
    </div>
    <div v-else>
      <h3>Documento não encontrado</h3>
    </div>
  </div>
</template>
<script>
const db = 'obras'
export default {
  middleware: 'securePage',

  async asyncData({ params, app }) {
    const id = params.id
    const docRef = app.$fire.firestore.collection(db).doc(id)
    let item
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
}
</script>
