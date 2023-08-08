export default class Position {
  constructor(rowIndex, columnIndex) {
      this.rowIndex = rowIndex;
      this.columnIndex = columnIndex;
  }

  get leftDiagonal() {
      return this.rowIndex - this.columnIndex;
  }

  get rightDiagonal() {
      return this.rowIndex + this.columnIndex;
  }

  toString() {
      return `(${this.rowIndex},${this.columnIndex})`;
  }

  equals(obj) {
      if((obj == null) || ! JSON.stringify(this) === JSON.stringify(obj)){
          return false;
      }
      let position = obj;
      return (this.rowIndex == position.rowIndex && this.columnIndex == position.columnIndex);
  }
}
