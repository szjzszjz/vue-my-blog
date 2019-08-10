import Vue from 'vue'
import Router from 'vue-router'
import ShowBlogs from '@/components/ShowBlogs'
import AddBlog from '@/components/AddBlog'
import SingleBlog from '@/components/SingleBlog'
import EditBlog from '@/components/EditBlog'

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
    },
    {
      path: '/blog/:id',
      name: 'SingleBlog',
      component: SingleBlog
    },
    {
      path: '/edit/blog/:id',
      name: 'EditBlog',
      component: EditBlog
    }
  ],
  mode: 'history' // 去掉地址后面默认自带的“#/” 实现正确的路由跳转
})
