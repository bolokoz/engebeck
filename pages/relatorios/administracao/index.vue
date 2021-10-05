<template>
  <div>
    <h1 class="font-weight-regular">Relatórios de administração</h1>
    <v-container class="mx-0 px-0">
      <Lista3
        :items="items"
        :mobile-headers="mobileHeaders"
        :desktop-headers="desktopHeaders"
        sort-by="data"
        :telefone="false"
        path="/relatorios/administracao"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      loading: false,
      desktopHeaders: [
        { text: 'Obra', value: 'obra.nome' },
        { text: 'Recebedor', value: 'recebedor.nome' },
        { text: 'Valor', value: 'valorTotal' },
        { text: 'De', value: 'dates[0]', align: 'end' },
        { text: 'Até', value: 'dates[1]', align: 'end' },
        {
          text: 'Visualizar',
          value: 'actions',
          sortable: false,
          align: 'end',
          width: 30,
        },
      ],
      mobileHeaders: [
        { text: 'Obra', value: 'obra' },
        { text: 'Data', value: 'createdAt' },
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
        .collection('relatorios')
        .get()
        .then((snap) => {
          this.items = []
          snap.forEach((doc) => {
            if (doc.data().tipo === 'administracao') {
              this.items.push({ id: doc.id, ...doc.data() })
            }
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
