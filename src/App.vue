<template>
  <div id="app">
    <!--<ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link active" :to="{ name: 'home'}">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'driver'}">Driver</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'FormPage'}">FormPage</router-link>
      </li>
    </ul>
    -->
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
    
  }
</style>
