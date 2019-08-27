<template>
  <transition name="fade" @before-leave="beforeLeave" @after-leave="afterLeave">
    <div
      class="alert-view"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span class="content">{{content}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AlertView',
  props: {
    content: {
      type: String,
      require: true
    },
    closeBtn: {
      type: String
    },
    bgc: {
      type: String,
      default: '#303030'
    },
    autoCloseTime: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      visible: true,
      verticalOffset: 0,
      barHeight: 0
    }
  },

  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`,
        background: this.bgc
      }
    }
    // clientWidth () {
    //   return document.documentElement.clientWidth
    // }
  },
  methods: {
    clearTimer () {
      window.clearTimeout(this.timerID)
      console.log('stop--' + this.timerID)
    },
    createTimer () {
      console.log('createTimer--' + this.autoCloseTime)
      this.timerID = setTimeout(() => {
        this.visible = false
      }, this.autoCloseTime)
    },
    // 动画完成之后执行此方法
    afterLeave (el) {
      console.log('afterLeave')
      this.$emit('closed')
    },
    beforeLeave (el) {
      this.barHeight = this.$el.offsetHeight
      console.log('beforeLeave' + this.barHeight)
    }
  },
  // 页面渲染完成之后加载计时器
  mounted () {
    this.createTimer()
    // console.log('document--', document.documentElement.clientWidth)
  },
  // 离开组件的时候销毁定时器
  beforeDestroy () {
    window.clearTimeout(this.timerID)
    console.log('clearTimeout--' + this.timerID)
  }
}
</script>

<style lang="stylus" scoped>
.alert-view {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 50px;
  margin-left -100px
  margin-top -25px
  border-radius: 25px;
  transition: all 0.3s;
}

.content {
  overflow: hidden;
  width: 100%;
  height: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: black;
  padding: 0 10px 0 10px;
  // background-color: red;
}
</style>
