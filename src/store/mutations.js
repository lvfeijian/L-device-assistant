import types from '@/store/constants/types'
const win = window
const doc = document
export default {
    [types.LOADING] (state, isShow) {
        state.loading = isShow
    },
    [types.SET_CURR_ROUTER] (state, payload) {
        const currRouter = state.currRouter
        currRouter.from = payload.from
        currRouter.to = payload.to
        currRouter.query = payload.query
        currRouter.instance = payload.instance
        if (!currRouter.to) {
            state.loading = false
        }
    },
    [types.GET_WINDOW_SIZE] (state) {
        state.winHeight = doc.documentElement.clientHeight || win.innerHeight
        state.winWidth = doc.documentElement.clientWidth || win.innerWidth
    },
    // 切换全局弹窗提示
    [types.POP_MESSAGE] (state, payload) {
        let show = true
        let tip = ''
        if (!payload) {
            return
        }
        if (typeof payload == 'string') {
            tip = payload
        } else {
            show = payload.show
            tip = payload.tip
        }
        if (tip) {
            state.popTipStr = tip
        }
        state.showPopTip = show
    },
    // 设置用户名和token
    [types.DEL_TOKEN] (state) {
        state.token = ''
        state.user = ''
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    },
    // 设置用户名和token
    [types.SET_TOKEN] (state, payload) {
        state.user = payload.user.account
        state.token = payload.token
        localStorage.setItem('user', payload.user.account)
        localStorage.setItem('token', payload.token)
    },

}
