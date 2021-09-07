<template>
  <v-container fluid>
    <v-combobox
      v-model="local"
      :filter="filter"
      :hide-no-data="!search"
      :items="lista"
      item-text="nome"
      :search-input.sync="search"
      hide-selected
      :label="label"
      multiple
      small-chips
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Criar</span>
          <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`${item.color} lighten-3`"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">
            {{ item.nome }}
          </span>
          <v-icon small @click="parent.selectItem(item)"> $delete </v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          @keyup.enter="edit(index, item)"
        ></v-text-field>
        <v-chip v-else :color="`${item.color} lighten-3`" dark label small>
          {{ item.nome }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="edit(index, item)">
            <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
export default {
  props: {
    lista: {
      default: [],
      required: true,
      type: Array,
    },
    label: {
      default: 'Escolha',
      type: String,
    },
    db: {
      required: false,
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
    itemtext: {
      type: String,
      default: 'nome',
    },
  },

  data: () => ({
    activator: null,
    attach: null,
    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    editing: null,
    editingIndex: -1,
    value: [],
    // values: [
    //   { header: 'Selecione uma opção ou crie uma' },
    //   {
    //     text: 'Foo',
    //     color: 'blue',
    //   },
    //   {
    //     text: 'Bar',
    //     color: 'red',
    //   },
    // ],
    nonce: 1,
    menu: false,
    x: 0,
    search: null,
    y: 0,
  }),
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
  watch: {
    local(val, prev) {
      if (val.length === prev.length) return

      this.local = val.map((v) => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }

          this.local.push(v)

          this.nonce++
        }

        return v
      })
    },
  },

  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false

      const hasValue = (val) => (val != null ? val : '')

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      )
    },
  },
}
</script>