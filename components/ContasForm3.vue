<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <span v-if="formIsEdit" class="headline">Editar conta</span>
            <span v-else class="headline">Adicionar conta</span>
          </v-card-title>
          <v-card-text>
            <h3 class="my-3 font-weight-bold">Dados da conta</h3>
            <!-- Nome -->
            <v-form ref="form">
              <v-row>
                <v-col sm="8" offset-sm="1" md="6" lg="5">
                  <v-text-field
                    v-model.number="form.nome"
                    label="Nome da conta"
                    dense
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Tipo -->
              <v-row>
                <v-col sm="8" offset-sm="1" md="6" lg="5">
                  <v-autocomplete
                    v-model="form.tipo"
                    :items="tipos"
                    label="Tipo da conta"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <!-- Fim -->
              <!-- Inicio -->
              <v-row>
                <v-col sm="8" offset-sm="1" md="6" lg="5">
                  <v-text-field
                    v-model="form.banco"
                    dense
                    label="Banco"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Fim -->
              <!-- Inicio -->
              <v-row>
                <v-col sm="8" offset-sm="1" md="6" lg="5">
                  <v-text-field
                    v-model="form.cnpj"
                    dense
                    label="CPF/CNPJ do proprietário"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Fim -->
              <!-- Inicio -->
              <v-row>
                <v-col sm="8" offset-sm="1" md="6" lg="5">
                  <v-text-field
                    v-model="form.obs"
                    dense
                    label="Observações"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Fim -->
              <!-- Inicio -->
              <v-row>
                <v-col sm="8" offset-sm="1" md="6" lg="5">
                  <v-text-field
                    v-model="form.agencia"
                    dense
                    label="Agencia"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Fim -->
              <!-- Inicio -->
              <v-row>
                <v-col sm="8" offset-sm="1" md="6" lg="5">
                  <v-text-field
                    v-model="form.conta"
                    dense
                    label="Conta"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Fim -->
              <!-- Inicio -->
              <v-row>
                <v-col sm="8" offset-sm="1" md="6" lg="5">
                  <v-text-field
                    v-model="form.pix"
                    dense
                    label="pix"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Fim -->
              <!-- Botoes -->
              <v-row>
                <!-- CONDICAO CRIAR NOVO -->
                <div v-if="!formIsEdit">
                  <v-row>
                    <v-col>
                      <v-btn
                        dark
                        color="green light"
                        outlined
                        @click="adicionar"
                        >{{ $nuxt.$loading ? 'enviando' : 'ADD' }}</v-btn
                      >
                    </v-col>
                    <v-col>
                      <v-btn dark color="grey" text @click.native="close"
                        >CANCELAR</v-btn
                      >
                    </v-col>
                    <v-col>
                      <v-btn type="reset" @click="resetar">RESET</v-btn>
                    </v-col>
                  </v-row>
                </div>
                <!-- CONDICAO EDITAR -->
                <div v-else>
                  <v-row>
                    <v-col>
                      <v-btn
                        dark
                        color="green light"
                        outlined
                        @click="alterar"
                        >{{ $nuxt.$loading ? 'enviando' : 'ALTERAR' }}</v-btn
                      >
                    </v-col>
                    <v-col>
                      <v-btn dark color="grey" text @click.native="close"
                        >CANCELAR</v-btn
                      >
                    </v-col>
                    <v-col>
                      <v-btn dark color="red light" outlined @click="deletar">{{
                        $nuxt.$loading ? 'enviando' : 'DELETAR'
                      }}</v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  props: {
    form: {
      required: true,
    },
    formIsEdit: {
      type: Boolean,
    },
  },

  data() {
    return {
      tipos: ['Serviço', 'Material', 'Outros'],
    }
  },
  methods: {
    resetar() {
      // this.form = { ...this.emptyForm }
    },
    async adicionar() {
      this.$nuxt.$loading = true
      const item = {
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
        ...this.form,
      }
      await this.$fire.firestore
        .collection('contas')
        .add(item)
        .then((docRef) => {
          console.log('Documento written ID: ', docRef.id)
          this.$notifier.showMessage({
            content: 'Adicionado,',
            color: 'success',
            top: false,
          })

          setTimeout(() => {
            this.resetar()
          }, 3000)
        })
        .catch((error) => {
          console.log(error)
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.$nuxt.$loading = false
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
    close() {
      this.$emit('update:dialog', false)
    },
    async alterar() {
      this.$nuxt.$loading = true
      const modificacao = {
        modifiedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        modifiedBy: this.authUser,
        ...this.form,
      }
      //   console.log('modify', this.id, modificacao)
      await this.$fire.firestore
        .collection('contas')
        .doc(this.form.id)
        .update(modificacao)
        .then((docRef) => {
          // console.log('Documento modificado ID: ', docRef.id)
          this.$notifier.showMessage({
            content: 'Item modificado ',
            color: 'info',
            top: false,
          })
        })
        .catch((error) => {
          console.log(error)
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.$nuxt.$loading = false
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
    async deletar() {
      this.$nuxt.$loading = true
      await this.$fire.firestore
        .collection('contas')
        .doc(this.form.id)
        .delete()
        .then(() => {
          this.$notifier.showMessage({
            content: 'Item apagado',
            color: 'warning',
            top: false,
          })
          //   this.dialog = false
          //   this.$router.push('/compras')
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.$nuxt.$loading = false
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
  },

  watch: {
    // editItemObject(val) {
    //   this.form = val
    // },
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },
}
</script>