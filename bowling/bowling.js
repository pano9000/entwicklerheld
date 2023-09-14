export class Bowling {
  throwCounter = 0;
  remainingPins = 10;
  frames = [];
  /**
   * is called each time the player rolls a ball. The argument is the number of pins knocked down.
   */
  roll(pins) {

    this.#validate(pins, this.remainingPins);

    this.throwCounter++;
    this.remainingPins -= pins;


    if (this.throwCounter == 1) {
      this.frames.push(new FrameScoreEntry([pins, null], null));

      //strike
      if (this.remainingPins == 0) {
        this.frames.at(-1).type = SCORE_TYPE.STRIKE;
        this.#nextFrame();
      }


    } else {

      const currentFrame = this.frames.at(-1);

      currentFrame.pins[1] = pins;
      currentFrame.type = (this.remainingPins == 0) ? SCORE_TYPE.SPARE : SCORE_TYPE.OPEN;

      this.#nextFrame();
    }

  }

  #validate(pins, remainingPins) {

    if (!Number.isInteger(pins) || pins < 0) {
      throw new IllegalRoll(`Expected pins to be an integer, but received: ${typeof(pins)}.`)
    }

    if (pins < 0) {
      throw new IllegalRoll(`Expected pins to be a positive integer, but received: ${pins}.`)
    }

    const currentRemaining = remainingPins - pins;

    if (currentRemaining < 0) {
      throw new IllegalRoll(`The provided number of knocked down pins: '${pins}' is bigger than the number of remaining pins '${remainingPins}'. Aborting.`)
    }

  }


  #nextFrame() {
    this.remainingPins = 10;
    this.throwCounter = 0;
  }

  /**
   * is called only at the very end of the game. It returns the total score for that game.
   */
  score() {


    // write bonus points
    this.frames.forEach( (frame, currentIndex) => {

      //Basic Score
      frame.score = frame.pins.reduce( (accum, curr) => accum += curr);

      //Bonus Score
      if (frame.type == SCORE_TYPE.STRIKE) {
        if (currentIndex < 10-1) {

          if (this.frames[currentIndex+1].type === SCORE_TYPE.STRIKE) {
            frame.score += (this.frames[currentIndex+1].pins[0] + this.frames[currentIndex+2].pins[0]); 
          } else {
            frame.score += (this.frames[currentIndex+1].pins[0] + this.frames[currentIndex+1].pins[1])

          }

        }
      }

      if (frame.type == SCORE_TYPE.SPARE) {
        if (currentIndex < 10-1) {
          frame.score += (this.frames[currentIndex+1].pins[0])
        }
      }

    })

    const scoreTotal = this.frames.reduce( (scoreTotal, frame) => scoreTotal += frame.score, 0);

    return scoreTotal
  }
}


class FrameScoreEntry {
  /**
   * 
   * @param {Array<Number|null,Number|null>} pins 
   * @param {SCORE_TYPE} type 
   */
  constructor(pins = [null, null], type = null) {
    this.pins = pins;
    this.type = type;
    this.score = null;
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
    super(message)
  }
}