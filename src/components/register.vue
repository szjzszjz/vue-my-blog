<template>
  <div class="row mt-3 col-8 mx-auto">
    <div class="col-md-12 col-lg-12">
      <div class="card loginc">
        <div class="card-body">
          <img src="../assets/logo.png" alt class="mx-auto d-block col-md-3" @click="alertView" />
          <form @submit.prevent="onSubmit">
            <div class="form-group text-center mt-5">
              <!-- <label for="user.username">用戶名</label> -->
              <input
                type="text"
                @change="checkUsername"
                class="form-control col-md-4 mx-auto"
                v-model="user.username"
                placeholder="用户名"
              />
            </div>
            <span>{{tip.username}}</span>
            <div class="form-group text-center mt-4">
              <!-- <label for="user.password">密码</label> -->
              <input
                type="password"
                class="form-control col-md-4 mx-auto"
                v-model="user.password"
                placeholder="密码"
              />
            </div>
            <div class="col-md-4 mx-auto">{{tip.password}}</div>

            <div class="form-group text-center mt-4">
              <!-- <label for="user.repassword">确认密码</label> -->
              <input
                type="current-password"
                class="form-control col-md-4 mx-auto"
                v-model="user.repassword"
                placeholder="确认密码"
              />
            </div>
            <button type="submit" class="btn btn-block btn-success mt-5 col-md-4 mx-auto">注册</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  name: 'Register',
  data() {
    return {
      user: {
        username: '',
        password: '',
        repassword: '',
        timer: ''
      },
        tip: {
            username: '',
            password: '',
            repassword: ''
        }
    }
  },
  methods: {
      checkUsername() {
          console.log('ddd')
          if (this.user.username.length < 2) {
            this.tip.username = '用户名至少为两位！'
          } else {
            this.tip.username = ''
          }
      },
    onSubmit() {
        if (this.user.password !== this.user.repassword) {
            this.$alert({
                content: '两次输入密码不一致！'
            })
            return
        }
        if (!this.user.password || !this.user.username) {
            this.$alert({
                content: '用户名或密码不能为空！'
            })
            return
        }

        this.axios.post('/user/register', this.user)
        .then((res) => {
            const result = res['data']
            console.log('result=', result)
            this.$alert({
                content: result['msg'],
                bgc: 'rgba(136, 146, 155, 0.8)',
                autoCloseTime: 2000
             })
             this.createTimer()
        }).catch((err) => {
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
    alertView() {
      this.$alert({
        content: '这是提醒',
        bgc: 'rgba(136, 146, 155, 0.8)',
        autoCloseTime: 2000
      })
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

<style lang='stylus' scoped>
.loginc {
  border: 0px solid red;
}

.bott {
  padding: 0;
  display: flex;
  // background-color red
  font-size: 14px;
}

.left {
  // background-color yellow
  flex: 1;
  text-align: left;
}

.right {
  flex: 1;
  text-align: right;
}
</style>
