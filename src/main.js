import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import vant from '@/plugins/vant'
// 引入vuex
import store from '@/store'
// 引入百度地图插件
import BaiduMap from 'vue-baidu-map'
// 引入自己的icon
import Icon from '@/components/IconFont'
import '@/style/iconfont/iconfont.css'

// 引入适配文件
import 'amfe-flexible'
// 引入初始化css
import '@/style/reset.css'
Vue.component('Icon', Icon)
Vue.use(vant)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'r4lkPkGL4QLvGezWaLCjameqNEhFT3cm'
})
Vue.config.productionTip = false

new Vue({
  store, // vuex
  router,
  render: (h) => h(App)
}).$mount('#app')
