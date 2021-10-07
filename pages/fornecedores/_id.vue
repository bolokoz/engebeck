<template>
  <div>
    <Titulo
      titulo="Editar Fornecedor"
      :subtitulo="`Id: ${id}`"
      texto_link="Voltar para fornecedores"
      link="/fornecedores"
    />

    <div v-if="item">
      <FornecedoresFormOnly
        :id="id"
        :form="item"
        :is-edit="true"
        :tipos-fornecedoers="lista"
      />

      <DadosExtras :form="item" />
    </div>

    <div v-else>
      <h3>Documento não encontrado</h3>
    </div>
  </div>
</template>
<script>
const db = 'fornecedores'
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

    return { id, item, lista }
  },

  data() {
    return {
      loading: false,
      item: {},
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
