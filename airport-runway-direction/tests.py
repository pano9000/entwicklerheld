from unittest import TestCase, main
import xmlrunner as xmlrunner
from .task import *

class RunwayTests(TestCase):
    def test_scenario_1(self):
        eddc = Airport(name="Dresden International", iata="DRS", icao="EDDC", runways=["04/22"], wind_speed=0)
        flight_1 = Aircraft(direction_from_airport=12)
        runway = eddc.get_best_runway(flight_1)
        self.assertEqual(runway, "22", f"Asserted runway 22 for flight from 12° but was {runway}")

        flight_2 = Aircraft(direction_from_airport=276)
        runway = eddc.get_best_runway(flight_2)
        self.assertEqual(runway, "04", f"Asserted runway 04 for flight from 276° but was {runway}")

        flight_3 = Aircraft(direction_from_airport=210)
        runway = eddc.get_best_runway(flight_3)
        self.assertEqual(runway, "04", f"Asserted runway 04 for flight from 210° but was {runway}")

    def test_scenario_2(self):
        eddf = Airport(name="Flughafen Frankfurt am Main", iata="FRA", icao="EDDF",
                       runways=["07R/25L", "07C/25C", "07L/25R", "18/36"], wind_speed=0)

        flight_1 = Aircraft(direction_from_airport=266)
        runway = eddf.get_best_runway(flight_1)
        self.assertIn(runway, ["07L", "07C", "07R"], f"Asserted runway 07L, 07C or 07R for flight from 266° but was {runway}")

        flight_2 = Aircraft(direction_from_airport=85)
        runway = eddf.get_best_runway(flight_2)
        self.assertIn(runway, ["25L", "25C", "25R"], f"Asserted runway 25L, 25C or 25R for flight from 85° but was {runway}")

        flight_3 = Aircraft(direction_from_airport=2)
        runway = eddf.get_best_runway(flight_3)
        self.assertEqual(runway, "18", f"Asserted runway 18 for flight from 2° but was {runway}")

    def test_scenario_3(self):
        eddf = Airport(name="Flughafen Frankfurt am Main", iata="FRA", icao="EDDF",
                       runways=["07R/25L", "07C/25C", "07L/25R", "18/36"], wind_speed=30, wind_direction=220)

        flight_1 = Aircraft(direction_from_airport=266)
        runway = eddf.get_best_runway(flight_1)
        self.assertIn(runway, ["25L", "25C", "25R"], f"Asserted runway 25L, 25C or 25R for flight from 266° but was {runway}")

        flight_2 = Aircraft(direction_from_airport=85)
        runway = eddf.get_best_runway(flight_2)
        self.assertIn(runway, ["25L", "25C", "25R"], f"Asserted runway 25L, 25C or 25R for flight from 85° but was {runway}")

        flight_3 = Aircraft(direction_from_airport=2)
        runway = eddf.get_best_runway(flight_3)
        self.assertIn(runway, ["25L", "25C", "25R"], f"Asserted runway 25L, 25C or 25R for flight from 2° but was {runway}")

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False, buffer=False, catchbreak=False)