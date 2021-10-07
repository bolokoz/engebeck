<template>
  <div>
    <Titulo
      titulo="Adicionar obra"
      texto_link="Voltar para obras"
      link="/obras"
    />

    <ObrasFormOnly :is-edit="false" :contas="contas" />
  </div>
</template>
<script>
export default {
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ app }) {
    const contas = []
    await app.$fire.firestore
      .collection('contas')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          contas.push({ id: doc.id, ...doc.data() })
        })
      })
    return { contas }
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
