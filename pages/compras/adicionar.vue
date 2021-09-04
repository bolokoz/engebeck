<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <h1 class="font-weight-regular">Adicionar compra simples</h1>
        </v-col>

        <v-col cols="12">
          <h4 class="font-weight-light">
            Para quando possui pagamento completo e nota
          </h4>
        </v-col>

        <v-col cols="12">
          <p class="text--caption font-weight-light">
            <a href="/compras/adicionar_complexa">
              Clique aqui para adicionar compra complexa
            </a>
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <v-container>
      <v-form ref="form" @submit.prevent="adicionarCompra">
        <h3 class="my-3 font-weight-bold">Dados do pagamento</h3>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-menu
              v-model="menuPagamento"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              dense
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="form.datePagamento"
                  label="Data Pagamento"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.datePagamento"
                locale="pt-br"
                @input="menuPagamento = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model.number="form.valorPagamento"
              label="Valor pago"
              dense
              required
              prefix="R$"
              :rules="rules.valor"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-combobox
              v-model="form.pagador"
              :loading="loadingPagadores"
              :items="pagadores"
              :search-input.sync="searchPagadores"
              cache-items
              required
              hide-no-data
              dense
              hide-details
              label="Quem pagou"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-combobox
              v-model="form.fornecedor"
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
        <v-divider class="my-5"></v-divider>
        <h3 class="my-3 font-weight-bold">Dados da nota</h3>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model.number="form.nota"
              label="Número da nota"
              required
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-menu
              v-model="menuNota"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              dense
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="form.dateNota"
                  label="Data Nota"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.dateNota"
                @input="menuNota = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.chave"
              dense
              label="Chave NFE"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider class="my-5"></v-divider>
        <h3 class="my-3 font-weight-bold">Dados de controle</h3>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-combobox
              v-model="form.obra"
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
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-combobox
              v-model="form.etapa"
              :loading="loadingEtapas"
              :items="etapas"
              :search-input.sync="searchEtapas"
              cache-items
              hide-no-data
              dense
              hide-details
              label="Etapa da obra"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-combobox
              v-model="form.material"
              :loading="loadingMateriais"
              :items="materiais"
              :search-input.sync="searchMateriais"
              cache-items
              hide-no-data
              hide-details
              dense
              label="Que material?"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-textarea
              v-model="form.obs"
              outlined
              label="Observações"
              hint="Observações extra"
              dense
            ></v-textarea>
          </v-col>
        </v-row>

        <v-divider class="my-5"></v-divider>

        <v-row>
          <v-col sm="8" offset-sm="1" md="5" lg="6">
            <v-row>
              <v-col>
                <v-btn
                  dark
                  color="green light"
                  outlined
                  @click="adicionarCompra"
                  >{{ loading ? 'enviando' : 'ADD' }}</v-btn
                >
              </v-col>

              <v-col>
                <v-btn type="reset" @click="resetar">RESET</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  middleware: 'securePage',

  data() {
    const defaultForm = Object.freeze({
      valorPagamento: 1233,
      fornecedor: 'ELOS',
      obra: 'Alphaville 4',
      material: 'Fios para AR',
      etapa: 'Acabamento',
      pagador: 'MRB',
      nota: 442342,
      chave: '431412312453521234543212',
      obs: 'asfdasdfaewf',
      dateNota: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      datePagamento: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
    })

    return {
      form: Object.assign({}, defaultForm),
      defaultForm,
      fornecedores: ['foo', 'bar', 'fizz', 'buzz'],
      obras: ['fxvboo', 'basdfgr', 'fixcvbzz', 'asd'],
      materiais: ['f543oo', '4bar', 'fiz12z', 'buzz'],
      etapas: ['foo3', 'bar1', 'fi3zz', 'buzz'],
      pagadores: ['MRB', 'ENGEBECK'],
      loading: false,
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
      menuNota: false,

      menuPagamento: false,
      rules: {
        valor: [(val) => val > 0 || `Valor deve ser positivo`],
        datePagamento: [
          (val) => (val || '').length > 0 || `I don't believe you!`,
        ],
        pagador: [(val) => (val || '').length > 0 || 'This field is required'],
        fornecedor: [
          (val) => (val || '').length > 0 || 'This field is required',
        ],
      },
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
    formIsValid() {
      return (
        this.form.first &&
        this.form.last &&
        this.form.favoriteAnimal &&
        this.form.terms
      )
    },
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
    },
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
    async adicionarCompra() {
      this.loading = true
      const compra = {
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
        ...this.form,
      }
      await this.$fire.firestore
        .collection('compras')
        .add(compra)
        .then((docRef) => {
          console.log('Documento written ID: ', docRef.id)
          this.$notifier.showMessage({
            content: 'Adicionado, resetando formulario',
            color: 'success',
            top: false,
          })

          setTimeout(() => {
            this.resetar()
          }, 3000)
        })
        .catch((error) => {
          console.log(error)
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

    resetar() {
      this.$notifier.showMessage({
        content: 'Resetando formulario',
        color: 'primary',
        top: true,
      })
      this.form = Object.assign({}, this.defaultForm)
      this.$refs.form.reset()
    },
  },
})
</script>
