<template>
  <v-form ref="form">
    <h3 class="my-3 font-weight-bold">Conta base</h3>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-autocomplete
          v-model="localForm.conta"
          item-text="nome"
          return-object
          outlined
          :search-input.sync="search"
          :items="contas"
          label="Escolha a conta"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-combobox
          v-model="localForm.destinoOrigem"
          outlined
          :items="destinoOrigem"
          label="Destino ou origem"
        ></v-combobox>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-combobox
          v-model="localForm.categoria"
          outlined
          :items="categorias"
          label="Categoria da movimentação"
        ></v-combobox>
      </v-col>

      <v-col cols="12" md="6" lg="2">
        <v-text-field
          v-model.number="localForm.valorTotal"
          prefix="R$"
          outlined
          hint="USAR PONTO PARA CENTAVOS."
          :rules="[rules.required, rules.decimmalDot]"
          label="Valor total final"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="10">
        <v-text-field
          v-model="localForm.obs"
          outlined
          label="Descrição/Observações"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="6" lg="4">
        <v-autocomplete
          v-model="localForm.compra"
          outlined
          item-text="descricao"
          return-object
          :items="comprasDestinadas"
          label="Oriundo de alguma compra no banco de dados?"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <!-- Fim -->

    <v-divider></v-divider>

    <h3 class="my-3 font-weight-bold">Despesa</h3>
    <div v-if="saldoPago == 0 && localForm.valorTotal != 0 && totalPago != 0">
      <span class="green--text">
        <v-icon color="green">mdi-check</v-icon>
        Valor do produto = Valor pago</span
      >
    </div>
    <div v-else>
      <h5 class="primary--text">Total pago: R$ {{ totalPago }}</h5>
      <h5 class="warning--text">Saldo a pagar: R$ {{ saldoPago }}</h5>
    </div>

    <Pagamentos2
      :pagamentos="localForm.pagamentos"
      :fornecedor="localForm.fornecedor"
      :contas="contas"
      :valor="localForm.valorTotal"
      @addPagamento="addPagamento"
      @removerPagamento="removerPagamento"
    />
    <v-divider></v-divider>

    <h3 class="my-3 font-weight-bold">Receitas</h3>
    <div v-if="saldoPago == 0 && localForm.valorTotal != 0 && totalPago != 0">
      <span class="green--text">
        <v-icon color="green">mdi-check</v-icon>
        Valor do produto = Valor pago</span
      >
    </div>
    <div v-else>
      <h5 class="primary--text">Total recebido: R$ {{ totalPago }}</h5>
      <h5 class="warning--text">Saldo a receber: R$ {{ saldoPago }}</h5>
    </div>

    <Receitas
      :receitas="localForm.receitas"
      :contas="contas"
      :fornecedores="fornecedores"
      :valor="localForm.valorTotal"
      @addReceita="addReceita"
      @removerReceita="removerReceita"
    />
    <v-divider></v-divider>

    <h3 class="my-3 font-weight-bold">Notas / boleto / cobrança</h3>
    <div v-if="saldoNota == 0 && totalPago != 0">
      <span class="green--text">
        <v-icon color="green">mdi-check</v-icon>
        Valor pago = Valor de notas</span
      >
    </div>
    <div v-else>
      <h5 class="primary--text">Total pago: R$ {{ totalPago }}</h5>
      <h5 class="warning--text">Saldo de notas: R$ {{ saldoNota }}</h5>
    </div>

    <Notas2
      :notas="localForm.notas"
      :valor="localForm.valorTotal"
      @addNota="addNota"
      @removerNota="removerNota"
    />

    <v-divider class="my-3"></v-divider>

    <v-container>
      <v-checkbox
        v-model="localForm.completo"
        label="Pagamento ompleto"
      ></v-checkbox>
      <v-row>
        <v-col>
          <BotoesForm
            :is-edit="isEdit"
            :loading="loading"
            @adicionar="adicionar"
            @alterar="alterar"
            @deletar="deletar"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
const db = 'contabilidade'
export default {
  props: {
    isEdit: {
      default: false,
      type: Boolean,
    },
    id: {
      default: '',
      type: String,
    },
    fornecedores: {
      type: Array,
      default: () => [],
    },
    compras: {
      type: Array,
      default: () => [],
    },
    contabilidades: {
      type: Array,
      default: () => [],
    },
    contas: {
      type: Array,
      default: () => [],
    },
    form: {
      type: Object,
      default: () => ({
        destinoOrigem: '',
        categoria: '',
        obs: '',
        valorTotal: 0,
        conta: {},
        pagamentos: [],
        notas: [],
        receitas: [],
        completo: false,
      }),
    },
  },

  data() {
    return {
      search: null,
      rules: {
        required: (value) => !!value || 'Obrigatório',
        decimmalDot: (value) => {
          const pattern = /^\d+(\.\d{2})?$/
          return pattern.test(value) || 'USAR PONTO PARA CENTAVOS'
        },
      },
      localForm: {
        destinoOrigem: '',
        categoria: '',
        obs: '',
        valorTotal: 0,
        conta: {},
        completo: false,
        pagamentos: [],
        notas: [],
        receitas: [],
      },
      loading: false,
    }
  },

  computed: {
    totalPago() {
      let totalPago = 0
      // for (let index = 0; index < this.localForm.pagamentos.length; index++) {
      //   totalPago += this.localform.pagamentos[index].valor
      // }
      this.localForm.pagamentos.map((d) => (totalPago += d.valor))
      return totalPago
    },
    totalReceita() {
      let totalReceita = 0
      this.localForm.receitas.map((d) => (totalReceita += d.valor))
      return totalReceita
    },
    totalNota() {
      let totalNota = 0
      // for (let index = 0; index < this.localForm.notas.length; index++) {
      //   totalNota += this.localForm.notas[index].valor
      // }
      this.localForm.notas.map((d) => (totalNota += d.valor))
      return totalNota
    },
    saldoPago() {
      return this.localForm.valorTotal - this.totalPago
    },
    saldoPago() {
      return this.localForm.valorTotal - this.totalReceita
    },
    saldoNota() {
      return this.totalPago - this.totalNota
    },
    comprasDestinadas() {
      const compras = []
      if (this.localForm.conta.cnpj) {
        this.compras.forEach((compra) => {
          if (compra.fornecedor.cnpj === this.localForm.conta.cnpj) {
            compras.push(compra)
          }
        })
      }
      return compras
    },
    categorias() {
      const categorias = new Set()
      this.contabilidades?.forEach((contabil) => {
        categorias.add(contabil.categoria)
      })
      return Array.from(categorias)
    },
    destinoOrigem() {
      const destinoOrigem = new Set()
      this.contabilidades?.forEach((contabil) => {
        destinoOrigem.add(contabil.destinoOrigem)
      })
      return Array.from(destinoOrigem)
    },
    authUser() {
      return this.$store.state.auth.authUser
    },
  },
  mounted() {
    if (this.isEdit) {
      this.localForm = this.form
    }
  },

  methods: {
    addPagamento() {
      this.localForm.pagamentos.push({
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        valor: 0,
        conta: this.localForm.conta,
        metodo: '',
        obs: '',
        path: '',
        uuid: null,
        localURL: null,
        dbURL: null,
      })
    },
    addReceita() {
      this.localForm.receitas.push({
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        valor: 0,
        cliente: {},
        conta: this.localForm.conta,
        metodo: '',
        fatura: 0,
        obs: '',
        path: '',
        uuid: null,
        localURL: null,
        dbURL: null,
      })
    },
    addNota() {
      this.localForm.notas.push({
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        chave: '',
        obs: '',
        uuid: null,
        path: '',
        valor: '',
        localURL: null,
        dbURL: null,
      })
    },
    removerPagamento(i) {
      this.localForm.pagamentos.splice(i, 1)
    },
    removerReceita(i) {
      this.localForm.receitas.splice(i, 1)
    },
    removerNota(i) {
      this.localForm.notas.splice(i, 1)
    },

    deleteFiles() {
      this.localForm.notas.map((d) => (d.file = null))
      this.localForm.pagamentos.map((d) => (d.file = null))
    },

    async adicionar() {
      this.loading = true

      // deleta arquivos para não adicioná-los no db
      this.deleteFiles()

      // adicionar metadados
      const item = {
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
        saldoNota: this.saldoNota,
        saldoPago: this.saldoPago,
        ...this.localForm,
      }
      // adicionar no db
      await this.$fire.firestore
        .collection(db)
        .add(item)
        .then((docRef) => {
          console.log('Documento written ID: ', docRef.id)

          this.$notifier.showMessage({
            content: 'Adicionada',
            color: 'success',
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
          this.$router.push({
            path: '/contabilidade',
          })
        })
    },
    async alterar() {
      this.loading = true

      // deleta arquivos para não adicioná-los no db
      this.deleteFiles()

      // work around for combobox not returning object correctly

      const modificacao = {
        modifiedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        modifiedBy: this.authUser,
        saldoNota: this.saldoNota,
        saldoPago: this.saldoPago,
        ...this.localForm,
      }
      console.log(modificacao)
      //   console.log('modify', this.id, modificacao)
      await this.$fire.firestore
        .collection(db)
        .doc(this.id)
        .update(modificacao)
        .then(() => {
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
          this.$router.push({
            path: '/contabilidade',
          })
        })
    },
    async deletar() {
      this.loading = true
      await this.$fire.firestore
        .collection(db)
        .doc(this.id)
        .delete()
        .then(() => {
          this.$notifier.showMessage({
            content: 'Item apagado',
            color: 'warning',
            top: false,
          })
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
          this.$router.push('/contabilidade')
        })
    },
  },
}
</script>
