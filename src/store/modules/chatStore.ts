// initial state
import Api from '@/api/api'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
const state: S = {
    chatArr: [
        {
            content: '您好！我是菲菲，非常欢迎您的到来，有什么想和我聊聊的吗？',
            model: 'left'
        }
    ]
}

const getters: GetterTree<S, any> = {


}

// actions 异步
const actions: ActionTree<any, any> = {
    async sendMessageToRobot({ commit }, content) {

        commit('commitMessage', {
            content,
            model: 'right'
        })
        let { data: { content: robotContent } } = await Api.sendMsgToRobot(content)
        commit('commitMessage', {
            content: robotContent,
            model: 'left'
        })
    }
}

// mutations 同步
const mutations: MutationTree<S> = {
    /**
     * 提交消息
     * @param state 
     * @param payload 
     */
    commitMessage(state, payload) {
        state.chatArr = [
            ...state.chatArr,
            payload
        ]
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
    chatArr: {
        content: string, model: 'right' | 'left',
        weight?: number
        status?: string
    }[]
}