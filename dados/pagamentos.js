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
    compra_id: '',
    conta_id: '',
    valor: '',
    pagador: '',
    forma: '',
    parcelas: '',

}
export let emptyForm = {
    compra_id: '',
    conta_id: '',
    valor: '',
    pagador: '',
    forma: '',
    parcelas: '',
}

export let formas = [
    'TED',
    'DOC',
    'PIX',
    'Boleto',
    'Cartão',
    'Cheque',
]