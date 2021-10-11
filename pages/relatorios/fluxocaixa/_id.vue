<template>
  <div>
    <Titulo
      titulo="Editar relatório"
      :subtitulo="`id: ${id}`"
      texto_link="Voltar"
      link="/relatorios/administracao"
    />

    <div v-if="item">
      <administracaoForm
        :id="id"
        :obras="obras"
        :contas="contas"
        :compras="compras"
        :form="item"
        :is-edit="true"
      />

      <DadosExtras :form="item" />
    </div>

    <div v-else>
      <h3>Documento não encontrado</h3>
    </div>
  </div>
</template>
<script>
const db = 'relatorios'
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

    return { id, item, compras, obras, fornecedores, contas }
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
