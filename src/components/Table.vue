<template>
  <div id="table">
    <Card v-for="item in items" :key="item.title" :title="item.title" :pic="item.img" />
  </div>
</template>

<script>
import Card from "./Card.vue";
const { shuffle, RndGen } = require("../fn/shuffle").default;
const cardsData = require("../assets/birsd.json");

const random = new RndGen(388);
const shuffledData = shuffle(cardsData, random);
console.log(shuffledData.map(i => i.title));

export default {
  name: "app",
  data: function() {
    return {
      items: shuffledData
    };
  },
  components: {
    Card
  }
};
</script>

<style>
#table {
  background: #eeff99;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: auto;
  align-content: space-between;
}
</style>