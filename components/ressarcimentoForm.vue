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
        <v-btn @click="generatePDF">Gerar PDF</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import jsPDFInvoiceTemplate from 'jspdf-invoice-template'
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
    }
  },
  head() {
    return {
      script: [
        {
          src: 'https://unpkg.com/jspdf-invoice-template@latest/dist/index.js',
        },
      ],
    }
  },

  computed: {
    items() {
      return this.pagamentos.filter(
        (e) =>
          e.obraId === this.obra &&
          e.date > new Date(this.dates[0]) &&
          e.date < new Date(this.dates[1]) &&
          e.pagador === this.recebedor.nome
      )
    },
    pagamentos() {
      const pagamentos = []
      this.compras.forEach((compra) => {
        compra.pagamentos.forEach((pagamento) => {
          const item = {}
          item.obra = compra.obra.nome
          item.obraId = compra.obra.id
          item.descricao = compra.descricao
          item.fornecedor = compra.fornecedor.nome
          item.valor = pagamento.valor
          item.key = pagamento.valor + '_' + pagamento.date
          item.date = new Date(pagamento.date)
          item.pagador = pagamento.conta.nome
          item.pagadorId = pagamento.conta.id
          item.metodo = pagamento.metodo
          pagamentos.push(item)
        })
      })
      return pagamentos
    },
    total() {
      return 130
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
          name: 'EngeBeck',
          address: 'Rua Conselheiro Furtado, 123',
          phone: '(67) 999767835 ',
          email: 'yuri@engebeck.com.br',
          website: 'www.engebeck.com.br',
        },
        contact: {
          label: 'Relatório destinado à:',
          name: 'MRB Investimentos LTDA',
          address: 'Av. Afonso Pena, 2131, sala 2203',
          phone: '(67) 981238383',
          email: 'mrbinvestagroind@gmail.com',
        },
        invoice: {
          label: 'Relatório de ressarcimento ' + this.obra.nome,
          num: 19,
          invDate: this.dates[0],
          invGenDate: 'Invoice Date: 02/02/2021 10:17',
          headerBorder: false,
          tableBodyBorder: false,
          header: ['#', 'Descrição', 'Fornecedor', 'Data', 'Valor'],
          table: this.selected.map((d, i) => [
            i + 1,
            d.descricao,
            d.fornecedor,
            d.date,
            d.valor,
          ]),
          invTotalLabel: 'SubTotal:',
          invTotal: '100.000,00',
          invCurrency: 'R$',
          row1: {
            col1: 'Administração:',
            col2: '10',
            col3: '%',
            style: {
              fontSize: 10, // optional, default 12
            },
          },
          row2: {
            col1: 'Total:',
            col2: '116,199.90',
            col3: 'R$',
            style: {
              fontSize: 14, // optional, default 12
            },
          },
          invDescLabel: '',
          invDesc:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
        },
        footer: {
          text: '--',
        },
        pageEnable: true,
        pageLabel: 'Relatório',
      }

      jsPDFInvoiceTemplate.default(pdfConfig)
      //   const doc = new jsPDF()

      //   doc.text('Hello world!', 10, 10)
      //   doc.save('a4.pdf')
    },
  },
}
</script>
