<template>
  <v-container>
    <client-only>
      <yop-ui />
    </client-only>
  </v-container>
</template>

<script>
import YopUI from '~/components/YopUI'
export default {
  name: 'Login',
  layout: 'landing',
  components: {
    'yop-ui': YopUI,
  },
}
</script>

<style>
li {
  list-style-type: none;
}
</style>
