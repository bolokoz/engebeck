/* eslint-disable vue/valid-v-slot */ /* eslint-disable vue/valid-v-slot */
<template>
  <v-form ref="form">
    <!-- <h3 class="my-3 font-weight-bold">Escolha as datas</h3> -->
    <!-- <h4 class="my-3 font-weight-bold">De {{ dates[0] }} até {{ dates[1] }}</h4> -->
    <v-row justify="center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-date-picker
          v-model="localForm.dates"
          :disabled="isEdit"
          range
          locale="pt-BR"
        ></v-date-picker>
      </v-col>

      <v-col cols="12" sm="6" md="6" lg="6">
        <v-select
          v-model="localForm.obra"
          :items="obras"
          label="Obra"
          dense
          :disabled="isEdit"
          return-object
          item-text="nome"
          item-value="id"
          outlined
        ></v-select>

        <v-select
          v-model="localForm.recebedor"
          :items="contas"
          label="Conta recebedora"
          item-text="nome"
          :disabled="isEdit"
          return-object
          dense
          outlined
        ></v-select>
        <v-select
          v-model="localForm.devedor"
          :items="contas"
          label="Conta devedora"
          item-text="nome"
          :disabled="isEdit"
          return-object
          dense
          outlined
        ></v-select>
        <v-text-field
          v-model.number="localForm.taxa"
          label="Taxa de serviço"
          suffix="%"
          :disabled="isEdit"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-data-table
          v-model="localForm.selected"
          :headers="desktopHeaders"
          :items="items"
          item-key="key"
          sort-by="date"
          :show-select="!isEdit"
          sort-desc
          no-results-text="Nada encontrado"
          no-data-text="Banco de dados vazio"
          loading-text="Carregando dados..."
        >
          <template #item.date="{ item }">
            {{
              new Date(item.date.seconds * 1000)
                .toLocaleString('pt-BR')
                .split(' ')[0]
            }}
          </template>
          <template #item.valor="{ item }"> R$ {{ item.valor }} </template>
          <template #item.pagador="{ item }">
            {{ item.pagador }}
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
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider></v-divider>

        <h3>Dados que irão para o Relatório</h3>

        <p>Tipo de relatório:<b> Ressarcimento</b></p>
        <p>
          Obra:<b> {{ localForm.obra.nome }}</b>
        </p>
        <p>
          Período:<b>
            Início
            {{ localForm.dates[0] | localDate }} até {{ datesBR[1] }}</b
          >
        </p>
        <p>
          Conta a receber<b> {{ localForm.recebedor.nome }}</b>
        </p>
        <p>
          Conta devedora <b>{{ localForm.devedor.nome }}</b>
        </p>
        <p>
          Quantidade de itens <b>{{ localForm.selected.length }}</b>
        </p>
        <p>
          Valor subtotal: <b>R$ {{ valorSemTaxa }}</b>
        </p>
        <p>
          Taxa do servico: <b>{{ localForm.taxa }} %</b>
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
        <!-- <v-btn @click="adicionar">Salvar no banco</v-btn> -->
        <BotoesForm
          :is-edit="isEdit"
          :loading="loading"
          :immutable="true"
          @adicionar="adicionar"
          @alterar="alterar"
          @deletar="deletar"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { relatorioRessarcimento } from './ressarcimento.js'
export default {
  filters: {
    localDate(ISOString) {
      console.log(ISOString)
      const date = new Date(ISOString)
      console.log(date)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let dt = date.getDate()
      if (dt < 10) {
        dt = '0' + dt
      }
      if (month < 10) {
        month = '0' + month
      }
      return dt + '/' + month + '/' + year
    },
  },
  props: {
    isEdit: {
      default: false,
      type: Boolean,
    },
    id: {
      default: '',
      type: String,
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
    form: {
      type: Object,
      default: () => ({
        selected: [],
        dates: [
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
        ],
        devedor: {},
        recebedor: {},
        obra: {},
        taxa: 0,
      }),
    },
  },
  data() {
    return {
      loading: false,

      desktopHeaders: [
        { text: 'Descrição', value: 'descricao' },
        { text: 'Obs', value: 'obs' },
        { text: 'Fornecedor', value: 'fornecedor' },
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
      localForm: {
        selected: [],
        dates: [
          new Date(Date.now()).toISOString().substr(0, 10),
          new Date(Date.now() + 1).toISOString().substr(0, 10),
        ],
        devedor: {},
        recebedor: {},
        obra: {},
        taxa: 0,
      },
    }
  },

  computed: {
    items() {
      if (!this.isEdit) {
        return this.pagamentos.filter(
          (e) =>
            e.obraId === this.localForm.obra.id &&
            e.date >= new Date(this.localForm.dates[0]) &&
            e.date <= new Date(this.localForm.dates[1]) &&
            e.pagadorId === this.localForm.recebedor.id
        )
      } else {
        return this.form.selected
      }
    },
    pagamentos() {
      const pagamentos = []
      if (!this.isEdit) {
        this.compras.forEach((compra, d) => {
          compra.pagamentos.forEach((pagamento, i) => {
            const item = {}
            item.compraId = compra.id
            item.descricao = compra.descricao
            item.obs = pagamento?.obs || ''
            item.obra = compra.obra.nome
            item.obraId = compra.obra.id
            item.descricao = compra.descricao
            item.fornecedor = compra.fornecedor.nome
            item.cnpj = compra.fornecedor?.cnpj || ''
            item.valor = pagamento.valor
            item.key = d + '_' + i
            item.date = new Date(pagamento.date)
            item.pagador = pagamento.conta.nome
            item.pagadorId = pagamento.conta.id
            item.metodo = pagamento.metodo
            pagamentos.push(item)
          })
        })
      }
      return pagamentos
    },
    valorSemTaxa() {
      const total = this.localForm.selected.reduce(
        (d, i) => d + (i.valor || 0),
        0
      )
      return +total
    },
    valorTaxa() {
      const taxa = (this.valorSemTaxa * this.localForm.taxa) / 100
      return +taxa.toFixed(2)
    },
    valorTotal() {
      return +this.valorSemTaxa + +this.valorTaxa
    },
    datesBR() {
      const datesBR = [
        new Date(this.localForm.dates[0]).toLocaleString('pt-BR').split(' ')[0],
        new Date(this.localForm.dates[1]).toLocaleString('pt-BR').split(' ')[0],
      ]
      return datesBR
    },

    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  mounted() {
    if (this.isEdit) {
      this.localForm = this.form
    }
  },

  methods: {
    generatePDF() {
      const pdfConfig = {
        outputType: 'save',
        returnJsPDFDocObject: true,
        fileName: 'Ressarcimento ' + this.localForm.recebedor.nome,
        orientationLandscape: false,
        logo: {
          src: '../../logo_transparent.png',
          width: 53.33, // aspect ratio = width/height
          height: 26.66,
          margin: {
            top: 0, // negative or positive num, from the current position
            left: 0, // negative or positive num, from the current position
          },
        },
        business: {
          name: this.localForm.recebedor.nome,
          address: this.localForm.recebedor.endereco,
          phone: this.localForm.recebedor.telefone,
          email: this.localForm.recebedor.email,
          website: this.localForm.recebedor.site,
        },
        contact: {
          label: 'Relatório destinado à:',
          name: this.localForm.devedor.nome,
          address: this.localForm.devedor.endereco,
          phone: this.localForm.devedor.telefone,
          email: this.localForm.devedor.email,
          // phone: '',
        },
        invoice: {
          label: 'Ressarcimento Obra: ',
          num: this.localForm.obra.nome,
          invDate: `${this.datesBR[0]} até ${this.datesBR[1]}`,
          invGenDate:
            'Relatório gerado em: ' +
            new Date().toLocaleString('pt-BR').split(' ')[0],
          headerBorder: false,
          tableBodyBorder: false,
          header: ['#', 'Descrição', 'Fornecedor', 'Data', 'Valor'],
          table: this.localForm.selected.map((d, i) => [
            i + 1,
            d.descricao,
            d.fornecedor,
            d.date.toLocaleString('pt-BR').split(' ')[0],
            d.valor,
          ]),
          assinante1: this.localForm.devedor.representante,
          assinante2: this.localForm.recebedor.representante,
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
            this.localForm.recebedor.nome +
            ', empresa inscrita no CNPJ nº ' +
            this.localForm.recebedor.cnpj +
            ', representado legalmente por ' +
            this.localForm.recebedor.representante +
            ', declara que RECEBEU na data de ' +
            new Date().toLocaleString('pt-BR').split(' ')[0] +
            ', o valor de R$ ' +
            this.valorTotal +
            ' por meio de transferência bancária de ' +
            this.localForm.devedor.nome +
            ', inscrita no CNPJ nº ' +
            this.localForm.devedor.cnpj +
            ', referente ao ressarcimento de despesas de pequenos valores do período ' +
            this.datesBR[0] +
            ' até ' +
            this.datesBR[1] +
            ', pagas diretamente pela ' +
            this.localForm.recebedor.nome +
            ' na obra ' +
            this.localForm.obra.nome,
        },
        footer: {
          text: 'Relatório Ressarcimento - EngeBeck 2021',
        },
        pageEnable: true,
        pageLabel: 'Pág.',
      }

      relatorioRessarcimento(pdfConfig)
    },
    editItem(item) {
      console.log(item)
      this.$router.push({ path: '/compras/' + item.compraId })
    },
    async adicionar() {
      this.loading = true

      // adicionar metadados
      const item = {
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
        recebedor: this.localForm.recebedor,
        devedor: this.localForm.devedor,
        taxa: this.localForm.taxa,
        obra: this.localForm.obra,
        valorTotal: this.valorTotal,
        selected: this.localForm.selected,
        tipo: 'ressarcimento',
        dates: this.localForm.dates,
      }
      console.log(item)
      // adicionar no db
      await this.$fire.firestore
        .collection('relatorios')
        .add(item)
        .then((docRef) => {
          console.log('Documento written ID: ', docRef.id)

          this.$notifier.showMessage({
            content: 'Adicionado',
            color: 'success',
            top: false,
          })
        })
        .catch((error) => {
          console.log(error)
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
          this.$router.push({
            path: '/relatorios/ressarcimento',
          })
        })
    },
    alterar() {},
    async deletar() {
      this.loading = true
      await this.$fire.firestore
        .collection('relatorios')
        .doc(this.id)
        .delete()
        .then(() => {
          this.$notifier.showMessage({
            content: 'Item apagado',
            color: 'warning',
            top: false,
          })
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
          this.$router.push('/relatorios/ressarcimento')
        })
    },
  },
}
</script>
