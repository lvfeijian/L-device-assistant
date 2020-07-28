import types from '@/store/constants/types'
import ajax from '@/lib/ajax'
import api from '@/lib/api'

export default {
    // 用户登录
    [types.LOGIN] (context, payload) {
        const that = this
        const mobile = payload.user
        const password = payload.pwd
        return ajax({
            url: api.LOGIN,
            method: 'post',
            data: {
                mobile,
                password
            }
        })
    },
}
