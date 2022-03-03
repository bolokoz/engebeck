<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model.number="localForm.nome"
          outlined
          label="Nome fornecedor"
          :hint="hintName"
          dense
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-combobox
          v-model="localForm.tipo"
          outlined
          :items="tipos"
          label="Tipo fornecedor"
          hide-selected
          hint="TAB para adicionar. Pode ser mais de um"
          multiple
          chips
        >
          <template #no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Esse tipo não existe ainda, aperte TAB para criar
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.vendedor"
          outlined
          dense
          label="Vendedor"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.cnpj"
          outlined
          dense
          :hint="hintCnpj"
          label="CNPJ"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.email"
          outlined
          dense
          label="Email"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.telefone"
          outlined
          dense
          label="Telfone"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.cidade"
          outlined
          dense
          label="Cidade"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.obs"
          outlined
          dense
          label="observações"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->

    <v-divider class="my-5"></v-divider>
    <h3 class="my-3 font-weight-bold">Dados bancários</h3>
    <!-- Inicio -->
    <v-row>
      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.metodo"
          outlined
          dense
          label="Metodo de pagamento"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.nomeBanco"
          outlined
          dense
          label="Nome que aparece na conta destino"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.banco"
          dense
          outlined
          label="Banco"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.agencia"
          outlined
          dense
          label="Agencia"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.conta"
          dense
          outlined
          label="Conta"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model="localForm.pix"
          outlined
          dense
          label="Pix"
        ></v-text-field>
      </v-col>
    </v-row>
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
const db = 'fornecedores'
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
      default: () => [],
      type: Array,
    },
    form: {
      type: Object,
      default: () => ({
        nome: '',
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
      }),
    },
  },

  data() {
    return {
      loading: false,
      localForm: {
        nome: '',
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
      },
    }
  },
  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
    hintName() {
      const matchingStrings = []

      this.nomes.forEach((list) => {
        if (
          list
            .toLocaleLowerCase()
            .search(this.localForm.nome.toLocaleLowerCase()) > -1
        ) {
          matchingStrings.push(list)
        }
      })
      if (this.localForm.nome.length > 3 && matchingStrings.length > 0) {
        return 'Já existe: ' + matchingStrings.join(' ') + ' no banco'
      } else {
        return 'OK: Nenhum nome semelhante encontrado'
      }
    },
    hintCnpj() {
      const matchingStrings = []

      this.cnpjs.forEach((list) => {
        if (
          list
            .toLocaleLowerCase()
            .search(this.localForm.cnpj.toLocaleLowerCase()) > -1
        ) {
          console.log(list)
          matchingStrings.push(list)
        }
      })
      if (this.localForm.cnpj.length > 3 && matchingStrings.length > 0) {
        return 'Já existe: ' + matchingStrings.join(' ') + ' no banco'
      } else {
        return 'OK: Nenhum cnpj semelhante encontrado'
      }
    },
    tipos() {
      const tipos = []
      this.fornecedores.forEach((d) => {
        if (d?.tipo !== undefined && d.tipo !== '') tipos.push(d.tipo)
      })
      return tipos
    },
    nomes() {
      const nomes = []
      this.fornecedores.forEach((d) => {
        if (d?.tipo !== undefined) nomes.push(d.nome)
      })
      return nomes
    },
    cnpjs() {
      const cnpjs = []
      this.fornecedores.forEach((d) => {
        if (d?.tipo !== undefined) cnpjs.push(d.cnpj)
      })
      return cnpjs
    },
  },
  mounted() {
    if (this.isEdit) {
      this.localForm = this.form
    }
  },

  methods: {
    adicionarCasoNovoCombobox(listaNovos, doc) {
      const listaRef = this.$fire.firestore.collection('listas').doc(doc)
      listaNovos.forEach((d) => {
        listaRef.update({
          tipos: this.$fireModule.firestore.FieldValue.arrayUnion(d),
        })
      })
    },
    async adicionar() {
      this.loading = true
      // adicionar metadados
      if (this.localForm.tipo !== '') {
        this.adicionarCasoNovoCombobox(this.localForm.tipo, 'fornecedores')
      }
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
