import Vue from 'Vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default () => {
    const store = new Vuex.Store({
        state,
        mutations
    })

    // 订阅mutation方法对所有的mutation进行监听 主要用于打印日志
    store.subscribe((mutation, state1) => {
        console.log(mutation.type) // 方法名称
        console.log(state1) // 参数
    })

    return store
}
