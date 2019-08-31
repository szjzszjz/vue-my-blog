// 修改属性
export default {
    setLoginStatus(state, data) {
        state.isLogin = data
    },
    setUsername(state, data) {
        state.username = data
        // 存储到Storage里面防止页面刷新数据丢失
        try {
            localStorage.username = data
        } catch (e) {}
    }
}
