# vue-my-blog

> 简单博客案例

## [node-blog 后台服务工程(node-blog-express分支)](https://github.com/szjzszjz/node-blog/tree/node-blog-express)

## [Vue 从搭建项目到打包的基本流程](http://note.youdao.com/noteshare?id=7d723b445de3c0bad26a6bd94f18483b&sub=953B8B7E4F1F405DA214CCCDC8672B08)

## 自定义功能组件
### 1. [位于屏幕中心的提醒弹窗](https://github.com/szjzszjz/vue-my-blog/tree/connect-mysql/src/common/alert)
### 2. [位于屏幕右下角的弹窗叠加提醒弹窗](https://github.com/szjzszjz/vue-my-blog/tree/connect-mysql/src/common/notification)

## install plugins

### 1、vue-resource

-   目的：发起请求并处理响应(vue2.0 之后，就不再对 vue-resource 更新，而是推荐使用 axios)  
    终端命令：`npm install vue-resource --save`  
    使用:

```javascript
import Resource from "vue-resource";
Vue.use(Resource);
```

安装完成之后重启项目：`npm run dev`

### 2、axios

-   目的：处理 ajax 请求

```text
npm install axios --save
npm run start
```

使用：

```js
// 钩子函数 页面展示之前请求数据
  created () {
    axios.get('http://jsonplaceholder.typicode.com/posts')
      .then(res => {
        this.blogs = res.data.slice(0, 10)
        console.log(this.blogs)
      }).catch(err => {
        console.log(err)
      })
  }
```

## 知识点

### 1、自定义指令 （v-xxx）

自定义全局指令

```js
// 自定义指令 不传参
Vue.directive("rainbow", {
    bind(element, binding, vNode) {
        element.style.color =
            "#" +
            Math.random()
                .toString(16)
                .slice(2, 8);
    }
});

// 自定义指令 带参
Vue.directive("theme", {
    bind(element, binding, vNode) {
        if (binding.value === "wide") {
            element.style.maxWidth = "1220px";
        } else if (binding.value === "narrow") {
            element.style.maxWidth = "560px";
        }

        if (binding.arg === "column") {
            element.style.background = "#6677cc";
        }
    }
});
```

自定义局部指令

```js
  directives: {
    'rainbow': {
      bind (el, binding, vnode) {
        el.style.color = '#' + Math.random().toString(16).slice(2, 8)
      }
    }
  }
```

使用：

```js
 <div id="show-blogs" v-theme:column="'narrow'">
    <h2>我的博客</h2>
    <div id="blog" v-for="blog of blogs" :key="blog.id">
      <h3 v-rainbow>{{blog.title}}</h3>
      <article>{{blog.body}}</article>
    </div>
  </div>
```

### 2、自定义过滤器

自定义全局过滤器

```js
//  (让所有的标题都是大写)
Vue.filter("to-uppercase", function(value) {
    return value.toUpperCase();
});

// 利用过滤器（展示博客内容摘要）
Vue.filter("snippet", function(value) {
    return value.slice(0, 100) + "  ...";
});
```

自定义局部过滤器

```js
 // 自定义局部过滤器
  filters: {
    'to-uppercase': function (value) {
      return value.toUpperCase()
    }

    // toUppercase (value) {
    //   return value.toUpperCase()
    // }
  }
```

使用：

```js
<!--      | 为通道 通道左边为要传的参数-->
      <h3 v-rainbow>{{blog.title | to-uppercase}}</h3>
      <article>{{blog.body | snippet}}</article>
```

### 全局导航路由 登录验证
router->index.js
```js
routes: [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/show",
        name: "ShowBlogs",
        component: ShowBlogs,
        meta: {
            requireAuth: true
        }
    }
];
```
```js
// 全局导航路由 登录验证
router.beforeEach((to, from, next) => {
    if (to.path === '/' || to.path === '/register') {
        next()
    } else {
        console.log(to.meta.requireAuth)
        console.log(sessionStorage.getItem('key') || 'null')

        if (to.meta.requireAuth) {
            console.log('该页面需要授权登陆')
            if (!sessionStorage.getItem('key')) {
                console.log('用户未登录')
                next({ path: '/' })
                return
            } else {
                console.log('该页面已授权可随时访问')
                next()
                return
            }
        }
        console.log('禁止访问非法界面', to.path)
        next({ path: '/' })
    }
})
```

### 页面跳转传值

```js
    // 向登录界面传递参数
    this.$router.push({
        path: '/',
        query: {
            username: this.user.username,
            password: this.user.password
        }
    })

    //接收
    data() {
        return {
            user: {
                username: this.$route.query.username,
                password: this.$route.query.password
            }
        }
    }
```

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
