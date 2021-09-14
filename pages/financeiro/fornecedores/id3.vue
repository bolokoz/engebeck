<template>
  <div>
    <Titulo
      titulo="Editar fornecedor"
      :subtitulo="`Fornecedor de id: ${id}`"
      texto_link="Voltar para fornecedores"
      link="/financeiro/fornecedores"
    />
    <v-divider></v-divider>

    <FornecedoresForm
      @refresh="goBack"
      :isDialog="false"
      :editItemObject.sync="editItemObject"
    />
    <v-divider class="my-5"></v-divider>
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
      .collection('fornecedores')
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
      this.$router.push('/fornecedores')
    },
  },
}
</script>
