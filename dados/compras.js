export let desktopTableHeaders = [
    {
        text: 'Nome.',
        align: 'start',
        value: 'nome',
    },
    { text: 'Tipo', value: 'tipo' },
    { text: 'pagador', value: 'pagador' },
    { text: 'Actions', value: 'actions', sortable: false },
]

export let mobileTableHeaders = [
    'Nome',
    'Proprietario',
    'Tipo'
]
export let mobileTableItems = [
    'nome',
    'pagador',
    'tipo'
]

export let exemploForm = {
    nome: 'MRB',
    tipo: 'Uniresidencial',
    pagador: 'Mrb',
    fornecedor: 'Eng. joo',
    dataPagamento: '',
    obra: 'Rua 12345',
    comprador: '312',
    nota: '',
    pedido: '',
    etapa: '',
    subetapa: '',
    compra_id: '',
    conta_id: '',
    valor: '',
    pagador: '',
    forma: '',
    parcelas: '',

}
export let emptyForm = {
    nome: '',
    tipo: '',
    fornecedor_id: '',
    dataCompra: '',
    obra_id: '',
    comprador: '',
    nota: '',
    pedido: '',
    etapa: '',
    subetapa: '',
    compra_id: '',
    conta_id: '',
    valor: '',
    pagador: '',
    forma: '',
    parcelas: '',
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