// provided by the challenge, not my solution

export default class City {
  constructor(name, xCoordinate, yCoordinate) {
      this.name = name;
      this.xCoordinate = xCoordinate;
      this.yCoordinate = yCoordinate;
  }

  toString() {
      return "{" + this.name + " ( " + this.xCoordinate + " | " + this.yCoordinate + " )}";
  }

  equals(obj) {
      if((obj == null) || ! JSON.stringify(this) === JSON.stringify(obj)){
          return false;
      }
      let city = obj;
      return (this.name == city.name && this.xCoordinate == city.xCoordinate && this.yCoordinate == city.yCoordinate);
  }
}