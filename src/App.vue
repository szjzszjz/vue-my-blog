<template>
  <div id="app">
    <blog-header/>
    <router-view/>
  </div>
</template>

<script>

// import ShowBlogs from '@/components/ShowBlogs'
// import AddBlog from '@/components/AddBlog'
import BlogHeader from '@/components/BlogHeader'

export default {
  name: 'App',
  components: {
    BlogHeader
  }
}
</script>

<style>

</style>
