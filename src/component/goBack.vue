<template>
    <div class="goBack" @click="goBack()"></div>
</template>

<script>
export default {
    name: '',
    data () {
        return {
        }
    },
    methods: {
        goBack () {
            this.$emit('goback')
        }
    },
}
</script>

<style lang="scss">
@import '@/style/cpn/go_back.scss';
</style>