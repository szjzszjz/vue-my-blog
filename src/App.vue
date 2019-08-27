<template>
  <div id="app" >
    <blog-header v-if="showHeader"/>
    <router-view @changeStatus="changeStatus"/>
  </div>
</template>

<script>

import BlogHeader from '@/components/BlogHeader'

export default {
  name: 'App',
  data () {
    return {
      showHeader: true
    }
  },
  components: {
    BlogHeader
  },
  methods: {
    changeStatus (e) {
      console.log('change=', e)
      this.showHeader = e
    }
  }
}
</script>

<style>

</style>
