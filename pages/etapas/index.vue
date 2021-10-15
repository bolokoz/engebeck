<template>
  <div>
    <v-card class="mx-auto" max-width="500">
      <v-sheet class="pa-4 primary">
        <v-text-field
          v-model="search"
          label="Procurar etapas"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          :loading="loading"
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
      </v-sheet>
      <v-card-text>
        <v-treeview
          :items="items"
          :search="search"
          :filter="filter"
          :open.sync="open"
          hoverable
          activatable
          open-on-click
          item-children="subetapas"
          @input="alert(i)"
        >
          <template #prepend="{ item }">
            <v-icon v-text="item.icon"></v-icon>
          </template>
        </v-treeview>
      </v-card-text>
    </v-card>
    <h3 class="ma-3">Acrescentar ou remover SUBETAPAS</h3>
    <v-card v-for="(etapa, i) in items" :key="i" class="mx-5 my-6 px-2">
      <v-card-title>
        <v-row>
          <v-col cols="8" sm="8">
            <v-text-field
              v-model="etapa.name"
              color="success"
              outlined
              :label="`Etapa ${i + 1}`"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="etapa.icon"
              :label="`mdi-icon ${i + 1}`"
              dense
              outlined
            />
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text v-for="(subetapa, k) in etapa.subetapas" :key="k">
        <v-row class="mx-4">
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="subetapa.name"
              :label="`Subetapa ${k + 1}`"
              dense
            />
          </v-col>
          <v-col cols="8" sm="3">
            <v-text-field
              v-model="subetapa.icon"
              :label="`mdi-icon ${k + 1}`"
              dense
            />
          </v-col>
          <v-col cols="4" sm="1">
            <v-btn text icon color="red" @click="removeSubetapa(etapa, k)">
              <v-icon>mdi-delete</v-icon></v-btn
            ></v-col
          >
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn block class="my-4" color="success" @click="addSubetapa(etapa)">
          <v-icon>mdi-plus</v-icon>
          Adicionar subetapa
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-btn block @click="alterar">Salvar alterações</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    etapas: [],
    items: [],
    open: [],
    loading: false,
    search: null,
  }),

  computed: {
    filter() {
      return (item, search, textKey) => item[textKey].includes(search)
    },
  },
  mounted() {
    this.read()
  },
  methods: {
    addSubetapa(etapa) {
      if (etapa.subetapas === undefined) {
        this.$set(etapa, `subetapas`, [{ name: 'Nova subetapa', icon: '' }])
      } else {
        etapa.subetapas.push({ name: 'Nova Subetapa', icon: '' })
      }
    },
    removeSubetapa(etapa, index) {
      etapa.subetapas.splice(index, 1)
    },
    async alterar() {
      this.loading = true
      await this.$fire.firestore
        .collection('etapas')
        .doc('0zHyC720KosEEM1eVUtF')
        .update({ ...this.items })
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
            path: '/etapas',
          })
          this.read()
        })
    },
    read() {
      this.loading = true
      this.$fire.firestore
        .collection('etapas')
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            this.items = Object.values({ ...doc.data() })
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
  },
}
</script>
