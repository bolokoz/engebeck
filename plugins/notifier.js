export default ({ app, store }, inject) => {
    inject('notifier', {
        showMessage({ content = '', color = '', top = '' }) {
            store.commit('snackbar/showMessage', { content, color, top })
        }
    })
}