// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Resource from 'vue-resource'
import axios from 'axios'
import router from './router'
import { store } from './store/index'
import AlertView from './common/alert/index'
import NotificationBar from './common/notification/index'

Vue.use(AlertView)
Vue.use(NotificationBar)
Vue.config.productionTip = false
// 全局的axios
Vue.prototype.axios = axios
// 配置全局的URL
axios.defaults.baseURL = 'http://localhost:8080/api'

// 自定义全局指令 不传参
Vue.directive('rainbow', {
    bind(element, binding, vNode) {
        element.style.color = '#' + Math.random().toString(16).slice(2, 8)
    }
})

// 自定义全局指令 带参
Vue.directive('theme', {
    bind(element, binding, vNode) {
        if (binding.value === 'wide') {
            element.style.maxWidth = '1220px'
        } else if (binding.value === 'narrow') {
            element.style.maxWidth = '560px'
        }

        if (binding.arg === 'column') {
            element.style.background = '#6677cc'
        }
    }
})

// 自定义全局过滤器 (让所有的标题都是大写)
// Vue.filter('to-uppercase', function (value) {
//   return value.toUpperCase()
// })

// 利用全局过滤器（展示博客内容摘要）
Vue.filter('snippet', function (value) {
    return value.slice(0, 100) + '  ...'
})

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next()
    } else {
        console.log(to.path)
    }
})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
