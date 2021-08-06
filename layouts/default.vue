<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      color="light-green lighten-5"
    >
      <v-list nuxt to="/profile">
        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item> -->

        <v-list-item link nuxt to="/profile">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ authUser.displayName }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ authUser.email }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="pa-2">
          <v-btn block @click="logout()"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar fixed app color="light-blue lighten-4">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="font-weight-light" v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
// import { mapGetters } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  middleware: 'securePage',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Início',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Compras',
          to: '/compras',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Obras',
          to: '/obras',
        },
      ],
      title: 'EngeBeck',
    }
  },

  computed: {
    authUser(): string {
      return this.$store.state.auth.authUser
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/signOut').then(() => {
        console.log('logged out 📴')
      })
    },
  },
})
</script>
