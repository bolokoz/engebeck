<template>
  <v-container class="">
    <v-row justify="center">
      <v-expansion-panels inset>
        <v-expansion-panel v-for="(receita, i) in receitas" :key="i">
          <v-expansion-panel-header class="font-weight-bold"
            >Receita {{ i + 1 }}: R$ {{ receita.valor }} -
            {{ receita.date }}</v-expansion-panel-header
          >
          <v-expansion-panel-content class="">
            <v-row class="my-2">
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-date-picker
                  v-model="receita.date"
                  outlined
                  full-width
                  color="primary"
                  locale="pt-BR"
                ></v-date-picker>
              </v-col>

              <v-col cols="12" sm="6" md="6" lg="6">
                <v-autocomplete
                  v-model="receita.conta"
                  outlined
                  required
                  return-object
                  item-text="nome"
                  :items="contas"
                  :rules="[rules.required]"
                  label="Selecionar conta que está recebendo"
                ></v-autocomplete>
                <v-autocomplete
                  v-model="receita.cliente"
                  outlined
                  required
                  return-object
                  item-text="nome"
                  :items="fornecedores"
                  :rules="[rules.required]"
                  label="Selecionar cliente pagador"
                ></v-autocomplete>

                <v-autocomplete
                  v-model="receita.metodo"
                  :items="metodo"
                  outlined
                  label="Método receita"
                ></v-autocomplete>

                <v-text-field
                  v-model="receita.obs"
                  outlined
                  label="Observações"
                ></v-text-field>
                <v-text-field
                  v-model.number="receita.fatura"
                  outlined
                  label="Número da fatura"
                ></v-text-field>
                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      v-model.number="receita.valor"
                      prefix="R$"
                      hint="USAR PONTO PARA CENTAVOS"
                      :rules="[rules.required, rules.decimmalDot]"
                      outlined
                      label="Valor total"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-btn outlined small @click="receita.valor = restante">
                      preencher
                    </v-btn>
                  </v-col>
                </v-row>

                <v-spacer></v-spacer>

                <v-row v-if="receita.uuid == null" class="flex-nowrap">
                  <v-col cols="12">
                    <v-file-input
                      v-model="receita.file"
                      outlined
                      label="Selecionar arquivo"
                      @change="fileSelected($event, receita, i)"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-img
                  v-if="receita.localURL"
                  :src="receita.localURL"
                  contain
                  max-height="400"
                  :gradient="
                    receita.dbURL == null
                      ? 'to top right, rgba(0,0,0,.33), rgba(0,0,0,.7)'
                      : ''
                  "
                >
                  <div v-if="receita.dbURL == null" class="mt-12">
                    <h3>
                      Apenas visualização. Para gravar, aperte o botão UPLOAD
                    </h3>
                  </div>
                </v-img>
              </v-col>
              <v-col cols="12" sm="6">
                <div v-if="receita.dbURL == null">
                  <v-btn
                    v-if="receita.localURL != null"
                    :loading="loading"
                    :disabled="loading"
                    color="primary"
                    @click="upload(receita)"
                    >Upload
                    <v-icon right dark> mdi-cloud-upload </v-icon></v-btn
                  >
                </div>
                <div v-else>
                  <v-btn
                    color="primary"
                    class="my-2"
                    :href="receita.dbURL"
                    target="_blank"
                    >Abrir arquivo
                    <v-icon right dark>mdi-arrow-top-right</v-icon></v-btn
                  >

                  <v-col cols="12" sm="6">
                    <v-img
                      v-if="receita.file == null"
                      :src="receita.dbURL"
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
                  <v-btn color="error" @click="deleteFileByURL(receita)"
                    >Deletar</v-btn
                  >
                </div>
              </v-col>
              <v-col cols="12">
                <v-btn color="red" outlined @click="$emit('removerReceita', i)"
                  ><v-icon>mdi-delete</v-icon> Remover receita</v-btn
                >
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row class="my-3" justify="center">
        <v-col>
          <v-btn color="blue lighten-3" outlined @click="$emit('addReceita')"
            >Adicionar receita</v-btn
          >
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  props: {
    valor: {
      type: Number,
      default: 0,
    },
    receitas: {
      type: Array,
      default: () => [],
    },
    contas: {
      default: () => [],
      type: Array,
    },
    fornecedores: {
      default: () => ({}),
      type: Object,
    },
  },
  data() {
    return {
      menu: false,
      processing: false,
      rules: {
        required: (value) => !!value || 'Obrigatório',
        decimmalDot: (value) => {
          const pattern = /^\$?\d+(\.\d{2})?$/
          return pattern.test(value) || 'USAR PONTO PARA CENTAVOS'
        },
      },
      metodo: ['PIX', 'TED', 'DOC', 'BOLETO', 'DINHEIRO', 'CARTAO'],
      loading: false,
    }
  },

  computed: {
    // localreceitas() {
    //   return this.receitas
    // },
    totalreceitas() {
      let sum = 0
      this.receitas.forEach((d) => {
        sum += d.valor
      })
      return sum
    },
    restante() {
      return this.valor - this.totalreceitas
    },
  },

  mounted() {
    // this.local = this.receitas
  },
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
      const uuid = uuidv4()
      item.uuid = uuid

      await this.$fire.storage
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
