<template>
  <div>
    <Titulo
      titulo="Adicionar conta"
      texto_link="Voltar "
      link="/financeiro/contas"
    />

    <ContasFormOnly :form="form" />

    <BotoesForm :isEdit="false" @adicionar="adicionar" :loading="loading" />

    <v-divider class="my-5"></v-divider>
  </div>
</template>
<script>
const db = 'contas'

export default {
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ app }) {
    // let obras = []
    // await app.$fire.firestore
    //   .collection('obras')
    //   .get()
    //   .then((snap) => {
    //     snap.forEach((doc) => {
    //       obras.push({ id: doc.id, ...doc.data() })
    //     })
    //   })
    // let fornecedores = []
    // await app.$fire.firestore
    //   .collection('fornecedores')
    //   .get()
    //   .then((snap) => {
    //     snap.forEach((doc) => {
    //       fornecedores.push({ id: doc.id, ...doc.data() })
    //     })
    //   })
    // let contas = []
    // await app.$fire.firestore
    //   .collection('contas')
    //   .get()
    //   .then((snap) => {
    //     snap.forEach((doc) => {
    //       contas.push({ id: doc.id, ...doc.data() })
    //     })
    //   })

    // let etapas = []
    // await app.$fire.firestore
    //   .collection('etapas')
    //   .get()
    //   .then((snap) => {
    //     snap.forEach((doc) => {
    //       etapas.push({ id: doc.id, ...doc.data() })
    //     })
    //   })

    return {}
  },

  data() {
    return {
      loading: false,
      tipos: ['Conta corrente', 'Cartão crédito', 'Cartão débito', 'Boleto'],
      form: {},
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  methods: {
    async adicionar() {
      this.loading = true
      const item = {
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
        ...this.form,
      }
      await this.$fire.firestore
        .collection(db)
        .add(item)
        .then((docRef) => {
          console.log('Documento written ID: ', docRef.id)
          this.$notifier.showMessage({
            content: 'Adicionado,',
            color: 'success',
            top: false,
          })
        })
        .catch((error) => {
          console.log(error)
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
          this.$router.push({
            path: '/financeiro/fornecedores',
          })
        })
    },
  },
}
</script>
