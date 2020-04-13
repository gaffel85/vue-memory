function shuffle(array, randomGenerator) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(randomGenerator.next() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class RndGen {
  constructor(seed) {
    this.currentSeed = seed;
  }

  next() {
    var x = Math.sin(this.currentSeed++) * 10000;
    return x - Math.floor(x);
  }
}

export default {
  shuffle,
  RndGen
};
