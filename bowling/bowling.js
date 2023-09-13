export class Bowling {
  rollsQty = 0;
  mainScore = [];
  auxScore = [];
  frameCounter = 0;
  throwCounter = 0;
  remainingPins = 10;
  framesScore = [];
  /**
   * is called each time the player rolls a ball. The argument is the number of pins knocked down.
   */
  roll(pinsS) {
    this.rollsQty++;
  
    this.throwCounter++;
    const pins = parseInt(pinsS);
    this.remainingPins -= pins;

    //strike
    if (this.throwCounter == 1 && this.remainingPins == 0) {
      this.framesScore.push(new FrameScoreEntry([10, null], "strike"));
      this.#updateFrame();
      return;
    };

    if (this.throwCounter == 1 && this.remainingPins > 0) {
      this.framesScore.push(new FrameScoreEntry([pins, null], null));
      return;
    }

    //spare
    if (this.throwCounter == 2 && this.remainingPins == 0) {
      const currentFrame = this.framesScore.at(-1);
      currentFrame.pins[1] = pins;
      currentFrame.type = "spare";
      this.#updateFrame();
      return;
    }

    if (this.throwCounter == 2 && this.remainingPins > 0) {
      const currentFrame = this.framesScore.at(-1);
      currentFrame.pins[1] = pins;
      currentFrame.type = "open";
      this.#updateFrame();
      return;
    }
    //throw new Error('Remove this statement and implement this function');
  }

  #getCurrentFrame() {
    if (this.framesScore[this.frameCounter] === undefined) {
      this.framesScore.push([]); //TODO fix
    }
    return this.framesScore[this.frameCounter];
  }

  #updateFrame() {
    this.frameCounter++;
    this.remainingPins = 10;
    this.throwCounter = 0;
  }

  /**
   * is called only at the very end of the game. It returns the total score for that game.
   */
  score() {

    //write basic frame score
    this.framesScore.forEach( (frame, currentIndex) => {
      frame.score = frame.pins.reduce( (accum, curr) => accum += curr);
    })

    // write bonus points
    this.framesScore.forEach( (frame, currentIndex) => {

      if (frame.type == "strike") {
        if (currentIndex < 10-1) {


          if (this.framesScore[currentIndex+1].type == "strike") {
            frame.score += (this.framesScore[currentIndex+1].pins[0] + this.framesScore[currentIndex+2].pins[0]); 
          } else {
            frame.score += (this.framesScore[currentIndex+1].pins[0] + this.framesScore[currentIndex+1].pins[1])

          }

        }
      }

      if (frame.type == "spare") {
        if (currentIndex < 10-1) {
          frame.score += (this.framesScore[currentIndex+1].pins[0])
        }
      }

    })

    let totalScore = 0;


    for (let i = 0; i < this.framesScore.length-1; i++) {
      totalScore += this.framesScore[i].pins.reduce((accum, curr) => accum += curr);
    }

    const mainScore = this.framesScore.reduce( (accum, curr) => {
      accum += parseInt(curr.score);
      return accum;
    }, 0);

    return mainScore
  }
}


class FrameScoreEntry {
  /**
   * 
   * @param {Array<Number|null,Number|null>} pins 
   * @param {"strike"|"spare"|"open"|null} type 
   */
  constructor(pins = [null, null], type = null) {
    this.pins = pins;
    this.type = type;
    this.score = null;
  }
}