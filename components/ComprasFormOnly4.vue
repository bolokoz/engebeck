<template>
  <v-form ref="form">
    <h3 class="my-3 font-weight-bold">Dados da compra</h3>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-autocomplete
          v-model="localForm.fornecedor"
          item-text="nome"
          return-object
          outlined
          :search-input.sync="search"
          :items="fornecedores"
          label="Fornecedor"
        >
          <template #no-data>
            <v-list-item>
              <v-btn @click="adicionarFornecedor()">Criar {{ search }} </v-btn>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>

      <v-col cols="12" sm="8" md="6" lg="6">
        <v-text-field
          ref="descricao"
          v-model="localForm.descricao"
          label="Descrição da compra"
          hint="Resumo do que está sendo comprado"
          outlined
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4" md="6" lg="2">
        <v-autocomplete
          v-model="localForm.tipo"
          :items="tipos"
          outlined
          label="Tipo da compra"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="6" lg="2">
        <v-text-field
          v-model.number="localForm.valorTotal"
          prefix="R$"
          outlined
          label="Valor total final"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="10">
        <v-text-field
          v-model="localForm.obs"
          outlined
          label="Observações"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <h3 class="my-3 font-weight-bold">Dados de controle</h3>
    <v-row dense>
      <v-col cols="12" md="6" lg="4">
        <v-autocomplete
          v-model="localForm.obra"
          outlined
          item-text="nome"
          return-object
          :items="obras"
          label="Obra"
        >
          <template #no-data>
            <v-list-item>
              <v-btn to="/obras">Sair e criar Obra </v-btn>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-autocomplete
          v-model="localForm.etapa"
          outlined
          item-text="nome"
          return-object
          :items="etapas"
          label="Etapa"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-combobox
          v-model="localForm.subetapa"
          outlined
          multiple
          :items="localForm.etapa.subetapas"
          label="Sub Etapa"
        ></v-combobox>
      </v-col>
    </v-row>
    <!-- Fim -->

    <v-divider></v-divider>

    <h3 class="my-3 font-weight-bold">Pagamentos</h3>
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
      @addPagamento="addPagamento"
      @removerPagamento="removerPagamento"
    />
    <v-divider></v-divider>

    <h3 class="my-3 font-weight-bold">Notas</h3>
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
      @addNota="addNota"
      @removerNota="removerNota"
    />

    <v-divider class="my-3"></v-divider>

    <v-container>
      <v-checkbox
        v-model="localForm.completo"
        label="Compra completa"
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
const db = 'compras'
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
    obras: {
      type: Array,
      default: () => [],
    },
    contas: {
      type: Array,
      default: () => [],
    },
    etapas: {
      type: Array,
      default: () => [],
    },
    form: {
      type: Object,
      default: () => ({
        descricao: '',
        tipo: '',
        obs: '',
        fornecedor: {},
        dataCompra: '',
        obra: {},
        etapa: '',
        subetapa: '',
        valorTotal: 0,
        conta: {},
        metodo: '',
        pagamentos: [],
        notas: [],
        completo: false,
      }),
    },
  },

  data() {
    return {
      search: null,
      tipos: ['Material', 'Serviço', 'Ambos', 'Outros'],
      localForm: {
        descricao: '',
        tipo: '',
        obs: '',
        fornecedor: {},
        dataCompra: '',
        obra: {},
        etapa: '',
        subetapa: '',
        valorTotal: 0,
        conta: {},
        metodo: '',
        pagamentos: [],
        notas: [],
        completo: false,
      },
      loading: false,
      local: { etapa: '' },
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
    totalNota() {
      let totalNota = 0
      // for (let index = 0; index < this.localForm.notas.length; index++) {
      //   totalNota += this.localForm.notas[index].valor
      // }
      this.localForm.notas.map((d) => (totalNota += d.valor))
      return totalNota
    },
    subetapas() {
      let list = []
      const filter = this.local.etapa.nome
      list = this.etapas.filter((d) => d.nome === filter)
      return list[0]?.subetapas
    },
    saldoPago() {
      return this.localForm.valorTotal - this.totalPago
    },
    saldoNota() {
      return this.totalPago - this.totalNota
    },
    authUser() {
      return this.$store.state.auth.authUser
    },
  },
  mounted() {
    if (this.isEdit) {
      this.localForm = this.form
      this.local.etapa = this.form.etapa
    }
  },

  methods: {
    addPagamento() {
      this.localForm.pagamentos.push({
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        valor: 0,
        conta: null,
        metodo: '',
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
        chave: 0,
        obs: '',
        uuid: null,
        path: '',
        valor: '',
        localURL: null,
        dbURL: null,
      })
    },
    removerPagamento(i) {
      console.log(i)
      this.localForm.pagamentos.splice(i, 1)
    },
    removerNota(i) {
      this.localForm.notas.splice(i, 1)
    },

    deleteFiles() {
      this.localForm.notas.map((d) => (d.file = null))
      this.localForm.pagamentos.map((d) => (d.file = null))
    },

    async adicionarFornecedor() {
      const newName = this.search
      const novo = {
        nome: newName,
        tipo: '',
        vendedor: '',
        cnpj: '',
        email: '',
        telefone: '',
        cidade: '',
        obs: '',
        forma: '',
        nomeBanco: '',
        banco: '',
        agencia: '',
        conta: '',
        pix: '',
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
      }

      this.loading = true
      const fornecedoresRef = this.$fire.firestore.collection('fornecedores')
      await fornecedoresRef
        .add(novo)
        .then(
          this.$notifier.showMessage({
            content: 'Criado, complementar depois`',
            color: 'success',
            top: false,
          })
        )
        .catch((error) =>
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        )
        .finally(() => {
          this.loading = false
          this.localForm.fornecedor = { ...novo }
        })
    },

    async adicionar() {
      this.loading = true

      // deleta arquivos para não adicioná-los no db
      this.deleteFiles()

      // work around for combobox not returning object correctly
      this.localForm.etapa = this.localForm.etapa.nome

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
            content: 'Compra adicionada',
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
            path: '/compras',
          })
        })
    },
    async alterar() {
      this.loading = true

      // deleta arquivos para não adicioná-los no db
      this.deleteFiles()

      // work around for combobox not returning object correctly
      this.localForm.etapa = this.local.etapa

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
            path: '/compras',
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
          this.$router.push('/compras')
        })
    },
  },
}
</script>
