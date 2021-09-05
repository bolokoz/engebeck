<template>
  <v-card>
    <v-card-title>
      <span v-if="editar" class="headline">Editar obra</span>
      <span v-else class="headline">Adicionar obra</span>
    </v-card-title>
    <v-card-text>
      <h3 class="my-3 font-weight-bold">Dados da obra</h3>
      <!-- Nome -->
      <v-form ref="form">
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model.number="form.nome"
              label="Nome da obra"
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
              label="Tipo da obra"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.proprietario"
              dense
              label="Proprietário"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.ano"
              dense
              label="Ano início"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.engenheiro"
              dense
              label="Engenheiro geral"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.arquiteto"
              dense
              label="Arquiteto"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.endereco"
              dense
              label="Endereço"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->
        <!-- Inicio -->
        <v-row>
          <v-col sm="8" offset-sm="1" md="6" lg="5">
            <v-text-field
              v-model="form.m2"
              dense
              label="Metros quadrados"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Fim -->

        <!-- Botoes -->
        <v-row>
          <!-- CONDICAO CRIAR NOVO -->
          <div v-if="!editar">
            <v-row>
              <v-col>
                <v-btn dark color="green light" outlined @click="adicionar">{{
                  loading ? 'enviando' : 'ADD'
                }}</v-btn>
              </v-col>
              <v-col v-if="isDialog">
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
                <v-btn dark color="green light" outlined @click="alterar">{{
                  loading ? 'enviando' : 'ALTERAR'
                }}</v-btn>
              </v-col>
              <v-col v-if="isDialog">
                <v-btn dark color="grey" text @click.native="close"
                  >CANCELAR</v-btn
                >
              </v-col>
              <v-col>
                <v-btn dark color="red light" outlined @click="deletar">{{
                  loading ? 'enviando' : 'DELETAR'
                }}</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>


<script>
import { emptyForm, tipos } from '~/dados/obras.js'
export default {
  props: {
    editItemObject: {
      type: Object,
    },
    isDialog: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      tipos: tipos,
      emptyForm: emptyForm,
      loading: false,
      form: Object.assign({}, this.emptyForm),
    }
  },
  methods: {
    resetar() {
      this.form = Object.assign({}, this.emptyForm)
    },
    async adicionar() {
      this.loading = true
      const item = {
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        createdBy: this.authUser,
        visible: true,
        ...this.form,
      }
      await this.$fire.firestore
        .collection('obras')
        .add(item)
        .then((docRef) => {
          // console.log('Documento written ID: ', docRef.id)
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
          this.loading = false
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
    close() {
      this.$emit('update:dialog', false)
    },
    async alterar() {
      this.loading = true
      const modificacao = {
        modifiedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        modifiedBy: this.authUser,
        ...this.form,
      }
      //   console.log('modify', this.id, modificacao)
      await this.$fire.firestore
        .collection('obras')
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
          this.loading = false
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
    async deletar() {
      this.loading = true
      await this.$fire.firestore
        .collection('obras')
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
          this.loading = false
          this.$emit('refresh')
          this.$emit('update:dialog', false)
        })
    },
  },

  watch: {
    editItemObject: {
      immediate: true,
      deep: true,
      handler(val) {
        this.form = val
      },
    },
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
    editar() {
      return this?.editItemObject !== null ? true : false
    },
  },
}
</script>