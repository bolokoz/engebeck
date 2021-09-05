<template>
  <v-card>
    <v-card-title>
      <span v-if="editar" class="headline">Editar compra</span>
      <span v-else class="headline">Adicionar compra</span>
    </v-card-title>
    <v-card-text>
      <h3 class="my-3 font-weight-bold">Dados da compra</h3>
      <!-- Nome -->
      <v-form ref="form">
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.descricao"
              label="Descrição da compra"
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
              label="Tipo da compbra"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-autocomplete
              v-model="form.fornecedor"
              item-text="nome"
              return-object
              :items="fornecedores"
              label="Fornecedor"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-autocomplete
              v-model="form.obra_id"
              dense
              item-value="id"
              item-text="nome"
              :items="obras"
              label="Obra"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.comprador"
              dense
              label="Quem comprou"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.nota"
              dense
              label="Nota ou recibo"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.pedido"
              dense
              label="Pedido"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.etapa"
              dense
              label="Etapa"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.subetapa"
              dense
              label="SubEtapa"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->

        <h3 class="my-3 font-weight-bold">Dados do pagamento</h3>

        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-autocomplete
              v-model="form.forma"
              :items="formas"
              label="Forma de pagamento"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <!-- Fim -->

        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.contaPagadora"
              dense
              label="Conta para débito"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->

        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.valor"
              dense
              label="Valor total"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->

        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.pagador"
              dense
              label="Quem pagou"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->

        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model.number="form.parcelas"
              dense
              type="number"
              label="Parcelas"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row v-for="(parcela, k) in pagamentos.parcelas" :key="k">
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="parcela.dataPagamento"
              dense
              :label="`Data Parcela ${parcela.n}`"
            ></v-text-field>
            <v-text-field
              v-model="parcela.valor"
              dense
              :label="`Valor parcela ${parcela.n}`"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->

        <v-row v-if="form.fornecedor">
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <h3>Dados bancários do fornecedor</h3>
            <h5>{{ form.fornecedor.nomeBanco }}</h5>
            <h5>{{ form.fornecedor.banco }}</h5>
            <h5>{{ form.fornecedor.agencia }}</h5>
            <h5>{{ form.fornecedor.conta }}</h5>
            <h5>{{ form.fornecedor.forma }}</h5>
          </v-col>
        </v-row>

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
import { emptyForm, tipos, formas } from '~/dados/compras.js'
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
  async fetch() {
    this.loading = true

    // pegar fornecedores
    await this.$fire.firestore
      .collection('fornecedores')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.fornecedores.push({ id: doc.id, ...doc.data() })
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

    // pegar obras
    await this.$fire.firestore
      .collection('obras')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.obras.push({ id: doc.id, ...doc.data() })
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

  data() {
    return {
      form: { ...this.emptyForm },
      tipos: tipos,
      formas: formas,
      emptyForm: emptyForm,
      loading: false,
      fornecedores: [],
      obras: [],
      selectedFornecedor: {},
    }
  },
  methods: {
    resetar() {
      this.form = Object.assign({}, this.emptyForm)
    },
    pegarDados() {
      for (var k in this.form.fornecedor) {
        this.form[k] = this.form.fornecedor[k]
      }
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
        .collection('compras')
        .add(item)
        .then((docRef) => {
          // console.log('Documento written ID: ', docRef.id)
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
        .collection('compras')
        .doc(this.form.id)
        .update(modificacao)
        .then((docRef) => {
          // console.log('Documento modificado ID: ', docRef.id)
          this.$notifier.showMessage({
            content: 'Item modificado ',
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
        .collection('compras')
        .doc(this.form.id)
        .delete()
        .then(() => {
          this.$notifier.showMessage({
            content: 'Item apagado',
            color: 'warning',
            top: false,
          })
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
          this.loading = false
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
  },

  watch: {
    editItemObject: {
      immediate: true,
      deep: true,
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
    pagamentos() {
      let pagamentos = {
        conta_id: '',
        fornecedor_id: '',
        parcelas: [],
      }
      for (var i = 0; i < this?.form.parcelas; ++i) {
        pagamentos.parcelas.push({ n: i + 1, data: '', valor: '' })
      }
      return pagamentos
    },
  },
}
</script>