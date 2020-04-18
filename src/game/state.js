export class GameState {
  constructor() {
    this.currentOpen = new Map();
    this.width = 200;
    this.sizeCallbacks = [];
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
}
