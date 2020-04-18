<template>
  <div @click="changeSize()">
    <h3 class="button">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: "SizeButton",
  props: {
    inc: Boolean,
    gameState: Object
  },
  data: function() {
    return {
      title: this.inc ? "+" : "-"
    };
  },
  methods: {
    changeSize: function() {
      if (this.inc) {
        this.gameState.incSize();
      } else {
        this.gameState.decSize();
      }
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