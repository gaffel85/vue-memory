<template>
  <div class="settings-panel" v-bind:class="[isHidden ? 'hidden' : '']">
    <form>
      <div>
        Seed:
        <input type="text" v-model="seed" />
      </div>
      <div>
        Screen:
        <input type="text" v-model="screenNumber" /> of
        <input type="text" v-model="screenTotal" />
      </div>
      <button @click.prevent="doneClicked()">Done</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Settings",
  props: {
    gameState: Object
  },
  data: function() {
    return {
      screen: 1,
      totalScreens: 3,
      isHidden: false,
      seed: "",
      screenNumber: "",
      screenTotal: ""
    };
  },

  created: function() {
    //this.gameState.bindSize();
  },

  methods: {
    doneClicked: function() {
      this.isHidden = true;
      const seed = parseInt(this.seed);
      const screen = parseInt(this.screenNumber);
      const totalScreens = parseInt(this.screenTotal);
      this.gameState.setOptions(seed, screen, totalScreens);
    }
  }
};
</script>

<style>
.settings-panel {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: #dad9d8;
}
.settings-panel.hidden {
  visibility: hidden;
}
</style>
