import ChessBoard from "./ChessBoard";
import Position from "../Position";
import { isSafeRook, isSafeQueen, getQueensProblemSolution } from "../queens-challenge-js";

beforeEach(() => {
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished")
});


test('first scenario', () => {
    let chessBoard4 = new ChessBoard(4);
    chessBoard4.setValue(0, 0, true);
    chessBoard4.setValue(2, 1, true);
    chessBoard4.setValue(3, 2, true);
    let positions4 = [new Position(0,0), new Position(2,1), new Position(3,2)];

    let chessBoard5 = new ChessBoard(5);
    chessBoard5.setValue(0, 1, true);
    chessBoard5.setValue(1, 3, true);
    chessBoard5.setValue(3, 2, true);
    let positions5 = [new Position(0,1), new Position(1,3), new Position(3,2)];

    let chessBoard7 = new ChessBoard(7);
    chessBoard7.setValue(0, 5, true);
    chessBoard7.setValue(2, 1, true);
    chessBoard7.setValue(3, 4, true);
    chessBoard7.setValue(5, 2, true);
    let positions7 = [new Position(0,5), new Position(2,1), new Position(3,4), new Position(5,2)];

    let rook1 = new Position(0,0);
    let rook2 = new Position(0,3);
    let rook3 = new Position(1,0);
    let rook4 = new Position(0,1);
    let rook5 = new Position(1,3);
    let rook6 = new Position(2,1);
    let rook7 = new Position(3,2);
    let rook8 = new Position(3,0);
    let rook9 = new Position(1,0);
    let rook10 = new Position(2,0);
    let rook11 = new Position(2,4);
    let rook12 = new Position(4,4);
    let rook13 = new Position(2,2);
    let rook14 = new Position(1,3);
    let rook15 = new Position(1,0);
    let rook16 = new Position(1,4);
    let rook17 = new Position(3,3);
    let rook18 = new Position(4,3);
    let rook19 = new Position(5,5);
    let rook20 = new Position(6,6);
    let rook21 = new Position(5,2);

    //this square is already occupied
    let actual = isSafeRook(positions4, rook1);
    let expected = false;
    expect(actual, "The " + rook1 + " is already occupied by a rook!").toBe(expected);
    
    //under attack by row
    actual = isSafeRook(positions4, rook2);
    expected = false;
    expect(actual, "Expected " + expected + " for " + rook2 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);
    
    //under attack by col
    actual = isSafeRook(positions4, rook3);
    expected = false;
    expect(actual, "Expected " + expected + " for " + rook3 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    //this square is under attack by the first and second rook
    actual = isSafeRook(positions4, rook4);
    expected = false;
    expect(actual, "Expected " + expected + " for " + rook4 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    //this square is safe
    actual = isSafeRook(positions4, rook5);
    expected = true;
    expect(actual, "Expected " + expected + " for " + rook5 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    actual = isSafeRook(positions4, rook6);
    expected = false;
    expect(actual, "The " + rook6 + " is already occupied by a rook!").toBe(expected);

    actual = isSafeRook(positions4, rook7);
    expected = false;
    expect(actual, "The " + rook7 + " is already occupied by a rook!").toBe(expected);

    actual = isSafeRook(positions4, rook8);
    expected = false;
    expect(actual, "Expected " + expected + " for " + rook8 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    actual = isSafeRook(positions5, rook9);
    expected = false;
    expect(actual, "Expected " + expected + " for " + rook9 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard5).toBe(expected);

    actual = isSafeRook(positions5, rook10);
    expected = true;
    expect(actual, "Expected " + expected + " for " + rook10 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard5).toBe(expected);

    actual = isSafeRook(positions5, rook11);
    expected = true;
    expect(actual, "Expected " + expected + " for " + rook11 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard5).toBe(expected);

    actual = isSafeRook(positions5, rook12);
    expected = true;
    expect(actual, "Expected " + expected + " for " + rook12 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard5).toBe(expected);

    actual = isSafeRook(positions5, rook13);
    expected = false;
    expect(actual, "Expected " + expected + " for " + rook13 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard5).toBe(expected);

    actual = isSafeRook(positions5, rook14);
    expected = false;
    expect(actual, "The " + rook14 + " is already occupied by a rook!").toBe(expected);

    actual = isSafeRook(positions7, rook15);
    expected = true;
    expect(actual, "Expected " + expected + " for " + rook15 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard7).toBe(expected);

    actual = isSafeRook(positions7, rook16);
    expected = false;
    expect(actual, "Expected " + expected + " for " + rook16 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard7).toBe(expected);

    actual = isSafeRook(positions7, rook17);
    expected = false;
    expect(actual, "Expected " + expected + " for " + rook17 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard7).toBe(expected);

    actual = isSafeRook(positions7, rook18);
    expected = true;
    expect(actual, "Expected " + expected + " for " + rook18 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard7).toBe(expected);

    actual = isSafeRook(positions7, rook19);
    expected = false;
    expect(actual, "Expected " + expected + " for " + rook19 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard7).toBe(expected);

    actual = isSafeRook(positions7, rook20);
    expected = true;
    expect(actual, "Expected " + expected + " for " + rook20 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard7).toBe(expected);

    actual = isSafeRook(positions7, rook21);
    expected = false;
    expect(actual, "The " + rook21 + " is already occupied by a rook!").toBe(expected);
});

test('second scenario', () => {
    let chessBoard4 = new ChessBoard(4);
    chessBoard4.setValue(0, 1, true);
    chessBoard4.setValue(3, 2, true);
    let positions4 = [new Position(0,1), new Position(3,2)];

    let chessBoard5 = new ChessBoard(5);
    chessBoard5.setValue(1, 1, true);
    chessBoard5.setValue(2, 4, true);
    chessBoard5.setValue(3, 2, true);
    let positions5 = [new Position(1,1), new Position(2,4), new Position(3,2)];

    let chessBoard8 = new ChessBoard(8);
    chessBoard8.setValue(0, 7, true);
    chessBoard8.setValue(2, 4, true);
    chessBoard8.setValue(4, 0, true);
    chessBoard8.setValue(6, 3, true);
    let positions8 = [new Position(0,7), new Position(2,4), new Position(4,0), new Position(6,3)];
    
    let queen1 = new Position(0,1);
    let queen2 = new Position(0,3);
    let queen3 = new Position(2,2);
    let queen4 = new Position(1,0);
    let queen5 = new Position(2,0);
    let queen6 = new Position(1,2);
    let queen7 = new Position(1,3);
    let queen8 = new Position(2,4);
    let queen9 = new Position(0,3);
    let queen10 = new Position(2,0);
    let queen11 = new Position(3,3);
    let queen12 = new Position(4,0);
    let queen13 = new Position(1,1);
    let queen14 = new Position(1,2);
    let queen15 = new Position(1,5);
    let queen16 = new Position(5,5);
    let queen17 = new Position(4,3);
    let queen18 = new Position(3,6);
    let queen19 = new Position(7,6);
    let queen20 = new Position(3,2);
    let queen21 = new Position(6,1);
    let queen22 = new Position(0,1);
    let queen23 = new Position(5,6);
    let queen24 = new Position(7,3);

    //check if square is free
    let actual = isSafeQueen(positions4, queen1);
    let expected = false;
    expect(actual, "The " + queen1 + " is already occupied by a queen!").toBe(expected);
    
    //row under attack
    actual = isSafeQueen(positions4, queen2);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen2 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    //col under attack
    actual = isSafeQueen(positions4, queen3);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen3 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    //diagonal under attack
    actual = isSafeQueen(positions4, queen4);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen4 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    //this square is safe
    actual = isSafeQueen(positions4, queen5);
    expected = true;
    expect(actual, "Expected " + expected + " for " + queen5 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    actual = isSafeQueen(positions4, queen6);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen6 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    actual = isSafeQueen(positions4, queen7);
    expected = true;
    expect(actual, "Expected " + expected + " for " + queen7 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    actual = isSafeQueen(positions5, queen8);
    expected = false;
    expect(actual, "The " + queen1 + " is already occupied by a queen!").toBe(expected);

    actual = isSafeQueen(positions5, queen9);
    expected = true;
    expect(actual, "Expected " + expected + " for " + queen9 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    actual = isSafeQueen(positions5, queen10);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen10 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    actual = isSafeQueen(positions5, queen11);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen11 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    actual = isSafeQueen(positions5, queen12);
    expected = true;
    expect(actual, "Expected " + expected + " for " + queen12 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard4).toBe(expected);

    actual = isSafeQueen(positions8, queen13);
    expected = true;
    expect(actual, "Expected " + expected + " for " + queen13 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);

    actual = isSafeQueen(positions8, queen14);
    expected = true;
    expect(actual, "Expected " + expected + " for " + queen14 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);

    actual = isSafeQueen(positions8, queen15);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen15 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);

    actual = isSafeQueen(positions8, queen16);
    expected = true;
    expect(actual, "Expected " + expected + " for " + queen16 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);

    actual = isSafeQueen(positions8, queen17);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen17 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);

    actual = isSafeQueen(positions8, queen18);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen18 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);

    actual = isSafeQueen(positions8, queen19);
    expected = true;
    expect(actual, "Expected " + expected + " for " + queen19 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);

    actual = isSafeQueen(positions8, queen20);
    expected = true;
    expect(actual, "Expected " + expected + " for " + queen20 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);

    actual = isSafeQueen(positions8, queen21);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen21 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);

    actual = isSafeQueen(positions8, queen22);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen22 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);

    actual = isSafeQueen(positions8, queen23);
    expected = true;
    expect(actual, "Expected " + expected + " for " + queen23 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);

    actual = isSafeQueen(positions8, queen24);
    expected = false;
    expect(actual, "Expected " + expected + " for " + queen24 + " but was " + actual + ". Take a look at the given chessboard:\n\n" + chessBoard8).toBe(expected);
});

test('third scenario', () => {
    let boardSize = 4;
    let chessBoard = new ChessBoard(boardSize);
    let actual = getQueensProblemSolution(boardSize);
    for (let i = 0; i < actual.length; i++) {
        chessBoard.setValue(actual[i].rowIndex, actual[i].columnIndex, true);
    }
    let validSolution = isValidSolution(actual, boardSize);
    expect(actual.length, "You should have placed " +boardSize+" queens on the chessboard but only " + actual.length +" found.").toBe(boardSize);
    expect(validSolution[0], actual +" is not a valid solution. The Queen at Position" + validSolution[1][0]+ " is conflicting with the Queen at Position"+ validSolution[1][1] + ". Take a look at your chessBoard:\n\n" + chessBoard).toBe(true);
            
    boardSize = 0;
    actual = getQueensProblemSolution(boardSize);
    var expected = [];
    expect(actual, actual +" is not a valid solution. For boardSize < 4 you should return an empty list.").toStrictEqual(expected);

    boardSize = 3;
    actual = getQueensProblemSolution(boardSize);
    expected = [];
    expect(actual, actual +" is not a valid solution. For boardSize < 4 you should return an empty list.").toStrictEqual(expected);

    boardSize = 5;
    chessBoard = new ChessBoard(boardSize);
    actual = getQueensProblemSolution(boardSize);
    for (let i = 0; i < actual.length; i++)
    {
        chessBoard.setValue(actual[i].rowIndex, actual[i].columnIndex, true);
    }
    validSolution = isValidSolution(actual, boardSize);
    expect(actual.length, "You should have placed " +boardSize+" queens on the chessboard but only " + actual.length +" found.").toBe(boardSize);
    expect(validSolution[0], actual + " is not a valid solution. The Queen at Position" +validSolution[1][0]+ " is conflicting with the Queen at Position"+ validSolution[1][1] + ". Take a look at your chessBoard:\n\n" + chessBoard).toBe(true);

    boardSize = 6;
    chessBoard = new ChessBoard(boardSize);
    actual = getQueensProblemSolution(boardSize);
    for (let i = 0; i < actual.length; i++)
    {
        chessBoard.setValue(actual[i].rowIndex, actual[i].columnIndex, true);
    }
    validSolution = isValidSolution(actual, boardSize);
    expect(actual.length, "You should have placed " +boardSize+" queens on the chessboard but only " + actual.length +" found.").toBe(boardSize);
    expect(validSolution[0], actual + " is not a valid solution. The Queen at Position" +validSolution[1][0]+ " is conflicting with the Queen at Position"+ validSolution[1][1] + ". Take a look at your chessBoard:\n\n" + chessBoard).toBe(true);

    boardSize = 7;
    chessBoard = new ChessBoard(boardSize);
    actual = getQueensProblemSolution(boardSize);
    for (let i = 0; i < actual.length; i++)
    {
        chessBoard.setValue(actual[i].rowIndex, actual[i].columnIndex, true);
    }
    validSolution = isValidSolution(actual, boardSize);
    expect(actual.length, "You should have placed " +boardSize+" queens on the chessboard but only " + actual.length +" found.").toBe(boardSize);
    expect(validSolution[0], actual + " is not a valid solution. The Queen at Position" +validSolution[1][0]+ " is conflicting with the Queen at Position"+ validSolution[1][1] + ". Take a look at your chessBoard:\n\n" + chessBoard).toBe(true);

    boardSize = 8;
    chessBoard = new ChessBoard(boardSize);
    actual = getQueensProblemSolution(boardSize);
    for (let i = 0; i < actual.length; i++)
    {
        chessBoard.setValue(actual[i].rowIndex, actual[i].columnIndex, true);
    }
    validSolution = isValidSolution(actual, boardSize);
    expect(actual.length, "You should have placed " +boardSize+" queens on the chessboard but only " + actual.length +" found.").toBe(boardSize);
    expect(validSolution[0], actual + " is not a valid solution. The Queen at Position" +validSolution[1][0]+ " is conflicting with the Queen at Position"+ validSolution[1][1] + ". Take a look at your chessBoard:\n\n" + chessBoard).toBe(true);

    boardSize = 9;
    chessBoard = new ChessBoard(boardSize);
    actual = getQueensProblemSolution(boardSize);
    for (let i = 0; i < actual.length; i++)
    {
        chessBoard.setValue(actual[i].rowIndex, actual[i].columnIndex, true);
    }
    validSolution = isValidSolution(actual, boardSize);
    expect(actual.length, "You should have placed " +boardSize+" queens on the chessboard but only " + actual.length +" found.").toBe(boardSize);
    expect(validSolution[0], actual + " is not a valid solution. The Queen at Position" +validSolution[1][0]+ " is conflicting with the Queen at Position"+ validSolution[1][1] + ". Take a look at your chessBoard:\n\n" + chessBoard).toBe(true);

    boardSize = 10;
    chessBoard = new ChessBoard(boardSize);
    actual = getQueensProblemSolution(boardSize);
    for (let i = 0; i < actual.length; i++)
    {
        chessBoard.setValue(actual[i].rowIndex, actual[i].columnIndex, true);
    }
    validSolution = isValidSolution(actual, boardSize);
    expect(actual.length, "You should have placed " +boardSize+" queens on the chessboard but only " + actual.length +" found.").toBe(boardSize);
    expect(validSolution[0], actual + " is not a valid solution. The Queen at Position" +validSolution[1][0]+ " is conflicting with the Queen at Position"+ validSolution[1][1] + ". Take a look at your chessBoard:\n\n" + chessBoard).toBe(true);

    boardSize = 11;
    chessBoard = new ChessBoard(boardSize);
    actual = getQueensProblemSolution(boardSize);
    for (let i = 0; i < actual.length; i++)
    {
        chessBoard.setValue(actual[i].rowIndex, actual[i].columnIndex, true);
    }
    validSolution = isValidSolution(actual, boardSize);
    expect(actual.length, "You should have placed " +boardSize+" queens on the chessboard but only " + actual.length +" found.").toBe(boardSize);
    expect(validSolution[0], actual + " is not a valid solution. The Queen at Position" +validSolution[1][0]+ " is conflicting with the Queen at Position"+ validSolution[1][1] + ". Take a look at your chessBoard:\n\n" + chessBoard).toBe(true);
    
    boardSize = 12;
    chessBoard = new ChessBoard(boardSize);
    actual = getQueensProblemSolution(boardSize);
    for (let i = 0; i < actual.length; i++)
    {
        chessBoard.setValue(actual[i].rowIndex, actual[i].columnIndex, true);
    }
    validSolution = isValidSolution(actual, boardSize);
    expect(actual.length, "You should have placed " +boardSize+" queens on the chessboard but only " + actual.length +" found.").toBe(boardSize);
    expect(validSolution[0], actual + " is not a valid solution. The Queen at Position" +validSolution[1][0]+ " is conflicting with the Queen at Position"+ validSolution[1][1] + ". Take a look at your chessBoard:\n\n" + chessBoard).toBe(true);

    boardSize = 13;
    chessBoard = new ChessBoard(boardSize);
    actual = getQueensProblemSolution(boardSize);
    for (let i = 0; i < actual.length; i++)
    {
        chessBoard.setValue(actual[i].rowIndex, actual[i].columnIndex, true);
    }
    validSolution = isValidSolution(actual, boardSize);
    expect(actual.length, "You should have placed " +boardSize+" queens on the chessboard but only " + actual.length +" found.").toBe(boardSize);
    expect(validSolution[0], actual + " is not a valid solution. The Queen at Position" +validSolution[1][0]+ " is conflicting with the Queen at Position"+ validSolution[1][1] + ". Take a look at your chessBoard:\n\n" + chessBoard).toBe(true);
});

function isValidSolution(positions, boardSize) {
    for (let positionA = 0; positionA < positions.length - 1; positionA++){
        for (let positionB = 1; positionB < positions.length; positionB++){
            if(positionA === positionB) {
                break;
            }
            if(positions[positionA].leftDiagonal === positions[positionB].leftDiagonal ||
                positions[positionA].rightDiagonal === positions[positionB].rightDiagonal ||
                positions[positionA].columnIndex === positions[positionB].columnIndex ||
                positions[positionA].rowIndex === positions[positionB].rowIndex){
                return [false, [positions[positionA], positions[positionB]]];
            }
        }
    }
    return [true, [new Position(0,0), new Position(0,0)]];
}