<template>
  <v-form ref="form">
    <h3 class="my-3 font-weight-bold">
      Dados da compra simples - único pagamento e nota
    </h3>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-autocomplete
          v-model="localForm.fornecedor"
          item-text="nome"
          return-object
          required
          outlined
          :search-input.sync="search"
          :items="sortedFornecedores"
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

    <v-row class="my-2">
      <v-col cols="12" sm="6" md="6" lg="6">
        <v-date-picker
          v-model="localForm.date"
          outlined
          full-width
          color="primary"
          locale="pt-BR"
        ></v-date-picker>
      </v-col>

      <v-col cols="12" sm="6" md="6" lg="6">
        <v-autocomplete
          v-model="localForm.pagamentos[0].conta"
          outlined
          required
          return-object
          item-text="nome"
          :items="contas"
          :rules="[rules.required]"
          label="Selecionar conta pagadora"
        ></v-autocomplete>

        <v-autocomplete
          v-model="localForm.pagamentos[0].metodo"
          :items="metodos"
          outlined
          label="Método pagamento"
        ></v-autocomplete>

        <v-text-field
          v-model="localForm.notas[0].numero"
          outlined
          label="Número da nota"
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
        </v-autocomplete>
      </v-col>
      <v-col cols="12" sm="4" md="6" lg="2">
        <v-autocomplete
          v-model="localForm.tipo"
          :items="tipos"
          outlined
          required
          label="Tipo da compra"
        ></v-autocomplete>
      </v-col>

      <!-- <v-col cols="12" md="6" lg="4">
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
    </v-row>
    <!-- Fim -->

    <v-divider class="my-3"></v-divider>

    <v-container>
      <v-row>
        <v-col>
          <BotoesForm
            :is-edit="isEdit"
            :loading="loading"
            @adicionar="adicionar"
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
        valid: true,
        fornecedor: {},
        dataCompra: '',
        obra: {},
        etapa: '',
        subetapa: '',
        valorTotal: 0,
        conta: {},
        metodo: '',
        pagamentos: [
          {
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
          },
        ],
        notas: [
          {
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
          },
        ],
        completo: true,
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
      tipos: ['Material', 'Serviço', 'Ambos', 'Insumo', 'Outros'],
      metodos: ['PIX', 'TED', 'DOC', 'BOLETO', 'DINHEIRO', 'CARTAO'],
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
        menu: false,
        processing: false,
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        pagamentos: [
          {
            date: '',
            valor: 0,
            conta: null,
            metodo: '',
            obs: '',
            path: '',
            uuid: null,
            localURL: null,
            dbURL: null,
          },
        ],
        notas: [
          {
            date: '',
            chave: '',
            obs: '',
            uuid: null,
            path: '',
            valor: '',
            localURL: null,
            dbURL: null,
          },
        ],
        completo: true,
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
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  methods: {
    customFilter(item, queryText) {
      const name = String(item?.nome).toLowerCase()
      const cnpj = String(item?.cnpj).toLowerCase()
      const searchText = queryText.toLowerCase()

      return name.includes(searchText) || cnpj.includes(searchText)
    },

    async adicionar() {
      this.loading = true

      // deleta arquivos para não adicioná-los no db
      // this.deleteFiles()

      // apenas para compras simples
      this.localForm.pagamentos[0].date = this.localForm.date
      this.localForm.notas[0].date = this.localForm.date
      this.localForm.pagamentos[0].valor = this.localForm.valorTotal
      this.localForm.notas[0].valor = this.localForm.valorTotal

      // adicionar metadados
      const item = {
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
        saldoNota: 0,
        saldoPago: 0,
        ...this.localForm,
      }
      // adicionar no db
      await this.$fire.firestore
        .collection(db)
        .add(item)
        .then((docRef) => {
          console.log('Documento written ID: ', docRef.id)

          this.$notifier.showMessage({
            content: 'Compra simples adicionada',
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
  },
}
</script>
