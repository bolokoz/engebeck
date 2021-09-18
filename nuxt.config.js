import colors from 'vuetify/es5/util/colors'

const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/dist/',
        },
      }
    : {}

export default {
  // ssr:true
  ssr: false,
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - EngeBECK',
    title: 'EngeBECK',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/main.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/notifier.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://firebase.nuxtjs.org
    '@nuxtjs/firebase',
  ],

  ...routerBase,

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  /*
   ** Nuxt Firebase configuration
   ** https://firebase.nuxtjs.org/
   */
  firebase: {
    config: {
      apiKey: 'AIzaSyCkiD28s9pykKQelyqWLJoVSEgn22GCass',
      authDomain: 'ybimmobil.firebaseapp.com',
      databaseURL: 'https://ybimmobil.firebaseio.com',
      projectId: 'ybimmobil',
      storageBucket: 'ybimmobil.appspot.com',
      messagingSenderId: '86454094851',
      appId: '1:86454094851:web:49fd58d05a54908c92d236',
    },
    services: {
      auth: {
        // Experimental Feature, use with caution.
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChangedAction',
        },
        ssr: false,
      },
      firestore: true,
      storage: true,
    },
  },

  pwa: {
    // disable the modules you don't need
    icon: {
      purpose: 'maskable',
    },
    meta: {
      theme_color: '#0041ac',
    },
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        // ssr:true '/firebase-auth-sw.js',
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false,
    },
  },
}
