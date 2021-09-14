<template>
  <div>
    <v-container>
      <h1 class="font-weight-regular">Contas e cartões</h1>
      <v-row no-gutters>
        <v-col cols="12">
          <v-dialog v-model="dialog" max-width="600px" persistent>
            <ContasForm2
              :dialog.sync="dialog"
              :formIsEdit="formIsEdit"
              @refresh="read"
              :editItemObject="editItemObject"
            />
          </v-dialog>
          <Lista
            :items="items"
            @addItem="addItem"
            @editItem="editItem"
            :dialog.sync="dialog"
            :mobileTableHeaders="mobileTableHeaders"
            :mobileTableItems="mobileTableItems"
            :desktopTableHeaders="desktopTableHeaders"
            :telefone="false"
            editPath="/financeiro/contas"
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
  tipos,
} from '~/dados/contas.js'
import Lista from '~/components/Lista.vue'

export default Vue.extend({
  middleware: 'securePage',
  components: {
    Lista,
  },
  data() {
    return {
      emptyForm,
      tipos: tipos,
      loading: false,
      formIsEdit: false,
      dialog: false,
      editItemObject: null,
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
        .collection('contas')
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
      this.editItemObject = { ...emptyForm }
      this.formIsEdit = false
      this.dialog = true
    },
    editItem(item) {
      this.formIsEdit = true
      this.editItemObject = { ...item }
      this.dialog = true
    },
  },
  mounted() {
    this.read()
  },
})
</script>
