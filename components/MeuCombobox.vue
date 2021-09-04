<template>
  <div>
    <!-- <v-combobox
        v-model="local"
        :loading="loading"
        :items="listagem"
        :search-input.sync="search"
        outlined
        persistent-hint
        small-chips
        hide-selected
        :hint="hint"
        :label="label"
      ></v-combobox> -->

    <v-autocomplete
      v-model="local"
      :loading="loading"
      :items="listagem"
      :search-input.sync="search"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="What state are you from?"
      solo-inverted
    ></v-autocomplete>
  </div>
</template>


<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    hint: {
      type: String,
      required: false,
      default: 'Adicionar caso faltar na lista',
    },
    list: {
      type: String,
      required: true,
    },
  },

  watch: {
    local(val) {
      if (val.length > 3) {
        this.$nextTick(() => this.local.pop())
      }
    },
  },

  mounted() {
    this.$fire.firestore
      .collection('compras')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.compras.push(doc.data())
        })
      })

    // this.listagem = this.compras
    //   .map((compra) => compra.pagador)
    //   .filter((value, index, self) => self.indexOf(value) === index)
  },

  data() {
    return {
      loading: false,
      compras: [],
      listagem: [],
      search: null,
    }
  },
  computed: {
    local: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      },
    },
  },
}
</script>