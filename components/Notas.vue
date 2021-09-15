<template>
  <v-container>
    <v-row justify="center">
      <v-expansion-panels inset>
        <v-expansion-panel v-for="(nota, i) in localNotas" :key="i">
          <v-expansion-panel-header class="font-weight-bold"
            >Nota {{ i + 1 }}</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" sm="6" md="6" offset-lg="0" lg="2">
                <v-date-picker
                  outlined
                  v-model="nota.data"
                  locale="pt-BR"
                ></v-date-picker>
              </v-col>

              <v-col cols="12" sm="6" md="6" offset-lg="0" lg="2">
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
                    <v-btn color="primary">Carregar arquivo</v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-btn x-small fab color="red" @click="remover(i)" outlined
                      ><v-icon>mdi-delete</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-btn @click="add">Adicionar Nota</v-btn>
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
    contas: {
      default: [],
      type: Array,
    },
  },
  data() {
    return {
      menu: false,
      localNotas: [],
    }
  },
  methods: {
    add() {
      this.localNotas.push(obj)
    },
    remove(i) {
      this.localNotas.pop(i)
    },
  },

  computed: {},

  mounted() {
    if (this.notas.length > 1) {
      for (let index = 0; index < this.notas.length; index++) {
        this.localNotas.push(obj)
      }
    }
  },
}
</script>