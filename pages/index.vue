<template>
  <v-app>
    <v-app-bar fixed flat hide-on-scroll color="transparent">
      <v-img
        class="mt-2"
        :src="require('~/assets/TETRAHEDRON.png')"
        max-height="60"
        max-width="60"
        contain
      ></v-img>
      <v-toolbar-title class="font-weight-black headline white--text">
        EngeBECK
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="!isLoggedIn">
        <v-btn outlined color="white" nuxt to="/login"> Login </v-btn>
      </div>
      <div v-else>
        <v-btn outlined color="white" nuxt to="/app" class="mr-2">
          Entrar
        </v-btn>
        <v-btn color="secondary" @click="logout"> Logout </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <section id="hero">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
            src="https://media.giphy.com/media/fVQNdNH1WytburYjyb/giphy-downsized-large.gif"
            gradient="to top, rgba(43,177,211,.4),rgba(0,0,0,.7)"
          >
            <v-theme-provider dark>
              <v-container class="fill-height">
                <v-row
                  align="center"
                  class="white--text mx-auto"
                  justify="center"
                >
                  <v-col class="white--text text-center" cols="12" tag="h1">
                    <span
                      class="font-weight-light"
                      :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'display-1'
                          : 'display-2',
                      ]"
                    >
                    </span>

                    <br />

                    <span
                      :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'display-3'
                          : 'display-4',
                      ]"
                      class="font-weight-black"
                    >
                      Enge|BECK
                    </span>
                  </v-col>

                  <v-btn
                    class="align-self-end"
                    fab
                    outlined
                    @click="$vuetify.goTo('#about-me')"
                  >
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn>
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section>

      <section id="about-me">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">O que é a EngeBECK?</h2>

          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
            Empresa de engenharia do ramo residencial focada em construir lares
            modernos e eficientes através de projetos que levam economia tanto
            para construtor como proprietário.
          </v-responsive>

          <div class="d-flex justify-center mb-12" size="254">
            <v-img
              max-width="250"
              contain
              :src="require('~/assets/logo_transparent.png')"
            ></v-img>
          </div>

          <div></div>

          <v-btn
            color="grey"
            outlined
            large
            @click="$vuetify.goTo('#portfolio')"
          >
            <span class="grey--text text--darken-1 font-weight-bold">
              Ver obras realizadas
            </span>
          </v-btn>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section id="portfolio">
        <div class="py-12"></div>

        <v-container>
          <h2
            class="display-2 font-weight-bold mb-3 text-uppercase text-center"
          >
            Portfolio
          </h2>

          <v-responsive class="mx-auto mb-12" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ src, text, title, link }, i) in portfolio"
              :key="i"
              cols="12"
              md="4"
              :to="link"
            >
              <v-card class="py-12 px-4" color="grey darken-1" flat>
                <v-theme-provider>
                  <div>
                    <v-img
                      :src="src"
                      class="mb-4"
                      height="275"
                      max-width="100%"
                    ></v-img>
                  </div>
                </v-theme-provider>

                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  v-text="title"
                >
                </v-card-title>

                <v-card-text class="subtitle-1" v-text="text"> </v-card-text>
                <v-btn class="ml-n4 font-weight-black" text nuxt :to="link">
                  Ver mais
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12 d-flex justify-center">
          <v-btn color="grey" outlined large @click="$vuetify.goTo('#contact')">
            <span class="grey--text text--darken-1 font-weight-bold">
              ver contato
            </span>
          </v-btn>
        </div>

        <div class="py-12"></div>
      </section>

      <!-- <section id="stats">
        <v-parallax
          :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
          src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        >
          <v-container class="fill-height">
            <v-row class="mx-auto">
              <v-col
                v-for="[value, title] of stats"
                :key="title"
                cols="12"
                md="3"
              >
                <div class="text-center">
                  <div
                    class="display-3 font-weight-black mb-4"
                    v-text="value"
                  ></div>

                  <div
                    class="title font-weight-regular text-uppercase"
                    v-text="title"
                  ></div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-parallax>
      </section> -->

      <v-sheet id="contact" color="#333333" dark tag="section" tile>
        <div class="py-12"></div>

        <v-container>
          <h2
            class="display-2 font-weight-bold mb-3 text-uppercase text-center"
          >
            Contato
          </h2>

          <v-responsive class="mx-auto mb-12" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-theme-provider light>
            <v-card class="mx-auto">
              <v-list two-line shaped>
                <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item
                    href="//api.whatsapp.com/send?phone=5567999767835&text=Olá, achei seu número pelo engebeck.com.br"
                  >
                    <v-list-item-icon>
                      <v-icon color="indigo"> mdi-phone </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>(67) 9 9976-7835</v-list-item-title>
                      <v-list-item-subtitle>WhatsApp</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>

                  <v-list-item href="mailto:yurifbeck@gmail.com">
                    <v-list-item-icon>
                      <v-icon color="indigo"> mdi-email </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>yurifbeck@gmail.com</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo"> mdi-map-marker </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title></v-list-item-title>
                      <v-list-item-subtitle
                        >Campo Grande - MS</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-theme-provider>
        </v-container>

        <div class="py-12"></div>
      </v-sheet>
    </v-main>

    <v-footer class="justify-center" color="#292929" height="100">
      <div
        class="title font-weight-light grey--text text--lighten-1 text-center"
      >
        {{ new Date().getFullYear() }} — EngeBECK
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  layout: 'landing',
  data() {
    return {
      features: [
        {
          icon: 'mdi-phone',
          title: 'blabla',
          text: 'hahahasdofiashdf oashfd aushdf ah',
        },
        {
          icon: 'mdi-phone',
          title: 'blabla',
          text: 'hahahasdofiashdf oashfd aushdf ah',
        },
        {
          icon: 'mdi-phone',
          title: 'blabla',
          text: 'hahahasdofiashdf oashfd aushdf ah',
        },
      ],
      stats: [
        [4, 'projetos produzidos'],
        [4, 'obras executadas'],
        [9, 'reformas acompanhadas'],
      ],
      portfolio: [
        {
          src: 'https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg',
          title: 'Residência - Alphaville 4',
          text: 'Sobrado alto padrão com 5 quartos. Garagem para 3 carros grandes (tomada para carro elétrico). Sala de TV rebaixada toda acolchoada. Cozinha/gourmet com ilha central com pia e churrasqueira suspensa. Sistema de captação de água pluvial. Geração energia fotovoltaica. Bacia sanitária suspensa. Banheira de imersão. Entre outros',
          link: 'projetos/alphaville4_1011',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/signOut').then(() => {
        console.log('logged out 📴')
      })
    },
  },
}
</script>
