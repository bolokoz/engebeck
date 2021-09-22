<template>
  <div>
    <Titulo
      titulo="Adicionar obra"
      texto_link="Voltar para obras"
      link="/obras"
    />

    <ObrasFormOnly :is-edit="false" />
  </div>
</template>
<script>
export default {
  middleware: 'securePage',
  transition: 'fade',

  //   async asyncData({ app }) {
  //     return {}
  //   },

  data() {
    return {
      loading: false,
    }
  },

  computed: {},

  methods: {},
}
</script>
