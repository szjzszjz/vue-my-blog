<template>
  <div id="show-blogs" v-theme:column="'narrow'">
    <h2>我的博客</h2>
    <input type="text" placeholder="搜索" v-model="search">
    <div id="blog" v-for="blog of filteredBlogs" :key="blog.id">
      <!--      跳转界面并传参-->
      <router-link v-bind:to="'/blog/' + blog.id">
        <!--      | 为通道 通道左边为要传的参数-->
        <h3 v-rainbow>{{blog.title | to-uppercase}}</h3>
        <article>{{blog.content | snippet}}</article>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ShowBlogs',
  data () {
    return {
      blogs: [],
      search: ''
    }
  },
  // 钩子函数 页面展示之前请求数据
  created: function () {
    axios.get('https://my-blog-c88ab.firebaseio.com/posts.json')
      .then(res => {
        for (let key in res.data) {
          var object = res.data
          // console.log(key)
          // console.log(res.data[key])
          object[key].id = key
          this.blogs.push(object[key])
          console.log(this.blogs)
        }
      }).catch(err => {
        console.log(err)
      })
  },
  // 计算属性
  computed: {
    filteredBlogs: function () {
      return this.blogs.filter((blog) => {
        return blog.title.match(this.search)
      })
    }
  },

  // 自定义局部过滤器
  filters: {
    'to-uppercase': function (value) {
      return value.toUpperCase()
    }

    // toUppercase (value) {
    //   return value.toUpperCase()
    // }
  },

  // 自定义局部指令
  directives: {
    'rainbow': {
      bind (el, binding, vnode) {
        el.style.color = '#' + Math.random().toString(16).slice(2, 8)
      }
    }
  }

}
</script>

<style scoped>
  #show-blogs {
    /*max-width: 800px;*/
    padding: 20px;
    margin: 0 auto;
  }

  #blog {
    background-color: #eee;
    padding: 10px;
    margin: 10px 0;
  }

  /*取消连接下划线*/
  a{
    text-decoration: none;
  }

  div input{
    width: 100%;
    padding: 5px 10px;
    margin: 5px auto;
    box-sizing: border-box;
  }
</style>
