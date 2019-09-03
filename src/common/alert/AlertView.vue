<template>
  <show-fade>
    <div
      class="alert-view"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span><img :src="this.imageUrl" class="image" alt=""/></span>
      {{ message }}
    </div>
  </show-fade>
</template>

<script>
export default {
  name: 'AlertView',
  props: {
    message: {
      type: String,
      require: true
    },
    type: {
      type: String,
      default: 'info'
    },
    time: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      visible: true,
      images: {
        info: require('./images/info.png'),
        error: require('./images/error.png'),
        success: require('./images/success.png'),
        warning: require('./images/warning.png')
      },
      types: {
        info: {
          background: 'rgba(237, 242, 252, 0.9)',
          border: '1px rgb(208, 220, 244) solid',
          color: 'rgb(144, 147, 153)',
          width: (this.message.length * 18 + 50) + 'px'
        },
        success: {
          background: 'rgba(240, 249, 235, 0.9)',
          border: '1px rgb(222, 247, 207) solid',
          color: 'rgb(103, 194, 58)',
          width: (this.message.length * 18 + 50) + 'px'
        },
        warning: {
          background: 'rgba(254, 240, 240, 0.9)',
          border: '1px rgb(242, 220, 220) solid',
          color: 'rgb(230, 162, 60)',
          width: (this.message.length * 18 + 50) + 'px'
        },
        error: {
          background: 'rgba(254, 240, 240, 0.9)',
          border: '1px #f9dbdb solid',
          color: 'rgb(245, 108, 108)',
          width: (this.message.length * 18 + 50) + 'px'
        }
      }
    }
  },

  computed: {
    style() {
      console.log('length: ', this.message.length, 'width: ', this.message.length * 18 + 50, this.type)
      return this.types[this.type]
    },
    imageUrl() {
      return this.images[this.type]
    }
  },
  methods: {
    clearTimer() {
      window.clearTimeout(this.timerID)
    },
    createTimer() {
      this.timerID = setTimeout(() => {
        this.visible = false
      }, this.time)
    },
    // 动画完成之后执行此方法
    afterLeave(el) {
      // console.log('afterLeave')
      this.$emit('closed')
    },
    beforeLeave(el) {
      this.barHeight = this.$el.offsetHeight
    }
  },
  // 页面渲染完成之后加载计时器
  mounted() {
    this.createTimer()
  },
  // 离开组件的时候销毁定时器
  beforeDestroy() {
    window.clearTimeout(this.timerID)
  }
}
</script>

<style lang="stylus" scoped>
.alert-view {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  // width: 250px;
  height: 40px;
  // line-height: 40px;
  text-align: center;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s;
  font-size: 16px;
}

.image {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
