// initial state
import Api from '@/api/api'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
const state: S = {
    todayInHistory: []
}


const getters: GetterTree<S, any> = {


}

// actions 异步
const actions: ActionTree<any, any> = {

    async fetchTodayInHistory({ commit }, s) {
        let { data } = await Api.getToadyInHistory()
        commit('updateTodayInHistory', data.result)
    }
}

// mutations 同步
const mutations: MutationTree<S> = {
    updateTodayInHistory(state, payload) {
        state.todayInHistory = payload
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

type S = {
    todayInHistory: { date: string, title: string }[]
}