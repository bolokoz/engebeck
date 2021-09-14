export let desktopTableHeaders = [
    {
        text: 'Nome.',
        align: 'start',
        value: 'nome',
    },
    { text: 'Tipo', value: 'tipo' },
    { text: 'cnpj', value: 'cnpj' },
    { text: 'Obs', value: 'obs' },
    { text: 'Actions', value: 'actions', sortable: false },
]

export let mobileTableHeaders = [
    'Nome',
    'Tipo',
    'Banco'
]
export let mobileTableItems = [
    'nome',
    'tipo',
    'banco'
]

export let exemploForm = {
    nome: 'MRB',
    banco: 'Banco do Brasil',
    tipo: 'Conta corrente',
    cnpj: '123123123000112',
    obs: 'Não funciona aos sábados',
    agencia: '123',
    conta: '12345',
    pix: '',
}
export let emptyForm = {
    nome: '',
    banco: '',
    tipo: '',
    cnpj: '',
    obs: '',
    banco: '',
    agencia: '',
    conta: '',
    pix: '',
}

export let tipos = [
    'Conta corrente',
    'Cartão crédito',
    'Cartão débito',
    'Boleto',
]