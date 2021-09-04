<template>
  <div>
    <Titulo
      titulo="Editar fornecedor"
      :subtitulo="`Fornecedor de id: ${id}`"
      texto_link="Voltar para fornecedores"
      link="/financeiro/fornecedores"
    />
    <v-divider></v-divider>

    <v-container>
      <v-form ref="form" @submit.prevent="adicionar">
        <h3 class="my-3 font-weight-bold">Dados do fornecedor</h3>

        <!-- Nome -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model.number="form.nome"
              label="Nome fornecedor"
              dense
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Tipo -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-autocomplete
              v-model="form.tipo"
              :items="tipos"
              label="Tipo fornecedor"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.vendedor"
              dense
              label="Vendedor"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field v-model="form.cnpj" dense label="CNPJ"></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.email"
              dense
              label="Email"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.telefone"
              dense
              label="Telfone"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.cidade"
              dense
              label="Cidade"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.obs"
              dense
              label="observações"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->

        <v-divider class="my-5"></v-divider>
        <h3 class="my-3 font-weight-bold">Dados bancários</h3>
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.pagamento"
              dense
              label="Tipo pagamento"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.banco"
              dense
              label="Banco"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->

        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.agencia"
              dense
              label="Agencia"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->

        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.conta"
              dense
              label="Conta"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->

        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field v-model="form.pix" dense label="Pix"></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->

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
              {{ modifiedAtDate }}
            </p>
            <p>
              Modificado por:
              {{ form.modifiedBy }}
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
                    <template #activator="{ on, attrs }">
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
import Titulo from '~/components/Titulo.vue'
import EscolherData from '~/components/EscolherData.vue'
import MeuCombobox from '~/components/MeuCombobox.vue'
import { exemploForm, tipos } from '~/dados/fornecedores.js'

export default {
  middleware: 'securePage',
  components: {
    Titulo,
    EscolherData,
    MeuCombobox,
  },
  asyncData({ params }) {
    const id = params.id
    return { id }
  },

  data() {
    const defaultForm = Object.freeze({
      exemploForm,
    })

    return {
      form: Object.assign({}, exemploForm),
      defaultForm,
      tipos: tipos,

      loading: false,

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
      .collection('fornecedores')
      .doc(this.id)
      .get()
    this.item = doc.data()

    this.$fire.firestore
      .collection('fornecedores')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.items.push(doc.data())
          // this.pagadores.push(doc.data().pagador)
        })
      })
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

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
    },
    item(val) {
      this.form = val
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
    async modificar() {
      this.loading = true
      const modificacao = {
        modifiedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        modifiedBy: this.authUser,
        ...this.item,
      }
      console.log('modify', this.id, modificacao)
      await this.$fire.firestore
        .collection('fornecedores')
        .doc(this.id)
        .set(modificacao)
        .then((docRef) => {
          // console.log('Documento modificado ID: ', docRef.id)
          this.$notifier.showMessage({
            content: 'Item modificado',
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
      await this.$fire.firestore
        .collection('fornecedores')
        .doc(this.id)
        .delete()
        .then(() => {
          this.$notifier.showMessage({
            content: 'Item apagado',
            color: 'info',
            top: false,
          })
          this.dialog = false
          this.$router.push('/fornecedores')
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
