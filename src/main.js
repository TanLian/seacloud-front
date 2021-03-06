// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import SvgIcon from './components/svg-icon.vue'
import FontIcon from './components/font-icon.vue'

import api from './api/index.js'

import '@/css/iconfont/iconfont.css'
import '@/css/iconfont/iconfont.js'

Vue.component('SvgIcon', SvgIcon)
Vue.component('FontIcon', FontIcon)

Vue.use(ElementUI)
Vue.use(iView)

Vue.prototype.$http = axios
Vue.prototype.$api = api

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
