<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <h1 class="font-weight-regular">{{ titulo }}</h1>
      </v-col>

      <v-col cols="12">
        <h4 class="font-weight-light">{{ subtitulo }}</h4>
      </v-col>

      <v-col cols="12">
        <p class="text--caption font-weight-light">
          <nuxt-link :to="link"> {{ texto_link }} </nuxt-link>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['titulo', 'subtitulo', 'texto_link', 'link'],
}
</script>