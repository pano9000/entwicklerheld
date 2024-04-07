from typing import Dict, Tuple, List, Union

class Area(object):

    def __init__(self, map):
        self.map = map
        self.area_size = {"x": len(self.map), "y": len(self.map[0])}


    def get_point(self, x: int, y: int) -> int:
        for found_y, row in enumerate(self.map):
            if found_y != y:
                continue
            for found_x, cell in enumerate(row):
                if found_x == x:
                    return cell


    def set_point(self, x: int, y: int, value: int = 0):
        self.map[y][x] = value


    def visualize(self, characters: Tuple[str, str] = ("▮", "▯"), spacer: str = " ") -> str:
        text = ""
        for line in self.map:
            for item in line:
                item = characters[0] if item == 1 else characters[1]
                text += item + spacer
            text += "\n"
        return text


    def __repr__(self):
        text = ""
        for line in self.map:
            text += str(line) + "\n"
        return text


class AreaHelper(object):

    movements = {
        "right":  { "x":  1, "y": 0},
        "down":   { "x":  0, "y": 1},
        "left":   { "x": -1, "y": 0},
        "up":     { "x":  0, "y": -1}
    }


    @staticmethod
    def fill_area(area: Area) -> Area:
        #print(area.visualize())
        points_inside_boxes = AreaHelper.__get_points_inside_boxes(area)

        if len(points_inside_boxes) < 1:
            return area

        # Also added support for detecting and filling multiple boxes inside an area
        for point in points_inside_boxes:
            filled_area = AreaHelper.__do_fill(area, point)

        return filled_area

    @staticmethod
    def is_point_inside_area(area: Area, point: Dict[str, int]) -> bool:

      return (point["x"] < area.area_size["y"] and point["x"] >= 0) and \
               (point["y"] < area.area_size["x"] and point["y"] >= 0)

    @staticmethod
    def __do_fill(area: Area, point: Dict[str, int]) -> Area:

        gotten_point = area.get_point(point["x"], point["y"])

        if gotten_point is None or gotten_point == 1:
            return area

        area.set_point(point["x"], point["y"], 1)

        for direction in AreaHelper.movements:
            next_point = { 
                "x": point["x"] + AreaHelper.movements[direction]["x"],
                "y": point["y"] + AreaHelper.movements[direction]["y"]
            }
            AreaHelper.__do_fill(area,  next_point)

        return area


    @staticmethod
    def __get_points_inside_boxes(area: Area) -> List[Dict[str, int]]:

        points_inside_boxes = []
        for key, val in {"row": area.area_size["x"], "col": area.area_size["y"]}.items():

            for curr_cell in range(0, val):
                curr_point = {
                    "x": curr_cell if key == "row" else 0,
                    "y": curr_cell if key == "col" else 0
                }
                result = AreaHelper.__check_diagonally_for_points_inside_boxes(area=area, starting_point=curr_point)
                if result != False:
                    points_inside_boxes.append(result)

        return points_inside_boxes

    @staticmethod
    def __check_diagonally_for_points_inside_boxes(area: Area, starting_point: Dict[str, int]) -> Union[Dict[str, int], bool]:

        curr_point = starting_point
        while True:

            next_point = {"x": curr_point["x"]+1, "y": curr_point["y"]+1 }

            # if next point is out_of_areamap stop and return False
            if AreaHelper.is_point_inside_area(area=area, point=next_point) != True:
                return False

            curr_area_point = area.get_point(**curr_point)
            next_area_point = area.get_point(**next_point)

            if curr_area_point != 1 or next_area_point != 0:
                curr_point = next_point
                continue

            #Check if point is fully enclosed by 1s
            is_fully_eclosed_result = AreaHelper.__check_if_point_fully_enclosed(area, next_point)

            if is_fully_eclosed_result == False:
                curr_point = next_point
                continue

            return next_point




    @staticmethod
    def __check_if_point_fully_enclosed(area: Area, point: Dict[str, int]) -> bool:

        for direction in AreaHelper.movements:

            working_point = point.copy()
            while True:
                working_point["x"] += AreaHelper.movements[direction]["x"]
                working_point["y"] += AreaHelper.movements[direction]["y"]

                # if working_point has run out of values in the area return False, as the working_point is not fully enclosed 
                if AreaHelper.is_point_inside_area(area=area, point=working_point) != True:
                    return False

                # if point is a boundary: break out of while and continue with next direction
                if area.get_point(working_point["x"], working_point["y"]) == 1:
                    break

        return True