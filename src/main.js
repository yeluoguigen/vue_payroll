// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 新增
import store from './store/index'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 表格导入
import Blob from './excel/Blob.js'
import Export2Excel from './excel/Export2Excel.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = ''
Vue.use(ElementUI, {
  size: 'small'
})
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
