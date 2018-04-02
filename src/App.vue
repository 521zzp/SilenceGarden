<template>
  <div id="app">
    <router-view/>
    <Button type="primary">xxasda</Button>
  </div>
</template>

<script>
import { Button, Table } from 'iview';
export default {
  name: 'App',
  components: {
  	Button
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
