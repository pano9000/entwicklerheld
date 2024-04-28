from trilateration_python.models import TrackableObject, Point
from trilateration_python.navigation_service import GPSService


class Car(TrackableObject):
    def _calculate_position(self):
        # implement this in scenario 1
        available_sat = GPSService.get_available_satellites()
        if len(available_sat) != 3:
            raise Exception(f"3 GPS satellites are needed to calculate the position, but only received {len(available_sat)}")

        # math inspiration from here: https://www.101computing.net/cell-phone-trilateration-algorithm/

        sat_1 = available_sat[0].get_coordinates()
        sat_2 = available_sat[1].get_coordinates()
        sat_3 = available_sat[2].get_coordinates()

        A = 2 * sat_2.x - 2 * sat_1.x
        B = 2 * sat_2.y - 2 * sat_1.y

        C = available_sat[0].get_car_distance(self)**2 - available_sat[1].get_car_distance(self)**2 - sat_1.x**2 + sat_2.x**2 - sat_1.y**2 + sat_2.y**2

        D = 2 * sat_3.x - 2 * sat_2.x
        E = 2 * sat_3.y - 2 * sat_2.y
        F = available_sat[1].get_car_distance(self)**2 - available_sat[2].get_car_distance(self)**2 - sat_2.x**2 + sat_3.x**2 - sat_2.y**2 + sat_3.y**2
        
        x = (C*E - F*B) / (E*A - B*D)
        y = (C*D - A*F) / (B*D - A*E)
        self.x = x
        self.y = y


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