import Position from "./Position";

export function isSafeRook(positions, rook) {
    for (let i=0; i < positions.length; i++) {
        if (check.sameRow(positions[i], rook) || check.sameColumn(positions[i], rook)) return false;     
    }
    return true;
}

export function isSafeQueen(positions, queen) {
    for (let i=0; i < positions.length; i++) {

        //console.log(positions, "\n", queen)
        if (
            check.sameRow(positions[i], queen) 
            || check.sameColumn(positions[i], queen)
            || check.sameDiagonal(positions[i], queen)
        ) return false;
        //add diagonal handling here     
    }
    return true;
}

export function getQueensProblemSolution(boardSize) {
    // implement this in scenario 3
    return [];
}

const check = {
    sameRow: (position, element) => position.rowIndex === element.rowIndex,
    sameColumn: (position, element) => position.columnIndex === element.columnIndex,
    sameDiagonal: (position, element, chessboardSize = 4) => {
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

        while (currentRow < chessboardSize) {
            currentRow++; currentLeftCol--; currentRightCol++;
            if (currentLeftCol > -1) {
                attackedPositions.push(new Position(currentRow, currentLeftCol))
            }
            if (currentRightCol < chessboardSize) {
                attackedPositions.push(new Position(currentRow, currentRightCol))
            }
        }

        let isAttacked = attackedPositions.some(attackedPosition => element.equals(attackedPosition))
        console.log("Pos:", position, "\natta:\n", attackedPositions, "\n-----\nisAttacked", isAttacked, "elem", element)
        return isAttacked;
    },

}