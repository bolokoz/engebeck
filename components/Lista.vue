<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-none d-sm-block">
            <v-card>
              <v-card-title>
                <v-btn color="primary" @click.stop="adicionar">
                  Adicionar
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Procurar"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="desktopTableHeaders"
                :items="items"
                :search="search"
                dense
                no-results-text="Nada encontrado"
                no-data-text="Banco de dados vazio"
                loading-text="Carregando dados..."
              >
                <template #item.actions="{ item }">
                  <v-icon
                    v-if="telefone"
                    small
                    class="mr-2"
                    @click="whatsapp(item)"
                  >
                    mdi-phone
                  </v-icon>
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-btn text small @click="expandItem(item)"
                    ><v-icon>mdi-arrow-expand</v-icon></v-btn
                  >
                </template>
              </v-data-table>
            </v-card>
          </div>
          <div class="d-flex flex-column d-sm-none">
            <v-simple-table>
              <template #default>
                <thead>
                  <tr>
                    <th v-for="(th, k) in mobileTableHeaders" :key="k">
                      {{ th }}
                    </th>
                    <th class="text-left">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td v-for="(td, k) in mobileTableItems" :key="k">
                      {{ item[td] }}
                    </td>
                    <td>
                      <v-btn v-if="telefone" text small @click="whatsapp(item)"
                        ><v-icon>mdi-phone</v-icon></v-btn
                      >
                      <v-btn text small @click="expandItem(item)"
                        ><v-icon>mdi-arrow-expand</v-icon></v-btn
                      >
                      <v-btn text small @click="editItem(item)"
                        ><v-icon>mdi-pencil</v-icon></v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    mobileTableItems: {
      type: Array,
      required: true,
    },
    mobileTableHeaders: {
      type: Array,
      required: true,
    },
    desktopTableHeaders: {
      type: Array,
      required: true,
    },
    editPath: {
      type: String,
      required: true,
    },
    telefone: {
      type: Boolean,
      required: false,
      default: true,
    },
    dialog: {
      default: false,
    },
  },
  data() {
    return {
      search: '',
    }
  },
  methods: {
    expandItem(item) {
      this.$router.push({
        path: `${this.editPath}/${item.id}`,
      })
    },
    editItem(item) {
      // console.log(item)
      this.$emit('editItem', item)
    },
    whatsapp(item) {
      window.open(`https://wa.me/55${item.telefone}`)
    },
    adicionar() {
      this.$emit('update:dialog', true)
    },
  },
}
</script>