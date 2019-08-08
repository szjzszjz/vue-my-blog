import Vue from 'vue'
import Router from 'vue-router'
import ShowBlogs from '@/components/ShowBlogs'
import AddBlog from '@/components/AddBlog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShowBlogs',
      component: ShowBlogs
    },
    {
      path: '/add',
      name: 'AddBlog',
      component: AddBlog
    }
  ],
  mode: 'history' // 去掉地址后面默认自带的“#/” 实现正确的路由跳转
})
