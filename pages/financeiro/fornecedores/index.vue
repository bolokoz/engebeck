<template>
  <Pagina
    :titulo="'Fornecedores'"
    db="fornecedores"
    :desktopHeaders="desktopHeaders"
    :mobileHeaders="mobileHeaders"
    path="/financeiro/fornecedores"
  />
</template>

<script>
const { default: Pagina } = require('~/components/Pagina.vue')

export default {
  components: { Pagina },
  data() {
    return {
      desktopHeaders: [
        { text: 'Nome', value: 'nome' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'end' },
      ],
      mobileHeaders: [
        { text: 'Descrição', value: 'descricao' },
        { text: 'Valor', value: 'valor' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'end' },
      ],
    }
  },
}
</script>