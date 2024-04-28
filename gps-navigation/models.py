import math

from trilateration_python.navigation_service import GPSService


class TrackableObject:
    def __init__(self, x=None, y=None):
        self.x = x
        self.y = y

    def get_coordinates(self):
        return Point(self.x, self.y)

    def get_distance(self, other: "TrackableObject"):
        if self.x is None or self.y is None or other.x is None or other.y is None:
            return None
        return math.sqrt((self.x - other.x) ** 2 + (self.y - other.y) ** 2)


class Satellite(TrackableObject):
    def __init__(self, name, x, y):
        self.name = name
        super().__init__(x, y)

    def get_car_distance(self, car):
        return GPSService.get_distance_from_satellite(self, car=car)


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"


class Street:
    def __init__(self, name, a: Point, b: Point, c: Point, d: Point):
        self.name = name
        self.a = a
        self.b = b
        self.c = c
        self.d = d

