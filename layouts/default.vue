<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
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

      <!-- SubGroup -->
      <v-list-group :value="false" prepend-icon="mdi-cart">
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>Compras</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="([title, icon, link], i) in compras"
          :key="i"
          active-class="green lighten-4"
          color="green-lighten-3"
          nuxt
          :to="link"
          class="ml-4"
        >
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- SubGroup -->
      <v-list-group :value="false" prepend-icon="mdi-finance">
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>Financeiro</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="([title, icon, link], i) in financeiro"
          :key="i"
          active-class="green lighten-4"
          color="green-lighten-3"
          nuxt
          :to="link"
          class="ml-4"
        >
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- SubGroup -->
      <v-list-group :value="false" prepend-icon="mdi-home-group">
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>Obras</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="([title, icon, link], i) in obras"
          :key="i"
          active-class="green lighten-4"
          color="green-lighten-3"
          nuxt
          :to="link"
          class="ml-4"
        >
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
      <!-- SubGroup -->
      <v-list-group :value_relatorio="false" prepend-icon="mdi-chart-box">
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>Relatorios</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="([title, icon, link], i) in relatorios"
          :key="i"
          active-class="green lighten-4"
          color="green-lighten-3"
          nuxt
          :to="link"
          class="ml-4"
        >
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <template #append>
        <div class="pa-2">
          <v-btn block @click="logout()"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="font-weight-light" v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
      <Snackbar />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
// import { mapGetters } from 'vuex'
import Vue from 'vue'
import Snackbar from '~/components/Snackbar.vue'

export default Vue.extend({
  components: { Snackbar },
  middleware: 'securePage',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      financeiro: [
        ['Contas e cartões', 'mdi-bank', '/contas'],

        // ['Financeiro', 'mdi-cash', '/financeiro/'],
        ['Contabilidade', 'mdi-currency-usd', '/contabilidade'],
      ],
      compras: [
        ['Compras gerais', 'mdi-card-outline', '/compras'],
        ['Add compra simples', 'mdi-cash-fast', '/compras/addSimples'],
        ['Fornecedores', 'mdi-store', '/fornecedores'],
        ['Compras incompletas', 'mdi-format-list-checks', '/compras/pendentes'],
        // [
        //   'Compras recorrentes',
        //   'mdi-account-multiple-outline',
        //   '/compras/recorrentes',
        // ],
        // [
        //   'Pedidos/Orçamentos',
        //   'mdi-account-multiple-outline',
        //   '/compras/pedidos',
        // ],
      ],
      obras: [
        ['Gerenciar Obras', 'mdi-home-city', '/obras'],
        ['Gerenciar Etapas ', 'mdi-view-list', '/etapas'],
      ],
      relatorios: [
        // ['Geral ', 'mdi-account-multiple-outline', '/relatorios'],
        // ['Por obra ', 'mdi-account-multiple-outline', '/relatorios/obra'],
        // [
        //   'Por conta pagadora',
        //   'mdi-account-multiple-outline',
        //   '/relatorios/conta',
        // ],
        ['Ressarcimento', 'mdi-cash-refund', '/relatorios/ressarcimento'],
        ['Administração', 'mdi-file-percent', '/relatorios/administracao'],
        ['Fluxo caixa', 'mdi-file-percent', '/relatorios/administracao'],
        ['Cronograma', 'mdi-chart-gantt', '/cronogramas/obras'],
        ['Gasto obra', 'mdi-office-building-cog', '/relatorios/obra'],
      ],

      items: [
        {
          icon: 'mdi-home',
          title: 'Início',
          to: '/app',
        },
        {
          icon: 'mdi-calendar',
          title: 'Calendario',
          to: '/calendario',
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
