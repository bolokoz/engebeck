<template>
  <div>
    <v-container>
      <h1 class="font-weight-regular">{{ titulo }}</h1>
      <Lista3
        :items="items"
        :mobile-headers="mobileHeaders"
        :desktop-headers="desktopHeaders"
        sort-by="data"
        :telefone="false"
        :path="path"
        @addItem="addItem"
        @editItem="editItem"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'securePage',
  props: {
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
  mounted() {
    this.read()
  },
  methods: {
    read() {
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
}
</script>
