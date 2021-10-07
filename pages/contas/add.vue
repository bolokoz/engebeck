<template>
  <div>
    <Titulo titulo="Adicionar conta" texto_link="Voltar " link="/contas" />

    <ContasFormOnly :is-edit="false" />
  </div>
</template>
<script>
export default {
  middleware: 'securePage',
  transition: 'fade',

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
