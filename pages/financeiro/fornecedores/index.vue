<template>
  <div>
    <v-container class="mx-0 px-0">
      <h1 class="font-weight-regular">Fornecedores</h1>
      <v-row no-gutters>
        <v-col cols="12">
          <Lista3
            :items="items"
            :mobile-headers="mobileHeaders"
            :desktop-headers="desktopHeaders"
            path="/financeiro/fornecedores"
            sort-by="data"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
  </div>
</template>

<script>
const db = 'fornecedores'
export default {
  middleware: 'securePage',

  data() {
    return {
      loading: false,
      items: [],
      desktopHeaders: [
        { text: 'Nome', value: 'nome' },
        { text: 'Cidade', value: 'cidade' },
        {
          text: 'Editar',
          value: 'actions',
          sortable: false,
          align: 'end',
          width: 30,
        },
      ],
      mobileHeaders: [
        { text: 'Nome', value: 'nome' },
        { text: 'Cidade', value: 'cidade' },
        { text: 'Editar', value: 'actions', sortable: false, align: 'end' },
      ],
    }
  },

  computed: {},
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
