<template>
  <nav  v-theme="'narrow'">
    <ul>
      <li>
        <router-link to="/show" exact>博客</router-link>
        <router-link to="/add" exact>写博客</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'BlogHeader'
}
</script>

<style scoped>
  nav {
    margin: 0 auto;
    background-color: crimson;
    margin-bottom: 10px;
    padding: 20px;
  }

  ul {
    margin: 0;
    /*background-color: sandybrown;*/
    /*display: inline-block;*/
    list-style-type: none;
    text-align: center;
  }

  li {
    display: inline;
    margin-left: -15px;
    /*background-color: blanchedalmond;*/
  }

  a{
    text-decoration: none;
    background-color: crimson;
    margin: 0 20px;
    padding: 10px;
    color: white;
    border-radius: 5px;
  }
  .router-link-active{
    background: rgba(255,255,255,0.8);
    color: #444;
  }
</style>
