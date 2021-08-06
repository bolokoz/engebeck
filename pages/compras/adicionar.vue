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
      <v-row>
        <v-col justify="center">
          <v-date-picker
            v-model="picker"
            color="light green lighten-3"
          ></v-date-picker>
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
          <v-autocomplete
            v-model="fornecedor"
            :loading="loading"
            :items="fornecedores"
            :search-input.sync="search"
            cache-items
            hide-no-data
            hide-details
            label="Destino do pagamento?"
          ></v-autocomplete>
        </v-col>
      </v-row>

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
          <v-text-field v-model.number="chave" label="Chave NFE"></v-text-field>
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
      value: null,
      nota: 0,
      chave: 0,
      loading: false,
      search: null,
      obs: '',
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
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
    reset() {
      alert('resetar')
    },
  },
})
</script>
