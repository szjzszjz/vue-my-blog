<template>
  <div id="single-blog" v-theme="'narrow'">
    <div>
      <button v-on:click="updateBlog">编辑</button>
      <button v-on:click="deleteBlog">删除</button>
    </div>
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
  methods: {
    deleteBlog: function () {
      axios.delete('/posts/' + this.id + '.json')
        .then(res => {
          console.log(res)
          this.$router.push({path: '/'}) // 删除完之后，跳转到主页
        }).catch(err => {
          console.log(err)
        })
    },
    updateBlog () {
      console.log('gengxin')
      this.$router.push({path: '/edit/blog/' + this.id})
    }

  },

  // 页面未展示之前请求参数
  created () {
    axios.get('/posts/' + this.id + '.json')
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

  h2{
    margin: 10px 0;
  }
  #single-blog div{
    /*background: yellow;*/
    margin: 0 5px 0;
    height: 35px;
  }
  #single-blog div button{
    float: right;
    background: sandybrown;
    border: none;
    border-radius: 2px;
    padding: 6px;
    margin: 0 10px;
    font-size: 10px;
  }

</style>
