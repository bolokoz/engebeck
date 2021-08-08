export const state = () => ({
    content: '',
    color: '',
    top: ''
})

export const mutations = {
    showMessage(state, payload) {
        state.content = payload.content
        state.color = payload.color
        state.top = payload.top
    }
}