import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.use(VueMoment)

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
