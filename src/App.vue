<template>
  <div id="app">
    <blog-header v-if="showHeader"/>
    <router-view/>
  </div>
</template>

<script>

import BlogHeader from '@/components/BlogHeader'

export default {
  name: 'App',
  data () {
    return {
      showHeader: false
    }
  },
  components: {
    BlogHeader
  }
}
</script>

<style>

</style>
