<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <img :src="pic" class="card-img" />
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: String,
    pic: String
  }
};
</script>

<style>
h3 {
  margin-bottom: 5%;
}
.card {
  border: 1px solid #000;
  margin: 10px;
  background: #ffffff;
  width: 200px;
  height: 250px;
}
.card-img {
  max-width: 180px;
}
</style>
