<template>
  <div>
    <v-container>
      <v-row class="text-center my-3">
        <h1 class="font-weight-light">Compras</h1>
        <v-spacer></v-spacer>
        <v-btn outlined to="/compras/adicionar" nuxt>
          <v-icon class="mr-2">mdi-plus</v-icon>
          Adiconar compra
        </v-btn>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <div class="d-none d-sm-flex">
      <v-card>
        <v-card-title>
          Compras
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Procurar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="compras"
          :search="search"
          :loading="loading"
          dense
          no-results-text="Nada encontrado"
          no-data-text="Banco de dados vazio"
          loading-text="Carregando dados..."
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <div class="d-flex flex-column d-sm-none">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Data Pag.</th>
              <th class="text-left">Loja</th>
              <th class="text-left">Valor</th>
              <th class="text-left">Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="compra in compras" :key="compra.id">
              <td>{{ compra.datePagamento }}</td>
              <td>{{ compra.fornecedor }}</td>
              <td>{{ compra.valorPagamento }}</td>
              <td>
                <v-btn text small><v-icon>mdi-pencil</v-icon></v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  middleware: 'securePage',

  data() {
    return {
      compras: [],
      search: '',
      loading: false,
      headers: [
        {
          text: 'Data pag.',
          align: 'start',
          value: 'datePagamento',
        },
        { text: 'Valor', value: 'valorPagamento' },
        { text: 'Pagador', value: 'pagador' },
        { text: 'Loja', value: 'fornecedor' },
        { text: 'Obra', value: 'obra' },
        { text: 'Material', value: 'material' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  mounted() {
    this.loading = true
    this.$fire.firestore
      .collection('compras')
      .get()
      .then((snap) => {
        this.compras = []
        snap.forEach((doc) => {
          this.compras.push({ id: doc.id, ...doc.data() })
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
    editItem(compra) {
      this.$router.push({
        path: `/compras/${compra.id}`,
      })
    },
  },
})
</script>
