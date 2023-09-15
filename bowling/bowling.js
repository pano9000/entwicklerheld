export class Bowling {
  frames = new Array(12).fill().map(frame => new Frame());
  currentFrameCounter = 0;
  currentFrame = this.frames.at(this.currentFrameCounter);
  /**
   * is called each time the player rolls a ball. The argument is the number of pins knocked down.
   */
  roll(pins) {
    this.#validate(pins, this.currentFrame.remainingPins);
    this.currentFrame.addPins(pins);
    if (this.currentFrame.type !== null) this.#nextFrame();
  }

  #validate(pins, remainingPins) {
    if (!Number.isInteger(pins)) {
      throw new IllegalRoll(`Expected pins to be an integer, but received: ${typeof(pins)}.`)
    }

    if (pins < 0) {
      throw new IllegalRoll(`Expected pins to be a positive integer, but received: ${pins}.`)
    }

    if (remainingPins - pins < 0) {
      throw new IllegalRoll(`The provided number of knocked down pins: '${pins}' is bigger than the number of remaining pins '${remainingPins}'. Aborting.`)
    }
  }


  #nextFrame() {
    this.currentFrameCounter++;
    this.currentFrame = this.frames.at(this.currentFrameCounter);
  }

  /**
   * is called only at the very end of the game. It returns the total score for that game.
   */
  score() {

    // write bonus points for first 10 frames
    this.frames.forEach( (frame, currentIndex) => {

      if (currentIndex < 10-1) {
        if (frame.type == SCORE_TYPE.SPARE) {
          frame.scoreBonus += this.frames[currentIndex+1].pins[0];
        }

        if (frame.type == SCORE_TYPE.STRIKE) {
            frame.scoreBonus += frame.scoreBonus += this.frames[currentIndex+1].pins[0]
              +  ((this.frames[currentIndex+1].type === SCORE_TYPE.STRIKE) 
                  ? this.frames[currentIndex+2].pins[0]
                  : this.frames[currentIndex+1].pins[1]);
        }
      }

    })

    return this.frames.reduce( (scoreTotal, frame) => scoreTotal += frame.score + frame.scoreBonus, 0);
  }
}


class Frame {
  /**
   * 
   * @param {Array<Number|null,Number|null>} pins 
   * @param {SCORE_TYPE} type 
   */
  constructor(pins = [null, null], type = null) {
    this.pins = pins;
    this.type = type;
    this.score = null;
    this.scoreBonus = null;
    this.remainingPins = 10;
  }

  addPins(pins) {
    const throwCount = (this.pins[0] === null) ? 0 : 1;
    this.pins[throwCount] = pins;
    this.remainingPins -= pins;
    this.#updateType(throwCount);
    this.#updateScore();
  }

  #updateType(throwCount) {
    if (throwCount === 0 && this.remainingPins === 0) {
      this.type = SCORE_TYPE.STRIKE;
    }
    if (throwCount === 1) {
      this.type = (this.remainingPins === 0) ? SCORE_TYPE.SPARE : SCORE_TYPE.OPEN;
    }
  }

  #updateScore() {
    this.score = this.pins[0]+this.pins[1];
  }
}

const SCORE_TYPE = {
  OPEN: 1,
  SPARE: 2,
  STRIKE: 3
};
Object.freeze(SCORE_TYPE);

class IllegalRoll extends Error {
  
  constructor(message) {
    super(message);
  }
}