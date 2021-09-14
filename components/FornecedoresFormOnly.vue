<template>
  <v-form ref="form">
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field
          v-model.number="form.nome"
          label="Nome fornecedor"
          dense
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Tipo -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-combobox
          v-model="form.tipo"
          :items="tipos"
          label="Tipo fornecedor"
          multiple
          chips
        ></v-combobox>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field
          v-model="form.vendedor"
          dense
          label="Vendedor"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field v-model="form.cnpj" dense label="CNPJ"></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field v-model="form.email" dense label="Email"></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field
          v-model="form.telefone"
          dense
          label="Telfone"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field v-model="form.cidade" dense label="Cidade"></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field
          v-model="form.obs"
          dense
          label="observações"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->

    <v-divider class="my-5"></v-divider>
    <h3 class="my-3 font-weight-bold">Dados bancários</h3>
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field
          v-model="form.forma"
          dense
          label="Forma de pagamento"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->
    <!-- Inicio -->
    <v-row>
      <v-col sm="8" offset-sm="1" md="6" lg="5">
        <v-text-field
          v-model="form.nomeBanco"
          dense
          label="Nome que aparece na conta destino"
        ></v-text-field>
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
        <v-text-field v-model="form.pix" dense label="Pix"></v-text-field>
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
      fornecedores: {
        default: [],
        type: Array,
      },
    },
  },

  data() {
    return {
      loading: false,
      fornecedores: [],
      tipos: [
        'Loja material construção',
        'Loja material hidraulica',
        'Loja material elétrica',
        'Loja depósito',
        'Loja distribuidora areia',
        'Distribuidora areia',
        'Distribuidora brita',
        'Caçambas',
      ],
    }
  },
}
</script>