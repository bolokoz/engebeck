<template>
  <v-form ref="form" v-model="form.valid" lazy-validation>
    <h3 class="my-3 font-weight-bold">Dados da compra</h3>
    <v-row>
      <v-col>
        <div v-if="pagamentosFornecedor.length > 0" class="my-2">
          <h3 class="info--text">Últimos pagamentos para deste fornecedor</h3>
          <h5
            v-for="(pagamento, i) in pagamentosFornecedor"
            :key="i"
            class="info--text"
          >
            #{{ i + 1 }}: {{ pagamento.date }} - R$ {{ pagamento.valor }} -
            {{ localForm.obra.nome }} - {{ pagamento.descricao }} -
            {{ pagamento.obs }}
          </h5>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-autocomplete
          v-model="localForm.fornecedor"
          item-text="nome"
          return-object
          required
          outlined
          :search-input.sync="search"
          :items="fornecedores"
          :filter="customFilter"
          label="Procurar Fornecedor ou CNPJ"
          hint="Procure Nome ou CNPJ"
        >
          <template #item="data">
            <v-list-item-content>
              <v-list-item-title v-html="data.item.nome"></v-list-item-title>
              <v-list-item-subtitle>
                CNPJ:
                {{
                  String(data.item.cnpj).replace(
                    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                    '$1.$2.$3/$4-$5'
                  )
                }}</v-list-item-subtitle
              >
              <v-list-item-subtitle>
                Cidade:
                {{ String(data.item.cidade) }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
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
          :rules="[rules.required]"
          label="Descrição da compra"
          hint="Resumo do que está sendo comprado"
          outlined
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="2">
        <v-text-field
          v-model.number="localForm.valorTotal"
          prefix="R$"
          required
          outlined
          hint="USAR PONTO PARA CENTAVOS"
          :rules="[rules.required, rules.decimmalDot]"
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
          required
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

      <!-- <v-col cols="12" sm="4" md="6" lg="2">
        <v-autocomplete
          v-model="localForm.tipo"
          :items="tipos"
          outlined
          required
          label="Tipo da compra"
        ></v-autocomplete>
      </v-col> -->
      <!--       
      <v-col cols="12" md="6" lg="4">
        <v-autocomplete
          v-model="localForm.etapa"
          outlined
          item-text="name"
          return-object
          :items="etapas"
          label="Etapa"
        >
          <template #item="{ item }">
            <v-list-item-avatar color="primary">
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-autocomplete
          v-model="localForm.subetapa"
          outlined
          chips
          multiple
          item-text="name"
          :items="localForm.etapa.subetapas"
          label="Sub Etapa"
        >
          <template #item="{ item }">
            <v-list-item-avatar color="primary">
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-col> -->

      <TiposGastos
        :tipos-gastos="localForm.tiposGastos"
        :etapas="etapas"
        :tipos="tipos"
        :valor="localForm.valorTotal"
        @addTipoGasto="addTipoGasto"
        @removerTipoGasto="removerTipoGasto"
      />
    </v-row>
    <!-- Fim -->

    <v-divider></v-divider>

    <h3 class="my-3 font-weight-bold">Pagamentos</h3>
    <div class="my-2">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template #activator="{ on, attrs }">
          <v-btn color="indigo" dark v-bind="attrs" outlined x-small v-on="on">
            Pedir pagamento
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-text-field
                    v-model.number="pedirValor"
                    label="Valor"
                    prefix="R$"
                  ></v-text-field>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-text-field
                    v-model="pedirObs"
                    label="Obs"
                    prefix=""
                  ></v-text-field>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>
          <v-card-text>
            <h3 class="info--text">Dados cadastrados do fornecedor</h3>
            <h5 class="info--text">Obra: {{ localForm.obra.nome }}</h5>
            <h5 class="info--text">Nome: {{ localForm.fornecedor.nome }}</h5>
            <h5 class="info--text">
              Nome conta: {{ localForm.fornecedor.nomeBanco }}
            </h5>
            <h5 class="info--text">CNPJ: {{ localForm.fornecedor.cnpj }}</h5>
            <h5 class="info--text">Banco: {{ localForm.fornecedor.banco }}</h5>
            <h5 class="info--text">
              Método de pagamento: {{ localForm.fornecedor.metodo }}
            </h5>
            <h5 class="info--text">
              agencia: {{ localForm.fornecedor.agencia }}
            </h5>
            <h5 class="info--text">conta: {{ localForm.fornecedor.conta }}</h5>
            <h5 class="info--text">pix: {{ localForm.fornecedor.pix }}</h5>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="menu = false"> Cancel </v-btn>
            <v-btn color="primary" text @click="whatsappPay">Whatsapp </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
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
    <div class="my-2">
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template #activator="{ on, attrs }">
          <v-btn color="indigo" dark v-bind="attrs" outlined x-small v-on="on">
            Pedir nota / entrega
          </v-btn>
        </template>

        <v-card>
          <v-card-text>
            <h3 class="info--text">Dados Para Faturamento</h3>
            <h5 class="info--text">{{}}</h5>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="menu = false"> Cancel </v-btn>
            <v-btn color="primary" text @click="whatsappNF">Whatsapp </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
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
    compras: {
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
        valid: true,
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
        tiposGastos: [],
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
          const pattern = /^\$?\d+(\.\d{2})?$/
          return pattern.test(value) || 'USAR PONTO PARA CENTAVOS'
        },
      },
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
        tiposGastos: [],
        completo: false,
      },
      fav: true,
      menu: false,
      menu2: false,
      pedirValor: 0,
      pedirObs: '',
      loading: false,
      local: { etapa: '' },
    }
  },

  computed: {
    ultimasCompras() {
      const compras = this.compras.filter(
        (compra) => compra.fornecedor === this.localForm.fornecedor
      )
      return compras
    },
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
    saldoPago() {
      return this.localForm.valorTotal - this.totalPago
    },
    saldoNota() {
      return this.totalPago - this.totalNota
    },
    sortedFornecedores() {
      // eslint-disable-next-line vue/no-mutating-props
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.fornecedores.sort((a, b) => a.nome.localeCompare(b.nome))
    },
    pagamentosFornecedor() {
      const pagamentos = []
      if (this.localForm.fornecedor?.id) {
        this.compras.forEach((compra) => {
          if (compra.fornecedor.id === this.localForm.fornecedor.id) {
            compra?.pagamentos.forEach((pagamento) => {
              if (compra.id !== this.id)
                pagamentos.push({ ...pagamento, descricao: compra.descricao })
            })
          }
        })
      }
      return pagamentos
    },
    nota() {
      const nota = {
        priprietario: '',
        cnpj: '',
        endereco: '',
        telefone: '',
        email: '',
      }
      const obraId = this.localForm.obra.id
      const obraRoot = this.obras.find((obra) => obra.id === obraId)
      console.log(obraRoot)
      const proprietarioId = obraRoot.proprietario.id
      const proprietarioRoot = this.contas.find(
        (conta) => conta.id === proprietarioId
      )
      console.log(proprietarioRoot)
      nota.proprietario = proprietarioRoot.nome
      nota.cnpj = proprietarioRoot.cnpj
      nota.endereco = proprietarioRoot.endereco
      nota.telefone = proprietarioRoot.telefone
      nota.email = proprietarioRoot.email

      return nota
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
    customFilter(item, queryText) {
      const name = String(item?.nome).toLowerCase()
      const cnpj = String(item?.cnpj).toLowerCase()
      const searchText = queryText.toLowerCase()

      return name.includes(searchText) || cnpj.includes(searchText)
    },
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
        chave: '',
        obs: '',
        uuid: null,
        path: '',
        valor: '',
        localURL: null,
        dbURL: null,
      })
    },
    addTipoGasto() {
      this.localForm.tiposGastos.push({
        etapa: '',
        subetapa: '',
        valor: '',
        tipo: '',
      })
    },
    removerPagamento(i) {
      console.log(i)
      this.localForm.pagamentos.splice(i, 1)
    },
    removerNota(i) {
      this.localForm.notas.splice(i, 1)
    },
    removerTipoGasto(i) {
      this.localForm.tiposGastos.splice(i, 1)
    },

    deleteFiles() {
      this.localForm.notas.map((d) => (d.file = null))
      this.localForm.pagamentos.map((d) => (d.file = null))
    },
    whatsappPay() {
      this.menu = false
      let text = `*REQUISIÇÃO DE PAGAMENTO* %0a %0a`
      text += `*Valor*: R$ ${this.pedirValor} %0a`
      text += `*Obs*: ${this.pedirObs} %0a`
      text += `*Obra*: ${this.localForm.obra.nome}%0a`
      text += `*Fornecedor*: ${this.localForm.fornecedor.nome}%0a`
      text += `CNPJ: ${this.localForm.fornecedor.cnpj}%0a`
      text += `Banco: ${this.localForm.fornecedor.nomeBanco}%0a`
      text += `Agencia: ${this.localForm.fornecedor.agencia}%0a`
      text += `Conta: ${this.localForm.fornecedor.conta} %0a`
      text += `PIX: ${this.localForm.fornecedor.pix} %0a %0a`
      text += `Requerinte: ${this.authUser.displayName} %0a`
      text += `Data: ${new Date().toLocaleDateString('pt-BR')} %0a%0a`
      text += `*Link para confirmar pagamento* %0a`
      text += `https://engebeck.com.br/compras/${this.$route.params.id} %0a`

      window.open(`whatsapp://send?text=${text}`)
    },
    whatsappNF() {
      this.menu2 = false
      let text = `*DADOS PARA FATURAMENTO* %0a`
      text += `*Nome*: ${this.nota.proprietario} %0a`
      text += `*CNPJ*: ${this.nota.cnpj} %0a`
      text += `*Endereco empresa*: ${this.nota.endereco}%0a`
      text += `*Telefone*: ${this.nota.telefone}%0a`
      text += `*Email*: ${this.nota.email}%0a %0a`
      text += `*DADOS PARA ENTREGA* %0a`
      text += `*Obra*: ${this.localForm.obra.nome}%0a %0a`
      text += `*Endereço obra*: ${this.localForm.obra.endereco}%0a %0a`

      window.open(`whatsapp://send?text=${text}`)
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
        .then((docref) => {
          this.localForm.fornecedor = { ...novo, id: docref.id }
          this.$notifier.showMessage({
            content: 'Criado, complementar depois`',
            color: 'success',
            top: false,
          })
        })
        .catch((error) =>
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        )
        .finally(() => {
          this.loading = false
          this.$router.app.refresh()
        })
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
