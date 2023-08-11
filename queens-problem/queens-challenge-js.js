import Position from "./Position.js";

export function isSafeRook(positions, rook) {
    for (let i=0; i < positions.length; i++) {
        if (check.sameRow(positions[i], rook) || check.sameColumn(positions[i], rook)) return false;     
    }
    return true;
}

export function isSafeQueen(positions, queen) {

    const chessboardSize = getChessboardSize([...positions, queen]);
    
    for (let i=0; i < positions.length; i++) {

        if (
            check.sameRow(positions[i], queen) 
            || check.sameColumn(positions[i], queen)
            || check.sameDiagonal(positions[i], queen, chessboardSize, [...positions])
        ) {
            return false;
        }
        //add diagonal handling here     
    }
    //console.log(visualize(chessboardSize,allAttacked, positions))
    return true;
}

export function getQueensProblemSolution(boardSize) {
    // implement this in scenario 3
    /*
        * create chessboard
        * place queen 1 on first field [0, 0] -> new Position [0,0]
        * get attackedPositions of queen 1
        * place attackedPositions into chessboard
        * get next free, unattacked field
            * loop through chessboard row, if reach end, jump to next 


    */

    const chessBoard = new CustomChessBoard(boardSize);
    chessBoard.addPiece(new Position(0,1));
    //console.log(chessBoard)
    chessBoard.visualize()
   // chessBoard.addPiece(new Position(0,0));
    chessBoard.addPiece(new Position(1,3));
    chessBoard.visualize()


    for (let currentRow = 0; currentRow < boardSize; currentRow++) {
        let positionChecks = [];

        for (let currentColumn = 0; currentColumn < boardSize; currentColumn++) {
            let currentPosition = new Position(currentRow, currentColumn);
            positionChecks.push(getAttackedPositions(currentPosition, {boardSize, checkDiagonal: true}))
        }
        let lengths = positionChecks.map(positionCheck => positionCheck.length);
        //console.log("lengthss", lengths) // get diagonal lenghts separately as well and decide for the one with the lowest diagionally attacked?

        //console.log(currentRow, positionChecks.length, positionChecks)
    }
    return [];
}

class CustomChessBoard {
    size;
    board;
    constructor(boardSize) {
        this.size = boardSize;
        this.board = this.initBoard(boardSize);
    }

    initBoard(size) {
        const board = new Map();
        for (let boardRow = 0; boardRow < size; boardRow++) {
          for (let boardCol = 0; boardCol < size; boardCol++) {
              const currentPosition = new ChessBoardPosition(boardRow, boardCol);
              board.set(currentPosition.toString(), currentPosition)
            }
        }
        return board;
    }

    addPiece(position) {
      //check if position is Position type here
      const boardPosition = this.board.get(position.toString());
      console.log("bposss", position.toString(), boardPosition)
      if (boardPosition.status !== 0) {
        console.log("pos is not empty");
        return;
      }

      boardPosition.status = 1;
      //this.updatePositions()
      const att = getAttackedPositions(position, {boardSize: this.size, checkDiagonal: true});
      console.log("attt", att)
      att.forEach(attPosition =>  {
        let currAtt = this.board.get(attPosition.toString());
        console.log("curAtt", attPosition.toString(), currAtt)
        if (currAtt.status == 0) {
          this.board.get(attPosition.toString()).status = 2
        }
      })
    }

    getEmptyPositions() {
      this.board.entries
    }


    visualize() {
      const boardVisual = []
      for (let i=0; i<this.size; i++) {
          boardVisual[i] = new Array(this.size).fill("◻", 0, this.size)
      }

      this.board.forEach( (value, key, map) => {

        const {rowIndex, columnIndex, status } = value;
        if (boardVisual[rowIndex] == undefined) {
          boardVisual[rowIndex] = new Array(this.size);
        }
        const visuals = { 0: "◻", 1: "◼", "2": "◎" }
        boardVisual[rowIndex][columnIndex] = visuals[status]

      })

      console.log(boardVisual.map(row => row.join("　")).join("\n"))

      //console.log(chessboard.join("\n"))

    }

}



class ChessBoardPosition extends Position {
    constructor(rowIndex, columnIndex, status = 0) {
        super(rowIndex, columnIndex);
        this.status = status;
    }
}


function getAttackedPositions(position, options = {boardSize: 4, checkDiagonal: true}) {
    const attackedPositions = [];

    //add all of currentRow
    const addAllCurrentRow = () => {
        let currentCol = 0;
        let currentRow = position.rowIndex;
        while(currentCol < options.boardSize) {
            let currentPosition = new Position(currentRow, currentCol);
            if (positionNotInListYet(currentPosition)) {
                attackedPositions.push(currentPosition)
            }
            currentCol++;
        }
    }

    //add all of currentColumn
    const addAllCurrentCol = () => {
        let currentRow = 0;
        let currentCol = position.columnIndex;
        while(currentRow < options.boardSize) {
            let currentPosition = new Position(currentRow, currentCol);
            if (positionNotInListYet(currentPosition)) {
                attackedPositions.push(currentPosition)
            }
            currentRow++;
        }
    }

    const addAllDiagonalUp = () => {
        let currentRow = position.rowIndex;
        let currentLeftCol = position.columnIndex;
        let currentRightCol = position.columnIndex;
        while (currentRow > 0) {
            currentRow--; currentLeftCol--; currentRightCol++;

            let currentLeftPosition = new Position(currentRow, currentLeftCol);
            if (currentLeftCol > -1 && positionNotInListYet(currentLeftPosition)) {
                attackedPositions.push(currentLeftPosition)
            }

            let currentRightPosition = new Position(currentRow, currentRightCol);
            if (currentRightCol <  options.boardSize && positionNotInListYet(currentRightPosition)) {
                attackedPositions.push(new Position(currentRow, currentRightCol))
            }
        }

    }

    const addAllDiagonalDown = () => {
        let currentRow = position.rowIndex;
        let currentLeftCol = position.columnIndex;
        let currentRightCol = position.columnIndex;
        while (currentRow <  options.boardSize - 1 ) {
          currentRow++; currentLeftCol--; currentRightCol++;

            let currentLeftPosition = new Position(currentRow, currentLeftCol);
            if (currentLeftCol > -1 && positionNotInListYet(currentLeftPosition)) {
              attackedPositions.push(currentLeftPosition)
            }

            let currentRightPosition = new Position(currentRow, currentRightCol);
            if (currentRightCol <  options.boardSize && positionNotInListYet(currentRightPosition)) {
              attackedPositions.push(currentRightPosition)
            }
        }
    }

    const positionNotInListYet = (position) => {
        return (attackedPositions.findIndex(elem => elem.rowIndex === position.rowIndex && elem.columnIndex == position.columnIndex) > -1) ? false : true;
    }

    addAllCurrentRow()
    addAllCurrentCol()
    addAllDiagonalUp()
    addAllDiagonalDown()

    return attackedPositions

}

const check = {
    sameRow: (position, element) => position.rowIndex === element.rowIndex,
    sameColumn: (position, element) => position.columnIndex === element.columnIndex,
    sameDiagonal: (position, element, chessboardSize = 4, positions) => {
        const attackedPositions = [];
  
        let currentRow = position.rowIndex;
        let currentLeftCol = position.columnIndex;
        let currentRightCol = position.columnIndex;
        while (currentRow > 0) {
            currentRow--; currentLeftCol--; currentRightCol++;
            if (currentLeftCol > -1) {
                attackedPositions.push(new Position(currentRow, currentLeftCol))
            }
            if (currentRightCol < chessboardSize) {
                attackedPositions.push(new Position(currentRow, currentRightCol))
            }
        }

        currentRow = position.rowIndex;
        currentLeftCol = position.columnIndex;
        currentRightCol = position.columnIndex;
        while (currentRow < chessboardSize) {
            currentRow++; currentLeftCol--; currentRightCol++;
            if (currentLeftCol > -1) {
                attackedPositions.push(new Position(currentRow, currentLeftCol))
            }
            if (currentRightCol < chessboardSize) {
                attackedPositions.push(new Position(currentRow, currentRightCol))
            }
        }
        //visualize(chessboardSize, attackedPositions, positions)
        let isAttacked = attackedPositions.some(attackedPosition => element.equals(attackedPosition))
        console.log("\n--START--\n", "Pos:", position, "\neleme",  element, "\natta:\n", attackedPositions, "\n-----\n", "isAttacked", isAttacked)
        return isAttacked;
    },

}


function getChessboardSize(positions) {

    return positions.reduce( (accum, currValue) => {

        if (currValue.rowIndex > accum) {
            accum = currValue.rowIndex
        }

        if (currValue.columnIndex > accum) {
            accum = currValue.columnIndex
        }

        return accum;
    }, 0) + 1 //+1 since 0 based index

}