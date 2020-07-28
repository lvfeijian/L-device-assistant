<template>
    <div class="login-page page">
        <div class="welcome">Hi!欢迎登录</div>
        <div class="title">设备更换小助手</div>
        <div class="login">
            <p class="login_title">账号登录</p>
            <div class="input">
                <span class="shouji"></span>
                <input type="text" placeholder="请输入账号" v-model="user" ref='userInput'>
            </div>
            <div class="input">
                <span class="suo"></span>
                <input type="password" placeholder="请输入账号" v-model="pwd" ref='pwdInput'>
            </div>
            <div class="login" @click="doLogin()">登录</div>
        </div>
    </div>
</template>
<script>
import types from '@/store/constants/types'
import { mapState } from 'vuex'

export default {
    name: 'LoginPage',
    computed: {
        ...mapState({
            loading: state => state.loading
        })
    },
    data () {
        return {
            user: '18370308525',
            pwd: 'lfj123'
        }
    },
    created () {
        const that = this
    },
    mounted () {
        const that = this
        const store = that.$store
        store.commit(types.LOADING, false)
    },
    methods: {
        // 登录
        doLogin () {
            const that = this
            const store = that.$store
            if (that.checkForm) {
                store.commit(types.LOADING, true)
                store.dispatch(types.LOGIN, {
                    user: that.user.trim(),
                    pwd: that.pwd
                }).then(res => {
                    if (res.status === '200' && res.data) {
                        store.commit(types.LOADING, false)
                        store.commit(types.SET_TOKEN, res.data)
                        that.$router.push({ name: 'home' })
                    } else {
                        that.$store.commit(types.POP_MESSAGE, res.msg)
                    }
                })
            }
        },
        // 校验表单
        checkForm () {
            const that = this
            const refs = that.$refs
            if (!that.user.trim()) {
                refs.userInput.focus()
                that.$store.commit(types.POP_MESSAGE, '请输入您的登录账号！')
                return false
            }
            if (!that.pwd) {
                refs.pwdInput.focus()
                that.$store.commit(types.POP_MESSAGE, '请输入您的登录密码！')
                return false
            }
            return true
        },
    },
}
</script>
<style lang="scss">
@import "@/style/page/login.scss";
</style>
