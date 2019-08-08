
const state = {
    fliePath: 'upload/file'
}

const mutations = {
    SET_FILE_PATH: (state, val) => {
        state.fliePath = val
    }
}

export default {
    state,
    mutations
}