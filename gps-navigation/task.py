from trilateration_python.models import TrackableObject, Point
from trilateration_python.navigation_service import GPSService


class Car(TrackableObject):
    def _calculate_position(self):
        # implement this in scenario 1
        # GPSService.get_available_satellites()
        self.x, self.y = 0, 0

    def get_street(self):
        # implement this in scenario 2
        return None
