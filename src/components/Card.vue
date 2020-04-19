<template>
  <div
    class="card"
    v-bind:class="[isHidden ? 'hidden' : '']"
    v-bind:style="{ width: cardWidth + 'px', height: cardHeight + 'px' }"
  >
    <div class="card-inner" v-bind:class="[isOpen ? 'isClicked' : '']" @click="toggleClicked()">
      <div class="card-front"></div>
      <div class="card-back">
        <h3>{{ title }}</h3>
        <h4 v-bind:class="[noImg ? 'bigSub' : '']">{{ subtitle }}</h4>
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
    subtitle: String,
    pic: String,
    gameState: Object
  },
  data: function() {
    return {
      isOpen: false,
      isHidden: false,
      cardWidth: 250,
      cardHeight: 250,
      noImg: !this.pic
    };
  },

  created: function() {
    this.gameState.bindSize(size => {
      this.cardWidth = size;
      this.cardHeight = (size * 250) / 250;
    });
  },

  methods: {
    toggleClicked: function() {
      if (this.isOpen) {
        this.gameState.close(this.title);
        this.isOpen = false;
      } else {
        if (
          this.gameState.open(this.title, () => {
            this.isHidden = true;
          })
        ) {
          this.isOpen = true;
        }
      }
    }
  }
};
</script>

<style>
h3 {
  margin: 5px 0px 0px 0px;
}

h4 {
  margin: 0px 0px 0px 0px;
}

.bigSub {
  font-size: 50pt;
}

.card-img {
  max-width: 100%;
}

/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.card {
  background-color: transparent;
  margin: 2px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

.card.hidden {
  visibility: hidden;
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
  background: url("~@/assets/bg_card.png");
  color: black;
}

/* Style the back side */
.card-back {
  background-color: #ffffff;
  color: #000000;
  transform: rotateY(180deg);
}
</style>
