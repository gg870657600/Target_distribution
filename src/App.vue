<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
body,#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* //text-align: center; */
  /* //color: #2c3e50; */
  /* //margin-top: 60px; */
  list-style:none;
  margin : 0;
  padding: 0;
  width:100%;
  height: 100%;
  text-decoration: none; 
  background-color: rgb(242, 242, 242);
}

</style>
