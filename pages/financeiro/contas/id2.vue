<template>
  <div>
    <Titulo
      titulo="Editar conta"
      :subtitulo="`Conta de id: ${id}`"
      texto_link="Voltar para contas"
      link="/financeiro/contas"
    />
    <v-divider></v-divider>

    <ContasForm2 @refresh="goBack" :editItemObject="editItemObject" />

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
      .collection('contas')
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
      this.$router.push('/financeiro/contas')
    },
  },
}
</script>
