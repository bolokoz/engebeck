<template>
  <v-card>
    <v-card-title>
      <span v-if="editar" class="headline">Editar fornecedor</span>
      <span v-else class="headline">Adicionar fornecedor</span>
    </v-card-title>
    <v-card-text>
      <h3 class="my-3 font-weight-bold">Dados do fornecedor</h3>
      <!-- Nome -->
      <v-form ref="form">
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
            <v-combobox
              v-model="form.tipo"
              :items="tipos"
              label="Tipo fornecedor"
              multiple
              chips
            ></v-combobox>
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
              v-model="form.forma"
              dense
              label="Forma de pagamento"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.nomeBanco"
              dense
              label="Nome que aparece na conta destino"
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
        <!-- Botoes -->
        <v-row>
          <!-- CONDICAO CRIAR NOVO -->
          <div v-if="!editar">
            <v-row>
              <v-col>
                <v-btn dark color="green light" outlined @click="adicionar">{{
                  loading ? 'enviando' : 'ADD'
                }}</v-btn>
              </v-col>
              <v-col v-if="isDialog">
                <v-btn dark color="grey" text @click.native="close"
                  >CANCELAR</v-btn
                >
              </v-col>
              <v-col>
                <v-btn type="reset" @click="resetar">RESET</v-btn>
              </v-col>
            </v-row>
          </div>

          <!-- CONDICAO EDITAR -->
          <div v-else>
            <v-row>
              <v-col>
                <v-btn dark color="green light" outlined @click="alterar">{{
                  loading ? 'enviando' : 'ALTERAR'
                }}</v-btn>
              </v-col>
              <v-col v-if="isDialog">
                <v-btn dark color="grey" text @click.native="close"
                  >CANCELAR</v-btn
                >
              </v-col>
              <v-col>
                <v-btn dark color="red light" outlined @click="deletar">{{
                  loading ? 'enviando' : 'DELETAR'
                }}</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>


<script>
import { emptyForm, tipos } from '~/dados/fornecedores.js'
export default {
  props: {
    editItemObject: {
      type: Object,
    },
    isDialog: {
      type: Boolean,
      default: true,
    },
  },

  // async fetch() {
  //   this.loading = true
  //   await this.$fire.firestore
  //     .collection('fornecedores')
  //     .get()
  //     .then((snap) => {
  //       snap.forEach((doc) => {
  //         this.fornecedores.push({ id: doc.id, ...doc.data() })
  //       })
  //     })
  //     .catch(() => {
  //       this.$notifier.showMessage({
  //         content: error,
  //         color: 'error',
  //         top: false,
  //       })
  //     })
  //     .finally(() => {
  //       this.loading = false
  //     })
  // },

  data() {
    return {
      tipos: tipos,
      emptyForm: emptyForm,
      loading: false,
      form: { ...this.emptyForm },
      fornecedores: [],
    }
  },
  methods: {
    resetar() {
      this.form = { ...this.emptyForm }
    },
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
          this.$notifier.showMessage({
            content: 'Adicionado,',
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
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
    close() {
      this.$emit('update:dialog', false)
    },
    async alterar() {
      this.loading = true
      const modificacao = {
        modifiedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        modifiedBy: this.authUser,
        ...this.form,
      }
      //   console.log('modify', this.id, modificacao)
      await this.$fire.firestore
        .collection('fornecedores')
        .doc(this.form.id)
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
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
    async deletar() {
      this.loading = true
      await this.$fire.firestore
        .collection('fornecedores')
        .doc(this.form.id)
        .delete()
        .then(() => {
          //   this.dialog = false
          //   this.$router.push('/compras')
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.$notifier.showMessage({
            content: 'Item apagado',
            color: 'warning',
            top: false,
          })
          this.loading = false
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
  },

  watch: {
    editItemObject: {
      handler(val) {
        this.form = val
      },
    },
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
    editar() {
      return this?.editItemObject !== null ? true : false
    },
  },

  mounted() {
    this.form = { ...this.editItemObject }
  },
}
</script>