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
    <div v-if="saldoPago == 0 && form.valorTotal != 0">
      <span class="green--text">
        <v-icon color="green">mdi-check</v-icon>
        Valor do produto = Valor pago</span
      >
    </div>
    <div v-else>
      <h5 class="primary--text">Total pago: R$ {{ totalPago }}</h5>
      <h5 class="warning--text">Saldo a pagar: R$ {{ saldoPago }}</h5>
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
    <div v-if="saldoNotas == 0 && form.valorTotal != 0">
      <span class="green--text">
        <v-icon color="green">mdi-check</v-icon>
        Valor pago = Valor de notas</span
      >
    </div>
    <div v-else>
      <h5 class="primary--text">Total pago: R$ {{ totalPago }}</h5>
      <h5 class="warning--text">Saldo a pagar: R$ {{ saldoNotas }}</h5>
    </div>

    <Notas
      :notas="form.notas"
      @addNota="addNota"
      @removerNota="removerNota(index)"
      @selectImage="notaSelecionada"
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
    totalNotas() {
      let totalNotas = 0
      for (let index = 0; index < this.form.notas.length; index++) {
        totalNotas += this.form.notas[index].valor
      }
      return totalNotas
    },
    saldoPago() {
      return this.form.valorTotal - this.totalPago
    },
    saldoNotas() {
      return this.totalPago - this.totalNotas
    },
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  methods: {
    comprovanteSelecionado(event, pagamento, index) {
      let image = event.target.files[0]
      if (image && image.name) {
        this.comprovantes.push(image)
        pagamento.fileURL = URL.createObjectURL(image)
        // pagamento.metadata = { contentType: pagamento.myFile.type }
      } else {
        this.comprovantes.splice(index, 1)
        pagamento.myFile = null
        pagamento.fileURL = null
        pagamento.metadata = ''
      }
    },
    notaSelecionada(event, nota, index) {
      console.log(event)
      let image = event.target.files[0]
      if (image && image.name) {
        this.notas.push(image)
        nota.fileURL = URL.createObjectURL(image)
        // nota.metadata = { contentType: nota.myFile.type }
      } else {
        this.notas.splice(index, 1)
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
        obs: '',
        myFile: null,
        fileURL: null,
        metadata: '',
      })
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
    removerPagamento(i) {
      this.form.pagamentos.splice(i, 1)
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
        saldoNota: this.saldoNota,
        saldoPago: this.saldoPago,
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
          if (this.notas.length > 0) {
            this.notas.forEach((image) => {
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
  },
}
</script>