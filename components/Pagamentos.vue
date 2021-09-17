<template>
  <v-container class="">
    <v-row justify="center">
      <v-col>
        <v-row v-if="fornecedor.banco !== undefined">
          <v-col cols="12" md="6" lg="3">
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
          <v-expansion-panel-header class="font-weight-bold blue lighten-4"
            >Pagamento {{ i + 1 }}</v-expansion-panel-header
          >
          <v-expansion-panel-content class="blue lighten-5">
            <v-row class="my-2">
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-date-picker
                  outlined
                  full-width
                  v-model="pagamento.data"
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
                  v-model.number="pagamento.valor"
                  prefix="R$"
                  outlined
                  label="Valor total"
                ></v-text-field>

                <v-spacer></v-spacer>

                <v-row class="flex-nowrap">
                  <v-col>
                    <input
                      type="file"
                      @change="$emit('selectImage', $event, pagamento, i)"
                    />
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-btn
                      color="red"
                      @click="$emit('removerPagamento', i)"
                      outlined
                      ><v-icon>mdi-delete</v-icon> Remover pagamento</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-col cols="12" align="center">
              <v-img
                :src="pagamento.fileURL"
                contain
                max-height="500"
                v-if="pagamento.fileURL"
              ></v-img>
            </v-col>
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
      myFile: null,
      fileURL: null,
      metodo: ['PIX', 'TED', 'DOC', 'BOLETO', 'DINHEIRO', 'CARTAO'],
    }
  },
  methods: {
    selectImage(event, pagamento) {
      const image = event.target.files[0]
      try {
        if (image && image.name) {
          this.processing = true
          pagamento.myFile = image
          pagamento.fileURL = URL.createObjectURL(image)
          pagamento.metadata = { contentType: pagamento.myFile.type }
          // this.$emit('atualizar', this.pagamentos)
        } else {
          pagamento.myFile = null
          pagamento.fileURL = null
          pagamento.metadata = ''
        }
      } catch (e) {
        this.$notifier.showMessage({
          content: e,
          color: 'error',
          top: false,
        })
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
    this.local = this.pagamentos
  },
}
</script>