from typing import Dict

class Area(object):

    def __init__(self, map):
        self.map = map
        self.area_size = (len(self.map), len(self.map[0]))



    def get_point(self, x, y):
        for found_y, row in enumerate(self.map):
            if found_y != y:
                continue
            for found_x, cell in enumerate(row):
                if found_x == x:
                    return cell


    def set_point(self, x, y, value=0):
        self.map[y][x] = value


    def visualize(self, characters: (str, str) = ("▮", "▯"), spacer: str = " ") -> str:
        text = ""
        for line in self.map:
            for item in line:
                #item = characters[0] if item == 1 else characters[1]
                item = characters[0] if item == 1 else characters[1] if item == 0 else "x" #debug test
                text += item + spacer 
            text += "\n"
        return text


    def __repr__(self):
        text = ""
        for line in self.map:
            text += str(line) + "\n"
        return text


class AreaHelper(object):
    @staticmethod
    def fill_area(area: Area) -> Area:
        print(area.area_size)

        print(area.visualize())
        points_inside = AreaHelper.__get_boundary_start(area)

        if len(points_inside) < 1:
            return area

        for point in points_inside:
            filled_area = AreaHelper.__do_fill(area, (point["x"], point["y"]))

        return filled_area

    @staticmethod
    def __do_fill(area: Area, point_in_area: (int, int)) -> Area:
        x, y = point_in_area
        gotten_point = area.get_point(x, y)

        if gotten_point is None or gotten_point == 1:
            return area

        area.set_point(x, y, 1)

        moves = {
            "right": (x + 1, y),
            "down": (x, y + 1),
            "left": (x - 1, y),
            "up": (x, y - 1)
        }

        for direction in moves:
            AreaHelper.__do_fill(area, moves[direction])

        return area



    #rename to get_point_inside_boundary or similar
    @staticmethod
    def __get_boundary_start(area: Area):

        possible_points_inside = []
        for row in range(0, area.area_size[0]):
          accum_row = AreaHelper.__get_possible_boundary(area=area, curr_point_set = {"x": row, "y": 0} )
          if accum_row != False:
            possible_points_inside.append(accum_row)

        for col in range(0, area.area_size[1]):
          accum_col = AreaHelper.__get_possible_boundary(area=area, curr_point_set = {"x": 0, "y": col} )
          if accum_col != False:
            possible_points_inside.append(accum_col)

        return possible_points_inside

    @staticmethod
    def __get_possible_boundary(area: Area, curr_point_set: Dict[str, int] = {"x": int, "y": int}):

        while True:

            next_point_set = {"x": curr_point_set["x"]+1, "y": curr_point_set["y"]+1 }

            # if next point is out_of_areamap stop and return False
            if (next_point_set["x"] > area.area_size[1] or next_point_set["x"] < 0) or (next_point_set["y"] > area.area_size[0] or next_point_set["y"] < 0):
                return False

            curr_area_point = area.get_point(**curr_point_set)
            next_area_point = area.get_point(**next_point_set)

            if curr_area_point != 1 or next_area_point != 0:
                curr_point_set = next_point_set
                continue

            #Check if point is fully enclosed by 1s
            is_fully_eclosed_result = AreaHelper.__check_if_point_fully_enclosed(area, next_point_set)

            if is_fully_eclosed_result == False:
                curr_point_set = next_point_set
                continue

            return next_point_set




    @staticmethod
    def __check_if_point_fully_enclosed(area: Area, point_set: {str, int}) -> bool:
        #@TODO move to class attribute
        moves = {
            "right":  ( 1, 0),
            "down":   ( 0, 1),
            "left":   (-1, 0),
            "up":     ( 0, -1)
        }

        for direction in moves:

            working_point_set = point_set.copy()
            while True:
                working_point_set["x"] += moves[direction][0]
                working_point_set["y"] += moves[direction][1]

                # if working_point has run out of values in the area return False, as the working_point is not fully enclosed 
                if (working_point_set["x"] >= area.area_size[1] or working_point_set["x"] < 0) or \
                   (working_point_set["y"] >= area.area_size[0] or working_point_set["y"] < 0):
                    return False

                # if point is a boundary: break out of while and continue with next direction
                if area.get_point(working_point_set["x"], working_point_set["y"]) == 1:
                    break

        return True
