<template>
  <div>
    <v-container class="mx-0 px-0">
      <h1 class="font-weight-regular">Relatórios de ressarcimento</h1>

      <Lista3
        :items="items"
        :mobile-headers="mobileHeaders"
        :desktop-headers="desktopHeaders"
        sort-by="data"
        :telefone="false"
        path="/relatorios/ressarcimento"
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
        { text: 'Obra', value: 'obra' },
        { text: 'Valor', value: 'valorTotal' },
        { text: 'Data criada', value: 'createdAt', align: 'end' },
        {
          text: 'Editar',
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
        .doc('ressarcimentos')
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
