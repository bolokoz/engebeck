export let desktopTableHeaders = [
    {
        text: 'Nome.',
        align: 'start',
        value: 'nome',
    },
    { text: 'Tipo', value: 'tipo' },
    { text: 'proprietario', value: 'proprietario' },
    { text: 'Actions', value: 'actions', sortable: false },
]

export let mobileTableHeaders = [
    'Nome',
    'Proprietario',
    'Tipo'
]
export let mobileTableItems = [
    'nome',
    'proprietario',
    'tipo'
]

export let exemploForm = {
    nome: 'MRB',
    ano: '2020',
    tipo: 'Uniresidencial',
    proprietario: 'Mrb',
    engenheiro: 'Eng. joo',
    arquiteto: 'Arq. Joao',
    endereco: 'Rua 12345',
    m2: '312',
}
export let emptyForm = {
    nome: '',
    ano: '',
    tipo: '',
    proprietario: '',
    engenheiro: '',
    arquiteto: '',
    endereco: '',
    m2: '',
}

export let tipos = [
    'Uniresidencial',
    'Multiresidencial',
    'Comercial',
    'Mista',
]

export let etapas = ['Serviços iniciais', 'Fundação', 'Estrutura', 'Paredes e fechamentos', 'Coberturas', 'Esquadrias', 'Eletrica', 'Hidraulica', 'Loucas e metais', 'Forros', 'Revestimentos', 'Pisos', 'Pinturas', 'Entrega']