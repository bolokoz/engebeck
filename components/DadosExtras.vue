<template>
  <div>
    <h3 class="my-3 font-weight-bold">Dados extras</h3>
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <p>Criado por: {{ item.createdBy }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <p>Criado em: {{ createdAtDate }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="modifiedByChecked" sm="8" offset-sm="1" md="6" lg="5">
        <p>
          Modificado em:
          {{ modifiedAtDate }}
        </p>
        <p>
          Modificado por:
          {{ modifiedByChecked }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    createdAtDate() {
      return new Date(this.item.createdAt?.seconds * 1000)
    },
    modifiedAtDate() {
      return this.item.modifiedAt
        ? new Date(this.item.modifiedAt.seconds * 1000)
        : 'Não modificado ainda'
    },
    modifiedByChecked() {
      if (typeof this.item.modifiedBy !== undefined) {
        return this.item.modifiedBy
      } else {
        return false
      }
    },
  },
}
</script>