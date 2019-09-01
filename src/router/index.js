import Vue from 'vue'
import Router from 'vue-router'
import ShowBlogs from '@/components/ShowBlogs'
import AddBlog from '@/components/AddBlog'
import SingleBlog from '@/components/SingleBlog'
import EditBlog from '@/components/EditBlog'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/show',
            name: 'ShowBlogs',
            component: ShowBlogs,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/add',
            name: 'AddBlog',
            component: AddBlog,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/blog/:id',
            name: 'SingleBlog',
            component: SingleBlog,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/edit/blog/:id',
            name: 'EditBlog',
            component: EditBlog,
            meta: {
                requireAuth: true
            }
        }
    ],
    mode: 'history' // 去掉地址后面默认自带的“#/” 实现正确的路由跳转
})
