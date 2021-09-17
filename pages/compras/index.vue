<template>
  <div>
    <v-container>
      <h1 class="font-weight-regular">Compras</h1>

      <Lista3
        :items="items"
        :mobile-headers="mobileHeaders"
        :desktop-headers="desktopHeaders"
        sort-by="data"
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
        { text: 'Valor', value: 'valor' },
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
        { text: 'Valor', value: 'valor' },
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
        .catch(() => {
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
