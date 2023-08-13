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

/*
export function getQueensProblemSolutionAll(boardSize) {

    if (boardSize < 4) return [];

    const outer = []
    const recTest = (placedPositions) => {
      const chessBoard = new QueensChessBoard(boardSize);
      placedPositions.forEach(placedPosition => {
        chessBoard.addPiece(placedPosition)
      })

      //chessBoard.visualize()

      const currentEmptyPositions = chessBoard.getEmptyPositions();
      const remainingQueens = boardSize - placedPositions.length

      if (remainingQueens === 0) return true
      if (currentEmptyPositions < remainingQueens) return false;

      for (let i = 0; i < currentEmptyPositions.length; i++) {
        const nextPositionsTest = [...chessBoard.getPiecePositions(), currentEmptyPositions[i]];
        const recResult = recTest(nextPositionsTest);

        if (recResult === true) {
          chessBoard.addPiece(currentEmptyPositions[i])
          outer.push(chessBoard)
        }
      }

    }

    for (let field = 0; field < boardSize; field++) {
      recTest([new Position(0,field)])
    }
    console.log("outer", outer.length)
    //outer.forEach(item => item.visualize())
//    console.log(outer.filter(item => item.getPiecePositions().length === 4))
    return outer[0].getPiecePositions()

}
*/

export function getQueensProblemSolution(boardSize) {

  if (boardSize < 4) return [];

  const outerRecTest = (placedPositions, columCount) => {

    let outerCount = 0;
    let outerResult = [];
    console.log(columCount)
  
    const recursiveGetQueen = (placedPositions, memo = {}) => {
      const currentChessBoard = new QueensChessBoard(boardSize);
      placedPositions.forEach(placedPosition => {
        currentChessBoard.addPiece(placedPosition);
      });
  
      const currentEmptyPositions = currentChessBoard.getEmptyPositions();
      const currentPiecePositions = currentChessBoard.getPiecePositions();
  
      const remainingQueens = boardSize - currentPiecePositions.length;
  
  
      let currentMemoStr = `${remainingQueens}_${currentChessBoard.getEmptyPositions().map(pos => `${pos.rowIndex,pos.columnIndex}`).join(",")}`;
      //console.log(currentMemoStr)

  
      if (remainingQueens === 0) {
      
        memo[currentMemoStr] = [true, currentChessBoard];
        return [true, currentChessBoard, columCount];
      }

      if (currentEmptyPositions.length < remainingQueens) {
        
        memo[currentMemoStr] = [false, currentChessBoard];
        return [false, currentChessBoard, columCount];
      }

      if (currentMemoStr in memo) {
        //console.log("found in MEMO")
        return memo[currentMemoStr]
      } 
  
      //console.log("outer", outerCount)
      for (let i = 0; i < currentEmptyPositions.length; i++) {


        const nextEmptyPosition = currentEmptyPositions[i];
        const nextPositionsTest = [...currentPiecePositions, nextEmptyPosition];
       // console.log("bef i", i, new Date(), JSON.stringify(nextPositionsTest))
        const nextResult = recursiveGetQueen(nextPositionsTest, memo);
       // console.log("aft i", i, new Date(), JSON.stringify(nextPositionsTest))

        if (nextResult[0] == true) {
          console.log(new Date(), "sol i", i, JSON.stringify(nextResult[1].getPiecePositions()))
          outerResult.push([true, nextResult[1]]);
          throw nextResult;
          return [true, nextResult[1]]
        } else {
          //return [false, null]
        }
  
      }
  
      if (outerResult.length>0) return [true, outerResult]
  
      return [false, null]
  
  
    }

    const innerResult = recursiveGetQueen(placedPositions);
    return innerResult

  };

    for (let column = 0; column < boardSize; column++) {
      try {
        const res = outerRecTest([new Position(0, column)], column);

      }
      catch(obj) {

        console.log("res", obj[1].visualize());
          return obj[1].getPiecePositions() 
      }

    }


}


const positionStatus = {
  EMPTY: 0,
  PIECE: 1,
  ATTACKED: 2
}

class QueensChessBoard {
    size;
    board;
    constructor(boardSize) {
        this.size = boardSize;
        this.board = this.#initBoard(boardSize);
    }

    #initBoard(size) {
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

      if (boardPosition.status !== positionStatus.EMPTY) {
        console.log("pos is not possible, because it is either not empty, or already occupied");
        return false;
      }

      boardPosition.status = positionStatus.PIECE;
      this.#updatePositions(position)
      return true;
    }

    #updatePositions(position) {
      const att = getAttackedPositions(position, {boardSize: this.size, checkDiagonal: true});

      att.forEach(attPosition =>  {
        let currAtt = this.board.get(attPosition.toString());
        //console.log("curAtt", attPosition.toString(), currAtt)
        if (currAtt.status == positionStatus.EMPTY) {
          this.board.get(attPosition.toString()).status = positionStatus.ATTACKED
        }
      })

    }

    getEmptyPositions() {
      return this.#getPositions(positionStatus.EMPTY)
    }

    getPiecePositions() {
      return this.#getPositions(positionStatus.PIECE)
    }

    getAttackedPositions() {
      return this.#getPositions(positionStatus.ATTACKED)
    }

    #getPositions(status) {
      const positionsOnBoard = [];
      this.board.forEach( (value) => {
        if (value.status == status) {
          positionsOnBoard.push(value)
        }
      })

      return positionsOnBoard
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

      console.log("\n---\n" + boardVisual.map(row => row.join("　")).join("\n"), "\n---\n")

    }

}



class ChessBoardPosition extends Position {
    constructor(rowIndex, columnIndex, status = positionStatus.EMPTY) {
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
        //console.log("\n--START--\n", "Pos:", position, "\neleme",  element, "\natta:\n", attackedPositions, "\n-----\n", "isAttacked", isAttacked)
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

//getQueensProblemSolution(13)
