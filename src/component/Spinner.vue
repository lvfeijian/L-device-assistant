<template>
    <div class="lds-css ng-scope loading-wrap show active">
        <div style="width:100%;height:100%" class="lds-eclipse">
            <div></div>
        </div>
    </div>
</template>
<script type="text/babel">
const showProp = '$store.state.loading'
let timer = null
export default {
    name: 'Loading',
    watch: {
        [showProp] (newVal) {
            const el = this.$el
            timer && clearTimeout(timer)
            if (newVal) {
                el.classList.add('show')
                timer = setTimeout(() => {
                    el.classList.add('active')
                }, 150)
            } else {
                el.classList.remove('active')
                timer = setTimeout(() => {
                    el.classList.remove('show')
                }, 550)
            }
        }
    }
}
</script>
<style>
@keyframes lds-eclipse {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@-webkit-keyframes lds-eclipse {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
.lds-eclipse {
    position: relative;
}
.lds-eclipse div {
    position: absolute;
    -webkit-animation: lds-eclipse 1s linear infinite;
    animation: lds-eclipse 1s linear infinite;
    width: 180px;
    height: 180px;
    top: 25px;
    left: 25px;
    border-radius: 50%;
    box-shadow: 0 4px 0 0 #fff;
    -webkit-transform-origin: 90px 92px;
    transform-origin: 90px 92px;
}
.lds-eclipse {
    width: 240px !important;
    height: 240px !important;
    -webkit-transform: translate(-120px, -120px) scale(1)
        translate(120px, 120px);
    transform: translate(-120px, -120px) scale(1) translate(120px, 120px);
}
</style>
