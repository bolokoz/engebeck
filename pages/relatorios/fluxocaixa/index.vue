<template>
  <div>
    <h1 class="font-weight-regular">Fluxo de caixa</h1>
    <v-container class="mx-0 px-0">
      <fluxoCaixaForm :contas="contas" :contabilidades="contabilidades" />
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const contas = []
    await app.$fire.firestore
      .collection('contas')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          contas.push({ id: doc.id, ...doc.data() })
        })
      })

    const contabilidades = []
    await app.$fire.firestore
      .collection('contabilidade')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          if (doc.data().tipo === 'administracao') {
            contabilidades.push({ id: doc.id, ...doc.data() })
          }
        })
      })

    return { contas, contabilidades }
  },
  data() {
    return {
      contabilidades: [],
      loading: false,
      desktopHeaders: [
        { text: 'Data', value: 'data' },
        { text: 'Recebedor', value: 'recebedor.nome' },
        { text: 'Valor', value: 'valorTotal' },
        { text: 'De', value: 'dates[0]', align: 'end' },
        { text: 'Até', value: 'dates[1]', align: 'end' },
        {
          text: 'Visualizar',
          value: 'actions',
          sortable: false,
          align: 'end',
          width: 30,
        },
      ],
      mobileHeaders: [
        { text: 'Obra', value: 'obra' },
        { text: 'Data', value: 'createdAt' },
        { text: 'Editar', value: 'actions', sortable: false, align: 'end' },
      ],
    }
  },
}
</script>
