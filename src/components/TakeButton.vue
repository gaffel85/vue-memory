<template>
  <div @click="takeOpenCards()">
    <h3 class="button">Ta par</h3>
  </div>
</template>

<script>
export default {
  name: "TakeButton",
  props: {
    gameState: Object
  },
  methods: {
    takeOpenCards: function() {
      this.gameState.takeOpenCards();
    }
  }
};
</script>

<style>
h3.button {
  border: 3px solid #224542;
  padding: 10px;
  background: #90e5eb;
}
</style>