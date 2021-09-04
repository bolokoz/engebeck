<template>
  <v-container>
    <div class="pa-2">
      <h1>{{ $route.name }} - Ora tal</h1>
    </div>
    <v-data-table
      dense
      :headers="headers"
      :items="funcionarios"
      :search="search"
      class="elevation-5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Procurar"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on">Novo</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row dense>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nome"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Telefone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.funcao"
                        label="Funcao"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.empresa"
                        label="Empresa"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.cpf"
                        label="CPF"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.veiculo"
                        label="Veiculo"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-4" @click="call(item)"> mdi-phone </v-icon>
        <v-icon small class="mr-4" @click="whatsapp(item)">
          mdi-whatsapp
        </v-icon>
        <v-icon small class="mr-4" @click="editItem(item)"> mdi-pencil </v-icon>
        <!-- <template v-slot:activator="{ on, attrs }"> -->
        <v-icon small class="mr-4" @click="openDeleteDialog(item)">
          mdi-delete
        </v-icon>
        <!-- </template> -->
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template> -->
    </v-data-table>
    <v-snackbar v-model="snackbar" timeout="2000">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="indigo" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="deleteDialog" persistent max-width="200">
      <v-card>
        <v-card-title class="headline"> Deletar </v-card-title>
        <v-card-text
          >Deseja mesmo deletar {{ toBeDeleted }} do banco de
          dados?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="deleteDialog = false">
            Voltar
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteFuncionario()">
            Deletar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

// <script>
import { mapState } from 'vuex'
// import FuncionariosDb from '@/firebase/funcionarios-db'

const funcDB = new FuncionariosDb()
// import ProductList from '@/components/ProductList'
// import AddProduct from '@/components/AddProduct'

export default {
  // components: { ProductList, AddProduct },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      snackbar: false,
      snackText: '',
      search: '',
      selectedToDelete: null,
      funcionarios: [],
      headers: [
        {
          text: 'Nome',
          align: 'start',
          value: 'name',
        },
        { text: 'telefone', value: 'phone' },
        { text: 'Funcao', value: 'funcao' },
        { text: 'Empresa', value: 'empresa' },
        { text: 'CPF', value: 'cpf' },
        { text: 'Veiculo', value: 'veiculo' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      func: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        phone: '',
        funcao: '',
        empresa: '',
        cpf: '',
        veiculo: '',
      },
      defaultItem: {
        name: '',
        phone: '',
        cpf: '',
        funcao: '',
        empresa: '',
        veiculo: '',
      },
    }
  },

  computed: {
    // ...mapState('app', ['networkOnLine']),
    // ...mapState('funcionarios', ['funcionarios']),
    // ...mapGetters('funcionarios', ['addFuncionarioPending']),
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Funcionario' : 'Editar funcionario'
    },
    toBeDeleted() {
      return this.selectedToDelete != null ? this.selectedToDelete.name : ''
    },
  },
  created() {
    this.fetch()
  },
  // watch: {
  // dialog(val) {
  // val || this.close()
  // }
  // },
  methods: {
    async fetch() {
      this.funcionarios = await funcDB.readAll()
    },
    call(item) {
      window.open(`tel:${item.phone}`)
    },
    whatsapp(item) {
      window.open(`https://wa.me/55${item.phone}`)
    },
    editItem(item) {
      this.editedIndex = this.funcionarios.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },
    // deleteItem(item) {
    // const payload = this.funcionarios.indexOf(item)
    // alert('Are you sure you want to delete this item?') &&
    //   funcDB.delete(payload)
    // },
    openDeleteDialog(item) {
      this.selectedToDelete = item
      this.deleteDialog = true
    },
    deleteFuncionario() {
      funcDB.delete(this.selectedToDelete.id)
      this.deleteDialog = false
      this.snackText = `Funcionario ${this.toBeDeleted} deletado`
      this.snackbar = true
      this.selectedToDelete = null
      this.fetch()
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      }, 300)
    },

    save() {
      // const funcionariosRef = db.collection('funcionarios')

      if (this.editedIndex > -1) {
        // editar item
        Object.assign(this.funcionarios[this.editedIndex], this.editedItem)
        const payload = { ...this.editedItem }
        // funcionariosRef.doc(payload.id).set(payload)
        funcDB.update(payload)
        this.snackText = `Funcionario ${payload.name} editado`
        this.snackbar = true
      } else {
        // adicionar novo
        const payload = { ...this.editedItem }
        funcDB.create(payload)
        this.snackText = `Funcionario ${payload.name} adicionado`
        this.snackbar = true
      }
      this.close()
      this.fetch()
      // this.initialize()
    },
  },
}
</script>