<template>
  <v-form ref="form">
    <h3 class="my-3 font-weight-bold">Dados da compra</h3>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model.number="localForm.nome"
          label="Nome da obra"
          dense
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model.number="localForm.cidade"
          label="Cidade da obra"
          dense
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="8" md="6" lg="6">
        <v-autocomplete
          v-model="localForm.tipo"
          :items="tiposObra"
          dense
          label="Tipo da obra"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="4" md="6" lg="2">
        <v-text-field
          v-model="localForm.proprietario"
          dense
          label="Proprietário"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="2">
        <v-text-field
          v-model.number="localForm.ano"
          dense
          label="Ano início"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="10">
        <v-text-field
          v-model="localForm.engenheiro"
          dense
          label="Engenheiro geral"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" lg="10">
        <v-text-field
          v-model="localForm.arquiteto"
          dense
          label="Arquiteto"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" lg="10">
        <v-text-field
          v-model="localForm.endereco"
          dense
          label="Endereço"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" lg="10">
        <v-text-field
          v-model="localForm.m2"
          dense
          label="Metros quadrados"
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
const db = 'obras'
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
        ano: 2021,
        tipo: '',
        proprietario: '',
        engenheiro: '',
        arquiteto: '',
        cidade: '',
        endereco: '',
        m2: '',
      }),
    },
  },

  data() {
    return {
      tiposObra: [
        'UNIRESIDENCIAL',
        'MULTIRESIDENCIAL',
        'MISTA',
        'COMERCIAL',
        'INDUSTRIAL',
      ],
      localForm: {
        nome: '',
        ano: 2021,
        cidade: '',
        tipo: '',
        proprietario: '',
        engenheiro: '',
        arquiteto: '',
        endereco: '',
        m2: '',
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
            path: `/${db}`,
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
            path: `/${db}`,
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
            path: `/${db}`,
          })
        })
    },
  },
}
</script>
