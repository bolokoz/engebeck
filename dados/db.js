export function buscar(collection, lista) {
    this.$fire.firestore
        .collection(collection)
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                lista.push({ id: doc.id, ...doc.data() })
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
}