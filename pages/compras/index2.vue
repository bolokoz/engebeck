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

    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-none d-sm-block">
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
                :items="items"
                :search="search"
                :loading="loading"
                dense
                no-results-text="Nada encontrado"
                no-data-text="Banco de dados vazio"
                loading-text="Carregando dados..."
              >
                <template #item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </div>
          <div class="d-flex flex-column d-sm-none">
            <v-simple-table>
              <template #default>
                <thead>
                  <tr>
                    <th v-for="(th, k) in mobileTableHeaders" :key="k">
                      {{ th }}
                    </th>
                    <th class="text-left">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td v-for="(td, k) in mobileTableItems" :key="k">
                      {{ item[td] }}
                    </td>
                    <td>
                      <v-btn text small @click="editItem(item)"
                        ><v-icon>mdi-pencil</v-icon></v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue'
import { mobileTableHeaders, mobileTableItems } from '~/dados/compras.js'

export default Vue.extend({
  middleware: 'securePage',

  data() {
    return {
      mobileTableHeaders: mobileTableHeaders,
      mobileTableItems: mobileTableItems,
      items: [],
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
    editItem(item) {
      this.$router.push({
        path: `/compras/${item.id}`,
      })
    },
  },
})
</script>
