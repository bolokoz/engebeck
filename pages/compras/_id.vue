<template>
  <div>
    <Titulo
      titulo="Editar compra"
      :subtitulo="`Conta de id: ${id}`"
      texto_link="Voltar para compras"
      link="/compras"
    />
    <v-divider></v-divider>

    <ComprasForm
      @refresh="goBack"
      :isDialog="false"
      :editItemObject.sync="editItemObject"
    />

    <v-divider class="my-5"></v-divider>
    <!-- <DadosExtras :item="editItemObject" /> -->
  </div>
</template>
<script>
export default {
  middleware: 'securePage',

  asyncData({ params }) {
    const id = params.id
    return { id }
  },

  data() {
    return {
      dialog: true,
      editItemObject: null,
      loading: false,
    }
  },

  async fetch() {
    const doc = await this.$fire.firestore
      .collection('compras')
      .doc(this.id)
      .get()
    this.editItemObject = doc.data()
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  methods: {
    goBack() {
      this.$router.push('/compras')
    },
  },
}
</script>
