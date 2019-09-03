<template>
  <div class="loginPage outer row col-12 mx-auto">
    <div class="card inner loginCard  col-4 mx-auto">
      <div class="title col-8 mx-auto">博客登录</div>
      <div class="card-body ">
        <form @submit.prevent="onSubmit">
          <div class="form-group text-center mt-5">
            <!-- <label for="user.username">用戶名</label> -->
            <input
              type="text"
              class="form-control col-md-8 mx-auto"
              v-model="user.username"
              placeholder="用户名"
            />
          </div>
          <div class="form-group text-center mt-4">
            <!-- <label for="user.password">密码</label> -->
            <input
              type="current-password"
              class="form-control col-md-8 mx-auto"
              v-model="user.password"
              placeholder="密码"
            />
          </div>
          <button
            type="submit"
            class="btn btn-block btn-success mt-5 col-md-8 mx-auto"
          >
            登录
          </button>
        </form>
        <div class="col-md-8 mx-auto bott mt-3">
          <div class="left">还么有账号？</div>
          <!-- <router-view to="/register" tag="div"> -->
          <div class="right" @click="registerEvent">注册>>></div>
          <!-- </router-view> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: this.$route.query.username,
        password: this.$route.query.password
      },
      userList: {
        username: '用户名',
        password: '密码'
      }
    }
  },
  methods: {
    onSubmit() {
      for (let key in this.user) {
        let value = this.user[key]
        if (!value) {
          console.log('value: ', value, 'key: ', key)
          let value1 = this.userList[key]
          this.$alert({
            message: '请输入' + value1,
            type: 'info'
          })
          return
        }
      }
      this.axios.post('/user/login', this.user)
        .then((res) => {
          const result = res['data']
          console.log('result=', result)

          if (result['errno'] === -1) {
            this.$alert({
              message: result['msg'],
              type: 'error'
            })
            this.$store.commit('setUsername', null)
            return
          }
          const username = res['data']['data']['username']
          this.$store.commit('setUsername', username)
          sessionStorage.setItem('key', 'login-success')
          this.$router.push('/show')
        }).catch((err) => {
          console.log(err)
        })
    },
    registerEvent() {
      this.$router.push('/register')
    }
  },
  created() {
    this.$emit('changeStatus', false)
  }
  // 导航守卫 退出之后清空所有的信息
  // beforeRouteEnter: (to, from, next) => {
  //   next(vm => vm.$store.dispatch('updateStatus', null))
  // }
}
</script>

<style lang='stylus' scoped>
@import '~styles/blur.styl';

.title {
  position: absolute;
  top: -100px;
  right: 0;
  bottom: 0;
  left: 0;
  height: 60px;
  font-size: 35px;
  text-align: center;
  line-height: 60px;
  color: #ffffff;
  text-shadow: 4px, 5px, 5px;
  margin-bottom: 10px;
}

.loginPage {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.loginCard {
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 350px;
  background-color: #fff;
}

.bott {
  padding: 0;
  display: flex;
  font-size: 14px;
}

.left {
  // background-color yellow
  flex: 1;
  text-align: left;
}

.right {
  cursor: pointer;
  flex: 1;
  text-align: right;
}
</style>
