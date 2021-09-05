<template>
  <div>
    <Titulo
      titulo="Editar obra"
      :subtitulo="`Conta de id: ${id}`"
      texto_link="Voltar para obra"
      link="/obras"
    />
    <v-divider></v-divider>

    <ObrasForm
      @refresh="goBack"
      :isDialog="false"
      :editItemObject="editItemObject"
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
      .collection('obras')
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
      this.$router.push('/obras')
    },
  },
}
</script>
