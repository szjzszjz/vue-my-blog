<template>
  <div id="show-blogs" v-theme:column="'narrow'">
    <h2>我的博客</h2>
    <input type="text" placeholder="SEARCH" v-model="search">
    <div id="blog" v-for="blog of filteredBlogs" :key="blog.id">
      <!--      | 为通道 通道左边为要传的参数-->
      <h3 v-rainbow>{{blog.title | to-uppercase}}</h3>
      <article>{{blog.body | snippet}}</article>
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
  created () {
    axios.get('http://jsonplaceholder.typicode.com/posts')
      .then(res => {
        this.blogs = res.data.slice(0, 10)
        console.log(this.blogs)
      }).catch(err => {
        console.log(err)
      })
  },
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

</style>
