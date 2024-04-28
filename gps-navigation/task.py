from trilateration_python.models import TrackableObject, Point
from trilateration_python.navigation_service import GPSService


class Car(TrackableObject):
    def _calculate_position(self):

        satellites = GPSService.get_available_satellites()

        if len(satellites) != 3:
            raise Exception(f"3 GPS satellites are needed to calculate the position, but only received {len(satellites)}")


        sat_coordinates = list(map(lambda satellite: satellite.get_coordinates(), satellites))
        sat_car_distances = list(map(lambda satellite: satellite.get_car_distance(self), satellites))

        sat_0, sat_1, sat_2 = sat_coordinates
        satD_0, satD_1, satD_2 = sat_car_distances

        # Math inspiration from here: https://www.101computing.net/cell-phone-trilateration-algorithm/
        A = 2 * sat_1.x - 2 * sat_0.x
        B = 2 * sat_1.y - 2 * sat_0.y

        C = satD_0**2 - satD_1**2 - sat_0.x**2 + sat_1.x**2 - sat_0.y**2 + sat_1.y**2

        D = 2 * sat_2.x - 2 * sat_1.x
        E = 2 * sat_2.y - 2 * sat_1.y

        F = satD_1**2 - satD_2**2 - sat_1.x**2 + sat_2.x**2 - sat_1.y**2 + sat_2.y**2

        self.x = (C*E - F*B) / (E*A - B*D)
        self.y = (C*D - A*F) / (B*D - A*E)


    def get_street(self):
        """
            street Points 
            a -> top left,      b -> top right
            c -> bottom right,  d -> bottom left
        """
        street_db = GPSService.get_street_database()
        current_car_position = Point(self.x, self.y)

        def is_car_on_street(car_position, street):
            # Math inspiration from here https://www.hiveworkshop.com/threads/check-if-x-y-coordinates-or-point-are-inside-of-a-parallelogram.336965/#post-3512630
            coordinate_pairs  = (
                ("b", "a"),
                ("c", "b"),
                ("d", "c"),
                ("a", "d")
            )

            for pair in coordinate_pairs:
                street_p0 = getattr(street, pair[0])
                street_p1 = getattr(street, pair[1])
                nX = street_p0.x - street_p1.x
                nY = street_p0.y - street_p1.y
                edge = (car_position.x - street_p1.x) * nY + (car_position.y - street_p1.y) * (-nX)
                if (edge > 0):
                    return False

            return True

        results = []
        for street in street_db:
            if is_car_on_street(car_position=current_car_position, street=street) == True:
                results.append(street.name)

        results.sort()

        return "" if (len(results) < 1) else  " / ".join(results)