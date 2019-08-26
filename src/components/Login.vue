<template>
  <div class="row mt-3 col-8 mx-auto ">
    <div class="col-md-12 col-lg-12 ">
      <div class="card loginc">
        <div class="card-body">
          <img src="../assets/logo.png" alt class="mx-auto d-block col-md-3" />
          <form @submit.prevent="onSubmit">
            <div class="form-group text-center mt-5">
              <label for="user.username">用戶名</label>
              <input type="text" class="form-control col-md-4 mx-auto" v-model="user.username" />
            </div>
            <div class="form-group text-center mt-3">
              <label for="user.password">密码</label>
              <input type="current-password" class="form-control col-md-4 mx-auto" v-model="user.password" />
            </div>
            <button type="submit" class="btn btn-block btn-success mt-5 col-md-4 mx-auto">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('login------------')

      this.axios.post('/user/login', this.user)
        .then((res) => {
          console.log('/api/user/login--', res.data)

          if (res.data['errno'] !== -1) {
            this.$router.push('/show')
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  }
  // 导航守卫 退出之后清空所有的信息
  // beforeRouteEnter: (to, from, next) => {
  //   next(vm => vm.$store.dispatch('updateStatus', null))
  // }
}
</script>

<style lang='stylus' scoped>
.loginc {
  border 0px solid red
}
</style>
