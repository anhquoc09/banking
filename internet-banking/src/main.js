import 'bootstrap337/dist/css/bootstrap.min.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
