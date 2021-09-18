<template>
  <v-container>
    <v-row justify="center">
      <v-expansion-panels inset>
        <v-expansion-panel v-for="(nota, i) in notas" :key="i">
          <v-expansion-panel-header class="font-weight-bold green lighten-4"
            >Nota {{ i + 1 }}</v-expansion-panel-header
          >
          <v-expansion-panel-content class="green lighten-5">
            <v-row class="my-2">
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-date-picker
                  v-model="nota.data"
                  outlined
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
                  <v-col>
                    <input
                      type="file"
                      @change="$emit('selectImage', $event, nota, i)"
                    />
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-btn color="red" outlined @click="$emit('removerNota', i)"
                      ><v-icon>mdi-delete</v-icon> Remover nota</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-col cols="12" align="center">
              <v-img
                v-if="nota.fileURL"
                :src="nota.fileURL"
                contain
                max-height="500"
              ></v-img>
            </v-col>
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
</template>

<script>
const obj = {
  data: '',
  valor: 0,
  chave: 0,
  numero: 0,
  obs: '',
}
export default {
  props: {
    notas: {
      default: [],
      type: Array,
    },
  },
  data() {
    return {
      menu: false,
    }
  },

  computed: {},

  mounted() {
    if (this.notas.length > 1) {
      for (let index = 0; index < this.notas.length; index++) {
        this.localNotas.push(obj)
      }
    }
  },
  methods: {},
}
</script>
