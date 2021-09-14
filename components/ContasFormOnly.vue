<template>
  <v-form ref="form">
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field
          v-model.number="form.nome"
          label="Nome da conta"
          dense
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Tipo -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-autocomplete
          v-model="form.tipo"
          :items="tipos"
          label="Tipo da conta"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field v-model="form.banco" dense label="Banco"></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field
          v-model="form.cnpj"
          dense
          label="CPF/CNPJ do proprietário"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field
          v-model="form.obs"
          dense
          label="Observações"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field
          v-model="form.agencia"
          dense
          label="Agencia"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field v-model="form.conta" dense label="Conta"></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field v-model="form.pix" dense label="pix"></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
  </v-form>
</template>


<script>
export default {
  props: {
    form: {
      required: true,
      default: {
        nome: '',
        tipo: '',
        vendedor: '',
        cnpj: '',
        email: '',
        telefone: '',
        cidade: '',
        obs: '',
        forma: '',
        nomeBanco: '',
        banco: '',
        agencia: '',
        conta: '',
        pix: '',
      },
    },
  },

  data() {
    return {
      tipos: ['Conta corrente', 'Cartão crédito', 'Cartão débito', 'Boleto'],
    }
  },
}
</script>