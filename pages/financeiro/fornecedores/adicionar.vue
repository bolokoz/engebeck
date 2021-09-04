<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <h1 class="font-weight-regular">Adicionar fornecedor</h1>
        </v-col>
      </v-row>
    </v-container>
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

        <v-divider class="my-5"></v-divider>

        <v-row>
          <v-col sm="8" offset-sm="1" md="5" lg="6">
            <v-row>
              <v-col>
                <v-btn dark color="green light" outlined @click="adicionar">{{
                  loading ? 'enviando' : 'ADD'
                }}</v-btn>
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
import { exemploForm, tipos } from '~/dados/fornecedores.js'

export default Vue.extend({
  middleware: 'securePage',

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

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  methods: {
    async adicionar() {
      this.loading = true
      const item = {
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
        ...this.form,
      }
      await this.$fire.firestore
        .collection('fornecedores')
        .add(item)
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
