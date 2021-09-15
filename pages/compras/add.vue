<template>
  <div>
    <Titulo
      titulo="Adicionar compra"
      texto_link="Voltar para compras"
      link="/compras"
    />

    <ComprasFormOnly3
      :obras="obras"
      :fornecedores="fornecedores"
      :contas="contas"
      :etapas="etapas"
      :files="files"
    />

    <v-divider class="my-5"></v-divider>
  </div>
</template>
<script>
const db = 'compras'

export default {
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ app }) {
    let obras = []
    await app.$fire.firestore
      .collection('obras')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          obras.push({ id: doc.id, ...doc.data() })
        })
      })
    let fornecedores = []
    await app.$fire.firestore
      .collection('fornecedores')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          fornecedores.push({ id: doc.id, ...doc.data() })
        })
      })
    let contas = []
    await app.$fire.firestore
      .collection('contas')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          contas.push({ id: doc.id, ...doc.data() })
        })
      })

    let etapas = []
    await app.$fire.firestore
      .collection('etapas')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          etapas.push({ ...doc.data() })
        })
      })

    return { obras, fornecedores, etapas, contas }
  },

  data() {
    return {
      loading: false,
      form: {},
      files: [],
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

          if (this.files) {
            files.forEach((d) => {
              // await this.$fire.storage().ref('notas').put(`${docRef.id}_${d}`)
              console.log(d)
            })
          }
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
            path: '/compras',
          })
        })
    },
  },
}
</script>
