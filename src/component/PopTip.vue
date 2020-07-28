<template>
    <div class="app-pop-tip">{{ popTipStr }}</div>
</template>
<script>
import types from '@/store/constants/types'
const showProp = '$store.state.showPopTip'
export default {
    name: 'PopTip',
    computed: {
        popTipStr () {
            return this.$store.state.popTipStr
        }
    },
    watch: {
        [showProp] (newVal) {
            const el = this.$el
            if (newVal) {
                el.classList.add('show')
                setTimeout(() => {
                    el.classList.add('active')
                }, 150)
                setTimeout(() => {
                    el && el.classList.remove('active')
                    setTimeout(() => {
                        el && el.classList.remove('show')
                    }, 150)
                    this.$store.commit(types.SWITCH_POP_TIP, { show: false })
                }, 3000)
            }
        }
    }
}
</script>
