<template>
  <div>
    <div class="top" v-theme="'narrow'">
      <div class="right">
        <div class="welcome">
          欢迎，
          <span class="username">{{this.username}}</span>
        </div>
        <div class="login-out" @click="loginOut">[退出]</div>
      </div>
    </div>
    <nav v-theme="'narrow'">
      <ul>
        <li>
          <router-link to="/show" exact>博客</router-link>
          <router-link to="/add" exact>写博客</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
export default {
  name: 'BlogHeader',
  computed: {
    // ...mapState(['username']) // ...展开运算符 映射state里面的属性 直接获取值
    ...mapState({
        username: 'username'
    })
  },
  methods: {
      loginOut () {
        sessionStorage.setItem('key', '')
        this.$router.push('/')
      }
  }
 }
</script>

<style scoped>
.top {
  height: 40px;
  margin: 0 auto;
  background-color: #ddd;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.right {
  height: 100%;
  float: right;
  display: flex;
}
.welcome {
  padding: 0 10px 0 10px;
  /* background-color: red; */
}
.username{
    color: red;
    font-size: 18px;
    display: inline-block;
    /* background-color: #898989; */
}
.login-out {
  padding: 0 10px 0 10px;
  /* background-color: yellow; */
  cursor: pointer
}
nav {
  margin-top: 5px;
  margin: 0 auto;
  background-color: crimson;
  margin-bottom: 10px;
  padding: 20px;
}

ul {
  margin: 0;
  /*background-color: sandybrown;*/
  /*display: inline-block;*/
  list-style-type: none;
  text-align: center;
}

li {
  display: inline;
  margin-left: -15px;
  /*background-color: blanchedalmond;*/
}

a {
  text-decoration: none;
  background-color: crimson;
  margin: 0 20px;
  padding: 10px;
  color: white;
  border-radius: 5px;
}
.router-link-active {
  background: rgba(255, 255, 255, 0.8);
  color: #444;
}
</style>
