<template>
    <div id="app">
        <router-view />
        <Spinner class="loading-wrap" :class="{ active: loading }"></Spinner>
        <PopTip></PopTip>
    </div>
</template>

<script>
import Spinner from '@/component/Spinner'
import PopTip from '@/component/PopTip'
import { mapState } from 'vuex'
import types from '@/store/constants/types'
export default {
    name: 'app',
    components: {
        Spinner, PopTip
    },
    computed: {
        ...mapState(['loading'])
    },
    created () {
        const that = this
        const store = that.$store
        const win = window
        // 监听窗口大小的改变
        win.addEventListener('resize', () => {
            store.commit(types.GET_WINDOW_SIZE)
        })
        store.commit(types.GET_WINDOW_SIZE)
    }
}
</script>

<style lang="scss">
@import "@/style/common/global.scss";
</style>
