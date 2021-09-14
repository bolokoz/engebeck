<template>
  <div>
    <v-container>
      <h1 class="font-weight-regular">{{ titulo }}</h1>
      <Lista3
        :items="items"
        @addItem="addItem"
        @editItem="editItem"
        :mobileHeaders="mobileHeaders"
        :desktopHeaders="desktopHeaders"
        :telefone="false"
        :path="path"
      />
    </v-container>
  </div>
</template>


<script>
export default {
  middleware: 'securePage',
  props: {
    titulo: {
      type: String,
      required: true,
    },
    db: {
      type: String,
      required: true,
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
  },
  data() {
    return {
      items: [],
      loading: false,
    }
  },
  methods: {
    editItem(item) {
      this.$router.push({
        path: `${this.editPath}/${item.id}`,
      })
    },
    whatsapp(item) {
      window.open(`https://wa.me/55${item.telefone}`)
    },
    email(item) {
      window.location.href = `mailto:${item.email}`
    },
    addItem() {
      this.$emit('addItem')
    },
    async read() {
      this.loading = true
      this.$fire.firestore
        .collection(this.db)
        .get()
        .then((snap) => {
          this.items = []
          snap.forEach((doc) => {
            this.items.push({ id: doc.id, ...doc.data() })
          })
        })
        .catch(() => {
          this.$notifier.showMessage({
            content: error,
            color: 'error',
            top: false,
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  mounted() {
    this.read()
  },
}
</script>