<template>
  <div>
    <v-container>
      <v-row class="text-center my-3">
        <h1 class="font-weight-light">Compras</h1>
        <v-spacer></v-spacer>
        <v-btn outlined to="/compras/adicionar">
          <v-icon class="mr-2">mdi-plus</v-icon>
          Adiconar compra
        </v-btn>
      </v-row>
    </v-container>
    <v-divider></v-divider>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  middleware: 'securePage',

  head() {
    return {
      script: [
        {
          src: 'https://raw.githubusercontent.com/mebjas/html5-qrcode/master/dist/html5-qrcode.min.js',
        },
      ],
    }
  },

  data() {
    return {
      messages: [],
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  methods: {},

  mounted() {
    /* this.$fire.firestore
      .collection('users')
      .doc(this.authUser.id)
      .collection('products')
      .get()
      .then((snap) => {
        this.messages = []
        snap.forEach((doc) => {
          this.messages.push(doc)
        })
      }) */
  },
})
</script>
