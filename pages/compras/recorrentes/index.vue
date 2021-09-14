<template>
  <Pagina
    :titulo="'Compras recorrentes'"
    db="compras"
    :desktopHeaders="desktopHeaders"
    :mobileHeaders="mobileHeaders"
    editPath="/compras/recorrentes"
  />
</template>

<script>
const { default: Pagina } = require('~/components/Pagina.vue')

export default {
  components: { Pagina },
  data() {
    return {
      desktopHeaders: [
        { text: 'Descrição', value: 'descricao' },
        { text: 'Valor', value: 'valor' },
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