<template>
  <div>
    <v-container class="px-0 mx-0">
      <v-row>
        <v-col cols="12">
          <div>
            <v-card>
              <v-card-title>
                <v-btn color="primary" @click.stop="addItem"> Adicionar </v-btn>
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
                :headers="desktopHeaders"
                :items="items"
                :search="search"
                sort-by="createdAt"
                sort-desc
                no-results-text="Nada encontrado"
                no-data-text="Banco de dados vazio"
                loading-text="Carregando dados..."
              >
                // eslint-disable-next-line vue/valid-v-slot
                <template #item.createdAt="{ item }">
                  {{
                    new Date(item.createdAt.seconds * 1000).toLocaleString(
                      'pt-BR'
                    )
                  }}
                </template>
                // eslint-disable-next-line vue/valid-v-slot
                <template #item.valorTotal="{ item }">
                  R$ {{ item.valorTotal }}
                </template>
                <template #item.completo="{ item }">
                  <v-simple-checkbox
                    v-model="item.completo"
                    disabled
                  ></v-simple-checkbox>
                </template>
                <template #item.actions="{ item }">
                  <!-- <v-icon
                    v-if="telefone"
                    small
                    class="mr-2"
                    @click="whatsapp(item)"
                  >
                    mdi-phone
                  </v-icon> -->
                  <!-- <v-icon small class="mr-2" @click="email(item)">
                    mdi-mail
                  </v-icon> -->
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </div>
          <!-- <div class="d-flex flex-column d-sm-none">
            <v-simple-table>
              <template #default>
                <thead>
                  <tr>
                    <th v-for="(th, k) in mobileHeaders" :key="k">
                      {{ th }}
                    </th>
                    <th class="text-left">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td v-for="(td, k) in mobileHeaders" :key="k">
                      {{ item[td] }}
                    </td>
                    <td>
                      <v-btn v-if="telefone" text small @click="whatsapp(item)"
                        ><v-icon>mdi-phone</v-icon></v-btn
                      >
                      <v-btn text small @click.native="editItem(item)"
                        ><v-icon>mdi-pencil</v-icon></v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div> -->
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
    editItemObject: {
      default: () => ({}),
      required: false,
      type: Object,
    },
    mobileHeaders: {
      type: Array,
      required: true,
    },
    desktopHeaders: {
      type: Array,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    telefone: {
      type: Boolean,
      required: false,
      default: true,
    },
    dialog: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      search: '',
    }
  },

  methods: {
    editItem(item) {
      this.$router.push({
        path: `${this.path}/${item.id}`,
      })
    },
    whatsapp(item) {
      window.open(`https://wa.me/55${item.telefone}`)
    },
    email(item) {
      window.location.href = `mailto:${item.email}`
    },
    addItem() {
      this.$router.push({
        path: `${this.path}/add`,
      })
    },
  },
}
</script>
