<template>
  <div>
    <Titulo
      titulo="Adicionar compra"
      texto_link="Voltar para compras"
      link="/compras"
    />

    <ComprasFormOnly3
      :obras="obras"
      :fornecedores="fornecedores"
      :contas="contas"
      :etapas="etapas"
      :files="files"
    />

    <v-divider class="my-5"></v-divider>
  </div>
</template>
<script>
export default {
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ app }) {
    let obras = []
    await app.$fire.firestore
      .collection('obras')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          obras.push({ id: doc.id, ...doc.data() })
        })
      })
    let fornecedores = []
    await app.$fire.firestore
      .collection('fornecedores')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          fornecedores.push({ id: doc.id, ...doc.data() })
        })
      })
    let contas = []
    await app.$fire.firestore
      .collection('contas')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          contas.push({ id: doc.id, ...doc.data() })
        })
      })

    let etapas = []
    await app.$fire.firestore
      .collection('etapas')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          etapas.push({ ...doc.data() })
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
