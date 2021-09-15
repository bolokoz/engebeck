<template>
  <v-container class="">
    <v-row justify="center">
      <v-col>
        <v-row v-if="fornecedor.banco !== undefined">
          <v-col cols="12" md="6" offset-lg="0" lg="3">
            <h3>Dados cadastrados do fornecedor</h3>
            <h5>{{ fornecedor.nomeBanco }}</h5>
            <h5>{{ fornecedor.banco }}</h5>
            <h5>{{ fornecedor.agencia }}</h5>
            <h5>{{ fornecedor.conta }}</h5>
            <h5>{{ fornecedor.forma }}</h5>
          </v-col>
        </v-row>
      </v-col>
      <v-expansion-panels inset>
        <v-expansion-panel v-for="(pagamento, i) in pagamentos" :key="i">
          <v-expansion-panel-header class="font-weight-bold"
            >Pagamento {{ i + 1 }}</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" sm="6" md="6" offset-lg="0" lg="2">
                <v-date-picker
                  outlined
                  v-model="pagamento.data"
                  locale="pt-BR"
                ></v-date-picker>
              </v-col>

              <v-col cols="12" sm="6" md="6" offset-lg="0" lg="2">
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
                  v-model.number="pagamento.valor"
                  prefix="R$"
                  outlined
                  label="Valor total"
                ></v-text-field>

                <v-spacer></v-spacer>

                <v-row class="flex-nowrap">
                  <v-col>
                    <v-file-input
                      v-model="pagamento.myFile"
                      outlined
                      placeholder="Carregar arquivo"
                      @change="fileInput"
                      :disabled="processing"
                    >
                      <template v-slot:append-outer>
                        <v-progress-circular
                          v-if="processing"
                          color="grey"
                          indeterminate
                          small
                        />
                      </template>
                    </v-file-input>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-btn
                      x-small
                      color="red"
                      @click="$emit('removerPagamento', i)"
                      outlined
                      ><v-icon>mdi-delete</v-icon> Remover pagamento</v-btn
                    >
                  </v-col>
                </v-row>
                <v-col cols="12" align="center">
                  <v-img
                    :src="pagamento.fileUrl"
                    contain
                    v-if="pagamento.fileUrl"
                    max-height="500"
                  ></v-img>
                </v-col>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row class="my-3" justify="center">
        <v-col>
          <v-btn @click="$emit('addPagamento')">Adicionar pagamento</v-btn>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    pagamentos: {
      type: Array,
    },
    contas: {
      default: [],
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
      metodo: ['PIX', 'TED', 'DOC', 'BOLETO', 'DINHEIRO', 'CARTAO'],
    }
  },
  methods: {
    async fileInput(file) {
      try {
        if (file && file.name) {
          this.processing = true

          const fr = new FileReader()
          fr.readAsDataURL(file)
          fr.addEventListener('load', () => {
            // this is to load image on the UI
            // .. not related to file upload :)
            this.fileURL = fr.result
          })
          const imgData = new FormData()
          imgData.append('image', this.myFile)
          const filePath = `mypath/${Date.now()}-${file.name}`
          const metadata = { contentType: this.myFile.type }

          await this.$fire.storage
            .ref('notas')
            .child(filePath)
            .put(this.myFile, metadata)
          console.log('filePath: ', filePath)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.processing = false
      }
    },
  },

  computed: {
    // localPagamentos() {
    //   return this.pagamentos
    // },
  },

  mounted() {
    // this.localPagamentos = this.pagamentos
  },
}
</script>