<template>
  <div>
    <v-container class="mx-0 px-0">
      <h1 class="font-weight-regular">Contabilidade</h1>
      <h5 class="font-weight-light">
        Movimentações financeiras não relacionadas à obras
      </h5>

      <Lista3
        :items="items"
        :desktop-headers="desktopHeaders"
        :mobile-headers="mobileHeaders"
        sort-by="data"
        :telefone="false"
        path="/contabilidade"
      />
    </v-container>
  </div>
</template>
<script>
const db = 'contabilidade'

export default {
  data() {
    return {
      items: [],
      loading: false,
      desktopHeaders: [
        { text: 'Data', value: 'createdAt', align: 'end' },
        { text: 'Categoria', value: 'categoria' },
        { text: 'Destino/Origem', value: 'destinoOrigem' },
        { text: 'Obs', value: 'obs' },
        { text: 'Valor', value: 'valorTotal' },
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
