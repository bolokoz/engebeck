/* eslint-disable vue/valid-v-slot */
<template>
  <v-form ref="form">
    <!-- <h3 class="my-3 font-weight-bold">Escolha as datas</h3> -->
    <!-- <h4 class="my-3 font-weight-bold">De {{ dates[0] }} até {{ dates[1] }}</h4> -->
    <v-row justify="center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-date-picker v-model="dates" range locale="pt-BR"></v-date-picker>
      </v-col>

      <v-col cols="12" sm="6" md="6" lg="6">
        <v-select
          v-model="obra"
          :items="obras"
          label="Obra"
          dense
          return-object
          item-text="nome"
          item-value="id"
          outlined
        ></v-select>

        <v-select
          v-model="recebedor"
          :items="contas"
          label="Conta recebedora"
          item-text="nome"
          return-object
          dense
          outlined
        ></v-select>
        <v-select
          v-model="devedor"
          :items="contas"
          label="Conta devedora"
          item-text="nome"
          return-object
          dense
          outlined
        ></v-select>
        <v-text-field
          v-model.number="taxa"
          label="Taxa de serviço"
          suffix="%"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-data-table
          v-model="selected"
          :headers="desktopHeaders"
          :items="items"
          item-key="key"
          sort-by="date"
          show-select
          sort-desc
          no-results-text="Nada encontrado"
          no-data-text="Banco de dados vazio"
          loading-text="Carregando dados..."
        >
          <template #item.date="{ item }">
            {{ new Date(item.date).toLocaleString('pt-BR').split(' ')[0] }}
          </template>
          <template #item.valor="{ item }"> R$ {{ item.valor }} </template>
          <template #item.pagador="{ item }"> {{ item.pagador }} </template>
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
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider></v-divider>

        <h3>Dados que irão para o Relatório</h3>

        <p>Tipo de relatório:<b> Ressarcimento</b></p>
        <p>
          Obra:<b> {{ obra.nome }}</b>
        </p>
        <p>
          Período:<b> Início {{ datesBR[0] }} até {{ datesBR[1] }}</b>
        </p>
        <p>
          Conta a receber<b> {{ recebedor.nome }}</b>
        </p>
        <p>
          Conta devedora <b>{{ devedor.nome }}</b>
        </p>
        <p>
          Quantidade de itens <b>{{ selected.length }}</b>
        </p>
        <p>
          Valor subtotal: <b>R$ {{ valorSemTaxa }}</b>
        </p>
        <p>
          Taxa do servico: <b>{{ taxa }} %</b>
        </p>
        <p>
          Valor do serviço<b> R$ {{ valorTaxa }}</b>
        </p>
        <p>
          Valor total: <b>R$ {{ valorTotal }}</b>
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="generatePDF">Gerar PDF</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { relatorioRessarcimento } from './ressarcimento.js'
export default {
  props: {
    isEdit: {
      default: false,
      type: Boolean,
    },
    obras: {
      type: Array,
      default: () => [],
    },
    contas: {
      type: Array,
      default: () => [],
    },
    compras: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      selected: [],
      dates: [
        new Date(Date.now()).toISOString().substr(0, 10),
        new Date(Date.now() + 1).toISOString().substr(0, 10),
      ],
      desktopHeaders: [
        { text: 'Obra', value: 'obra' },
        { text: 'Valor', value: 'valor' },
        { text: 'Pagador', value: 'pagador' },
        { text: 'Data ', value: 'date', align: 'end' },
        {
          text: 'Editar',
          value: 'actions',
          sortable: false,
          align: 'end',
          width: 30,
        },
      ],
      mobileHeaders: [
        { text: 'Obra', value: 'obra' },
        { text: 'Data', value: 'date' },
        { text: 'Editar', value: 'actions', sortable: false, align: 'end' },
      ],
      devedor: {},
      recebedor: {},
      obra: {},
      taxa: 0,
    }
  },
  // head() {
  //   return {
  //     script: [
  //       {
  //         src: 'https://unpkg.com/jspdf-invoice-template@latest/dist/index.js',
  //       },
  //     ],
  //   }
  // },

  computed: {
    items() {
      return this.pagamentos.filter(
        (e) =>
          e.obraId === this.obra.id &&
          e.date >= new Date(this.dates[0]) &&
          e.date <= new Date(this.dates[1]) &&
          e.pagador === this.recebedor.nome
      )
    },
    pagamentos() {
      const pagamentos = []
      this.compras.forEach((compra, d) => {
        compra.pagamentos.forEach((pagamento, i) => {
          const item = {}
          item.obra = compra.obra.nome
          item.obraId = compra.obra.id
          item.descricao = compra.descricao
          item.fornecedor = compra.fornecedor.nome
          item.valor = pagamento.valor
          item.key = d + '_' + i
          item.date = new Date(pagamento.date)

          item.pagador = pagamento.conta.nome
          item.pagadorId = pagamento.conta.id
          item.metodo = pagamento.metodo
          pagamentos.push(item)
        })
      })
      return pagamentos
    },
    valorSemTaxa() {
      const total = this.selected.reduce((d, i) => d + (i.valor || 0), 0)
      return +total
    },
    valorTaxa() {
      const taxa = (this.valorSemTaxa * this.taxa) / 100
      return +taxa.toFixed(2)
    },
    valorTotal() {
      return +this.valorSemTaxa + +this.valorTaxa
    },
    datesBR() {
      const datesBR = [
        new Date(this.dates[0]).toLocaleString('pt-BR').split(' ')[0],
        new Date(this.dates[1]).toLocaleString('pt-BR').split(' ')[0],
      ]
      return datesBR
    },
  },

  methods: {
    generatePDF() {
      const pdfConfig = {
        outputType: 'save',
        returnJsPDFDocObject: true,
        fileName: 'Ressarcimento ' + this.recebedor.nome,
        orientationLandscape: false,
        logo: {
          src: 'https://raw.githubusercontent.com/bolokoz/engebeck/main/assets/logo_transparent.png',
          width: 53.33, // aspect ratio = width/height
          height: 26.66,
          margin: {
            top: 0, // negative or positive num, from the current position
            left: 0, // negative or positive num, from the current position
          },
        },
        business: {
          name: this.recebedor.nome,
          address: this.recebedor.endereco,
          phone: this.recebedor.telefone,
          email: this.recebedor.email,
          website: this.recebedor.site,
        },
        contact: {
          label: 'Relatório destinado à:',
          name: this.devedor.nome,
          address: this.devedor.endereco,
          phone: this.devedor.telefone,
          email: this.devedor.email,
          // phone: '',
        },
        invoice: {
          label: 'Ressarcimento Obra: ',
          num: this.obra.nome,
          invDate: `${this.datesBR[0]} até ${this.datesBR[1]}`,
          invGenDate:
            'Relatório gerado em: ' +
            new Date().toLocaleString('pt-BR').split(' ')[0],
          headerBorder: false,
          tableBodyBorder: false,
          header: ['#', 'Descrição', 'Fornecedor', 'Data', 'Valor'],
          table: this.selected.map((d, i) => [
            i + 1,
            d.descricao,
            d.fornecedor,
            d.date.toLocaleString('pt-BR').split(' ')[0],
            d.valor,
          ]),
          assinante1: 'Assinatne 1',
          assinante2: 'Yuri Vinícius Furusho Becker',
          // invTotalLabel: 'SubTotal:',
          // invTotal: this.valorTotal,
          // invCurrency: 'R$',
          // row1: {
          //   col1: 'col1',
          //   col2: ' col2 row 1',
          //   col3: 'col 3 row 1',
          //   style: {
          //     fontSize: 10, // optional, default 12
          //   },
          // },
          row2: {
            col1: 'Total:',
            col2:
              'R$ ' +
              this.valorTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              }),
            // col3: 'R$',
            style: {
              fontSize: 14, // optional, default 12
            },
          },
          invDesc:
            'Pelo presente,' +
            this.recebedor.nome +
            ', empresa inscrita no CNPJ nº ' +
            this.recebedor.cnpj +
            ', representado legalmente por ' +
            this.recebedor.representante +
            ', inscrito no CPF ' +
            this.recebedor.cpf +
            ', declara que RECEBEU na data de ' +
            new Date().toLocaleString('pt-BR').split(' ')[0] +
            ', o valor de R$ ' +
            this.valorTotal +
            ' por meio de transferência bancária de ' +
            this.devedor.nome +
            ', inscrita no CNPJ nº ' +
            this.devedor.cnpj +
            ', referente ao ressarcimento de despesas de pequenos valores do período ' +
            this.datesBR[0] +
            ' até ' +
            this.datesBR[1] +
            ', pagas diretamente pela ' +
            this.recebedor.nome +
            ' na obra ' +
            this.obra.nome,
        },
        footer: {
          text: 'Relatório Ressarcimento - EngeBeck 2021',
        },
        pageEnable: true,
        pageLabel: 'Pág.',
      }

      relatorioRessarcimento(pdfConfig)
    },
  },
}
</script>
