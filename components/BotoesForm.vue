<template>
  <!-- Botoes -->
  <v-row class="my-5">
    <!-- CONDICAO CRIAR NOVO -->
    <div v-if="!isEdit">
      <v-row>
        <v-col>
          <v-btn dark color="green light" outlined @click="adicionar">{{
            loading ? 'enviando' : 'Enviar'
          }}</v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- CONDICAO EDITAR -->
    <div v-else>
      <v-row>
        <v-col>
          <v-btn dark color="green light" outlined @click="alterar">{{
            loading ? 'enviando' : 'ALTERAR'
          }}</v-btn>
        </v-col>
        <v-col>
          <v-btn dark color="red light" outlined @click="deletar">{{
            loading ? 'enviando' : 'DELETAR'
          }}</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-row>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    adicionar() {
      this.$emit('adicionar')
    },
    deletar() {
      this.$emit('deletar')
    },
    alterar() {
      this.$emit('alterar')
    },
  },
}
</script>