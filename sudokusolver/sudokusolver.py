class Sudoku:
    def __init__(self, grid):
        self.grid = grid

    def __str__(self):
        """Print the sudoku in a grid to help debugging"""

        result = " ╔═══╤═══╤═══╦═══╤═══╤═══╦═══╤═══╤═══╗\n"
        for i in range(9):
            line = " ║ "
            for j in range(9):
                line += str(self.grid[i][j]) if self.grid[i][j] != 0 else " "
                line += " │ " if j % 3 != 2 else " ║ "
            result += line + "\n"
            if i % 3 == 2:
                if i != 8:
                    result += " ╠═══╪═══╪═══╬═══╪═══╪═══╬═══╪═══╪═══╣\n"
                else:
                    result += " ╚═══╧═══╧═══╩═══╧═══╧═══╩═══╧═══╧═══╝\n"
            else:
                result += " ╟───┼───┼───╫───┼───┼───╫───┼───┼───╢\n"

        return result