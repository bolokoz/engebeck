<template>
  <v-row>
    <v-col
      v-for="(pagamento, k) in parcelas"
      :key="k"
      sm="8"
      md="6"
      offset-lg="0"
      lg="2"
    >
      <v-card color="grey lighten-4" class="pa-2">
        <v-text-field
          v-model.number="pagamento.valor"
          type="number"
          prefix="R$"
          outlined
          :label="`Valor pagamento ${pagamento.n}`"
        ></v-text-field>
        <v-menu
          v-model="pagamento.menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="pagamento.data"
              label="Data prevista pagamento"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            outlined
            v-model="pagamento.data"
            @input="pagamento.menu = false"
          ></v-date-picker>
        </v-menu>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import EscolherData2 from './EscolherData2.vue'
export default {
  components: { EscolherData2 },
  props: {
    parcelas: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      menu: false,
    }
  },
}
</script>