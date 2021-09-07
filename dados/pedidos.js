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
    descricao: 'Fios para sei la',
    fornecedor: 'Eng. joo',
    date: '',
    obra: '',
    numero: '',
    etapa: '',
    subetapa: '',
    valor: '',
    forma: '',
    parcelas: 1,
    items: [],
}

export let emptyForm = {
    descricao: '',
    fornecedor: '',
    date: '',
    obra: '',
    numero: '',
    etapa: '',
    subetapa: '',
    valor: '',
    forma: '',
    parcelas: 1,
    items: [],
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