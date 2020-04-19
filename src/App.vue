<template>
  <div id="app">
    <Table />
  </div>
</template>

<script>
import Table from "./components/Table.vue";

export default {
  name: "app",
  components: {
    Table
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  width: 100vw;
  height: 100vh;
  background-image: url("./assets/bg_wood.jpg");
}
body {
  margin: 0;
}
</style>