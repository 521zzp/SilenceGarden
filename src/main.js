// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//import 'whatwg-fetch' //兼容IE fetch
import '@/config/base.less'
import '@/config/animate.css'
import 'iview/dist/styles/iview.css'	


import { Row, Col } from 'iview';
Vue.component('Row', Row);
Vue.component('Col', Col);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
