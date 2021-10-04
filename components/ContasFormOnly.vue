<template>
  <v-form ref="form">
    <v-row>
      <h3 class="my-3 font-weight-bold">Dados do Cliente</h3>
      <v-col sm="12" md="6" lg="4">
        <v-text-field
          v-model="localForm.nome"
          outlined
          label="Nome da conta"
          dense
          required
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <v-text-field
          v-model="localForm.cnpj"
          outlined
          label="CNPJ"
          dense
          required
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <v-text-field
          v-model="localForm.endereco"
          outlined
          label="Endereço da conta"
          hint="Rua, "
          dense
          required
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <v-text-field
          v-model="localForm.email"
          outlined
          label="Email do contato da conta"
          dense
          required
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <v-text-field
          v-model="localForm.representante"
          outlined
          label="Nome completo do representante (assinante) "
          dense
          required
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <v-text-field
          v-model="localForm.telefone"
          outlined
          label="Telefone de contato da conta"
          dense
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <h3 class="my-3 font-weight-bold">Dados da conta de pagamento</h3>

      <v-col sm="12" md="6" lg="4">
        <v-autocomplete
          v-model="localForm.tipo"
          outlined
          :items="tipos"
          dense
          label="Método de pagamento"
        ></v-autocomplete>
      </v-col>

      <v-col sm="12" md="6" lg="4">
        <v-text-field
          v-model="localForm.banco"
          dense
          outlined
          label="Banco"
        ></v-text-field>
      </v-col>

      <v-col sm="12" md="6" lg="4">
        <v-text-field
          v-model="localForm.obs"
          outlined
          dense
          label="Observações"
        ></v-text-field>
      </v-col>

      <v-col sm="12" md="6" lg="4">
        <v-text-field
          v-model="localForm.agencia"
          outlined
          dense
          label="Agencia"
        ></v-text-field>
      </v-col>

      <v-col sm="12" md="6" lg="4">
        <v-text-field
          v-model="localForm.conta"
          dense
          outlined
          label="Conta"
        ></v-text-field>
      </v-col>

      <v-col sm="12" md="6" lg="4">
        <v-text-field
          v-model="localForm.pix"
          dense
          outlined
          label="pix"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="my-3"></v-divider>

    <v-container>
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
const db = 'contas'
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

    form: {
      type: Object,
      default: () => ({
        nome: '',
        tipo: '',
        endereco: '',
        email: '',
        representante: '',
        vendedor: '',
        cnpj: '',
        telefone: '',
        cidade: '',
        obs: '',
        forma: '',
        nomeBanco: '',
        banco: '',
        agencia: '',
        conta: '',
        pix: '',
      }),
    },
  },

  data() {
    return {
      tipos: ['Conta corrente', 'Cartão crédito', 'Cartão débito', 'Boleto'],
      localForm: {
        nome: '',
        tipo: '',
        endereco: '',
        email: '',
        representante: '',
        vendedor: '',
        cnpj: '',
        telefone: '',
        cidade: '',
        obs: '',
        forma: '',
        nomeBanco: '',
        banco: '',
        agencia: '',
        conta: '',
        pix: '',
      },
      loading: false,
    }
  },
  computed: {
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
    async adicionar() {
      this.loading = true
      // adicionar metadados
      const item = {
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
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
            path: `/financeiro/${db}`,
          })
        })
    },
    async alterar() {
      this.loading = true

      const modificacao = {
        modifiedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        modifiedBy: this.authUser,
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
            path: `/financeiro/${db}`,
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
          this.$router.push({
            path: `/financeiro/${db}`,
          })
        })
    },
  },
}
</script>
