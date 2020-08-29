import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import { Lazyload } from 'vant';
import "@/util/filter.js"
//将懒加载配置安装在Vue身上
Vue.use(Lazyload);

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
