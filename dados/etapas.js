export let desktopTableHeaders = [
    { text: 'Descrição', value: 'descricao', sortable: false },
    { text: 'fornecedor', value: 'fornecedor' },
    { text: 'Data', value: 'data' },
    { text: 'Actions', value: 'actions', sortable: false },
]

export let mobileTableHeaders = [
    'data',
    'fornecedor',
    'descricao'
]
export let mobileTableItems = [
    'data',
    'fornecedor',
    'descricao'
]

export let exemploForm = {
    nome: 'Residencial',
    etapas: [
        {
            nome: 'Serviços iniciais'
        },
        {
            nome: 'Fundação',
            descricao: 'Estacas, sapatas, baldrames',
            duracao: '',
            custo: '',
            children: [
                {
                    nome: 'Escavação',
                    descricao: '',
                    duracao: '3',
                    custo: ''
                },
                {
                    nome: 'Preenchimento e cura',
                    descricao: '',
                    duracao: '3',
                    custo: ''
                },
                {
                    nome: 'Baldrame',
                    descricao: '',
                    duracao: '3',
                    custo: ''
                },
            ]
        },
        {
            nome: 'Estrutura',
            descricao: '',
            duracao: '',
            custo: '',
        },
        {
            nome: 'Paredes e fechamentos'
        },
        {
            nome: 'Coberturas'
        },
        {
            nome: 'Esquadrias'
        },
        {
            nome: 'Eletrica'
        },
        {
            nome: 'Hidraulica'
        },
        {
            nome: 'Loucas e metais'
        },
        {
            nome: 'Forros'
        },
        {
            nome: 'Revestimentos'
        },
        {
            nome: 'Pisos'
        },
        {
            nome: 'Pinturas'
        },
        {
            nome: 'Entrega'
        },
    ]
}

export let emptyForm = {
    etapas: [],
    nome: ''
}

export let tipos = [
    'Serviço',
    'Material',
    'Outros',
]
export let formas = [
    'TED',
    'DOC',
    'PIX',
    'Boleto',
    'Cartão',
    'Cheque',
]

export let etapas = ['Serviços iniciais', 'Fundação', 'Estrutura', 'Paredes e fechamentos', 'Coberturas', 'Esquadrias', 'Eletrica', 'Hidraulica', 'Loucas e metais', 'Forros', 'Revestimentos', 'Pisos', 'Pinturas', 'Entrega']