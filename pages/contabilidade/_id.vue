<template>
  <div>
    <Titulo
      titulo="Editar contabilidade"
      :subtitulo="`Id: ${id}`"
      texto_link="Voltar "
      link="/contabilidade"
    />

    <div v-if="contabil">
      <ContabilidadeForm
        :id="id"
        :form="contabil"
        :compras="compras"
        :contas="contas"
        :contabilidades="contabilidades"
        :is-edit="true"
      />

      <DadosExtras :form="contabil" />
    </div>

    <div v-else>
      <h3>Documento não encontrado</h3>
    </div>
  </div>
</template>
<script>
import ContabilidadeForm from '~/components/ContabilidadeForm.vue'

const db = 'contabilidade'
export default {
  components: { ContabilidadeForm },
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ app, params }) {
    const id = params.id
    let contabil
    const docRef = app.$fire.firestore.collection(db).doc(id)

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          contabil = doc.data()
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
    return { id, contabil, contas, contabilidades, compras }
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
