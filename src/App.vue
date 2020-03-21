<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link active" :to="{ name: 'home'}">Home</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
