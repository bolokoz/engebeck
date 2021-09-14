<template>
  <div>
    <h3 class="my-3 font-weight-bold">Dados extras</h3>
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <p>Criado por: {{ form.createdBy }}</p>
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
    form: {
      type: Object,
      required: true,
    },
  },

  computed: {
    createdAtDate() {
      return new Date(this.form.createdAt?.seconds * 1000)
    },
    modifiedAtDate() {
      return this.form.modifiedAt
        ? new Date(this.form.modifiedAt.seconds * 1000)
        : 'Não modificado ainda'
    },
    modifiedByChecked() {
      if (typeof this.form.modifiedBy !== undefined) {
        return this.form.modifiedBy
      } else {
        return false
      }
    },
  },
}
</script>