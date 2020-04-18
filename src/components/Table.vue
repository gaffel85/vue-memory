<template>
  <div>
    <div class="controlls">
      <TakeButton :gameState="gameState" />
      <SizeButton :gameState="gameState" v-bind:inc="true" />
      <SizeButton :gameState="gameState" v-bind:inc="false" />
      <ScoreButton
        :gameState="gameState"
        userName="Ola"
        userId="1"
        class="scorButton"
        v-bind:class="[namesHidden ? 'hidden' : '']"
      />
      <ScoreButton
        :gameState="gameState"
        userName="Julia"
        userId="2"
        class="scorButton"
        v-bind:class="[namesHidden ? 'hidden' : '']"
      />
      <ScoreButton
        :gameState="gameState"
        userName="Hans"
        userId="3"
        class="scorButton"
        v-bind:class="[namesHidden ? 'hidden' : '']"
      />
      <ScoreButton
        :gameState="gameState"
        userName="Ingeborg"
        userId="4"
        class="scorButton"
        v-bind:class="[namesHidden ? 'hidden' : '']"
      />
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
import ScoreButton from "./ScoreButton.vue";
import { GameState } from "../game/state";
const { shuffle, RndGen } = require("../fn/shuffle").default;
const cardsData = require("../assets/birsd.json");

const uri = window.location.search.substring(1);
const params = new URLSearchParams(uri);
const seed = params.get("seed");
const screen = params.get("screen");
const totalScreens = params.get("of");

const gameState = new GameState();
const random = new RndGen(seed);

const dividedPairs = cardsData
  .flatMap(card => {
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
  })
  .map(card => {
    let pic = card.img;
    if (!card.img.startsWith("http")) {
      pic = "/" + pic;
    }
    return {
      ...card,
      img: pic
    };
  });

const shuffledCards = shuffle(dividedPairs, random);
console.log(shuffledCards.map(i => i.title));

const cardsPerScreen = Math.round(shuffledCards.length / totalScreens);
const startCard = cardsPerScreen * (screen - 1);
const endCard = startCard + cardsPerScreen;
const cardsForThisPage = shuffledCards.slice(startCard, endCard);
console.log("Sliced");
console.log(cardsForThisPage);

const namesHidden = screen ? screen != 1 : false;
console.log(namesHidden);

export default {
  name: "app",
  data: function() {
    return {
      items: cardsForThisPage,
      gameState,
      namesHidden: namesHidden
    };
  },
  components: {
    Card,
    TakeButton,
    SizeButton,
    ScoreButton
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
.scorButton.hidden {
  visibility: hidden;
}
</style>