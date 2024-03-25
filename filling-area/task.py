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


class AreaHelper(object):
    @staticmethod
    def fill_area(area: Area, point_in_area: (int, int)) -> Area:
        raise NotImplementedError
