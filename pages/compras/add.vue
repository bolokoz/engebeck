<template>
  <div>
    <Titulo
      titulo="Adicionar compra"
      texto_link="Voltar para compras"
      link="/compras"
    />

    <ComprasFormOnly3
      :obras="obras"
      :fornecedores="fornecedores"
      :contas="contas"
      :etapas="etapas"
      :isEdit="false"
    />
  </div>
</template>
<script>
export default {
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ app }) {
    let obras = []
    await app.$fire.firestore
      .collection('obras')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          obras.push({ id: doc.id, ...doc.data() })
        })
      })
    let fornecedores = []
    await app.$fire.firestore
      .collection('fornecedores')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          fornecedores.push({ id: doc.id, ...doc.data() })
        })
      })
    let contas = []
    await app.$fire.firestore
      .collection('contas')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          contas.push({ id: doc.id, ...doc.data() })
        })
      })

    let etapas = [
      {
        etapa: 'PROJETOS',
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
        etapa: 'SERVIÇOS PRELIMINARES',
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
        etapa: 'ESRTRUTURA',
        subetapas: ['FUNDAÇÕES', 'PILARES', 'VIGAS', 'LAJES', 'ESCADAS'],
      },
      {
        etapa: 'PAREDES',
        subetapas: [
          'PAREDES',
          'DRYWALL',
          'VERGAS E CONTRAVERGAS',
          'TORRE CAIXA DAGUA',
        ],
      },
      {
        etapa: 'HIDROSSANITÁRIO',
        subetapas: ['ÁGUA QUENTE', 'ÁGUA FRIA', 'ÁGUA PLUVIAL', 'ESGOTO'],
      },
      {
        etapa: 'ELÉTRICO',
        subetapas: ['CONDUÍTES', 'CAIXAS', 'FIAÇÃO', 'ATERRAMENTO'],
      },
      {
        etapa: 'COMPLEMENTARES',
        subetapas: ['TELEFONIA', 'TV', 'SEGURANÇA', 'GÁS', 'AR CONDICIONADO'],
      },
      {
        etapa: 'COBERTURAS',
        subetapas: ['TELHADO', 'IMPERMEABILIZAÇÃO', 'REGULARIZAÇÃO'],
      },
      {
        etapa: 'ACABAMENTOS',
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
        etapa: 'PAISAGISMO',
      },
      {
        etapa: 'DECORAÇÃO',
      },
      {
        etapa: 'ENTREGA',
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
