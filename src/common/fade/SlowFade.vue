<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'SlowFade'
}
</script>

<style lang="stylus" scoped>
  /*.v-enter, v-leave {
    opacity 0
  }
  .v-enter-active, v-leave-active {
    transition opacity 0.5s
  }*/

  // 全局样式
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s
  }
  .fade-enter, .fade-leave-to {
    opacity:0
  }
</style>
