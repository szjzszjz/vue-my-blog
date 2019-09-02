<template>
  <div class="row mt-3 col-8 mx-auto">
    <div class="col-md-12 col-lg-12">
      <div class="card loginc">
        <div class="card-body">
          <img src="../assets/logo.png" alt class="mx-auto d-block col-md-3" @click="alertView" />
          <form @submit.prevent="onSubmit">
            <div class="form-group text-center mt-5">
              <label for="user.username">用戶名</label>
              <input type="text" class="form-control col-md-4 mx-auto" v-model="user.username" />
            </div>
            <div class="form-group text-center mt-3">
              <label for="user.password">密码</label>
              <input
                type="current-password"
                class="form-control col-md-4 mx-auto"
                v-model="user.password"
              />
            </div>
            <button type="submit" class="btn btn-block btn-success mt-5 col-md-4 mx-auto">登录</button>
          </form>
          <div class="col-md-4 mx-auto bott mt-3">
            <div class="left">还么有账号？</div>
            <!-- <router-view to="/register" tag="div"> -->
            <div class="right" @click="registerEvent">注册>>></div>
            <!-- </router-view> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: this.$route.query.username,
        password: this.$route.query.password
      }
    //   username: this.$route.params.username
    }
  },
  methods: {
    onSubmit() {
      this.axios.post('/user/login', this.user)
        .then((res) => {
          const result = res['data']
          console.log('result=', result)

            if (result['errno'] === -1) {
                this.$alert({
                    content: result['msg'],
                    bgc: 'rgba(136, 146, 155, 0.8)',
                    autoCloseTime: 2000
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
    },
    alertView() {
      this.$alert({
        content: '这是',
        bgc: 'rgba(136, 146, 155, 0.8)',
        autoCloseTime: 2000
      })
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
  cursor: pointer;
  flex: 1;
  text-align: right;
}
</style>
