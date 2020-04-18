export class GameState {
  constructor() {
    this.currentOpen = new Map();
    this.width = 200;
    this.sizeCallbacks = [];
    this.scores = new Map();
    this.screenNbr = 1;
    this.totalScreens = 1;
    this.seed = 2139;
    this.memorySet = "letters";
    this.settingsCallback = () => {};
  }

  setOptions(seed, screenNbr, screenTotal, memorySet) {
    this.screenNbr = seed;
    this.totalScreens = screenNbr;
    this.seed = screenTotal;
    this.memorySet = memorySet;
    this.settingsCallback(seed, screenNbr, screenTotal, memorySet);
  }

  bindSettings(callback) {
    this.settingsCallback = callback;
  }

  openCnt() {
    return this.currentOpen.size;
  }

  open(cardId, callback) {
    if (this.openCnt() < 2) {
      this.currentOpen.set(cardId, callback);
      return true;
    }
    return false;
  }

  close(cardId) {
    if (this.openCnt() > 0) {
      this.currentOpen.delete(cardId);
    }
  }

  takeOpenCards() {
    for (let [cardId, callback] of this.currentOpen) {
      console.log("Closing " + cardId);
      callback();
    }
    this.currentOpen.clear();
  }

  bindSize(callback) {
    this.sizeCallbacks.push(callback);
  }

  callSizeCallbacks() {
    this.sizeCallbacks.forEach(callback => {
      callback(this.width);
    });
  }

  incSize() {
    this.width += 10;
    this.callSizeCallbacks();
  }

  decSize() {
    this.width -= 10;
    this.callSizeCallbacks();
  }

  addScore(userId) {
    let oldScore = this.scores.get(userId);
    if (oldScore) {
      this.scores.set(userId, oldScore + 1);
    } else {
      this.scores.set(userId, 1);
    }
  }

  getScore(userId) {
    this.takeOpenCards();
    let score = this.scores.get(userId);
    if (score) {
      return score;
    }
    return 0;
  }
}
