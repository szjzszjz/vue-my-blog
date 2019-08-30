<template>
  <div id="single-blog" v-theme="'narrow'">
    <div>
      <button v-on:click="updateBlog">编辑</button>
      <button v-on:click="deleteBlog">删除</button>
    </div>
    <h2>{{blog.title}}</h2>
    <p>作者：{{blog.author}}</p>
    <p>时间：{{time | formatDate}}</p>
    <p>分类：</p>
    <ul>
      <li v-for="(category,index) of categories" :key="index">{{category}}</li>
    </ul>
    <hr />
    <article>{{blog.content}}</article>
  </div>
</template>

<script>
import axios from 'axios'
import {formatDate} from '../utils/Date'

export default {
  name: 'SingleBlog',
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    }
  },
  methods: {
    deleteBlog: function() {
      // 删除博客
      console.log('/blog/delete?id=', this.id)
      axios.post('/blog/delete?id=' + this.id)
        .then(res => {
          this.$alert({
            content: res['data']['msg']
          })
          this.$router.push({path: '/show'}) // 删除完之后，跳转到主页
        }).catch(err => {
          console.log(err)
        })
    },
    updateBlog() {
      this.$router.push({path: '/edit/blog/' + this.blog.id})
    }

  },
  computed: {
    categories() {
      return this.blog.categories.split(',')
    },
    time() {
      return this.blog.createtime
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },

  // 页面未展示之前请求参数
  created() {
    // 博客详情
    axios.get('/blog/detail?id=' + this.id)
      .then(res => {
          const result = res.data
              console.log(res.data)
          if (result['errno'] === -1) {
              sessionStorage.setItem('accessToken', '')
           return
          }

        this.blog = res.data.data[0]
        console.log(this.blog.categories)
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
article::first-line {
  font-size: 20px;
  font-weight: lighter;
}

h2 {
  margin: 10px 0;
}
#single-blog div {
  /*background: yellow;*/
  margin: 0 5px 0;
  height: 35px;
}
#single-blog div button {
  float: right;
  background: sandybrown;
  border: none;
  border-radius: 2px;
  padding: 6px;
  margin: 0 10px;
  font-size: 10px;
}
</style>
