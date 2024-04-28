from trilateration_python.models import *


class GPSService:
    _all_satellites = []
    _distances = {}

    @staticmethod
    def get_distance_from_satellite(satellite: "Satellite", **kwargs) -> int:
        return GPSService._distances.get(satellite, None)

    @staticmethod
    def get_available_satellites() -> list:
        return GPSService._all_satellites

    @staticmethod
    def get_street_database():
        from trilateration_python.models import Street, Point
        return [
            Street("David A. Huffman Straße", Point(111, 0), Point(121, 0), Point(121, 1000), Point(111, 1000)),
            Street("Margaret Hamilton Straße", Point(386, 255), Point(425, 255),Point(425, 1000), Point(386, 1000)),
            Street("Frances Allen Straße", Point(622, 0), Point(639, 0), Point(639, 1000), Point(622, 1000)),
            Street("Richard Hamming Weg", Point(522, 0), Point(542, 0), Point(432, 188), Point(418, 181)),
            Street("Grace Hopper Straße", Point(834, 0), Point(847, 0), Point(847, 1000), Point(834, 1000)),

            Street("Dennis Ritchie Straße", Point(0, 531), Point(639, 531), Point(639, 544), Point(0, 544)),
            Street("Lovelace Straße", Point(639, 618), Point(1000, 618), Point(1000, 628), Point(639, 628)),
            Street("Turing Allee", Point(16, 0), Point(45, 0), Point(1000, 552), Point(1000, 571)),
        ]