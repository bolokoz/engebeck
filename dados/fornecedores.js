let propriedades = [
    {
        text: 'Nome.',
        align: 'start',
        value: 'nome',
    },
    { text: 'Tipo', value: 'tipo' },
    { text: 'Vendedor', value: 'vendedor' },
    { text: 'CNPJ', value: 'cnpj' },
    { text: 'Email', value: 'email' },
    { text: 'Telefone', value: 'telefone' },
    { text: 'Cidade', value: 'cidade' },
    { text: 'Observações', value: 'obs' },
    { text: 'pagamento', value: 'pagamento' },
    { text: 'Banco', value: 'banco' },
    { text: 'agencia', value: 'agencia' },
    { text: 'conta', value: 'conta' },
]

export let desktopTableHeaders = [
    {
        text: 'Nome.',
        align: 'start',
        value: 'nome',
    },
    { text: 'Tipo', value: 'tipo' },
    { text: 'Vendedor', value: 'vendedor' },
    { text: 'Telefone', value: 'telefone' },
    { text: 'Pagamento', value: 'pagamento' },
    { text: 'Actions', value: 'actions', sortable: false },
]

export let mobileTableHeaders = [
    'Nome',
    'Tipo',
    'Telefone'
]
export let mobileTableItems = [
    'nome',
    'tipo',
    'telefone'
]

let exemploForm = {
    nome: 'Bigolin',
    tipo: 'Loja material hidraulico',
    vendedor: 'Josiane',
    cnpj: '123123123000112',
    email: 'josi@bigolin.com.br',
    telefone: '67912838231',
    cidade: 'Campo Grande - MS',
    obs: 'Não funciona aos sábados',
    nomeBanco: 'Suzana bazan',
    forma: 'TED',
    banco: 'Banco do Brasil',
    agencia: '123',
    conta: '12345',
    pix: '',
}
export let emptyForm = {
    nome: '',
    tipo: '',
    vendedor: '',
    cnpj: '',
    email: '',
    telefone: '',
    cidade: '',
    obs: '',
    forma: '',
    nomeBanco: '',
    banco: '',
    agencia: '',
    conta: '',
    pix: '',
}

let tipos = [
    'Loja material construção',
    'Loja material hidraulica',
    'Loja material elétrica',
    'Loja depósito',
    'Loja distribuidora areia',
    'Distribuidora areia',
    'Distribuidora brita',
    'Fornecedor caçambas',
]

export { exemploForm, propriedades, tipos }