<template>
  <v-form ref="form">
    <h3 class="my-3 font-weight-bold">Dados da compra</h3>
    <v-row dense>
      <v-col cols="12" sm="8" md="6" offset-lg="0" lg="3">
        <v-text-field
          v-model="form.descricao"
          label="Descrição da compra"
          outlined
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4" md="6" offset-lg="0" lg="2">
        <v-autocomplete
          v-model="form.tipo"
          :items="tipos"
          outlined
          label="Tipo da compra"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-autocomplete
          v-model="form.fornecedor"
          item-text="nome"
          return-object
          outlined
          :items="fornecedores"
          label="Fornecedor"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-btn to="/financeiro/fornecedores">Criar fornecedor </v-btn>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="3">
        <v-text-field
          v-model.number="form.valorTotal"
          prefix="R$"
          outlined
          label="Valor total final"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-text-field
          v-model="form.obs"
          outlined
          label="Observações"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <h3 class="my-3 font-weight-bold">Dados de controle</h3>
    <v-row dense>
      <v-col cols="12" md="6" offset-lg="0" lg="4">
        <v-autocomplete
          v-model="form.obra"
          outlined
          item-value="id"
          item-text="nome"
          :items="obras"
          label="Obra"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-btn to="/obras">Criar Obra </v-btn>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="6" offset-lg="0" lg="4">
        <v-combobox
          v-model="form.etapa"
          outlined
          item-text="nome"
          item-value="nome"
          :items="etapas"
          label="Etapa"
        ></v-combobox>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="4">
        <v-text-field
          v-model="form.subetapa"
          outlined
          label="SubEtapa"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->

    <v-divider></v-divider>

    <h3 class="my-3 font-weight-bold">Pagamentos</h3>
    <div v-if="saldo == 0 && form.valorTotal != 0">
      <span class="green--text">
        <v-icon color="green">mdi-check</v-icon>
        Valor do produto = Valor pago</span
      >
    </div>
    <div v-else>
      <h5 class="primary--text">Total pago: R$ {{ totalPago }}</h5>
      <h5 class="warning--text">Saldo a pagar: R$ {{ saldo }}</h5>
    </div>

    <Pagamentos
      :pagamentos="form.pagamentos"
      :fornecedor="form.fornecedor"
      :contas="contas"
      @addPagamento="addPagamento"
      @removerPagamento="removerPagamento(index)"
      @selectImage="comprovanteSelecionado"
    />
    <v-divider></v-divider>

    <h3 class="my-3 font-weight-bold">Notas</h3>

    <Notas
      :notas="form.notas"
      @addNota="addNota"
      @removerNota="removerNota(index)"
      @selectImage="comprovanteSelecionado"
    />

    <v-divider class="my-3"></v-divider>

    <BotoesForm :isEdit="isEdit" @adicionar="adicionar" :loading="loading" />
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
    fornecedores: {
      type: Array,
    },
    obras: {
      type: Array,
    },
    contas: {
      type: Array,
    },
    etapas: {
      type: Array,
    },
  },

  data() {
    return {
      tipos: ['Material', 'Serviço', 'Ambos', 'Outros'],
      form: {
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
      },
      comprovantes: [],
      notas: [],
      loading: false,
    }
  },

  computed: {
    totalPago() {
      let totalPago = 0
      for (let index = 0; index < this.form.pagamentos.length; index++) {
        totalPago += this.form.pagamentos[index].valor
      }
      return totalPago
    },
    saldo() {
      return this.form.valorTotal - this.totalPago
    },
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  methods: {
    comprovanteSelecionado(event, pagamento, index) {
      let image = event.target.files[0]
      if (image && image.name) {
        this.loading = true
        this.comprovantes.push(image)
        pagamento.fileURL = URL.createObjectURL(image)
        // pagamento.metadata = { contentType: pagamento.myFile.type }
      } else {
        pagamento.myFile = null
        pagamento.fileURL = null
        pagamento.metadata = ''
      }
    },
    notaSelecionada(event, nota, index) {
      let image = event.target.files[0]
      if (image && image.name) {
        this.loading = true
        this.comprovantes.push(image)
        nota.fileURL = URL.createObjectURL(image)
        // nota.metadata = { contentType: nota.myFile.type }
      } else {
        nota.myFile = null
        nota.fileURL = null
        nota.metadata = ''
      }
    },
    addPagamento() {
      this.form.pagamentos.push({
        data: '',
        valor: 0,
        conta: 0,
        metodo: '',
        myFile: null,
        fileURL: null,
        metadata: '',
      })
    },
    removerPagamento(i) {
      this.form.pagamentos.splice(i, 1)
    },
    addNota() {
      this.form.notas.push({
        data: '',
        chave: 0,
        obs: 0,
        valor: '',
        myFile: null,
        fileURL: null,
        metadata: '',
      })
    },
    removerNota(i) {
      this.form.notas.splice(i, 1)
    },
    async adicionar() {
      this.loading = true

      // adicionar metadados
      const item = {
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
        ...this.form,
      }
      // adicionar no db
      await this.$fire.firestore
        .collection(db)
        .add(item)
        .then((docRef) => {
          console.log('Documento written ID: ', docRef.id)

          // se deu certo, adicionar comprovantes com o id da compra
          if (this.comprovantes.length > 0) {
            this.comprovantes.forEach((image) => {
              try {
                this.$fire.storage
                  .ref('comprovantes')
                  .child(docRef.id)
                  .child(image.name)
                  .put(image)
                  .then((snap) => {
                    console.log('uploaded', snap)
                  })
              } catch (error) {
                this.$notifier.showMessage({
                  content: error,
                  color: 'error',
                  top: false,
                })
              }
            })
          }

          // se deu certo, adicionar as imagens com o id da compra
          if (this.files.length > 0) {
            this.files.forEach((image) => {
              try {
                this.$fire.storage
                  .ref('notas')
                  .child(docRef.id)
                  .child(image.name)
                  .put(image)
                  .then((snap) => {
                    console.log('uploaded', snap)
                  })
              } catch (error) {
                this.$notifier.showMessage({
                  content: error,
                  color: 'error',
                  top: false,
                })
              }
            })
          }

          this.$notifier.showMessage({
            content: 'Adicionado,',
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