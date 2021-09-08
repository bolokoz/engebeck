<template>
  <div>
    <v-container>
      <h1 class="font-weight-regular">Pedidos/Orçamentos</h1>
      <v-row no-gutters>
        <v-col cols="12">
          <v-dialog v-model="dialog" persistent>
            <PedidosForm
              :dialog.sync="dialog"
              @refresh="read"
              :editItemObject.sync="editItemObject"
              :formIsEdit="formIsEdit"
            />
          </v-dialog>
          <Lista
            :items="items"
            @addItem="addItem"
            @editItem="editItem"
            :editItemObject.sync="editItemObject"
            :dialog.sync="dialog"
            :mobileTableHeaders="mobileTableHeaders"
            :mobileTableItems="mobileTableItems"
            :desktopTableHeaders="desktopTableHeaders"
            :telefone="false"
            editPath="/compras/pedidos"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  mobileTableHeaders,
  mobileTableItems,
  desktopTableHeaders,
  emptyForm,
} from '~/dados/pedidos.js'

export default Vue.extend({
  middleware: 'securePage',

  data() {
    return {
      loading: false,
      formIsEdit: false,
      dialog: false,
      editItemObject: { ...emptyForm },
      items: [],
      mobileTableHeaders: mobileTableHeaders,
      mobileTableItems: mobileTableItems,
      desktopTableHeaders: desktopTableHeaders,
      search: '',
    }
  },

  computed: {},

  methods: {
    async read() {
      this.loading = true
      this.$fire.firestore
        .collection('pedidos')
        .get()
        .then((snap) => {
          this.items = []
          snap.forEach((doc) => {
            this.items.push({ id: doc.id, ...doc.data() })
          })
        })
        .catch(() => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
        })
    },

    addItem() {
      this.formIsEdit = false
      this.editItemObject = { ...emptyForm }
      this.dialog = true
    },
    editItem(item) {
      this.editItemObject = { ...item }
      this.formIsEdit = true
      this.dialog = true
    },
  },
  mounted() {
    this.read()
  },
})
</script>
