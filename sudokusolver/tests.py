import unittest
from task import *
#import xmlrunner

puzzles = {
    "easy": [
        [0, 0, 0, 2, 6, 0, 7, 0, 1],
        [6, 8, 0, 0, 7, 0, 0, 9, 0],
        [1, 9, 0, 0, 0, 4, 5, 0, 0],
        [8, 2, 0, 1, 0, 0, 0, 4, 0],
        [0, 0, 4, 6, 0, 2, 9, 0, 0],
        [0, 5, 0, 0, 0, 3, 0, 2, 8],
        [0, 0, 9, 3, 0, 0, 0, 7, 4],
        [0, 4, 0, 0, 5, 0, 0, 3, 6],
        [7, 0, 3, 0, 1, 8, 0, 0, 0],
    ],
    "easy2": [
        [1, 0, 0, 4, 8, 9, 0, 0, 6],
        [7, 3, 0, 0, 0, 0, 0, 4, 0],
        [0, 0, 0, 0, 0, 1, 2, 9, 5],
        [0, 0, 7, 1, 2, 0, 6, 0, 0],
        [5, 0, 0, 7, 0, 3, 0, 0, 8],
        [0, 0, 6, 0, 9, 5, 7, 0, 0],
        [9, 1, 4, 6, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0, 3, 7],
        [8, 0, 0, 5, 1, 2, 0, 0, 4],
    ],
    "medium": [
        [0, 2, 0, 6, 0, 8, 0, 0, 0],
        [5, 8, 0, 0, 0, 9, 7, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0],
        [3, 7, 0, 0, 0, 0, 5, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 4],
        [0, 0, 8, 0, 0, 0, 0, 1, 3],
        [0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 9, 8, 0, 0, 0, 3, 6],
        [0, 0, 0, 3, 0, 6, 0, 9, 0],
    ],
    "hard": [
        [0, 0, 0, 6, 0, 0, 4, 0, 0],
        [7, 0, 0, 0, 0, 3, 6, 0, 0],
        [0, 0, 0, 0, 9, 1, 0, 8, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 5, 0, 1, 8, 0, 0, 0, 3],
        [0, 0, 0, 3, 0, 6, 0, 4, 5],
        [0, 4, 0, 2, 0, 0, 0, 6, 0],
        [9, 0, 3, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 1, 0, 0],
    ],
}

solutions = {
    "easy": [
        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9],
    ],
    "easy2": [
        [1, 5, 2, 4, 8, 9, 3, 7, 6],
        [7, 3, 9, 2, 5, 6, 8, 4, 1],
        [4, 6, 8, 3, 7, 1, 2, 9, 5],
        [3, 8, 7, 1, 2, 4, 6, 5, 9],
        [5, 9, 1, 7, 6, 3, 4, 2, 8],
        [2, 4, 6, 8, 9, 5, 7, 1, 3],
        [9, 1, 4, 6, 3, 7, 5, 8, 2],
        [6, 2, 5, 9, 4, 8, 1, 3, 7],
        [8, 7, 3, 5, 1, 2, 9, 6, 4],
    ],
    "medium": [
        [1, 2, 3, 6, 7, 8, 9, 4, 5],
        [5, 8, 4, 2, 3, 9, 7, 6, 1],
        [9, 6, 7, 1, 4, 5, 3, 2, 8],
        [3, 7, 2, 4, 6, 1, 5, 8, 9],
        [6, 9, 1, 5, 8, 3, 2, 7, 4],
        [4, 5, 8, 7, 9, 2, 6, 1, 3],
        [8, 3, 6, 9, 2, 4, 1, 5, 7],
        [2, 1, 9, 8, 5, 7, 4, 3, 6],
        [7, 4, 5, 3, 1, 6, 8, 9, 2],
    ],
    "hard": [
        [5, 8, 1, 6, 7, 2, 4, 3, 9],
        [7, 9, 2, 8, 4, 3, 6, 5, 1],
        [3, 6, 4, 5, 9, 1, 7, 8, 2],
        [4, 3, 8, 9, 5, 7, 2, 1, 6],
        [2, 5, 6, 1, 8, 4, 9, 7, 3],
        [1, 7, 9, 3, 2, 6, 8, 4, 5],
        [8, 4, 5, 2, 1, 9, 3, 6, 7],
        [9, 1, 3, 7, 6, 8, 5, 2, 4],
        [6, 2, 7, 4, 3, 5, 1, 9, 8],
    ],
}


class TestPythonSolver(unittest.TestCase):
    def test_valid_row(self):
        test = [[0 for _ in range(9)] for _ in range(9)]
        test[1] = [i for i in range(9)]
        test[2] = [i if i % 2 == 0 else 0 for i in range(1, 10)]
        test[3] = [i if i % 2 == 1 else 0 for i in range(1, 10)]
        test[4][0] = 9
        result = numbers_from_row(test, 1)
        self.assertEqual(
            result,
            {9},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + "row: 1\nExpected:\n{9}\nin Testcase 1 but was:\n"
            + result.__str__(),
        )
        result = numbers_from_row(test, 2)
        self.assertEqual(
            numbers_from_row(test, 2),
            {1, 3, 5, 7, 9},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + "row: 2\nExpected:\n{1, 3, 5, 7, 9}\nin Testcase 1 but was:\n"
            + result.__str__(),
        )
        result = numbers_from_row(test, 3)
        self.assertEqual(
            numbers_from_row(test, 3),
            {2, 4, 6, 8},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + "row: 4\nExpected:\n{2, 4, 6, 8}\nin Testcase 1 but was:\n"
            + result.__str__(),
        )
        result = numbers_from_row(test, 4)
        self.assertEqual(
            numbers_from_row(test, 4),
            {1, 2, 3, 4, 5, 6, 7, 8},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + "row: 4\nExpected:\n{1, 2, 3, 4, 5, 6, 7, 8}\nin Testcase 1 but was:\n"
            + result.__str__(),
        )

    def test_valid_column(self):
        test = [[0 for _ in range(9)] for _ in range(9)]
        test[1] = [i + 1 for i in range(1, 9)]
        test[1].append(0)
        test[2] = [i if i % 2 == 0 else 0 for i in range(1, 10)]
        test[3] = [i if i % 2 == 1 else 0 for i in range(1, 10)]
        test[4][0] = 9
        test[4][5] = 4
        test[6][5] = 2
        test[8][5] = 1
        result = numbers_from_column(test, 0)
        self.assertEqual(
            result,
            {3, 4, 5, 6, 7, 8},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + " column: 0\nExpected:\n{3, 4, 5, 6, 7, 8}\nin Testcase 1/3 but was:\n"
            + result.__str__(),
        )
        result = numbers_from_column(test, 2)
        self.assertEqual(
            numbers_from_column(test, 2),
            {1, 2, 5, 6, 7, 8, 9},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + " column: 2\nExpected:\n{1, 2, 5, 6, 7, 8, 9}\nin Testcase 2/3 but was:\n"
            + result.__str__(),
        )
        result = numbers_from_column(test, 5)
        self.assertEqual(
            numbers_from_column(test, 5),
            {3, 5, 8, 9},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + " column: 5\nExpected:\n{3, 5, 8, 9}\nin Testcase 3/3 but was:\n"
            + result.__str__(),
        )

    def test_valid_box(self):
        test = puzzles["easy"]
        result = numbers_from_box(test, 1, 1)
        self.assertEqual(
            numbers_from_box(test, 1, 1),
            {2, 3, 4, 5, 7},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + "row: 1\ncolumn: 1\nExpected:\n{2, 3, 4, 5, 7}\nin Testcase 1/6 but was:\n"
            + result.__str__(),
        )
        result = numbers_from_box(test, 1, 2)
        self.assertEqual(
            numbers_from_box(test, 1, 2),
            {2, 3, 4, 5, 7},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + "row: 1\ncolumn: 2\nExpected:\n{2, 3, 4, 5, 7}\nin Testcase 2/6 but was:\n"
            + result.__str__(),
        )
        result = numbers_from_box(test, 1, 3)
        self.assertEqual(
            numbers_from_box(test, 1, 3),
            {1, 3, 5, 8, 9},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + "row: 1\ncolumn: 3\nExpected:\n{1, 3, 5, 8, 9}\nin Testcase 3/6 but was:\n"
            + result.__str__(),
        )
        test = puzzles["easy2"]
        result = numbers_from_box(test, 1, 1)
        self.assertEqual(
            numbers_from_box(test, 1, 1),
            {2, 4, 5, 6, 8, 9},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + "row: 1\ncolumn: 1\nExpected:\n{2, 4, 5, 6, 8, 9}\nin Testcase 4/6 but was:\n"
            + result.__str__(),
        )
        result = numbers_from_box(test, 1, 2)
        self.assertEqual(
            numbers_from_box(test, 1, 2),
            {2, 4, 5, 6, 8, 9},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + "row: 1\ncolumn: 2\nExpected:\n{2, 4, 5, 6, 8, 9}\nin Testcase 5/6 but was:\n"
            + result.__str__(),
        )
        result = numbers_from_box(test, 1, 3)
        self.assertEqual(
            numbers_from_box(test, 1, 3),
            {2, 3, 5, 6, 7},
            "\nGiven is:\ngrid:\n"
            + Sudoku(test).__str__()
            + "row: 1\ncolumn: 3\nExpected:\n{2, 3, 5, 6, 7}\nin Testcase 6/6 but was:\n"
            + result.__str__(),
        )

    def test_possible_values(self):
        result = possible_values(puzzles["easy"], 0, 1)
        self.assertEqual(
            possible_values(puzzles["easy"], 0, 1),
            {3},
            "\nGiven is:\ngrid:\n"
            + Sudoku(puzzles["easy"]).__str__()
            + "row: 0\ncolumn: 1\nExpected:\n{3}\nin Testcase 1/5 but was:\n"
            + result.__str__(),
        )
        result = possible_values(puzzles["easy"], 0, 2)
        self.assertEqual(
            possible_values(puzzles["easy"], 0, 2),
            {5},
            "\nGiven is:\ngrid:\n"
            + Sudoku(puzzles["easy"]).__str__()
            + "row: 0\ncolumn: 2\nExpected:\n{5}\nin Testcase 2/5 but was:\n"
            + result.__str__(),
        )
        result = possible_values(puzzles["easy"], 0, 7)
        self.assertEqual(
            possible_values(puzzles["easy"], 0, 7),
            {8},
            "\nGiven is:\ngrid:\n"
            + Sudoku(puzzles["easy"]).__str__()
            + "row: 0\ncolumn: 7\nExpected:\n{8}\nin Testcase 3/5 but was:\n"
            + result.__str__(),
        )
        result = possible_values(puzzles["easy"], 4, 4)
        self.assertEqual(
            possible_values(puzzles["easy"], 4, 4),
            {8},
            "\nGiven is:\ngrid:\n"
            + Sudoku(puzzles["easy"]).__str__()
            + "row: 4\ncolumn: 4\nExpected:\n{8}\nin Testcase 4/5 but was:\n"
            + result.__str__(),
        )
        result = possible_values(puzzles["easy"], 2, 6)
        self.assertEqual(
            possible_values(puzzles["easy"], 2, 6),
            {8, 2, 3, 6},
            "\nGiven is:\ngrid:\n"
            + Sudoku(puzzles["easy"]).__str__()
            + "row: 2\ncolumn: 6\nExpected:\n{8, 2, 3, 6}\nin Testcase 5/5 but was:\n"
            + result.__str__(),
        )

    def test_solve(self):
        i = 0
        for key in puzzles:
            i += 1
            grid = [[puzzles[key][x][y] for y in range(9)] for x in range(9)]
            result = solve(grid)
            self.assertEqual(
                result,
                solutions[key],
                "\nGiven is:\ngrid:\n"
                + Sudoku(puzzles[key]).__str__()
                + "\nExpected:\n"
                + Sudoku(solutions[key]).__str__()
                + "\nin Testcase "
                + i.__str__()
                + "/4 but was:\n"
                + Sudoku(result).__str__(),
            )

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")


def numbers_from_row(grid, row):
    solver = SudokuSolver(grid)
    return solver.numbers_from_row(row)


def numbers_from_column(grid, column):
    solver = SudokuSolver(grid)
    return solver.numbers_from_column(column)


def numbers_from_box(grid, row, column):
    solver = SudokuSolver(grid)
    return solver.numbers_from_box(row, column)


def possible_values(grid, row, column):
    solver = SudokuSolver(grid)
    return solver.possible_values(row, column)


def solve(grid):
    solver = SudokuSolver(grid)
    return solver.solve()


if __name__ == "__main__":
    unittest.main()
