<template>
  <div>
    {{ i + 1 }} de {{ comprasSemTipo.length + 1 }}
    <comprasIterator
      :key="i"
      v-if="!showMore"
      :compra="compra"
      :loading="loading"
      :etapas="etapas"
      :tiposGastos="tiposGastos"
      @addTipoGasto="addTipoGasto"
      @removerTipoGasto="removerTipoGasto"
    />
    <div v-else>
      <v-card>
        <v-card-title> Show 10 more </v-card-title>
        <v-card-actions>
          <v-btn @click="loadMore"> Load 10 more </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <v-speed-dial
      v-model="fab"
      right
      bottom
      direction="top"
      open-on-hover
      transition="'slide-y-reverse-transition'"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-account-circle </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="yellow" @click="edit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark color="green" @click="update">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn fab dark color="indigo" @click="next">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
const db = 'compras'

export default {
  data() {
    return {
      compras: [],
      etapas: [],
      loading: false,
      fab: true,
      i: 0,
      showMore: false,
      lastCursor: {},
      tiposGastos: [
        {
          etapa: '',
          subetapa: '',
          valor: '',
          tipo: '',
        },
      ],
    }
  },
  mounted() {
    this.read()
  },
  computed: {
    comprasSemTipo() {
      return this.compras.filter((x) => !x.hasOwnProperty('tiposGastos'))
    },
    authUser() {
      return this.$store.state.auth.authUser
    },
    compra() {
      return this.comprasSemTipo[this.i]
    },
  },
  methods: {
    read() {
      this.loading = true
      this.$fire.firestore
        .collection(db)
        // .limit(10)
        .get()
        .then((snap) => {
          this.lastCursor = snap.docs[snap.docs.length - 1]
          this.compras = []
          snap.forEach((doc) => {
            this.compras.push({ id: doc.id, ...doc.data() })
          })
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
        })

      this.etapas = []
      this.$fire.firestore
        .collection('etapas')
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            Object.values(doc.data()).forEach((d) => this.etapas.push(d))
          })
        })
    },
    loadMore() {
      this.loading = true
      this.$fire.firestore
        .collection(db)
        .startAfter(this.lastCursor)
        .limit(10)
        .get()
        .then((snap) => {
          this.compras = []
          snap.forEach((doc) => {
            this.compras.push({ id: doc.id, ...doc.data() })
          })
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
          this.showMore = false
        })
    },
    next() {
      if (this.i < this.comprasSemTipo.length - 1) {
        this.i++
      } else {
        this.showMore = true
      }
    },
    addTipoGasto() {
      this.tiposGastos.push({
        etapa: '',
        subetapa: '',
        valor: '',
        tipo: '',
      })
    },
    removerTipoGasto(i) {
      this.tiposGastos.splice(i, 1)
    },
    edit() {
      this.$router.push({
        path: `/compras/${this.compra.id}`,
      })
    },
    async update() {
      const modificacao = {
        modifiedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        modifiedBy: this.authUser,
        tiposGastos: this.tiposGastos,
        ...this.compra,
      }
      console.log(modificacao)
      //   console.log('modify', this.id, modificacao)
      await this.$fire.firestore
        .collection('compras')
        .doc(this.compra.id)
        .update(modificacao)
        .then(() => {
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
          this.progressBar = false
          this.tiposGastos = [
            {
              etapa: '',
              subetapa: '',
              valor: '',
              tipo: '',
            },
          ]
          this.next()
        })
    },
  },
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.v-speed-dial {
  position: absolute;
  z-index: 100;
}
</style>
