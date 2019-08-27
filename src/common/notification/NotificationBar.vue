<template>
  <transition name="fade"
              @before-leave="beforeLeave"
              @after-leave="afterLeave"
  >
    <div class="notification-bar"
         :style="style"
         v-show="visible"
         @mouseenter="clearTimer"
         @mouseleave="createTimer">
      <span class="content">{{content}}</span>
      <div class="line"></div>
      <img v-if="closeBtn===undefined" src="./delete.png" class="icon-close" @click="handleClose">
      <span v-else class="text-close" @click="handleClose">
        {{closeBtn}}
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NotificationBar',
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
  },
  methods: {
    clearTimer () {
      window.clearTimeout(this.timerID)
      console.log('stop--' + this.timerID)
    },
    handleClose (e) {
      e.preventDefault()
      this.$emit('ison-close')
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

    // v-show=true 所以动画进入的事件不会触发
    // afterEnter(el) {
    //   console.log('afterLeave')
    //   this.$emit('closed')
    // },
  },
  // 页面渲染完成之后加载计时器
  mounted () {
    this.createTimer()
  },
  // 离开组件的时候销毁定时器
  beforeDestroy () {
    window.clearTimeout(this.timerID)
    console.log('clearTimeout--' + this.timerID)
  }
}
</script>

<style lang="stylus" scoped>
  .notification-bar {
    overflow: hidden
    box-sizing: border-box
    width: 20vw
    min-width 16vw
    height: 10vh
    min-height 8vh
    border-radius 4px
    display: flex
    flex-wrap: wrap
    position: fixed
    background-color: #303030;
    color: rgba(255, 255, 255, 1)
    align-items center
    box-shadow 3px 5px -1px rgba(0, 0, 0, 0.5)
    transition: all 0.3s
  }

  .content {
    overflow hidden
    width: 75%
    height: 10vh
    line-height: 10vh
    text-align center
    font-size 16px
    padding: 0 10px 0 10px
    /*background-color: red;*/
  }

  .line {
    height: 5vh
    width: 1px
    border-left: 1px #000 solid
  }

  .icon-close {
    color: red
    width: 1.5vw
    height: 1.5vw
    line-height 1.5vw
    text-align center
    /*background-color: yellowgreen*/
    margin: auto
    cursor: pointer
  }

  .text-close {
    display: inline-block
    color: red
    width: 15%
    height: 9vh
    font-size: 14px
    line-height 9vh
    text-align center
    /*background-color: yellowgreen*/
    margin: auto
    cursor: pointer

  }

  .text-close:hover {
    color: yellowgreen
  }

  img:hover {
    filter drop-shadow(0, 0, 0, #63800f)
  }
</style>
