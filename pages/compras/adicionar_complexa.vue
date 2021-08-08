<template>
  <div>
    <v-container class="my-3">
      <v-row>
        <h1 class="font-weight-regular">Adicionar compra complexa</h1>
        <h4 class="font-weight-light">
          Para pagamentos parcelados ou notas de remessa
        </h4>
        <p class="text--caption font-weight-light">
          <a href="/compras/adicionar">
            Clique aqui para adicionar compra simples
          </a>
        </p>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <v-container>
      <v-form @submit.prevent="adicionarCompra" ref="form">
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
            <v-text-field
              v-model.number="form.valorPagamento"
              label="Valor total combinado"
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

        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-textarea
              v-model="form.obs"
              outlined
              label="Observações"
              hint="Como foi estipulado entrada, notas"
              dense
            ></v-textarea>
          </v-col>
        </v-row>

        <h3 class="my-3 font-weight-bold">Dados do pagamento</h3>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <p v-for="pagamento in pagamentos" :key="pagamento.id">
              {{ pagamento }}
            </p>
            <v-dialog v-model="pagamentoDialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Adicionar pagamento
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">Adicionar pagamento parcial </span>
                </v-card-title>
                <v-card-text>
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
                        v-model="pagamentoForm.datePagamento"
                        label="Data Pagamento"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="pagamentoForm.datePagamento"
                      locale="pt-br"
                      @input="menuPagamento = false"
                    ></v-date-picker>
                  </v-menu>
                  <v-text-field
                    v-model.number="pagamentoForm.valorPagamento"
                    label="Valor pago"
                    required
                    prefix="R$"
                    :rules="rules.valor"
                  ></v-text-field>
                  <v-combobox
                    v-model="pagamentoForm.pagador"
                    :loading="loadingPagadores"
                    :items="pagadores"
                    :search-input.sync="searchPagadores"
                    cache-items
                    required
                    hide-no-data
                    hide-details
                    label="Quem pagou"
                  ></v-combobox>

                  <v-textarea
                    v-model="pagamentoForm.obs"
                    outlined
                    label="Observações"
                    hint="Como foi estipulado entrada, notas"
                  ></v-textarea>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="pagamentoDialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="addPagamento">
                    Salvar Pagamento
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

        <v-divider class="my-5"></v-divider>
        <h3 class="my-3 font-weight-bold">Dados de notas</h3>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <p v-for="nota in notas" :key="nota.id">
              {{ nota }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-dialog v-model="notaDialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Adicionar nota
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">Adicionar nota parcial </span>
                </v-card-title>
                <v-card-text>
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
                      <v-row>
                        <v-col sm="8" offset-sm="1" md="6" lg="5">
                          <v-text-field
                            v-model.number="notaForm.nota"
                            label="Número da nota"
                            required
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col sm="8" offset-sm="1" md="6" lg="5">
                          <v-text-field
                            v-model.number="notaForm.valor"
                            label="Valor da nota"
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
                                v-model="notaForm.dateNota"
                                label="Data Nota"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="notaForm.dateNota"
                              @input="menuNota = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col sm="8" offset-sm="1" md="6" lg="5">
                          <v-text-field
                            v-model="notaForm.chave"
                            dense
                            label="Chave NFE"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col sm="8" offset-sm="1" md="6" lg="5">
                          <v-text-field
                            v-model="notaForm.fornecedor"
                            dense
                            label="Origem NFE (CNPJ)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col sm="8" offset-sm="1" md="6" lg="5">
                          <v-text-field
                            v-model="notaForm.tipo"
                            dense
                            label="Tipo NFE"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </template>
                  </v-menu>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="notaDialog = false">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="addNota">
                    Salvar nota
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
                  @click="adicionarCompraComplexa"
                  >{{ loading ? 'enviando' : 'ADD' }}</v-btn
                >
              </v-col>

              <v-col>
                <v-btn @click="resetar" type="reset">RESET</v-btn>
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
    const defaultPagamentoForm = Object.freeze({
      valorPagamento: 0,
      fornecedor: '',
      pagador: '',
      obs: '',
    })
    const defaultNotaForm = Object.freeze({
      nota: 0,
      dateNota: '',
      chave: '',
      valor: 0,
      tipo: '',
      fornecedor: '',
    })

    return {
      form: Object.assign({}, defaultForm),
      pagamentoForm: Object.assign({}, defaultPagamentoForm),
      notaForm: Object.assign({}, defaultNotaForm),
      defaultPagamentoForm,
      defaultNotaForm,
      defaultForm,
      fornecedores: ['foo', 'bar', 'fizz', 'buzz'],
      obras: ['fxvboo', 'basdfgr', 'fixcvbzz', 'asd'],
      materiais: ['f543oo', '4bar', 'fiz12z', 'buzz'],
      etapas: ['foo3', 'bar1', 'fi3zz', 'buzz'],
      pagadores: ['MRB', 'ENGEBECK'],
      loading: false,
      pagamentoDialog: false,
      notaDialog: false,
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
      pagamentos: [],
      notas: [],
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
    addPagamento() {
      this.pagamentos.push(this.pagamentoForm)
      this.pagamentoDialog = false
      this.pagamentoForm = Object.assign({}, this.defaultPagamentoForm)
    },
    addNota() {
      this.notas.push(this.notaForm)
      this.notaDialog = false
      this.notaForm = Object.assign({}, this.defaultNotaForm)
    },
    async adicionarCompraComplexa() {
      this.loading = true
      const compra = {
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
        complexa: true,
        obra: this.form.obra,
        etapa: this.form.etapa,
        material: this.form.material,
        valorPagamento: this.form.valorPagamento,
        obs: this.form.obs,
        notas: this.notas,
        pagamentos: this.pagamentos,
      }
      this.$fire.firestore
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
      this.pagamentos = []
      this.notas = []
      this.$refs.form.reset()
    },
  },
})
</script>
