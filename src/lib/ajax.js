/** ajax 基于axios */
import axios from 'axios'
import config from '@/lib/config'
import store from '@/store/index'

const Qs = require('qs')
const token = window.sessionStorage.getItem('token')
axios.defaults.baseURL = ''
// 请求发送之前的拦截器
axios.interceptors.request.use(
    config => {
        config.headers.Authorization = token
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 请求响应拦截器
axios.interceptors.response.use(
    res => {
        return Promise.resolve(res)
    },
    error => {
        return Promise.reject(error)
    }
)

export default function (options) {
    if (/post/i.test(options.method) && !options.headers) {
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        if (options.data) { options.data = Qs.stringify(options.data) }
    }
    // if (!/json/.test(options.url)) {
    //     options.url = config.baseUrl + options.url
    // }
    if (/get/i.test(options.method) && !options.headers) {
        options.url += ('?' + Qs.stringify(options.data))
    }
    return new Promise((resolve, reject) => {
        axios.request(options).then(
            res => {
                if (
                    res.data.status == '999007' ||
                    res.data.msg == 'token过期'
                ) {
                    store.state.currRouter.instance.push({ name: 'login' })
                } else {
                    resolve(res.data)
                }
            },
            error => {
                reject(error)
            }
        )
    })
}
