<template>
  <div id="single-blog" v-theme="'narrow'">
    <h2>{{blog.title}}</h2>
    <hr>
    <article>{{blog.body}}</article>
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
    axios.get('http://jsonplaceholder.typicode.com/posts/' + this.id)
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
