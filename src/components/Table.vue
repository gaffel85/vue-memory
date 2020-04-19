<template>
  <div>
    <Settings :gameState="gameState" />
    <div class="controlls">
      <SizeButton :gameState="gameState" v-bind:inc="true" />
      <SizeButton :gameState="gameState" v-bind:inc="false" />
    </div>
    <div class="table">
      <TakeButton :gameState="gameState" />
      <div class="scoreTab" v-bind:class="[namesHidden ? 'hidden' : '']">
        <div class="scoreRow">
          <ScoreButton :gameState="gameState" userName="Ola" userId="1" />
          <ScoreButton :gameState="gameState" userName="Julia" userId="2" />
        </div>
        <div div class="scoreRow">
          <ScoreButton :gameState="gameState" userName="Hans" userId="3" />
          <ScoreButton :gameState="gameState" userName="Ingeborg" userId="4" />
        </div>
      </div>
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
import Settings from "./Settings.vue";
import { GameState } from "../game/state";
const { shuffle, RndGen } = require("../fn/shuffle").default;

const gameState = new GameState();

export default {
  name: "app",
  data: function() {
    return {
      totalItems: [],
      items: [],
      gameState,
      namesHidden: true
    };
  },
  components: {
    Card,
    TakeButton,
    SizeButton,
    ScoreButton,
    Settings
  },
  created: function() {
    this.gameState.bindSettings((seed, screen, totalScreens, memorySet) => {
      const cardsData = require("../assets/" + memorySet + ".json");

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
            return card.pairs.map((pair, index) => ({
              title,
              key: title + index,
              ...pair
            }));
          }
        })
        .map(card => {
          if (card.img) {
            let pic = card.img;
            if (!card.img.startsWith("http")) {
              pic = "" + pic;
            }
            return {
              ...card,
              img: pic
            };
          } else {
            return card;
          }
        });

      const random = new RndGen(seed);
      const shuffledCards = shuffle(dividedPairs, random);
      console.log(shuffledCards.map(i => i.title));

      const cardsPerScreen = Math.round(dividedPairs.length / totalScreens);
      const startCard = cardsPerScreen * (screen - 1);
      const endCard = startCard + cardsPerScreen;
      const cardsForThisPage = dividedPairs.slice(startCard, endCard);
      console.log("Sliced");
      console.log(cardsForThisPage);
      this.items = cardsForThisPage;

      this.namesHidden = screen ? screen != 1 : false;
    });
  }
};
</script>

<style>
.table {
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
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1000;
}
.scoreTab.hidden {
  display: none;
}
.scoreRow {
  float: left;
}
</style>