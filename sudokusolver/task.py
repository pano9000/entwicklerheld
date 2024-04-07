from sudokusolver.sudoku import Sudoku


class SudokuSolver(Sudoku):
    def __init__(self, grid):
        self.grid = grid

    def numbers_from_row(self, row):
        """This function returns a set of valid numbers for a given row"""
        return {}

    def numbers_from_column(self, column):
        """This function returns a set of valid numbers for a given column"""
        return {}

    def numbers_from_box(self, row, column):
        """This function returns a set of valid numbers for a given box"""
        return {}

    def possible_values(self, row, column):
        """This function returns a set of valid numbers for a cell in the grid"""
        return {}

    def solve(self):
        """This function solves the grid recursively by testing out all possible numbers for each cell"""
        return self.grid
