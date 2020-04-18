<template>
  <div>
    <div class="controlls">
      <TakeButton :gameState="gameState" />
      <SizeButton :gameState="gameState" v-bind:inc="true" />
      <SizeButton :gameState="gameState" v-bind:inc="false" />
    </div>
    <div class="table">
      <Card
        v-for="item in items"
        :key="item.key"
        :title="item.title"
        :subtitle="item.subtitle"
        :pic="item.img"
        :gameState="gameState"
      />
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import TakeButton from "./TakeButton.vue";
import SizeButton from "./SizeButton.vue";
import { GameState } from "../game/state";
const { shuffle, RndGen } = require("../fn/shuffle").default;
const cardsData = require("../assets/birsd.json");

const gameState = new GameState();
const random = new RndGen(388);

const dividedPairs = cardsData.flatMap(card => {
  const title = card.title;
  if (card.pairs.length == 1) {
    return [
      {
        title,
        key: title + "1",
        ...card.pairs[0]
      },
      {
        title,
        key: title + "2",
        ...card.pairs[0]
      }
    ];
  } else {
    return card.pairs.map(pair => ({
      title,
      key: title + pair.subtitle,
      ...pair
    }));
  }
});

const shuffledData = shuffle(dividedPairs, random);
console.log(shuffledData.map(i => i.title));

export default {
  name: "app",
  data: function() {
    return {
      items: shuffledData,
      gameState
    };
  },
  components: {
    Card,
    TakeButton,
    SizeButton
  }
};
</script>

<style>
.table {
  background: #eeff99;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: auto;
  align-content: space-between;
}

.controlls {
  background: #badac4;
  padding: 2px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: auto;
}
</style>