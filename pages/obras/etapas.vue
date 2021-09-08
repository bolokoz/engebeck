<template>
  <div>
    <v-container>
      <h1 class="font-weight-regular">Etapas</h1>
      <v-row no-gutters>
        <v-col cols="12">
          <v-treeview
            v-model="tree"
            :items="items"
            item-text="nome"
            activatable
            open-on-click
            dense
          >
          </v-treeview>
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
  exemploForm,
  emptyForm,
} from '~/dados/etapas.js'

export default Vue.extend({
  middleware: 'securePage',

  data() {
    return {
      loading: false,
      tree: [],
      etapas: [],
      formIsEdit: false,
      initiallyOpen: ['Fundação'],
      dialog: false,
      editItemObject: { ...emptyForm },
      items: exemploForm.etapas,
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
        .collection('etapas')
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
    // this.read()
  },
})
</script>
