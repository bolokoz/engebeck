<template>
  <div>
    <v-container>
      <h1 class="font-weight regular">Financeiro</h1>

      <v-row>
        <v-col
          v-for="(n, i) in menus"
          :key="i"
          class="d-flex child-flex"
          cols="4"
        >
          <v-card
            outlined
            class="d-flex justify-center align-center text-center"
            height="100"
            :to="n.link"
          >
            <h5 class="">
              {{ n.name }}
            </h5>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'securePage',

  data() {
    return {
      menus: [
        { name: 'Contas e cartões', link: '/contas' },
        { name: 'Despesas', link: '/financeiro/despesas' },
        { name: 'Receitas', link: '/financeiro/receitas' },
      ],
    }
  },

  computed: {
    authUser(): string {
      return this.$store.state.auth.authUser
    },
  },

  mounted(): void {
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
