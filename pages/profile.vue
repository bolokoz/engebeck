<template>
  <div>
      <h1>PROFILE</h1>
    <p>Compras {{ authUser }} 🎈</p>
    <ul>
      <li v-for="message in messages" :key="message.id">
        {{ message.data().name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
  middleware: 'securePage',

  data() {
    return {
      messages: [],
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
