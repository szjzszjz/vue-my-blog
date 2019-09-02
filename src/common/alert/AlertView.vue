<template>
  <transition name="fade" @before-leave="beforeLeave" @after-leave="afterLeave">
    <div
      class="alert-view"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <table border="0" cellspacing="0" cellpadding="0" class="content">
        <tr>
          <td class="text">{{content}}</td>
        </tr>
      </table>
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
      default: '#ddd'
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
        // position: 'fixed',
        // right: '20px',
        // bottom: `${this.verticalOffset}px`,
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
  position: absolute;
  top: 0px;
  bottom: 0px;
  left 0px
  right 0px
  margin: auto;
  width: 200px;
  height: 40px;
  text-align: center;
  padding: 5px 20px;
  border-radius: 25px;
  transition: all 0.3s;
}

.content {
  display: inline-block;
}

.text {
  height: 30px;
  line-height: 30px;
  min-width: 100px;
  text-align: center;
  margin: 0px auto;
  display: inline-block;
  font-size: 16px;
}
</style>
