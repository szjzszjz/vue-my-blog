// 添加属性
let dusername = 'ee'
try {
    if (localStorage.username) {
      dusername = localStorage.username
    }
  } catch (e) {}
export default {
    isLogin: false,
    username: dusername
}
