class Aircraft(object):
    def __init__(self, direction_from_airport=0):
        self.direction_from_airport = direction_from_airport


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
        # You need to implement this method.
        # You can also add attributes to the classes and add new methods or functions
        raise NotImplementedError
