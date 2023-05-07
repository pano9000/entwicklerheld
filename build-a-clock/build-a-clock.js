export class Clock {

  #date;
  constructor(hours=0, minutes=0) {
    this.#date = new Date();
    this.#date.setHours(hours, minutes, 0);
  }

  #calcMinutes(mode, minutes) {

    if (!Number.isInteger(minutes)) {
      throw new Error(`Expected an Integer but received '${typeof(minutes)}'`)
    }

    if (["plus", "minus"].includes(mode) === false) {
      throw new Error(`Invalid mode called.`)
    }

    const currentMinute = this.#date.getMinutes();
    const newMinute = (mode === "plus") ? currentMinute + minutes : currentMinute - minutes;

    this.#date.setMinutes(newMinute);
    return this.toString();

  }

  toString() {
    // @fix for some reason new Intl.DateTimeFormat does not work as expected here with node v11.15 - 
    // it works at offline nodejs installation though, so reverting back to less fancy toTimeString slicing
    //const timeFormat = new Intl.DateTimeFormat("de-DE", {timeStyle: "short"});
    //console.log(this.#date, timeFormat.format(Date.now()))
    //return timeFormat.format(this.#date);
    return this.#date.toTimeString().slice(0,5)
  }

  plus(minutes) {
    return this.#calcMinutes("plus", minutes);
  }

  minus(minutes) {
    return this.#calcMinutes("minus", minutes);
  }

  equals(otherClock) {
    if (otherClock instanceof Clock === false) {
      throw new Error(`Invalid comparison clock provided: The comparison clock has to be an instance of 'Clock'`)
    }
    
    const pairs = [
      [this.#date.getMinutes(), otherClock.#date.getMinutes()],
      [this.#date.getHours(), otherClock.#date.getHours()]
    ]

    return pairs.every(pair => pair[0] === pair[1])
    
  }
}