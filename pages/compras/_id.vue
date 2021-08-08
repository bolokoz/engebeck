<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <h1 class="font-weight-regular">Editar compra</h1>
        </v-col>

        <v-col cols="12">
          <h4 class="font-weight-light">Compra id: {{ id }}</h4>
        </v-col>

        <v-col cols="12">
          <p class="text--caption font-weight-light">
            <nuxt-link to="/compras/"> Voltar para compras </nuxt-link>
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <v-container>
      <v-form @submit.prevent="modificarCompra" ref="form">
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

        <h3 class="my-3 font-weight-bold">Dados extras</h3>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <p>Criado por: {{ form.createdBy }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <p>Criado em: {{ createdAtDate }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <p>
              Modificado em:
              {{ form.modifiedAt }}
            </p>
            <p>
              Modificado por:
              {{ modifiedByDate }}
            </p>
          </v-col>
        </v-row>

        <v-divider class="my-5"></v-divider>

        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <v-btn color="yellow light" @click="modificarCompra">{{
                  loading ? 'Carregando' : 'Modificar'
                }}</v-btn>
              </v-col>

              <v-col>
                <v-row justify="center">
                  <v-dialog v-model="dialog" persistent max-width="290">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="red" outlined dark v-bind="attrs" v-on="on">
                        Deletar
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5">
                        Tem certeza?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="green darken-1"
                          text
                          @click="dialog = false"
                        >
                          Voltar
                        </v-btn>
                        <v-btn color="red darken-1" text @click="deletar">
                          Deletar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
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
export default {
  middleware: 'securePage',
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },

  data() {
    const defaultForm = Object.freeze({
      valorPagamento: 0,
      fornecedor: '',
      obra: '',
      material: '',
      etapa: '',

      pagador: '',
      nota: 0,
      chave: '',
      obs: '',
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
      loading: false,
      form: Object.assign({}, defaultForm),
      defaultForm,
      dialog: false,
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
      compra: null,
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

  async fetch() {
    const doc = await this.$fire.firestore
      .collection('compras')
      .doc(this.id)
      .get()
    this.compra = doc.data()
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
    },
    compra(val) {
      this.form = val
    },
  },

  computed: {
    createdAtDate() {
      return new Date(this.form.createdAt?.seconds * 1000)
    },
    modifiedAtDate() {
      return new Date(this.form.modifiedAt?.seconds * 1000)
    },
    authUser() {
      return this.$store.state.auth.authUser
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
    async modificarCompra() {
      this.loading = true
      const modificacao = {
        modifiedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        modifiedBy: this.authUser,
        ...this.compra,
      }
      console.log('modify', this.id, modificacao)
      this.$fire.firestore
        .collection('compras')
        .doc(this.id)
        .set(modificacao)
        .then((docRef) => {
          console.log('Documento modificado ID: ', docRef.id)
          this.$notifier.showMessage({
            content: 'Compra modificada',
            color: 'info',
            top: false,
          })
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
    async deletar() {
      this.loading = true
      this.$fire.firestore
        .collection('compras')
        .doc(this.id)
        .delete()
        .then(() => {
          this.$notifier.showMessage({
            content: 'Compra apagada',
            color: 'info',
            top: false,
          })
          this.dialog = false
          this.$router.push('/compras')
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
