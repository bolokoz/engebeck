<template>
  <div>
    <Titulo
      titulo="Edit compra"
      :subtitulo="`Conta de id: ${id}`"
      texto_link="Voltar para compras"
      link="/compras"
    />

    <ComprasFormOnly
      :form="item"
      :obras="obras"
      :contas="contas"
      :etapsa="etapas"
      :fornecedores="fornecedores"
    />

    <BotoesForm
      :isEdit="true"
      @deletar="deletar"
      @alterar="alterar"
      @adicionar="adicionar"
      :loading="loading"
    />

    <v-divider class="my-5"></v-divider>
  </div>
</template>
<script>
import ComprasForm3 from '~/components/ContasForm3.vue'
export default {
  middleware: 'securePage',
  transition: 'fade',
  components: {
    ComprasForm3,
  },

  async asyncData({ params, app }) {
    const id = params.id

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

    const doc = await app.$fire.firestore.collection('compras').doc(id).get()

    let item = doc.data()

    return { id, item, obras, contas, fornecedores, etapas }
  },

  data() {
    return {
      loading: false,
      emptyForm: {
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
      },
      item: {},
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
        .collection('compras')
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
            path: '/compras/recorrentes',
          })
        })
    },
    async alterar() {
      this.loading = true
      const modificacao = {
        modifiedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        modifiedBy: this.authUser,
        ...this.form,
      }
      //   console.log('modify', this.id, modificacao)
      await this.$fire.firestore
        .collection('compras')
        .doc(this.form.id)
        .update(modificacao)
        .then((docRef) => {
          // console.log('Documento modificado ID: ', docRef.id)
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
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
    async deletar() {
      this.loading = true
      await this.$fire.firestore
        .collection('compras')
        .doc(this.form.id)
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
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
  },
}
</script>
