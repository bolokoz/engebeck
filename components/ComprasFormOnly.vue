<template>
  <v-form ref="form">
    <v-row dense>
      <v-col cols="12" sm="8" md="6" offset-lg="0" lg="3">
        <v-text-field
          v-model="form.descricao"
          label="Descrição da compra"
          outlined
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4" md="6" offset-lg="0" lg="2">
        <v-autocomplete
          v-model="form.tipo"
          :items="tipos"
          outlined
          label="Tipo da compra"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-autocomplete
          v-model="form.fornecedor"
          item-text="nome"
          return-object
          outlined
          :items="fornecedores"
          label="Fornecedor"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-btn to="/financeiro/fornecedores">Criar fornecedor </v-btn>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="3">
        <v-text-field
          v-model="form.nota"
          outlined
          label="Notas/chaves/recibos"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-file-input
          small-chips
          multiple
          outlined
          label="Notas"
        ></v-file-input>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-text-field
          v-model="form.pedido"
          outlined
          label="Pedido"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <h3 class="my-3 font-weight-bold">Dados de controle</h3>
    <v-row>
      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-autocomplete
          v-model="form.obra_id"
          outlined
          item-value="id"
          item-text="nome"
          :items="obras"
          label="Obra"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-btn to="/obras">Criar Obra </v-btn>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-combobox
          v-model="form.etapa"
          outlined
          :items="etapas"
          label="Etapa"
        ></v-combobox>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-text-field
          v-model="form.subetapa"
          outlined
          label="SubEtapa"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Fim -->

    <v-divider></v-divider>

    <h3 class="my-3 font-weight-bold">Dados do pagamento</h3>

    <!-- Inicio -->
    <v-row>
      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-autocomplete
          v-model="form.forma"
          :items="formas"
          outlined
          label="Forma de pagamento"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-autocomplete
          v-model="form.contaPagadora"
          outlined
          return-object
          item-text="nome"
          :items="contas"
          label="Selecionar conta pagadora"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-text-field
          v-model="form.pagador"
          outlined
          label="Quem pagou"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-text-field
          v-model="form.valor"
          outlined
          label="Valor total"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-text-field
          v-model="form.obs"
          outlined
          label="Observações"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6" offset-lg="0" lg="2">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.data"
              label="Data pagamento"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            outlined
            v-model="form.data"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-btn @click="addParcela" text small color="primary"
      >Adicionar parcela</v-btn
    >
    <div v-if="form.parcelas.length > 0">
      <v-btn @click="removeParcela" text small color="warning"
        >Remover parcela</v-btn
      >

      Saldo a pagar: {{ saldo }}
      <Parcelas :parcelas="this.form.parcelas" />
    </div>

    <!-- Fim -->

    <v-row v-if="form.fornecedor">
      <v-col cols="12" md="6" offset-lg="0" lg="3">
        <h3>Dados bancários do fornecedor</h3>
        <h5>{{ form.fornecedor.nomeBanco }}</h5>
        <h5>{{ form.fornecedor.banco }}</h5>
        <h5>{{ form.fornecedor.agencia }}</h5>
        <h5>{{ form.fornecedor.conta }}</h5>
        <h5>{{ form.fornecedor.forma }}</h5>
      </v-col>
    </v-row>
  </v-form>
</template>


<script>
import Parcelas from './Parcelas.vue'
export default {
  components: { Parcelas },
  props: {
    form: {
      type: Object,
    },
    fornecedores: {
      type: Array,
    },
    obras: {
      type: Array,
    },
    contas: {
      type: Array,
    },
    etapas: {
      type: Array,
    },
  },

  data() {
    return {
      tipos: ['Material', 'Serviço', 'Outros'],
      formas: ['TED', 'DOC', 'BOLETO'],
      menu: false,
      menu2: false,
    }
  },
  methods: {
    addParcela() {
      this.nParcelas++
      let pagamento = { n: this.nParcelas, data: '', valor: '', menu: false }
      this.form.parcelas.push(pagamento)
    },
    removeParcela() {
      this.nParcelas--
      this.form.parcelas.pop()
    },
  },

  computed: {
    saldo() {
      let saldo = this.form.valor
      let pago = 0
      this.form.parcelas.forEach((d) => {
        pago += d.valor
      })
      return saldo - pago
    },
  },
}
</script>