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
    descricao: 'Fios para sei la',
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
    banco: '',
    agencia: '',
    conta: '',
    valor: '',
    pagador: '',
    forma: '',
    parcelas: 1,

}
export let emptyForm = {
    descricao: '',
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
    banco: '',
    agencia: '',
    conta: '',
    valor: '',
    pagador: '',
    forma: '',
    parcelas: [],
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