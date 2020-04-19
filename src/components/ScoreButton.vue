<template>
  <div @click="addPoint()">
    <h3 class="button">{{ userName }}: {{ score }}</h3>
  </div>
</template>

<script>
export default {
  name: "ScoreButton",
  props: {
    userName: String,
    userId: String,
    gameState: Object
  },
  data: function() {
    return {
      score: this.gameState.getScore(this.userId)
    };
  },
  methods: {
    addPoint: function() {
      this.gameState.addScore(this.userId);
      this.score = this.gameState.getScore(this.userId);
    }
  }
};
</script>

<style>
h3.button {
  border: 3px solid #224542;
  padding: 10px;
  margin: 2px;
  background: #90e5eb;
}
</style>