<template>
    <div class="home-page page">
        <div class="head">
            <goBack @goback='doGoBack()'></goBack>
            <h1 class="title">更换设备</h1>
        </div>
        <div class="cont">
            <div class="circle" v-show="index<=3">
                <div v-for="item in 3" :class="index >= item ? 'active' : ''" :key="item">{{item}}</div>
            </div>
            <ul class="step" v-for="(item,key) in deviceInfo" :key="key" v-show="key+1==index">
                <li class="device_info">{{item.title}}</li>
                <li>{{item.step[0]}}</li>
                <li>{{item.step[1]}}</li>
                <li>{{item.step[2]}}</li>
            </ul>
            <p class="note" v-show="index <= 3">注：设备状态离线或未激活，不影响设备更换</p>
            <div v-show="index==1">
                <div class="input">
                    <span class="xuliehao"></span>
                    <input type="text" placeholder="手动输入序列号或扫码获取" v-model="oldNumber" @input="setInputStatus()">
                    <i class="saoyisao" @click="doWxScanCode()"></i>
                </div>
                <div class="input">
                    <span class="shebei"></span>
                    <input type="password" v-model="oldType" @input="setInputStatus()">
                </div>
            </div>
            <div v-show="index == 2">
                <div class="input">
                    <span class="xuliehao"></span>
                    <input type="text" placeholder="手动输入序列号或扫码获取22" v-model="newNumber" @input="setInputStatus()">
                    <i class="saoyisao" @click="doWxScanCode()"></i>
                </div>
                <div class="input">
                    <span class="shebei"></span>
                    <input type="password" v-model="newType" @input="setInputStatus()">
                </div>
            </div>
            <div v-show="index == 3">
                <div class="serial_number">
                    <div class="service_info">
                        <span>旧设备序列号：</span>
                        <span>{{oldNumber}}</span>
                        <span>修改</span>
                    </div>
                    <div class="service_info">
                        <span>旧设备状态：</span>
                        <span>{{oldType}}</span>
                    </div>
                </div>
                <div class="serial_number">
                    <div class="service_info">
                        <span>新设备序列号：</span>
                        <span>{{newNumber}}</span>
                        <span>修改</span>
                    </div>
                    <div class="service_info">
                        <span>新设备状态：</span>
                        <span>{{newType}}</span>
                    </div>
                </div>
            </div>
            <div v-show="index == 4">
                <p class="success">更换成功</p>
            </div>
            <div class="next" :class="{ active: !isDisabled}" @click="doReplaceDevice(index)">{{index == 1 || index == 2 ? '下一步' : index == 3 ? '确定更换' : '完成'}}</div>
        </div>
    </div>
</template>
<script>
import types from '@/store/constants/types'
import goBack from '@/component/goBack'
import { mapState } from 'vuex'

export default {
    name: 'HomePage',
    computed: {
        ...mapState({
            loading: state => state.loading
        })
    },
    components: {
        goBack
    },
    watch: {
        // 监听index，判断按钮是否可以点击
        index (newval, oldval) {
            if (newval <= 2 && newval > oldval) {
                this.isDisabled = false
                if (newval == 2 && oldval == 1) {
                    this.isDisabled = true
                }
            } else {
                this.isDisabled = true
            }
        }
    },
    created () {
        this.setInputStatus()
    },
    mounted () {
        const that = this
        const store = that.$store
        store.commit(types.LOADING, false)
    },
    data () {
        return {
            // 设备下一步的数据
            deviceInfo: [
                {
                    title: '获取旧设备信息',
                    step: ['1.将有故障的设备拆下', '2.扫描旧设备主体上的二维码，获取设备序列号，如无法识别可进行手动输入', '3.若旧设备信息获取无误，点击进行下一步']
                },
                {
                    title: '获取新设备信息',
                    step: ['1.准备好需要安装的新设备', '2.扫描新设备主体上的二维码，获取设备序列号，如无法识别可进行手动输入', '3.若新设备信息获取无误，点击“下一步”']
                },
                {
                    title: '核对新旧设备信息',
                    step: ['1.核对新旧设备信息。', '2.若信息有误可修改设备信息', '3.新旧设备信息确认无误后，点击“确认更换”']
                }
            ],
            index: 1, // 显示三个步骤的哪一步
            oldNumber: '',
            oldType: '',
            newNumber: '',
            newType: '',
            isDisabled: false, // 下一步按钮是否可以选择,默认不可选中
        }
    },
    methods: {
        // 点击下一步按钮
        doReplaceDevice (index) {
            const that = this
            if (that.oldNumber.length > 0 && that.oldType.length > 0) {
                that.index++
            }
            if (index == 4) { // 退出
                that.$router.push({ name: '/login' })
                that.index = 1
            }
        },
        // 修改下一步按钮的状态
        setInputStatus () {
            const that = this
            if (that.index == 1) {
                if (that.oldNumber.trim().length && that.oldType.length) {
                    that.isDisabled = true
                } else {
                    that.isDisabled = false
                }
            } else if (that.index == 2) {
                if (that.newNumber.trim().length && that.newType.length) {
                    that.isDisabled = true
                } else {
                    that.isDisabled = false
                }
            }
            // console.log(that.oldNumber.length)
            // console.log(that.oldType.length)
        },
        // 父组件的点击返回上一个界面
        doGoBack () {
            if (this.index > 1) {
                this.index--
            } else {
                // 退出登录
                this.$store.commit(types.LOADING, true)
                this.$store.commit(types.DEL_TOKEN)
                // 这里要加一个退出的接口 this.$store.dispatch(types.LOGIN_OUT)
                this.$router.push({ name: 'login' })
            }
        },
        // 扫一扫
        doWxScanCode () {
            console.log('21231')
        }
    },
}
</script>
<style lang="scss">
@import "@/style/page/home.scss";
</style>
