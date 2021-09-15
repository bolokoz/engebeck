<template>
  <div>
    <Titulo
      titulo="Editar compra"
      :subtitulo="`Id: ${id}`"
      texto_link="Voltar para compras"
      link="/compras"
    />

    <div v-if="form">
      <ComprasFormOnly
        :form="form"
        :obras="obras"
        :fornecedores="fornecedores"
        :contas="contas"
        :etapas="etapas"
        :files="files"
      />

      <!-- <DadosExtras :form="form" /> -->

      <BotoesForm
        :isEdit="true"
        @deletar="deletar"
        @alterar="alterar"
        :loading="loading"
      />
    </div>

    <div v-else>
      <h3>Documento não encontrado</h3>
    </div>
  </div>
</template>
<script>
const db = 'compras'
export default {
  middleware: 'securePage',
  transition: 'fade',

  async asyncData({ params, app }) {
    const id = params.id
    let form
    const docRef = app.$fire.firestore.collection(db).doc(id)

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          form = doc.data()
        } else {
          app.$notifier.showMessage({
            content: 'Documento não existe',
            color: 'error',
            top: false,
          })
        }
      })
      .catch((error) => {
        app.$notifier.showMessage({
          content: error,
          color: 'error',
          top: false,
        })
      })

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
          etapas.push({ id: doc.id, ...doc.data() })
        })
      })

    let formFiles = []
    if (form.files) {
      form?.files.forEach((file) => {
        let url = app.$fire.storage
          .ref(`/notas/${id}/`)
          .child(file)
          .getDownloadURL()
        formFiles.push(url)
      })
    }

    return { id, form, formFiles, obras, fornecedores, etapas, contas }
  },

  data() {
    return {
      loading: false,
      item: {},
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  methods: {
    async alterar() {
      this.loading = true
      const modificacao = {
        modifiedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        modifiedBy: this.authUser,
        ...this.form,
      }
      //   console.log('modify', this.id, modificacao)
      await this.$fire.firestore
        .collection(db)
        .doc(this.id)
        .update(modificacao)
        .then((docRef) => {
          if (this.files) {
            files.forEach((d) => {
              // await this.$fire.storage().ref('notas').put(`${docRef.id}_${d}`)
              console.log(d)
            })
          }
          this.$notifier.showMessage({
            content: 'Item modificado ',
            color: 'info',
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
        })
    },
    async deletar() {
      this.loading = true
      await this.$fire.firestore
        .collection(db)
        .doc(this.id)
        .delete()
        .then(() => {
          this.$notifier.showMessage({
            content: 'Item apagado',
            color: 'warning',
            top: false,
          })
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
          this.$router.push('/compras')
        })
    },
  },
}
</script>
