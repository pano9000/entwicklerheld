from re import sub, IGNORECASE

class Aircraft(object):
    def __init__(self, direction_from_airport=0):
        self.direction_from_airport = direction_from_airport

    def __repr__(self) -> str:
        return str(self.direction_from_airport)


class Airport(object):
    def __init__(self, name="", icao="", iata="", runways=None, wind_speed=0, wind_direction=None):
        if runways is None:
            runways = []
        self.runways = runways
        self.name = name
        self.icao = icao
        self.iata = iata
        self.wind_speed = wind_speed
        self.wind_direction = wind_direction

    def get_best_runway(self, aircraft: Aircraft):

        if len(self.runways) < 1:
            raise ValueError("Airport has no runways :-)")

        best_runway = [None, None]

        for runway_item in self.runways:
            runway = Runway(runway_item)

            direction = aircraft.direction_from_airport \
                if self.wind_speed < 5 \
                else self.wind_direction

            mode = 1 if self.wind_speed < 5 else 0
            closest_runway = runway.get_closest_runway_part_path(direction, mode)
            if best_runway[0] == None or closest_runway[0] < best_runway[0]:
                best_runway = closest_runway

        return best_runway[1]


class Runway(object):
    def __init__(self, name: str):
        self.name = name
        self.name_parts = name.split("/")
        self.compass_degrees = self.__get_compass_degrees()

    def __get_compass_degrees(self) -> list:
        result = []
        for part in self.name_parts:
            # ignore R/C/L for now as the test does not care about R/C/L runway
            coordinates_tmp = sub(r"[a-z]", "", part, flags=IGNORECASE)

            if coordinates_tmp == "36":
                # special handling for "36" for runways as
                # runway 36 = 0° on compass, not 360°
                coordinates_tmp = "0"
            elif coordinates_tmp.startswith("0"):
                coordinates_tmp = coordinates_tmp[1] + "0"
            else:
                coordinates_tmp += "0"

            result.append(int(coordinates_tmp))

        return result

    # mode 1 = windspeed < 5 -> opposite direction | mode 0 = windspeed > 5 -> same direction
    def get_closest_runway_part_path(self, direction: int, mode: int = 1):
        closest_runway_part = [None, None]
        for i in range(0, 2):
            difference = abs(direction - self.compass_degrees[i])
            if (closest_runway_part[0] == None) or (difference < closest_runway_part[0]):
                # set [1] to the opposite name part, due to how the runway direction naming works 
                #  - unless 'windspeed' mode is on, then use the same name part
                closest_runway_part = [difference, self.name_parts[i^mode]]

        return closest_runway_part

    def __repr__(self):
        return self.name
