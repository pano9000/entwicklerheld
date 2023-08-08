export default class ChessBoard {

  constructor(boardSize) {
      this.chessBoard = new Array(boardSize);
      for (let i = 0; i < this.chessBoard.length; ++i)
      {
          this.chessBoard[i] = new Array(boardSize);
      }
      this.boardSize = boardSize;
  }

  getValue(row, col) {
      return this.chessBoard[row][col];
  }

  setValue(row, col, value) {
      this.chessBoard[row][col] = value;
  }

  row(row) {
      return this.chessBoard[row];
  }

  toString() {
      let s = "";
          for (let i = 0; i < this.chessBoard.length; ++i)
          {
              for (let j = 0; j < this.chessBoard[i].length; ++j)
              {
                  if (this.chessBoard[i][j] == true) s += "1 "; 
                  else s += "0 ";
              }
                      s += "\r\n";
          }
          return s;
  }


}