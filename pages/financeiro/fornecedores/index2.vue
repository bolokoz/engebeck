<template>
  <div>
    <v-container>
      <v-row class="text-center my-3">
        <h1 class="font-weight-light">Fornecedores</h1>
        <v-spacer></v-spacer>
        <v-btn outlined to="/financeiro/fornecedores/adicionar" nuxt>
          <v-icon class="mr-2">mdi-plus</v-icon>
          Adiconar fornecedor
        </v-btn>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <Lista
      NomeLista="Fornecedores"
      :items="items"
      :mobileTableHeaders="mobileTableHeaders"
      :mobileTableItems="mobileTableItems"
      :desktopTableHeaders="desktopTableHeaders"
      :telefone="true"
      editPath="/financeiro/fornecedores"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import {
  mobileTableHeaders,
  mobileTableItems,
  desktopTableHeaders,
} from '~/dados/fornecedores.js'
import Lista from '~/components/Lista.vue'
export default Vue.extend({
  middleware: 'securePage',
  components: {
    Lista,
  },

  data() {
    return {
      items: [],
      mobileTableHeaders: mobileTableHeaders,
      mobileTableItems: mobileTableItems,
      desktopTableHeaders: desktopTableHeaders,
      search: '',
      loading: false,
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
    title() {
      let url = this.$route.path
      let parts = url.split('/')
      return parts[parts.length - 1]
    },
  },

  mounted() {
    this.loading = true
    this.$fire.firestore
      .collection('fornecedores')
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

  methods: {
    editItem(fornecedor) {
      this.$router.push({
        path: `/financeiro/fornecedores/${fornecedor.id}`,
      })
    },
  },
})
</script>
