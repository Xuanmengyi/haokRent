import axios from 'axios'
import store from '@/store'
axios.defaults.baseURL = 'http://liufusong.top:8080'
axios.defaults.timeout = 5000
export default axios

axios.interceptors.request.use(
  function (config) {
    // 每一次发请求都会执行
    // 在发送请求之前都做些什么
    // 登录了，所有的请求都加上Authorization
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.authorization = tokenObj.token
    }
    return config
  },
  function (error) {
    console.log(error)
  }
)
