import Position from "./Position";

export function isSafeRook(positions, rook) {
    for (let i=0; i < positions.length; i++) {
        if (check.sameRow(positions[i], rook) || check.sameColumn(positions[i], rook)) return false;     
    }
    return true;
}

export function isSafeQueen(positions, queen) {

    const chessboardSize = getChessboardSize([...positions, queen]);
    let allAttacked = [];
    
    for (let i=0; i < positions.length; i++) {

        allAttacked.push(...getAttackedPositions(positions[i], {boardSize: chessboardSize, checkDiagonal: true}));
        //console.log(positions, "\n", queen)
        if (
            check.sameRow(positions[i], queen) 
            || check.sameColumn(positions[i], queen)
            || check.sameDiagonal(positions[i], queen, chessboardSize, [...positions])
        ) {
            console.log("shit's under attack", positions[i])
            return false;
        }
        //add diagonal handling here     
    }
    //console.log(visualize(chessboardSize,allAttacked, positions))
    return true;
}

export function getQueensProblemSolution(boardSize) {
    // implement this in scenario 3
    return [];
}

function getAttackedPositions(position, options = {boardSize: 4, checkDiagonal: true}) {
    const attackedPositions = [];

    //add all of currentRow
    const addAllCurrentRow = () => {
        let currentCol = 0;
        let currentRow = position.rowIndex;
        while(currentCol < options.boardSize) {

            attackedPositions.push(new Position(currentRow, currentCol))
            currentCol++;
        }
    }

    //add all of currentColumn
    const addAllCurrentCol = () => {
        let currentRow = 0;
        let currentCol = position.columnIndex;
        while(currentRow < options.boardSize) {

            attackedPositions.push(new Position(currentRow, currentCol))
            currentRow++;
        }
    }

    const addAllDiagonalUp = () => {
        let currentRow = position.rowIndex;
        let currentLeftCol = position.columnIndex;
        let currentRightCol = position.columnIndex;
        while (currentRow > 0) {
            currentRow--; currentLeftCol--; currentRightCol++;
            if (currentLeftCol > -1) {
                attackedPositions.push(new Position(currentRow, currentLeftCol))
            }
            if (currentRightCol <  options.boardSize) {
                attackedPositions.push(new Position(currentRow, currentRightCol))
            }
        }

    }

    const addAllDiagonalDown = () => {
        let currentRow = position.rowIndex;
        let currentLeftCol = position.columnIndex;
        let currentRightCol = position.columnIndex;
        while (currentRow <  options.boardSize) {
            currentRow++; currentLeftCol--; currentRightCol++;
            if (currentLeftCol > -1) {
                attackedPositions.push(new Position(currentRow, currentLeftCol))
            }
            if (currentRightCol <  options.boardSize) {
                attackedPositions.push(new Position(currentRow, currentRightCol))
            }
        }

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

const visualize = (chessboardSize, attackedPositions, placedItems) => {
    const chessboard = []
    for (let i=0; i<chessboardSize; i++) {
        chessboard[i] = new Array(chessboardSize).fill("◻", 0, chessboardSize)
        //◼
    }

    console.log("att", attackedPositions)

    attackedPositions.forEach((position, index) => {
        if (chessboard[position.rowIndex] == undefined) {
            console.log("possundefff", position, index, chessboard)
        }
        chessboard[position.rowIndex][position.columnIndex] = "◼"
    })
/*
    placedItems.forEach(item => {
        chessboard[item.rowIndex][item.columnIndex] = "◉"
    })
*/
    let a = chessboard.map(row => {
        return row.join(" ")
    })
    
    console.log("\n---chessb\n" + a.join("\n"))

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