<template>
  <div>
    <v-container class="my-3">
      <v-row>
        <h1 class="font-weight-regular">Adicionar compra simples</h1>
        <h4 class="font-weight-light">
          Para quando possui pagamento completo e nota
        </h4>
        <p class="text--caption font-weight-light">
          <a href="/compras/adicionar_complexa">
            Clique aqui para adicionar compra complexa
          </a>
        </p>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <v-container fluid>
      <h3 class="my-3 font-weight-light">Dados do pagamento</h3>
      <v-row>
        <v-col>
          <v-menu
            v-model="menuPagamento"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="datePagamento"
                label="Data Pagamento"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="datePagamento"
              locale="pt-br"
              @input="menuPagamento = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model.number="pagamento"
            label="Valor pago"
            prefix="R$"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-combobox
            v-model="pagador"
            :loading="loadingPagadores"
            :items="pagadores"
            :search-input.sync="searchPagadores"
            cache-items
            hide-no-data
            hide-details
            label="Quem pagou"
          ></v-combobox>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-combobox
            v-model="fornecedor"
            :loading="loadingFornecedores"
            :items="fornecedores"
            :search-input.sync="searchFornecedores"
            cache-items
            hide-no-data
            hide-details
            dense
            label="Destino (loja) do pagamento?"
          ></v-combobox>
        </v-col>
      </v-row>

      <v-divider class="my-3" inset></v-divider>
      <h3 class="my-3 font-weight-light">Dados da nota</h3>

      <v-row>
        <v-col>
          <v-text-field
            v-model.number="nota"
            label="Número da nota"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-menu
            v-model="menuNota"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateNota"
                label="Data Nota"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateNota"
              @input="menuNota = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model.number="chave" label="Chave NFE"></v-text-field>
        </v-col>
      </v-row>

      <v-divider class="my-3" inset></v-divider>

      <h3 class="my-3 font-weight-light">Dados de controle</h3>

      <v-row>
        <v-col>
          <v-combobox
            v-model="obra"
            :loading="loadingObras"
            :items="obras"
            :search-input.sync="searchObras"
            cache-items
            hide-no-data
            hide-details
            label="Obra"
          ></v-combobox>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-combobox
            v-model="etapa"
            :loading="loadingEtapas"
            :items="etapas"
            :search-input.sync="searchEtapas"
            cache-items
            hide-no-data
            hide-details
            label="Etapa da obra"
          ></v-combobox>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-combobox
            v-model="material"
            :loading="loadingMateriais"
            :items="materiais"
            :search-input.sync="searchMateriais"
            cache-items
            hide-no-data
            hide-details
            label="Que material?"
          ></v-combobox>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-textarea
            v-model="obs"
            label="Observações"
            hint="Observações extra"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-divider class="my-3" inset></v-divider>

      <v-row>
        <v-col>
          <v-btn dark color="green light" @click="adicionar">Adicionar</v-btn>
        </v-col>
        <v-col>
          <v-btn dark color="blue light" @click="addAndCheck"
            >Adicionar e verificar</v-btn
          >
        </v-col>
        <v-col>
          <v-btn @click="resetar">Resetar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  middleware: 'securePage',

  data() {
    return {
      pagamento: 0,
      fornecedores: ['foo', 'bar', 'fizz', 'buzz'],
      fornecedor: null,
      obras: ['fxvboo', 'basdfgr', 'fixcvbzz', 'asd'],
      obra: null,
      materiais: ['f543oo', '4bar', 'fiz12z', 'buzz'],
      material: null,
      etapas: ['foo3', 'bar1', 'fi3zz', 'buzz'],
      etapa: null,
      pagadores: ['MRB', 'ENGEBECK'],
      pagador: null,
      value: null,
      nota: 0,
      chave: 0,
      loadingEtapas: false,
      searchEtapas: null,
      loadingPagadores: false,
      searchPagadores: null,
      loadingMateriais: false,
      searchMateriais: null,
      loadingObras: false,
      searchObras: null,
      loadingFornecedores: false,
      searchFornecedores: null,
      obs: '',
      menuNota: false,
      dateNota: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      datePagamento: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      menuPagamento: false,
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
    },
  },

  mounted() {
    /* this.$fire.firestore
      .collection('users')
      .doc(this.authUser.id)
      .collection('products')
      .get()
      .then((snap) => {
        this.messages = []
        snap.forEach((doc) => {
          this.messages.push(doc)
        })
      }) */
  },

  methods: {
    querySelections(v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.fornecedores.filter((e) => {
          return (e || '').toLowerCase().includes((v || '').toLowerCase())
        })
        this.loading = false
      }, 500)
    },
    adicionar() {
      alert('adicionar')
    },
    addAndCheck() {
      alert('addAndCheck')
    },
    resetar() {
      alert('resetar')
    },
  },
})
</script>
