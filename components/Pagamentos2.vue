<template>
  <v-container class="">
    <v-row justify="center">
      <v-col>
        <v-row v-if="fornecedor.banco !== undefined">
          <v-col cols="12" md="6" lg="6">
            <h3 class="info--text">Dados cadastrados do fornecedor</h3>
            <h5 class="info--text">Nome conta: {{ fornecedor.nomeBanco }}</h5>
            <h5 class="info--text">Banco: {{ fornecedor.banco }}</h5>
            <h5 class="info--text">
              Método de pagamento: {{ fornecedor.metodo }}
            </h5>
            <h5 class="info--text">{{ fornecedor.agencia }}</h5>
            <h5 class="info--text">{{ fornecedor.conta }}</h5>
            <h5 class="info--text">{{ fornecedor.pix }}</h5>
          </v-col>
        </v-row>
      </v-col>
      <v-expansion-panels inset>
        <v-expansion-panel v-for="(pagamento, i) in pagamentos" :key="i">
          <v-expansion-panel-header class="font-weight-bold"
            >Pagamento {{ i + 1 }}</v-expansion-panel-header
          >
          <v-expansion-panel-content class="">
            <v-row class="my-2">
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-date-picker
                  v-model="pagamento.date"
                  outlined
                  full-width
                  color="primary"
                  locale="pt-BR"
                ></v-date-picker>
              </v-col>

              <v-col cols="12" sm="6" md="6" lg="6">
                <v-autocomplete
                  v-model="pagamento.metodo"
                  :items="metodo"
                  outlined
                  label="Método pagamento"
                ></v-autocomplete>

                <v-autocomplete
                  v-model="pagamento.conta"
                  outlined
                  return-object
                  item-text="nome"
                  :items="contas"
                  label="Selecionar conta pagadora"
                ></v-autocomplete>
                <v-text-field
                  v-model.number="pagamento.obs"
                  outlined
                  label="Observações"
                ></v-text-field>

                <v-text-field
                  v-model.number="pagamento.valor"
                  prefix="R$"
                  hint="USAR PONTO PARA CENTAVOS"
                  :rules="[rules.required, rules.decimmalDot]"
                  outlined
                  label="Valor total"
                ></v-text-field>

                <v-spacer></v-spacer>

                <v-row v-if="pagamento.uuid == null" class="flex-nowrap">
                  <v-col cols="12">
                    <v-file-input
                      v-model="pagamento.file"
                      outlined
                      label="Selecionar arquivo"
                      @change="fileSelected($event, pagamento, i)"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-img
                  v-if="pagamento.localURL"
                  :src="pagamento.localURL"
                  contain
                  max-height="400"
                  :gradient="
                    pagamento.dbURL == null
                      ? 'to top right, rgba(0,0,0,.33), rgba(0,0,0,.7)'
                      : ''
                  "
                >
                  <div v-if="pagamento.dbURL == null" class="mt-12">
                    <h3>
                      Apenas visualização. Para gravar, aperte o botão UPLOAD
                    </h3>
                  </div>
                </v-img>
              </v-col>
              <v-col cols="12" sm="6">
                <div v-if="pagamento.dbURL == null">
                  <v-btn
                    v-if="pagamento.localURL != null"
                    :loading="loading"
                    :disabled="loading"
                    color="primary"
                    @click="upload(pagamento)"
                    >Upload
                    <v-icon right dark> mdi-cloud-upload </v-icon></v-btn
                  >
                </div>
                <div v-else>
                  <v-btn
                    color="primary"
                    class="my-2"
                    :href="pagamento.dbURL"
                    target="_blank"
                    >Abrir arquivo
                    <v-icon right dark>mdi-arrow-top-right</v-icon></v-btn
                  >

                  <v-col cols="12" sm="6">
                    <v-img
                      v-if="pagamento.file == null"
                      :src="pagamento.dbURL"
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
                  <v-btn color="error" @click="deleteFileByURL(pagamento)"
                    >Deletar</v-btn
                  >
                </div>
              </v-col>
              <v-col cols="12">
                <v-btn
                  color="red"
                  outlined
                  @click="$emit('removerPagamento', i)"
                  ><v-icon>mdi-delete</v-icon> Remover pagamento</v-btn
                >
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row class="my-3" justify="center">
        <v-col>
          <v-btn color="blue lighten-3" outlined @click="$emit('addPagamento')"
            >Adicionar pagamento</v-btn
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
    pagamentos: {
      type: Array,
      default: () => [],
    },
    contas: {
      default: () => [],
      type: Array,
    },
    fornecedor: {
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
    // localPagamentos() {
    //   return this.pagamentos
    // },
  },

  mounted() {
    // this.local = this.pagamentos
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
