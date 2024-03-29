<template>
  <v-theme-provider dark>
    <v-container>
      <v-row justify="center">
        <v-expansion-panels inset>
          <v-expansion-panel v-for="(nota, i) in notas" :key="i">
            <v-expansion-panel-header class="font-weight-bold"
              >Nota {{ i + 1 }}: {{ nota.numero }} - R${{
                nota.valor
              }}</v-expansion-panel-header
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
                    v-model="nota.numero"
                    outlined
                    label="Número da nota"
                  ></v-text-field>
                  <v-text-field
                    v-model="nota.chave"
                    outlined
                    label="Chave da nota"
                  ></v-text-field>
                  <v-text-field
                    v-model="nota.obs"
                    outlined
                    label="Observações"
                  ></v-text-field>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model.number="nota.valor"
                        prefix="R$"
                        outlined
                        label="Valor total"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-btn outlined small @click="nota.valor = restante">
                        preencher
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-spacer></v-spacer>
                  <v-row v-if="nota.uuid == null" class="flex-nowrap">
                    <v-col cols="12">
                      <v-file-input
                        v-model="nota.file"
                        outlined
                        label="Selecionar arquivo"
                        @change="fileSelected($event, nota, i)"
                      ></v-file-input>
                    </v-col>
                    <v-spacer></v-spacer>
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
                      >Abrir arquivo
                      <v-icon right dark>mdi-arrow-top-right</v-icon></v-btn
                    >
                    <v-col cols="12" sm="6">
                      <v-img
                        v-if="nota.file == null"
                        :src="nota.dbURL"
                        contain
                        max-height="400"
                      >
                        <template #placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-col>

                    <v-btn color="error" @click="deleteFileByURL(i)">
                      Deletar</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-btn color="red" outlined @click="$emit('removerNota', i)"
                    ><v-icon>mdi-delete</v-icon> Remover nota</v-btn
                  >
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
import { v4 as uuidv4 } from 'uuid'
export default {
  props: {
    notas: {
      default: () => [],
      type: Array,
    },
    isEdit: {
      default: false,
      type: Boolean,
    },
    valor: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      menu: false,
      loading: false,
    }
  },

  computed: {
    restante() {
      return this.valor - this.totalPagamentos
    },
    totalPagamentos() {
      let sum = 0
      this.notas.forEach((d) => {
        sum += d.valor
      })
      return sum
    },
  },

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
    upload(item) {
      this.loading = true
      const uuid = uuidv4()
      item.uuid = uuid
      this.$fire.storage
        .ref()
        .child(uuid)
        .put(item.file)
        .then((snap) => {
          item.path = snap.ref._delegate._location.path_
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
    // async deleteFile(item) {
    //   const filename = item.date + '_' + item.file.name
    //   this.$fire.storage
    //     .ref()
    //     .delete()
    //     .then(() => {
    //       this.$notifier.showMessage({
    //         content: 'Arquivo deletado',
    //         color: 'info',
    //         top: false,
    //       })
    //       item.file = null
    //       item.dbURL = null
    //       item.localURL = null
    //     })
    //     .catch((error) => {
    //       this.$notifier.showMessage({
    //         content: error,
    //         color: 'error',
    //         top: false,
    //       })
    //     })
    // },
    async deleteFileByURL(item) {
      this.loading = true
      await this.$fire.storage
        .ref()
        .child(item.uuid)
        .delete()
        .then(() => {
          this.$notifier.showMessage({
            content: 'Arquivo deletado',
            color: 'info',
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
          item.file = null
          item.dbURL = null
          item.path = null
          item.uuid = null
          item.localURL = null
          if (this.isEdit) {
            this.$fire.firestore
              .collection('compras')
              .doc(this.id)
              .update(...this.localForm)
          }

          this.loading = false
        })
    },
  },
}
</script>
