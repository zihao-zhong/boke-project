import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './mixins'
// 引入样式相关
import './assets/css/common.scss'
import './assets/css/element-ui.scss'
import 'mavon-editor/dist/css/index.css'

// 引入js相关的
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import { axios } from './utils/axios'
import mavonEditor from 'mavon-editor'

// 引入组件
import UploadImage from '@/components/UploadImage'

// 增加全局方法
Vue.prototype.$http = axios
Vue.prototype.$dayjs = dayjs

// 註冊第三方插件
Vue.use(ElementUI)
Vue.use(mavonEditor)


// 注册全局组件
Vue.component('upload-image', UploadImage)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
