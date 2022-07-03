import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import vant from '@/plugins/vant'
// 引入初始化css
import '@/style/reset.css'
Vue.use(vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
