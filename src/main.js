// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import VueCookie from 'vue-cookie'
import axios from 'axios'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
Vue.use(MuseUI)
Vue.use(VueCookie)

Vue.prototype.$http = axios
Vue.config.productionTip = false

router.push('/login')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
