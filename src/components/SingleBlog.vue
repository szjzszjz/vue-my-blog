<template>
  <div id="single-blog" v-theme="'narrow'">
    <h2>{{blog.title}}</h2>
    <p>作者：{{blog.author}}</p>
    <p>分类：</p>
    <ul>
      <li v-for="(category,index) of blog.categories" :key="index">
        {{category}}
      </li>
    </ul>
    <hr>
    <article>{{blog.content}}</article>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SingleBlog',
  data () {
    return {
      id: this.$route.params.id,
      blog: {}
    }
  },

  // 页面未展示之前请求参数
  created () {
    axios.get('https://my-blog-c88ab.firebaseio.com/posts/' + this.id + '.json')
      .then(res => {
        console.log(res)
        this.blog = res.data
      }).catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>

  #single-blog {
    background-color: #eeeeee;
    margin: 0 auto;
    padding: 20px;

  }

  /*伪元素选择器*/
  article::first-line{
    font-size: 20px;
    font-weight: lighter;
  }

</style>
