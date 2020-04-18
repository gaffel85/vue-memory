<template>
  <div class="card">
    <div
      class="card-inner"
      v-bind:class="[isClickedState ? 'isClicked' : '']"
      @click="toggleClicked()"
    >
      <div class="card-front"></div>
      <div class="card-back">
        <h3>{{ title }}</h3>
        <img :src="pic" class="card-img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: String,
    pic: String
  },
  data: function() {
    return {
      isClickedState: false
    };
  },

  methods: {
    toggleClicked: function() {
      console.log("clickinggg");
      this.isClickedState = !this.isClickedState;
    }
  }
};
</script>

<style>
h3 {
  margin-bottom: 5%;
}

.card-img {
  max-width: 180px;
}

/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.card {
  background-color: transparent;
  width: 200px;
  height: 250px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.card-inner.isClicked {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border: 1px solid #000;
}

/* Style the front side (fallback if image is missing) */
.card-front {
  background: #707eb1;
  color: black;
}

/* Style the back side */
.card-back {
  background-color: #ffffff;
  color: #000000;
  transform: rotateY(180deg);
}
</style>
