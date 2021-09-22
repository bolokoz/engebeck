<template>
  <div>
    <Titulo
      titulo="Adicionar Fornecedor"
      texto_link="Voltar para fornecedores"
      link="/financeiro/fornecedores"
    />

    <FornecedoresFormOnly :is-edit="false" />
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
}
</script>
