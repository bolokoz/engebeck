<template>
  <div>
    <v-container>
      <h1 class="font-weight-regular">Obras</h1>
      <v-row no-gutters>
        <v-col cols="12">
          <v-dialog v-model="dialog" max-width="600px" persistent>
            <ObrasForm
              :dialog.sync="dialog"
              @refresh="read"
              :editItemObject.sync="editItemObject"
            />
          </v-dialog>
          <Lista
            :items="items"
            @addItem="addItem"
            :editItemObject.sync="editItemObject"
            :dialog.sync="dialog"
            :mobileTableHeaders="mobileTableHeaders"
            :mobileTableItems="mobileTableItems"
            :desktopTableHeaders="desktopTableHeaders"
            :telefone="true"
            editPath="/obras"
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
  emptyForm,
  mobileTableHeaders,
  mobileTableItems,
  desktopTableHeaders,
} from '~/dados/obras.js'

export default Vue.extend({
  middleware: 'securePage',

  data() {
    return {
      loading: false,
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
        .collection('obras')
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

    editItem(item) {
      this.editItemObject = { ...item }
      this.dialog = true
    },

    addItem() {
      this.editItemObject = null
      this.dialog = true
    },
  },
  mounted() {
    this.read()
  },
})
</script>
