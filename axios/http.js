import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store/index'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';

//http request 拦截器
axios.interceptors.request.use(
    config => {
        //每次发送请求之前判断vuex中是否存在token
        //如果存在，则统一在http请求的herader中都加上token，后台会根据token判断你的登陆情况
        //即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        
    }
)