<template>
  <div>
    <Titulo
      titulo="Adicionar compra"
      texto_link="Voltar para compras"
      link="/compras"
    />

    <ComprasFormOnly4
      :obras="obras"
      :fornecedores="fornecedores"
      :contas="contas"
      :etapas="etapas"
      :is-edit="false"
    />
  </div>
</template>
<script>
export default {
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ app }) {
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

    return { obras, fornecedores, etapas, contas }
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {},

  methods: {},
}
</script>
