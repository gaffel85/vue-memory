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
      <div>
        <select v-model="memorySet">
          <option value="svenska-djur">Svenska djur</option>
          <option value="letters">Bokstäver</option>
        </select>
      </div>
      <button @click.prevent="doneClicked()">Done</button>
    </form>
  </div>
</template>

<script>
const uri = window.location.search.substring(1);
const params = new URLSearchParams(uri);
const seed = params.get("seed");
const screen = params.get("screen");
const totalScreens = params.get("of");
const memory = params.get("memory");

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
      seed: seed ? seed : "" + Math.round(Math.random() * 10000),
      screenNumber: screen ? screen : "",
      screenTotal: totalScreens ? totalScreens : "",
      memorySet: memory ? memory : "svenska-djur"
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
      this.gameState.setOptions(seed, screen, totalScreens, this.memorySet);
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
  font-size: 18pt;
  font-weight: bold;
}
.settings-panel.hidden {
  visibility: hidden;
}
input {
  padding: 12px 20px;
  margin: 8px 0;
  font-size: 20pt;
  box-sizing: border-box;
}
select {
  padding: 16px 20px;
  font-size: 20pt;
}
button {
  font-size: 20pt;
  margin: 20px;
}
</style>
