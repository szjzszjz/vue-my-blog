<template>
  <div class="registerPage outer row col-12 mx-auto">
    <div class="card inner col-4 registerCard" :style="registerCardStyle">
      <div class="title col-8 mx-auto">博客注册</div>
      <div class="card-body">
        <form @submit.prevent="onSubmit">
          <div class="form-group text-center mt-4">
            <input
              type="text"
              @input="checkUsername"
              class="form-control col-md-8 mx-auto"
              v-model="user.username"
              id="focusedInput"
              placeholder="用户名"
            />
            <div class="tip text-left col-md-8">{{ tip.username }}</div>
          </div>

          <div class="form-group text-center mt-3">
            <input
              type="password"
              @input="checkPassword"
              class="form-control col-md-8 mx-auto"
              v-model="user.password"
              placeholder="密码"
            />
            <div class="tip text-left col-md-8">{{ tip.password }}</div>
          </div>

          <div class="form-group text-center mt-3">
            <input
              type="password"
              @input="checkRePassword"
              class="form-control col-md-8 mx-auto"
              v-model="user.repassword"
              placeholder="确认密码"
            />
            <div class="tip text-left col-md-8">{{ tip.repassword }}</div>
          </div>

          <button type="submit" :class="[canSubmit ? successClass : failClass]">注册</button>
        </form>
        <div class="col-md-8 mx-auto bott mt-3">
          <div class="left" @click="registered">已注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      user: {
        username: '',
        password: '',
        repassword: ''
      },
      userList: { username: '用户名', password: '密码', repassword: '确认密码' },
      tip: {
        username: '',
        password: '',
        repassword: ''
      },
      timer: '',
      successClass: 'btn btn-success btn-block mt-4 col-md-8 mx-auto',
      failClass: 'btn btn-fail btn-block mt-4 col-md-8 mx-auto'
    }
  },
  computed: {
    registerCardStyle() {
      return {
        height: '370px'
      }
    },
    canSubmit: function () {
      if (this.user.username &&
        this.user.password &&
        this.user.repassword) {
        if (!this.tip.username && !this.tip.password && !this.tip.repassword) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    isEmpty: function () {
      if (!this.user.username &&
        !this.user.password &&
        !this.user.repassword) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    checkUsername() {
      if (this.user.username.length < 2 && this.user.username.length > 0) {
        this.tip.username = '* 用户名至少为两位！'
      } else {
        this.tip.username = ''
      }
    },
    checkPassword() {
      if (this.user.password.length < 4 && this.user.password.length > 0) {
        this.tip.password = '* 密码至少为四位！'
      } else {
        this.tip.password = ''
        if (this.user.password !== this.user.repassword) {
          if (this.user.repassword) {
            this.tip.repassword = '* 两次输入密码不一致！'
          }
        } else {
          this.tip.repassword = ''
        }
      }
    },
    checkRePassword() {
      if (this.user.repassword.length < 4 && this.user.repassword.length > 0) {
        this.tip.repassword = '* 密码至少为四位！'
      } else {
          if (this.user.password !== this.user.repassword) {
              this.tip.repassword = '* 两次输入密码不一致！'
        } else {
            this.tip.password = ''
          this.tip.repassword = ''
        }
        if (this.user.repassword.length === 0) {
            this.tip.repassword = ''
        }
      }
    },
    onSubmit() {
      if (this.isEmpty) {
        this.$alert({
          message: '请填写信息！',
          type: 'info'
        })
        return
      }

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

      if (!this.canSubmit) {
        this.$alert({
          message: '信息有误，请修改后提交！',
          type: 'error'
        })
        return
      }
      this.axios
        .post('/user/register', this.user)
        .then(res => {
          const result = res['data']
          console.log('result=', result)
          this.$alert({
            content: result['msg'],
            type: 'info'
          })
          if (result['errno'] === -1) {
            return
          }
          this.createTimer()
        })
        .catch(err => {
          console.log(err)
        })
    },
    createTimer() {
      this.timer = setTimeout(() => {
        // 向登录界面传递参数
        this.$router.push({
          path: '/',
          query: {
            username: this.user.username,
            password: this.user.password
          }
        })
      }, 2000)
    },
    registered() {
      this.$router.push('/')
    }
  },
  beforeDestroy() {
    window.clearTimeout(this.timer)
    console.log('beforeDestroy', this.timer)
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

<style lang="stylus" scoped>
@import '~styles/blur.styl';

.registerPage {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.registerCard {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  // height 350px
  background-color: #fff;
}

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

.tip {
  margin-top: 10px;
  color: red;
  font-size: 11px;
  height: 15px;
  margin: 0 auto;
  padding: 0;
  // background-color #666
}

.bott {
  padding: 0;
  display: flex;
  font-size: 14px;
}

.left {
  flex: 1;
  cursor: pointer;
  color: green;
  text-align: left;
}
</style>
