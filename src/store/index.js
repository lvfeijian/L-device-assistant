import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        winHeight: 0, // 当前窗口高度
        winWidth: 0, // 窗口宽度
        currRouter: {
            // 当前页面路由信息
            from: '',
            to: '',
            query: null,
            instance: null // 路由实例
        },
        loading: false, // loading的状态
        popTipStr: '', // 全局文字提示
        showPopTip: false, // 控制提示弹出
        user: localStorage.getItem('user'), // 用户名
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '', // token
    },
    mutations,
    actions,
    modules
})
