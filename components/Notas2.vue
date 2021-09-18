<template>
  <v-theme-provider dark>
    <v-container>
      <v-row justify="center">
        <v-expansion-panels inset>
          <v-expansion-panel v-for="(nota, i) in notas" :key="i">
            <v-expansion-panel-header class="font-weight-bold"
              >Nota {{ i + 1 }}</v-expansion-panel-header
            >
            <v-expansion-panel-content class="">
              <v-row class="my-2">
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-date-picker
                    v-model="nota.date"
                    outlined
                    color="secondary"
                    locale="pt-BR"
                    full-width
                  ></v-date-picker>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field
                    v-model.number="nota.numero"
                    outlined
                    label="Número da nota"
                  ></v-text-field>
                  <v-text-field
                    v-model.number="nota.cahve"
                    outlined
                    label="Chave da nota"
                  ></v-text-field>
                  <v-text-field
                    v-model.number="nota.obs"
                    outlined
                    label="Observações"
                  ></v-text-field>
                  <v-text-field
                    v-model.number="nota.valor"
                    prefix="R$"
                    outlined
                    label="Valor total"
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-row class="flex-nowrap">
                    <v-col cols="6">
                      <v-file-input
                        v-model="nota.file"
                        outlined
                        label="Selecionar arquivo"
                        @change="fileSelected($event, nota, i)"
                      ></v-file-input>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                      <v-btn
                        color="red"
                        outlined
                        @click="$emit('removerNota', i)"
                        ><v-icon>mdi-delete</v-icon> Remover nota</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-img
                    v-if="nota.localURL"
                    :src="nota.localURL"
                    contain
                    max-height="400"
                    :gradient="
                      nota.dbURL == null
                        ? 'to top right, rgba(0,0,0,.33), rgba(0,0,0,.7)'
                        : ''
                    "
                  >
                    <div v-if="nota.dbURL == null" class="mt-12">
                      <h3>
                        Apenas visualização. Para gravar, aperte o botão UPLOAD
                      </h3>
                    </div>
                  </v-img>
                </v-col>
                <v-col cols="12" sm="6">
                  <div v-if="nota.dbURL == null">
                    <v-btn
                      v-if="nota.localURL != null"
                      :loading="loading"
                      :disabled="loading"
                      color="primary"
                      @click="upload(nota)"
                      >Upload
                      <v-icon right dark> mdi-cloud-upload </v-icon></v-btn
                    >
                  </div>
                  <div v-else>
                    <v-btn
                      color="primary"
                      class="my-2"
                      :href="nota.dbURL"
                      target="_blank"
                      >Link arquivo: {{ nota.file.name }}</v-btn
                    >
                    <v-btn color="error" @click="deleteFile(nota)"
                      >Deletar arquivo no banco</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row class="my-3" justify="center">
          <v-col>
            <v-btn color="green lighten-3" outlined @click="$emit('addNota')"
              >Adicionar nota</v-btn
            >
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script>
export default {
  props: {
    notas: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      menu: false,
      loading: false,
    }
  },

  computed: {},

  mounted() {},
  methods: {
    fileSelected(file, item) {
      if (file && file.name) {
        item.localURL = URL.createObjectURL(file)
        item.file = file
      } else {
        item.localURL = null
        item.file = null
      }
    },
    async upload(item) {
      this.loading = true
      const filename = item.date + '_' + item.file.name
      await this.$fire.storage
        .ref('notas')
        .child(filename)
        .put(item.file)
        .then((snap) => {
          snap.ref.getDownloadURL().then((url) => {
            item.dbURL = url
            this.$notifier.showMessage({
              content: 'Arquivo carregado',
              color: 'success',
              top: false,
            })
          })
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally((this.loading = false))
    },
    async deleteFile(item) {
      const filename = item.date + '_' + item.file.name
      const fileRef = this.$fire.storage.ref('notas').child(filename)
      await fileRef
        .delete()
        .then(() => {
          this.$notifier.showMessage({
            content: 'Arquivo deletado',
            color: 'info',
            top: false,
          })
          item.file = null
          item.dbURL = null
          item.localURL = null
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
    },
  },
}
</script>
