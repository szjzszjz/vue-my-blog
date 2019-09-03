<template>
  <div id="add-blog">
    <h2 v-on:click="hClick">添加博客</h2>
    <form v-if="!submitted">
      <label>博客标题</label>
      <input type="text" v-model="blog.title" />

      <label>博客内容</label>
      <textarea v-model="blog.content"></textarea>

      <label>标签</label>
      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="categoryArr" />
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="categoryArr" />
        <label>Rect</label>
        <input type="checkbox" value="Rect" v-model="categoryArr" />
        <label>Angular.js</label>
        <input type="checkbox" value="Angular.js" v-model="categoryArr" />
      </div>

      <!-- <label>作者：{{blog.author}}</label> -->
      <!-- <input type="text" v-model="blog.author" placeholder="请输入作者名称" /> -->
      <!-- <select v-model="blog.author">
        <option v-for="(author,index) of authors" :key="index">{{author}}</option>
      </select>-->

      <button v-on:click.prevent="post">完成</button>
    </form>

    <h4 v-if="submitted">发布成功！</h4>
    <hr />

    <!--    内容预览-->
    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题：{{blog.title}}</p>
      <p>博客内容：</p>
      <p>{{blog.content}}</p>

      <div id="tag">
        <p>标签：</p>
        <ul>
          <li v-for="(category,index) of this.categoryArr" :key="index">{{category}}</li>
        </ul>
      </div>
      <!-- <p>作者：{{blog.author}}</p> -->
    </div>
    <button @click="again" v-show="showAgain">再写一篇</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddBlog',
  data: function() {
    return {
      blog: {
        title: '',
        content: '',
        categories: '',
        author: ''
      },
      authors: [
        'bobi',
        'haney',
        'johan'
      ],
      categoryArr: [],
      submitted: false,
      showAgain: false
    }
  },
  methods: {
    // 新增博客
    post: function() {
      this.blog.categories = this.categoryArr.join(',')
      console.log('this.blog.categories--', this.blog.categories)
      console.log('this.categoryArr', this.categoryArr)

      if (this.blog.categories) {
        axios.post('/blog/new', this.blog)
          .then((data) => {
            this.submitted = true
            this.showAgain = true
            const errno = data['data']['errno']
            if (errno === -1) {
                sessionStorage.setItem('key', '')
                return
            }

            console.log('发布的数据=', data)
            if (data['data']['data']['id']) {
              this.$alert({
                message: '发布成功！',
                type: 'success'
              })
            }
          }).catch(err => {
            this.submitted = false
            this.showAgain = false
            this.$alert({
              message: '发布失败！',
              type: 'error'
            })
            console.log(err)
          })
      } else {
        this.$alert({
          message: '请选择分类',
          type: 'info'
        })
      }
    },
    hClick: function() {
    //   this.submitted = false
    },
    again() {
      // 刷新当前界面
      this.$router.go(0)
    }
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

input[type="text"],
textarea {
  width: 100%;
  display: block;
  padding: 8px;
}

textarea {
  height: 200px;
}

#checkboxes label {
  display: inline-block;
  margin-top: 0;
}
#checkboxes input {
  margin-right: 20px;
  display: inline-block;
}
button {
  display: block;
  margin-top: 20px;
  padding: 8px;
  border: 0;
  border-radius: 5px;
  background-color: sandybrown;
  color: white;
}

#preview {
  margin: 30px 0px;
  border: 1px solid brown;
  padding: 20px;
}
h3 {
  color: brown;
}

#tag {
  display: flex;
}

#tag p {
  width: 80px;
  /*background-color: green;*/
}
/*使ul内部li变为横向布局 并且不出范围自动换行*/
ul {
  display: flex;
  flex-wrap: wrap;
  /*background-color: brown;*/
  padding-left: 0px;
}

li {
  /*display: inline;*/
  list-style-type: none;
  margin: 5px 10px;
  border: 1px solid brown;
  border-radius: 3px;
  padding: 3px 8px;
  font-size: 14px;
}
</style>
