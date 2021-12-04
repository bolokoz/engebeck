<template>
  <div>
    <v-container class="mx-0 px-0">
      <h1 class="font-weight-regular">Relatório gastos por obra</h1>

      <v-card>
        <v-sheet tile height="54" class="d-flex pa-2">
          <v-select
            v-model="obraId"
            dense
            :items="items"
            outlined
            item-text="nome"
            item-value="id"
            clearable
            hide-details
            label="Obra"
            class=""
          ></v-select>

          <v-spacer></v-spacer>
          <v-btn color="primary" @click.stop="procurar"> Procurar </v-btn>
        </v-sheet>
        <v-sheet>
          <v-card-text v-show="compras.length > 0">
            <v-expansion-panels popout>
              <v-expansion-panel v-for="(etapa, i) in etapas" :key="i">
                <v-expansion-panel-header>
                  {{ etapa }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-sheet>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      compras: [],
      loading: false,
      obraId: '',
      categorias: null,
      desktopHeaders: [
        { text: 'Descrição', value: 'descricao' },
        { text: 'Fornecedor', value: 'fornecedor.nome' },
        { text: 'Valor', value: 'valorTotal' },
        { text: 'Data criada', value: 'createdAt', align: 'end' },
        { text: 'Completo', value: 'completo', width: 30, align: 'end' },
        {
          text: 'Editar',
          value: 'actions',
          sortable: false,
          align: 'end',
          width: 30,
        },
      ],
      mobileHeaders: [
        { text: 'Descrição', value: 'descricao' },
        { text: 'Fornecedor', value: 'fornecedor' },
        { text: 'Editar', value: 'actions', sortable: false, align: 'end' },
      ],
    }
  },
  computed: {
    etapas() {
      return [...new Set(this.compras.map((compra) => compra.etapa))]
    },
    // subEtapas() {
    //   const subetapas = new Map()
    //   subetapas.set()
    // },
    totalGeral() {
      return ''
    },
  },
  mounted() {
    this.read()
  },
  methods: {
    read() {
      this.loading = true
      this.$fire.firestore
        .collection('obras')
        .get()
        .then((snap) => {
          this.items = []
          snap.forEach((doc) => {
            this.items.push({ id: doc.id, ...doc.data() })
          })
        })
        .catch(() => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
        })
    },

    procurar() {
      this.loading = true
      this.$fire.firestore
        .collection('compras')
        .where('obra.id', '==', this.obraId)
        .get()
        .then((snap) => {
          this.compras = []
          snap.forEach((doc) => {
            this.compras.push({ id: doc.id, ...doc.data() })
          })
        })
        .catch(() => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
          this.categorias = ''
        })
    },
  },
}
</script>
