<template>
  <div>
    <v-container class="my-3">
      <v-row>
        <h1 class="font-weight-regular">Adicionar compra complexa</h1>
        <h4 class="font-weight-light">
          Para pagamentos parcelados ou notas de remessa
        </h4>
        <p class="text--caption font-weight-light">
          <a href="/compras/adicionar">
            Clique aqui para adicionar compra simples
          </a>
        </p>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <v-card class="my-3">
      <v-container fluid>
        <v-row>
          <v-col cols="4">
            <v-subheader>Prefix for dollar currency</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="Amount"
              value="10.00"
              prefix="$"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-subheader>Suffix for weight</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="Weight"
              value="28.00"
              suffix="lbs"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-subheader>Suffix for email domain</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="Email address"
              value="example"
              suffix="@gmail.com"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-subheader>Suffix for time zone</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="Label Text"
              value="12:30:00"
              type="time"
              suffix="PST"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  middleware: 'securePage',

  data() {
    return {
      messages: [],
    }
  },

  head() {
    return {
      script: [
        {
          src: 'https://raw.githubusercontent.com/mebjas/html5-qrcode/master/dist/html5-qrcode.min.js',
        },
      ],
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

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

  methods: {},
})
</script>
