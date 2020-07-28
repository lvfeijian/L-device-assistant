const types = [
    'LOADING', // 更改全局loading状态
    'SET_CURR_ROUTER', // 设置当前路由
    'GET_WINDOW_SIZE', // 获取窗口的大小
    'POP_MESSAGE', // 控制全局提示
    'LOGIN', // 登陆
    'LOGIN_OUT', // 退出
    'SET_TOKEN', // 设置token和用户名
    'DEL_TOKEN', // 删除token和用户名
]

const typesObj = {}
types.forEach(type => {
    typesObj[type] = type
})
export default typesObj
