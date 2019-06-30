

const state = {
    keyword:''
}

const mutations = {
        SET_VAL: (state, value) => {  //更新数据
        state.keyword = value
    }
}

const actions = {
    search({ commit }, value){
        commit('SET_VAL', value)
    }
}


export default {
    state,
    mutations,
    actions
}