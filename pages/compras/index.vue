<template>
  <div>
    <v-container class="mx-0 px-0">
      <h1 class="font-weight-regular">Compras</h1>

      <ListaCompras
        :items="items"
        :mobile-headers="mobileHeaders"
        :desktop-headers="desktopHeaders"
        sort-by="data"
        show-select
        :telefone="false"
        path="/compras"
      />
    </v-container>
  </div>
</template>

<script>
const db = 'compras'

export default {
  data() {
    return {
      items: [],
      loading: false,
      desktopHeaders: [
        { text: 'Descrição', value: 'descricao' },
        { text: 'Fornecedor', value: 'fornecedor.nome' },
        { text: 'Obra', value: 'obra.nome' },
        { text: 'Valor', value: 'valorTotal' },
        { text: 'Data criada', value: 'createdAt', align: 'end' },
        { text: 'Completo', value: 'completo', width: 30, align: 'end' },
        {
          text: 'Editar',
          value: 'actions',
          sortable: false,
          align: 'end',
          width: 30,
        },
      ],
      mobileHeaders: [
        { text: 'Descrição', value: 'descricao' },
        { text: 'Fornecedor', value: 'fornecedor' },
        { text: 'Editar', value: 'actions', sortable: false, align: 'end' },
      ],
    }
  },
  mounted() {
    this.read()
  },
  methods: {
    read() {
      this.loading = true
      this.$fire.firestore
        .collection(db)
        .get()
        .then((snap) => {
          this.items = []
          snap.forEach((doc) => {
            this.items.push({ id: doc.id, ...doc.data() })
          })
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
