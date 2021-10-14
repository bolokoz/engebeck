<template>
  <div>
    <v-card class="mx-auto" max-width="500">
      <v-sheet class="pa-4 primary">
        <v-text-field
          v-model="search"
          label="Search Company Directory"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
      </v-sheet>
      <v-card-text>
        <v-treeview
          :items="etapas"
          :search="search"
          :filter="filter"
          :open.sync="open"
          hoverable
          activatable
          open-on-click
          item-children="subetapas"
          @input="alert(i)"
        >
          <template #prepend="{ item }">
            <v-icon
              v-if="item.subetapas"
              v-text="item.icon ? item.icon : 'mdi-home'"
            ></v-icon>
          </template>
        </v-treeview>
      </v-card-text>
    </v-card>
    <h3 class="ma-3">Acrescentar ou remover SUBETAPAS</h3>
    <v-card v-for="(etapa, i) in etapas" :key="i" class="mx-5 my-6 px-2">
      <v-card-title>
        <v-text-field
          v-model="etapa.name"
          color="success"
          outlined
          :label="`Etapa ${i + 1}`"
        ></v-text-field>
      </v-card-title>
      <v-card-text v-for="(subetapa, k) in etapa.subetapas" :key="k">
        <v-row>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="subetapa.name"
              :label="`Subetapa ${k + 1}`"
              dense
            />
          </v-col>
          <v-col cols="8" sm="3">
            <v-text-field
              v-model="subetapa.icon"
              :label="`mdi-icon ${k + 1}`"
              dense
            />
          </v-col>
          <v-col cols="4" sm="1">
            <v-btn text icon color="red" @click="removeSubetapa(etapa, k)">
              <v-icon>mdi-delete</v-icon></v-btn
            ></v-col
          >
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn block class="my-4" color="success" @click="addSubetapa(etapa)">
          <v-icon>mdi-plus</v-icon>
          Adicionar subetapa
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    etapas: [
      {
        name: 'PROJETOS',
        id: 0,
        subetapas: [
          { name: 'ARQUITETÔNICO', id: 0 },
          { name: 'ESTRUTURAL', id: 1 },
          { name: 'EXECUTIVO', id: 2 },
          { name: 'HIDROSSANITÁRIO', id: 3 },
          { name: 'ELÉTRICO', id: 4 },
          { name: 'TELEFONIA, TV, INTERNET', id: 5 },
          { name: 'LUMINOTÉCNICO', id: 6 },
          { name: 'PAISAGÍSTICO', id: 7 },
          { name: 'DECORATIVO', id: 8 },
          { name: 'VIABILIDADE', id: 9 },
        ],
      },
      {
        name: 'SERVIÇOS PRELIMINARES',
        id: 1,
        subetapas: [
          { name: 'SONDAGEM', id: 100 },
          { name: 'TERRAPLANAGEM', id: 101 },
          { name: 'DEPÓSITO', id: 102 },
          { name: 'TAPUME', id: 103 },
          { name: 'INSTALAÇÃO ÁGUA', id: 104 },
          { name: 'INSTALAÇÃO DE ENERGIA', id: 105 },
          { name: 'DEMOLIÇÕES', id: 106 },
        ],
      },
      {
        name: 'ESRTRUTURA',
        id: 2,
        subetapas: [
          { name: 'FUNDAÇÕES', id: 200 },
          { name: 'PILARES', id: 201 },
          { name: 'VIGAS', id: 202 },
          { name: 'LAJES', id: 203 },
          { name: 'ESCADAS', id: 204 },
        ],
      },
      {
        name: 'PAREDES',
        id: 3,
        subetapas: [
          { name: 'PAREDES', id: 300 },
          { name: 'DRYWALL', id: 301 },
          { name: 'VERGAS E CONTRAVERGAS', id: 302 },
          { name: 'TORRE CAIXA DAGUA', id: 303 },
        ],
      },
      {
        name: 'HIDROSSANITÁRIO',
        id: 4,
        subetapas: [
          { name: 'ÁGUA QUENTE', id: 400 },
          { name: 'ÁGUA FRIA', id: 401 },
          { name: 'ÁGUA PLUVIAL', id: 402 },
          { name: 'ESGOTO', id: 403 },
        ],
      },
      {
        name: 'ELÉTRICO',
        id: 5,
        icon: 'mdi-flash',
        subetapas: [
          { name: 'CONDUÍTES', id: 500 },
          { name: 'CAIXAS', id: 501 },
          { name: 'FIAÇÃO', id: 502 },
          { name: 'ATERRAMENTO', id: 503 },
        ],
      },
      {
        name: 'COMPLEMENTARES',
        id: 6,
        subetapas: [
          { name: 'TELEFONIA', id: 600 },
          { name: 'TV', id: 601 },
          { name: 'SEGURANÇA', id: 602 },
          { name: 'GÁS', id: 603 },
          { name: 'AR CONDICIONADO', id: 604 },
        ],
      },
      {
        name: 'COBERTURAS',
        id: 7,
        subetapas: [
          { name: 'TELHADO', id: 700 },
          { name: 'IMPERMEABILIZAÇÃO', id: 701 },
          { name: 'REGULARIZAÇÃO', id: 702 },
        ],
      },
      {
        name: 'ACABAMENTOS',
        id: 8,
        subetapas: [
          { name: 'FORROS', id: 800 },
          { name: 'JANELAS', id: 801 },
          { name: 'PORTAS', id: 802 },
          { name: 'PISOS', id: 803 },
          { name: 'SOLEIRAS', id: 804 },
          { name: 'PEITORIS', id: 805 },
          { name: 'RODAPÉS', id: 806 },
          { name: 'REVESTIMENTOS', id: 807 },
          { name: 'LOUÇAS E METAIS', id: 808 },
          { name: 'PINTURAS', id: 809 },
        ],
      },
      {
        name: 'DECORAÇÃO',
        id: 9,
        subetapas: [{ name: 'PAISAGIMSO', id: 900 }],
      },
      { name: 'ENTREGA', id: 10 },
    ],
    open: [],
    search: null,
  }),
  computed: {
    filter() {
      return (item, search, textKey) => item[textKey].includes(search)
    },
    etapas2() {
      const etapas = []
      for (let i = 0; i < this.etapas.length; i++) {
        const etapa = this.etapas[i]
        const obj = {}
        obj.name = etapa.name
        obj.id = i
        if (obj.icon !== undefined) obj.icon = etapa.icon
        if (etapa.children !== undefined) {
          const subetapas = []
          for (let k = 0; k < etapa.children?.length; k++) {
            const id = i + '0' + k
            const subetapa = {
              name: etapa.children[k],
              id: +id,
            }
            subetapas.push(subetapa)
          }
          obj.subetapas = subetapas
          etapas.push(obj)
        } else {
          etapas.push(obj)
        }
      }

      return etapas
    },
  },
  methods: {
    addSubetapa(etapa) {
      if (etapa.subetapas === undefined) {
        this.$set(etapa, `subetapas`, [{ name: 'Nova subetapa', icon: '' }])
      } else {
        etapa.subetapas.push({ name: 'Nova Subetapa', icon: '' })
      }
    },
    removeSubetapa(etapa, index) {
      etapa.subetapas.splice(index, 1)
    },
  },
}
</script>
