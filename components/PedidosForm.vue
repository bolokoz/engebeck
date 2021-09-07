<template>
  <v-card>
    <v-card-title>
      <span v-if="editar" class="headline">Editar {{ title }}</span>
      <span v-else class="headline">Adicionar {{ title }}</span>
    </v-card-title>
    <v-card-text>
      <h3 class="my-3 font-weight-bold">Dados {{ title }}</h3>
      <!-- Nome -->
      <v-form ref="form">
        <v-row>
          <v-col sm="8" md="6" offset-lg="0" lg="3">
            <v-text-field
              v-model="form.descricao"
              label="Descrição do pedido"
              outlined
              required
            ></v-text-field>
          </v-col>

          <v-col sm="8" md="6" offset-lg="0" lg="2">
            <v-combobox
              v-model="form.fornecedor"
              item-text="nome"
              return-object
              outlined
              :items="fornecedores"
              label="Fornecedor"
            ></v-combobox>
          </v-col>

          <v-col sm="8" md="6" offset-lg="0" lg="2">
            <v-text-field
              v-model="form.numero"
              outlined
              label="Numero do pedido"
            ></v-text-field>
          </v-col>

          <v-col sm="8" md="6" offset-lg="0" lg="2">
            <v-combobox
              v-model="form.obra_id"
              outlined
              item-value="id"
              item-text="nome"
              :items="obras"
              label="Obra"
            ></v-combobox>
          </v-col>

          <v-col sm="8" md="6" offset-lg="0" lg="2">
            <v-combobox
              v-model="form.etapa"
              :items="etapas"
              item-text="nome"
              item-value="nome"
              small-chips
              outlined
              label="Etapa"
            ></v-combobox>
          </v-col>

          <v-col sm="8" md="6" offset-lg="0" lg="2">
            <v-combobox
              v-model="form.subetapa"
              :items="etapas"
              item-text="nome"
              item-value="nome"
              small-chips
              outlined
              label="SubEtapa"
            ></v-combobox>
          </v-col>
        </v-row>
        <!-- Fim -->

        <v-divider></v-divider>

        <h3 class="my-3 font-weight-bold">Dados do pagamento</h3>

        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" offset-lg="0" lg="2">
            <v-autocomplete
              v-model="form.forma"
              :items="formas"
              outlined
              label="Forma de pagamento"
            ></v-autocomplete>
          </v-col>

          <v-col sm="8" offset-sm="1" md="6" offset-lg="0" lg="2">
            <v-text-field
              v-model="form.valor"
              outlined
              label="Valor total"
            ></v-text-field>
          </v-col>

          <v-col sm="8" offset-sm="1" md="6" offset-lg="0" lg="2">
            <v-text-field
              v-model.number="form.parcelas"
              outlined
              type="number"
              label="Parcelas"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="form.fornecedor">
          <v-col sm="8" offset-sm="1" md="6" offset-lg="0" lg="3">
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
import { emptyForm, tipos, formas } from '~/dados/pedidos.js'
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

    // pegar etapas
    await this.$fire.firestore
      .collection('etapas')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.etapas.push({ id: doc.id, ...doc.data() })
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
      title: 'Pedido/Orçamento',
      titlePlural: 'Pedidos/Orçamentos',
      form: { ...this.emptyForm },
      tipos: tipos,
      formas: formas,
      emptyForm: emptyForm,
      loading: false,
      fornecedores: [],
      etapas: [],
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
        .collection('pedidos')
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
        .collection('pedidos')
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
        .collection('pedidos')
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
      return Object.entries(this.emptyForm).toString() ===
        Object.entries(this.editItemObject).toString()
        ? false
        : true
    },
  },
}
</script>