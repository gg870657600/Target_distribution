// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import qs from 'qs'

import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import "element-ui/lib/index.js"
import "./mock.js"
import "../font/font_1/iconfont.css"

import store from "./store"

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

// Vue.use(qs)
Vue.use(ElementUI);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
//   qs,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
