import registerVant from '@/plugins/vant'

const plugins = {
  install(Vue) {
    registerVant(Vue)
  }
}

export default plugins
