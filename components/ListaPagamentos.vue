<template>
  <div>
    <v-container class="px-0 mx-0">
      <v-row>
        <v-col cols="12">
          <div>
            <v-card>
              <v-sheet tile height="54" class="d-flex">
                <v-select
                  v-model="fornecedorFilter"
                  dense
                  outlined
                  :items="comprasFornecedores"
                  hide-details
                  clearable
                  class="ma-2"
                  label="Fornecedor"
                ></v-select>
                <v-select
                  v-model="obraFilter"
                  dense
                  :items="comprasObras"
                  outlined
                  clearable
                  hide-details
                  label="Obra"
                  class="ma-2"
                ></v-select>
                <v-select
                  v-model="monthFilter"
                  dense
                  outlined
                  clearable
                  hide-details
                  :items="comprasMeses"
                  label="Mês criado"
                  class="ma-2"
                ></v-select>

                <v-spacer></v-spacer>
              </v-sheet>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Procurar"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                v-model="selected"
                :headers="desktopHeaders"
                :items="filtered"
                :search="search"
                sort-by="date"
                sort-desc
                show-select
                no-results-text="Nada encontrado"
                no-data-text="Banco de dados vazio"
                loading-text="Carregando dados..."
              >
                // eslint-disable-next-line vue/valid-v-slot
                <template #item.date="{ item }">
                  {{ new Date(item.date).toLocaleString('pt-BR') }}
                </template>
                // eslint-disable-next-line vue/valid-v-slot
                <template #item.valorTotal="{ item }">
                  R$ {{ item.valorTotal }}
                </template>
                <template #item.completo="{ item }">
                  <v-simple-checkbox
                    v-model="item.completo"
                    disabled
                  ></v-simple-checkbox>
                </template>
                <template #item.actions="{ item }">
                  <!-- <v-icon
                    v-if="telefone"
                    small
                    class="mr-2"
                    @click="whatsapp(item)"
                  >
                    mdi-phone
                  </v-icon> -->
                  <!-- <v-icon small class="mr-2" @click="email(item)">
                    mdi-mail
                  </v-icon> -->
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </div>
          <!-- <div class="d-flex flex-column d-sm-none">
            <v-simple-table>
              <template #default>
                <thead>
                  <tr>
                    <th v-for="(th, k) in mobileHeaders" :key="k">
                      {{ th }}
                    </th>
                    <th class="text-left">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td v-for="(td, k) in mobileHeaders" :key="k">
                      {{ item[td] }}
                    </td>
                    <td>
                      <v-btn v-if="telefone" text small @click="whatsapp(item)"
                        ><v-icon>mdi-phone</v-icon></v-btn
                      >
                      <v-btn text small @click.native="editItem(item)"
                        ><v-icon>mdi-pencil</v-icon></v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div> -->
        </v-col>
      </v-row>
      <div v-if="selected.length > 0">
        <v-btn color="primary" text block @click="exportCSV(selected)"
          >Exportar PAGAMENTOS de cada compra para Excel</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import XlsExport from './xls-export.js'
export default {
  props: {
    compras: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      selected: [],
      obraFilter: null,
      fornecedorFilter: null,
      monthFilter: null,
      completoFilter: null,
      desktopHeaders: [
        { text: 'Descrição', value: 'descricao' },
        { text: 'Fornecedor', value: 'fornecedor' },
        { text: 'Obra', value: 'obra' },
        { text: 'Valor pago', value: 'valor' },
        { text: 'Data pagamento', value: 'date', align: 'end' },
        // { text: 'Completo', value: 'completo', width: 30, align: 'end' },
        {
          text: 'Editar',
          value: 'actions',
          sortable: false,
          align: 'end',
          width: 30,
        },
      ],
    }
  },
  computed: {
    filtered() {
      let fornecedorFiltered = this.pagamentos
      if (this.fornecedorFilter != null) {
        fornecedorFiltered = this.pagamentos.filter(
          (d) => d.fornecedor.nome === this.fornecedorFilter
        )
      }
      let obraFiltered = fornecedorFiltered
      if (this.obraFilter != null) {
        obraFiltered = fornecedorFiltered.filter(
          (d) => d.obra.nome === this.obraFilter
        )
      }
      // let monthFiltered = obraFiltered
      // if (this.monthFilter != null) {
      //   monthFiltered = obraFiltered.filter(
      //     (d) => this.getMonthYear(d.createdAt.seconds) === this.monthFilter
      //   )
      // }
      // let completoFiltered = monthFiltered
      // if (this.completoFilter != null) {
      //   completoFiltered = monthFiltered.filter(
      //     (d) => d.completo === this.completoFilter
      //   )
      // }

      return obraFiltered
    },
    pagamentos() {
      const pagamentos = []

      this.compras.forEach((compra, d) => {
        compra.pagamentos.forEach((pagamento, i) => {
          const item = {}
          item.compraId = compra?.id
          item.descricao = compra.descricao
          item.obs = pagamento?.obs || ''
          item.obra = compra.obra?.nome
          item.obraId = compra.obra?.id
          item.descricao = compra.descricao || ''
          item.fornecedor = compra.fornecedor?.nome
          item.cnpj = compra.fornecedor?.cnpj || ''
          item.valor = pagamento?.valor
          item.key = d + '_' + i
          item.date = DateTime.fromISO(pagamento?.date)
          item.pagador = pagamento.conta?.nome
          item.pagadorId = pagamento.conta?.id
          item.metodo = pagamento?.metodo
          pagamentos.push(item)
        })
      })

      return pagamentos
    },
    comprasObras() {
      const obras = new Set()

      this.compras.forEach((compra) => {
        obras.add(compra.obra.nome)
      })

      return Array.from(obras)
    },
    comprasFornecedores() {
      const fornecedores = new Set()

      this.compras.forEach((compra) => {
        fornecedores.add(compra.fornecedor.nome)
      })

      return Array.from(fornecedores)
    },
    // comprasMeses() {
    //   const meses = new Set()

    //   this.compras.forEach((compra) => {
    //     meses.add(this.getMonthYear(compra.createdAt.seconds))
    //   })

    //   return Array.from(meses)
    // },
  },

  methods: {
    // getMonthYear(seconds) {
    //   const month = new Date(seconds * 1000).getMonth() + 1
    //   const year = new Date(seconds * 1000).getFullYear()
    //   return month + '/' + year
    // },
    editItem(item) {
      this.$router.push({
        path: `/compras/${item.compraId}`,
      })
    },
    whatsapp(item) {
      window.open(`https://wa.me/55${item.telefone}`)
    },
    email(item) {
      window.location.href = `mailto:${item.email}`
    },
    addItem() {
      this.$router.push({
        path: `${this.path}/add`,
      })
    },
    getPagamentos() {
      const array = []
      this.selected.forEach((compra) => {
        let item = {}
        compra.pagamentos.forEach((pagamento) => {
          item = {
            data: pagamento.date,
            descricao: compra.descricao,
            pagamento: pagamento.valor,
            obra: compra.obra.nome,
            etapa: compra.etapa.nome,
            subetapa: compra.subetapa,
            link: pagamento.dbURL,
            id: compra.id,
          }
          array.push(item)
        })
      })
      return array
    },
    exportCSV() {
      const xls = new XlsExport(this.getPagamentos(), 'Compras selecionadas')
      xls.exportToXLS('export.xls')
    },
  },
}
</script>
