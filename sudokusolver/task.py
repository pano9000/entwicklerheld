from sudokusolver import Sudoku


class SudokuSolver(Sudoku):
    def __init__(self, grid):
        self.grid = grid
        #print(self.grid)

    def __get_column_values(self, column):
        current_column_values = []
        for row in self.grid:
            current_column_values.append(row[column])
        return current_column_values
    
    # unused
    def __get_box_size(self):
        box_size = None
        for i in range(len(self.grid) - 1, 1, -1):
            if len(self.grid) % i == 0:
                box_size = i
        return box_size
    
    def __get_box_range(self, row, column, box_size = 3):
        box_range = {}

        for key, i in {"row": row, "column": column}.items():
            start = i - (i % box_size)
            end = start + box_size #exclusive end
            box_range[key] = {
                "start": start, 
                "end": end
            }
        
        return box_range
    
    def __get_result_set(self, values):
        result_set = set()
        for num in range(1, len(values) + 1):
            if not num in values:
                result_set.add(num)
        return result_set

    def numbers_from_row(self, row):
        """This function returns a set of valid numbers for a given row"""
        return self.__get_result_set(self.grid[row])

    def numbers_from_column(self, column):
        """This function returns a set of valid numbers for a given column"""
        return self.__get_result_set(self.__get_column_values(column))

    def numbers_from_box(self, row, column, box_size: int = 3):
        """This function returns a set of valid numbers for a given box"""        
        box_range = self.__get_box_range(row, column, box_size)
        result_set = set()

        for col in range(box_range["column"]["start"], box_range["column"]["end"]):
            current_column_values = self.__get_column_values(col)[box_range["row"]["start"]: box_range["row"]["end"]]
            #print(f"current_column_values {current_column_values}")
            for num in current_column_values:
                #print(f"num: {num} | col: {col}")
                if not num in result_set:
                    result_set.add(num)
        
        #print("after col", row, column, result_set)

        for row in range(box_range["row"]["start"], box_range["row"]["end"]):
            current_row_values = self.grid[row][box_range["column"]["start"]:box_range["column"]["end"]]
            #print(f"current_row_values {current_row_values}")
            for num in current_row_values:
                #print(f"num: {num} | row: {row}")
                if not num in result_set:
                    result_set.add(num)

        #print("after row", row, column, result_set)

        result_set.remove(0)

        result_set_final = set()

        for num in range(1, len(self.grid)+1):
            if not num in result_set:
                result_set_final.add(num)

        
        #print("------------end")

        return result_set_final


    def possible_values(self, row, column):
        """This function returns a set of valid numbers for a cell in the grid"""
        #print("---start", row, column)
        possible_row_values = self.numbers_from_row(row)
        possible_column_values = self.numbers_from_column(column)
        possible_box_values = self.numbers_from_box(row, column)
        #print(possible_box_values, "||", possible_row_values, possible_column_values)

        result_set = set()
        for num in possible_box_values:
            if (num in possible_row_values) and (num in possible_column_values):
                result_set.add(num)
        return result_set

    def __recurse_solve(self, row, column, possible_value):
        print(self)
        new_sudo = SudokuSolver(self.grid)
        print(f"before: {new_sudo.grid[row][column]} || row: {row}, col: {column}")
        new_sudo.grid[row][column] = possible_value
        print(self, "\n after")
        print(f"after: {new_sudo.grid[row][column]} || row: {row}, col: {column}")
        if self.__has_unsolved_cells():
            new_sudo.solve()
        else:
            print("solved?")
            return new_sudo

        #solved = new_sudo.solve()
        #print(possible_value)

    def __has_unsolved_cells(self):
        for row in self.grid:
            for col in row:
                #print("col", col)
                if col == 0:
                    return True
        return False


    def solve(self):
        """This function solves the grid recursively by testing out all possible numbers for each cell"""
        print("--------------start")

        for row_index in range(0, len(self.grid)):
            curr_row = self.grid[row_index]
            print(row_index, curr_row)

            for col_index in range(0, len(curr_row)):
                curr_column_val = curr_row[col_index]
                if curr_column_val != 0:
                    continue

                print(f"row: {row_index}, column: {col_index}, curr_col_val{curr_row[col_index]}, possible_val: {self.possible_values(row_index, col_index)}")
                possible_values = self.possible_values(row_index, col_index)
                if len(possible_values) < 1:
                    return False
                    #continue
                for possible_value in possible_values:
                    self.__recurse_solve(row_index, col_index, possible_value)

        return self.grid


        """
            for each column value of each row (aka cell):
                if value is not 0:
                    skip
                get possible box values for cell
                for each possible box value for the cell:
                    insert possible_val into cell
                    continie with the next


        """



sudoku_t = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ]

sudoku = Sudoku(sudoku_t)
#print(sudoku)
sudokusolver = SudokuSolver(sudoku.grid)
print(sudokusolver.solve())
#print(sudokusolver.possible_values(0, 7))