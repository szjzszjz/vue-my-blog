<template>
  <div id="add-blog">
    <h2 v-on:click="hClick">编辑博客</h2>
    <form v-if="!submitted">

      <label>博客标题</label>
      <input type="text" v-model="blog.title">

      <label>博客内容</label>
      <textarea v-model="blog.content"></textarea>

      <label>标签</label>
      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories">
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories">
        <label>Rect</label>
        <input type="checkbox" value="Rect" v-model="blog.categories">
        <label>Angular.js</label>
        <input type="checkbox" value="Angular.js" v-model="blog.categories">
      </div>

      <label>作者</label>
      <select v-model="blog.author">
        <option v-for="(author,index) of authors" :key="index">
          {{author}}
        </option>
      </select>

      <button v-on:click.prevent="edit">添加博客</button>
    </form>

    <h4 v-if="submitted">修改成功！</h4>
    <hr>

    <!--    内容预览-->
    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题：{{blog.title}}</p>
      <p>博客内容：</p>
      <p>{{blog.content}}</p>

      <div id="tag">
        <p>标签：</p>
        <ul>
          <li v-for="(category,index) of blog.categories" :key="index">{{category}}</li>
        </ul>
      </div>
      <p>作者：{{blog.author}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddBlog',
  data: function () {
    return {
      id: this.$route.params.id,
      blog: {},
      authors: [
        'bobi',
        'haney',
        'johan'
      ],
      submitted: false

    }
  },
  methods: {
    edit: function () {
      this.submitted = true
      axios.put('https://my-blog-c88ab.firebaseio.com/posts/' + this.id + '.json', this.blog)
        .then(function (data) {
          console.log(data)
        }).catch(err => {
          console.log(err)
        })
    },
    hClick: function () {
      this.submitted = false
    }
  },
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
  #add-blog * {
    box-sizing: border-box;
    /*就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。

    通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。*/
  }

  #add-blog {
    margin: 0 auto;
    max-width: 600px;
    padding: 20px;
  }

  label {
    display: block;
    margin: 20px 0 10px;
  }

  input[type="text"], textarea {
    width: 100%;
    display: block;
    padding: 8px;
  }

  textarea{
    height: 200px;
  }

  #checkboxes label{
    display: inline-block;
    margin-top: 0;
  }
  #checkboxes input{
    margin-right: 20px;
    display: inline-block;
  }
  button{
    display: block;
    margin-top: 20px;
    padding: 8px;
    border: 0;
    border-radius: 5px;
    background-color: sandybrown;
    color: white;
  }

  #preview{
    margin: 30px 0px;
    border: 1px solid brown;
    padding: 20px;
  }
  h3{
    color: brown;
  }

  #tag{
    display: flex;
  }

  #tag p{
    width: 80px;
    /*background-color: green;*/
  }
  /*使ul内部li变为横向布局 并且不出范围自动换行*/
  ul{
    display: flex;
    flex-wrap: wrap;
    /*background-color: brown;*/
    padding-left: 0px;
  }

  li{
    /*display: inline;*/
    list-style-type: none;
    margin:5px 10px;
    border: 1px solid brown;
    border-radius: 3px;
    padding: 3px 8px;
    font-size: 14px;
  }

</style>
