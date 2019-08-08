# vue-my-blog

> 简单博客案例

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## [Vue从搭建项目到打包的基本流程](http://note.youdao.com/noteshare?id=7d723b445de3c0bad26a6bd94f18483b&sub=953B8B7E4F1F405DA214CCCDC8672B08)

## install plugins
### 1、vue-resource  
* 目的：发起请求并处理响应(vue2.0之后，就不再对vue-resource更新，而是推荐使用axios)  
终端命令：`npm install vue-resource --save`  
使用:  
```javascript
import Resource from 'vue-resource'  
Vue.use(Resource)  

``` 
安装完成之后重启项目：`npm run dev `

### 2、axios  
* 目的：处理ajax请求    
```text
npm install axios --save
npm run start
```  
使用：
```vuejs
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
```javascript
// 自定义指令 不传参
Vue.directive('rainbow', {
  bind (element, binding, vNode) {
    element.style.color = '#' + Math.random().toString(16).slice(2, 8)
  }
})

// 自定义指令 带参
Vue.directive('theme', {
  bind (element, binding, vNode) {
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
```
自定义局部指令
```vuejs
  directives: {
    'rainbow': {
      bind (el, binding, vnode) {
        el.style.color = '#' + Math.random().toString(16).slice(2, 8)
      }
    }
  }
```
使用：
```Vue
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
```vuejs
//  (让所有的标题都是大写)
Vue.filter('to-uppercase', function (value) {
  return value.toUpperCase()
})

// 利用过滤器（展示博客内容摘要）
Vue.filter('snippet', function (value) {
  return value.slice(0, 100) + '  ...'
})
```
自定义局部过滤器
```vuejs
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
```Vue
<!--      | 为通道 通道左边为要传的参数-->
      <h3 v-rainbow>{{blog.title | to-uppercase}}</h3>
      <article>{{blog.body | snippet}}</article>
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
