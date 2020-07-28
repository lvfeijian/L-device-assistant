import ns from '@/store/constants/ns'
import login from './login/index'
import home from './home/index'

export default {
    [ns.LOGIN]: login,
    [ns.HOME]: home
}
