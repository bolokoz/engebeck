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

      <!-- <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-file-input
          small-chips
          multiple
          show-size
          outlined
          label="PDF ou imagem de Notas"
          v-model="files"
        ></v-file-input>
      </v-col> -->

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-text-field
          v-model="form.obs"
          outlined
          label="Observações"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col>
        <UploadFiles :id="id"> Carregar notas </UploadFiles>
      </v-col>
    </v-row> -->

    <v-divider></v-divider>
    <h3 class="my-3 font-weight-bold">Dados de controle</h3>
    <v-row>
      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-autocomplete
          v-model="form.obra_id"
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
      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-combobox
          v-model="form.etapa"
          outlined
          item-text="nome"
          item-value="nome"
          :items="etapas"
          label="Etapa"
        ></v-combobox>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
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
        Pagamento completo</span
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
      @removerPagamento="removerPagamento(i)"
    />
    <v-divider></v-divider>

    <h3 class="my-3 font-weight-bold">Notas</h3>

    <Notas :notas="[{ a: 2 }, { b: 3 }]" :contas="contas" />
    <!-- Inicio -->
    <v-row> </v-row>

    <!-- Fim -->

    <v-divider></v-divider>

    <BotoesForm :isEdit="isEdit" @adicionar="adicionar" :loading="loading" />
  </v-form>
</template>


<script>
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
      tipos: ['Material', 'Serviço', 'Outros'],
      formas: ['TED', 'DOC', 'PIX', 'Boleto', 'Cartão', 'Cheque'],
      menu: false,
      menu2: false,
      form: {
        descricao: '',
        tipo: '',
        obs: '',
        fornecedor: {},
        dataCompra: '',
        obra_id: {},
        comprador: '',
        nota: '',
        pedido: '',
        etapa: '',
        subetapa: '',
        compra_id: '',
        banco: '',
        agencia: '',
        conta: '',
        valorTotal: 0,
        pagador: '',
        forma: '',
        pagamentos: [],
      },
      files: [],
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
  },

  methods: {
    addPagamento() {
      this.form.pagamentos.push({
        data: '',
        valor: 0,
        conta: 0,
        metodo: '',
      })
    },
    removerPagamento(i) {
      this.form.pagamentos.pop(i)
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
        .collection(db)
        .add(item)
        .then((docRef) => {
          console.log('Documento written ID: ', docRef.id)

          if (this.files) {
            files.forEach((d) => {
              // await this.$fire.storage().ref('notas').put(`${docRef.id}_${d}`)
              console.log(d)
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