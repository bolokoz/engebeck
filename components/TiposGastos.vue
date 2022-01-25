<template>
  <v-theme-provider dark>
    <v-container>
      <v-row justify="center">
        <v-expansion-panels inset>
          <v-expansion-panel v-for="(tipo, i) in tiposGastos" :key="i">
            <v-expansion-panel-header class="font-weight-bold"
              >Tipo de gasto {{ i + 1 }}</v-expansion-panel-header
            >
            <v-expansion-panel-content class="">
              <v-row class="my-2">
                <v-col cols="12" md="6" lg="4">
                  <v-autocomplete
                    v-model="tipo.etapa"
                    outlined
                    item-text="name"
                    return-object
                    :items="etapas"
                    label="Etapa"
                  >
                    <template #item="{ item }">
                      <v-list-item-avatar color="primary">
                        <v-icon>
                          {{ item.icon }}
                        </v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" md="6" lg="4">
                  <v-autocomplete
                    v-model="tipo.subetapa"
                    outlined
                    chips
                    item-text="name"
                    :items="tipo.etapa.subetapas"
                    label="Sub Etapa"
                  >
                    <template #item="{ item }">
                      <v-list-item-avatar color="primary">
                        <v-icon>
                          {{ item.icon }}
                        </v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>

                  <v-autocomplete
                    v-model="tipo.tipo"
                    :items="tipos"
                    outlined
                    required
                    label="Tipo da compra"
                  ></v-autocomplete>

                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        v-model.number="tipo.valor"
                        prefix="R$"
                        outlined
                        label="Valor"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-btn outlined small @click="tipo.valor = restante">
                        preencher
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-spacer></v-spacer>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    color="red"
                    outlined
                    @click="$emit('removerTipoGasto', i)"
                    ><v-icon>mdi-delete</v-icon> Remover tipo de gasto</v-btn
                  >
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row class="my-3" justify="center">
          <v-col>
            <v-btn
              color="green lighten-3"
              outlined
              @click="$emit('addTipoGasto')"
              >Adicionar tipo de gasto</v-btn
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
    tiposGastos: {
      default: () => [],
      type: Array,
    },
    tipos: {
      default: () => [],
      type: Array,
    },

    etapas: {
      default: () => [],
      type: Array,
    },
    isEdit: {
      default: false,
      type: Boolean,
    },

    valor: {
      default: false,
      type: Number,
    },
  },
  data() {
    return {
      menu: false,
      loading: false,
    }
  },

  computed: {
    totalCategorizado() {
      let sum = 0
      this.tiposGastos.forEach((d) => {
        sum += d.valor
      })
      return sum
    },
    restante() {
      return this.valor - this.totalCategorizado
    },
  },

  mounted() {},
  methods: {},
}
</script>
