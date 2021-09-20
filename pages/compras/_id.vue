<template>
  <div>
    <Titulo
      titulo="Editar compra"
      :subtitulo="`Id: ${id}`"
      texto_link="Voltar para compras"
      link="/compras"
    />

    <div v-if="compra">
      <ComprasFormOnly4
        :id="id"
        :form="compra"
        :obras="obras"
        :fornecedores="fornecedores"
        :contas="contas"
        :etapas="etapas"
        :is-edit="true"
      />

      <DadosExtras :form="compra" />
    </div>

    <div v-else>
      <h3>Documento não encontrado</h3>
    </div>
  </div>
</template>
<script>
const db = 'compras'
export default {
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ params, app }) {
    const id = params.id
    let compra
    const docRef = app.$fire.firestore.collection(db).doc(id)

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          compra = doc.data()
        } else {
          app.$notifier.showMessage({
            content: 'Documento não existe',
            color: 'error',
            top: false,
          })
        }
      })
      .catch((error) => {
        app.$notifier.showMessage({
          content: error,
          color: 'error',
          top: false,
        })
      })

    const obras = []
    await app.$fire.firestore
      .collection('obras')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          obras.push({ id: doc.id, ...doc.data() })
        })
      })
    const fornecedores = []
    await app.$fire.firestore
      .collection('fornecedores')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          fornecedores.push({ id: doc.id, ...doc.data() })
        })
      })
    const contas = []
    await app.$fire.firestore
      .collection('contas')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          contas.push({ id: doc.id, ...doc.data() })
        })
      })

    const etapas = [
      {
        nome: 'PROJETOS',
        subetapas: [
          'ARQUITETÔNICO',
          'ESTRUTURAL',
          'EXECUTIVO',
          'HIDROSSANITÁRIO',
          'ELÉTRICO',
          'TELEFONIA, TV, INTERNET',
          'LUMINOTÉCNICO',
          'PAISAGÍSTICO',
          'DECORATIVO',
          'VIABILIDADE',
        ],
      },
      {
        nome: 'SERVIÇOS PRELIMINARES',
        subetapas: [
          'SONDAGEM',
          'TERRAPLANAGEM',
          'DEPÓSITO',
          'TAPUME',
          'INSTALAÇÃO ÁGUA',
          'INSTALAÇÃO DE ENERGIA',
          'DEMOLIÇÕES',
        ],
      },
      {
        nome: 'ESRTRUTURA',
        subetapas: ['FUNDAÇÕES', 'PILARES', 'VIGAS', 'LAJES', 'ESCADAS'],
      },
      {
        nome: 'PAREDES',
        subetapas: [
          'PAREDES',
          'DRYWALL',
          'VERGAS E CONTRAVERGAS',
          'TORRE CAIXA DAGUA',
        ],
      },
      {
        nome: 'HIDROSSANITÁRIO',
        subetapas: ['ÁGUA QUENTE', 'ÁGUA FRIA', 'ÁGUA PLUVIAL', 'ESGOTO'],
      },
      {
        nome: 'ELÉTRICO',
        subetapas: ['CONDUÍTES', 'CAIXAS', 'FIAÇÃO', 'ATERRAMENTO'],
      },
      {
        nome: 'COMPLEMENTARES',
        subetapas: ['TELEFONIA', 'TV', 'SEGURANÇA', 'GÁS', 'AR CONDICIONADO'],
      },
      {
        nome: 'COBERTURAS',
        subetapas: ['TELHADO', 'IMPERMEABILIZAÇÃO', 'REGULARIZAÇÃO'],
      },
      {
        nome: 'ACABAMENTOS',
        subetapas: [
          'FORROS',
          'JANELAS',
          'PORTAS',
          'PISOS',
          'SOLEIRAS',
          'PEITORIS',
          'RODAPÉS',
          'REVESTIMENTOS',
          'LOUÇAS E METAIS',
          'PINTURAS',
        ],
      },
      {
        nome: 'PAISAGISMO',
      },
      {
        nome: 'DECORAÇÃO',
      },
      {
        nome: 'ENTREGA',
      },
    ]

    return { id, compra, obras, fornecedores, etapas, contas }
  },

  data() {
    return {
      loading: false,
      item: {},
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  methods: {},
}
</script>
