
class Area(object):
    def __init__(self, map):
        self.map = map


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

    @staticmethod
    def fill_area(area: Area, point_in_area: (int, int)) -> Area:

        (x, y) = point_in_area
        if area.get_point(x, y) is None or area.get_point(x, y) == 1:
            return area

        area.set_point(x, y, 1)

        moves = {
            "right": (x + 1, y),
            "down": (x, y + 1),
            "left": (x - 1, y),
            "up": (x, y - 1)
        }

        #print(area.visualize())

        for direction in moves:
            AreaHelper.fill_area(area, moves[direction])

        return area