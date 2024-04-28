from unittest import TestCase, main
from xmlrunner import xmlrunner

from trilateration_python.models import Satellite, Point
from trilateration_python.navigation_service import GPSService
from trilateration_python.task import Car
from trilateration_python.visualization import Visualization


class TrilaterationPythonTest(TestCase):
    visualization = Visualization()

    def setUp(self):
        GPSService._distances = {}
        GPSService._all_satellites = []
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_get_coordinates_1(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        # fake_car = Car(418, 756)
        # dist_green = fake_car.get_distance(sat_green)
        # print("GPSService._distances.update({sat_green: " + str(dist_green) + "})")
        # dist_red = fake_car.get_distance(sat_red)
        # print("GPSService._distances.update({sat_red: " + str(dist_red) + "})")
        # dist_blue = fake_car.get_distance(sat_blue)
        # print("GPSService._distances.update({sat_blue: " + str(dist_blue) + "})")

        GPSService._distances.update({sat_green: 721.0693447928569})
        GPSService._distances.update({sat_red: 450.3443127208336})
        GPSService._distances.update({sat_blue: 299.6965131595628})

        car._calculate_position()
        result = car.get_coordinates()
        expected = Point(418, 756)
        self.assert_nearly_equal(expected, result)

        ## scenario 2
        # street = car.get_street()
        # self.assertEqual(street, "Margaret Hamilton Straße", f"Expected Margaret Hamilton Straße, but got {street} for coordinates (418, 756)")

        # fake_car = Car(418, 756)
        # dist_green = fake_car.get_distance(sat_green)
        # print(dist_green)
        # dist_red = fake_car.get_distance(sat_red)
        # print(dist_red)
        # dist_blue = fake_car.get_distance(sat_blue)
        # print(dist_blue)

    def test_get_coordinates_2(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        # fake_car = Car(630, 857)
        # dist_green = fake_car.get_distance(sat_green)
        # print("GPSService._distances.update({sat_green: " + str(dist_green) + "})")
        # dist_red = fake_car.get_distance(sat_red)
        # print("GPSService._distances.update({sat_red: " + str(dist_red) + "})")
        # dist_blue = fake_car.get_distance(sat_blue)
        # print("GPSService._distances.update({sat_blue: " + str(dist_blue) + "})")

        GPSService._distances.update({sat_green: 851.4505270419415})
        GPSService._distances.update({sat_red: 651.6018723116133})
        GPSService._distances.update({sat_blue: 182.91254740995763})

        car._calculate_position()
        result = car.get_coordinates()
        expected = Point(630, 857)
        self.assert_nearly_equal(expected, result)

    def test_get_coordinates_3(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        # fake_car = Car(117, 149)
        # dist_green = fake_car.get_distance(sat_green)
        # print("GPSService._distances.update({sat_green: " + str(dist_green) + "})")
        # dist_red = fake_car.get_distance(sat_red)
        # print("GPSService._distances.update({sat_red: " + str(dist_red) + "})")
        # dist_blue = fake_car.get_distance(sat_blue)
        # print("GPSService._distances.update({sat_blue: " + str(dist_blue) + "})")

        GPSService._distances.update({sat_green: 312.5331982366033})
        GPSService._distances.update({sat_red: 227.19154913860683})
        GPSService._distances.update({sat_blue: 805.4638415223864})

        car._calculate_position()
        result = car.get_coordinates()
        expected = Point(117, 149)
        self.assert_nearly_equal(expected, result)

        ## scenario 2
        # street = car.get_street()
        # self.assertEqual(street, "Margaret Hamilton Straße", f"Expected Margaret Hamilton Straße, but got {street} for coordinates (418, 756)")

    def test_get_coordinates_4(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        # fake_car = Car(519, 280)
        # dist_green = fake_car.get_distance(sat_green)
        # print("GPSService._distances.update({sat_green: " + str(dist_green) + "})")
        # dist_red = fake_car.get_distance(sat_red)
        # print("GPSService._distances.update({sat_red: " + str(dist_red) + "})")
        # dist_blue = fake_car.get_distance(sat_blue)
        # print("GPSService._distances.update({sat_blue: " + str(dist_blue) + "})")

        GPSService._distances.update({sat_green: 268.972117514065})
        GPSService._distances.update({sat_red: 310.6976021793538})
        GPSService._distances.update({sat_blue: 455.44813096553594})

        car._calculate_position()
        result = car.get_coordinates()
        expected = Point(519, 280)
        self.assert_nearly_equal(expected, result)

    def test_get_coordinates_5(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        # fake_car = Car(842, 469)
        # dist_green = fake_car.get_distance(sat_green)
        # print("GPSService._distances.update({sat_green: " + str(dist_green) + "})")
        # dist_red = fake_car.get_distance(sat_red)
        # print("GPSService._distances.update({sat_red: " + str(dist_red) + "})")
        # dist_blue = fake_car.get_distance(sat_blue)
        # print("GPSService._distances.update({sat_blue: " + str(dist_blue) + "})")

        GPSService._distances.update({sat_green: 613.7686860699232})
        GPSService._distances.update({sat_red: 635.6736584128683})
        GPSService._distances.update({sat_blue: 259.4937378820537})

        car._calculate_position()
        result = car.get_coordinates()
        expected = Point(842, 469)
        self.assert_nearly_equal(expected, result)

    def test_get_coordinates_6(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        # fake_car = Car(396, 538)
        # dist_green = fake_car.get_distance(sat_green)
        # print("GPSService._distances.update({sat_green: " + str(dist_green) + "})")
        # dist_red = fake_car.get_distance(sat_red)
        # print("GPSService._distances.update({sat_red: " + str(dist_red) + "})")
        # dist_blue = fake_car.get_distance(sat_blue)
        # print("GPSService._distances.update({sat_blue: " + str(dist_blue) + "})")

        GPSService._distances.update({sat_green: 503.14312079168883})
        GPSService._distances.update({sat_red: 257.42183279589943})
        GPSService._distances.update({sat_blue: 351.0697936308392})

        car._calculate_position()
        result = car.get_coordinates()
        expected = Point(396, 538)

        self.assert_nearly_equal(expected, result)

    def test_get_coordinates_7(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        # fake_car = Car(894, 718)
        # dist_green = fake_car.get_distance(sat_green)
        # print("GPSService._distances.update({sat_green: " + str(dist_green) + "})")
        # dist_red = fake_car.get_distance(sat_red)
        # print("GPSService._distances.update({sat_red: " + str(dist_red) + "})")
        # dist_blue = fake_car.get_distance(sat_blue)
        # print("GPSService._distances.update({sat_blue: " + str(dist_blue) + "})")

        GPSService._distances.update({sat_green: 838.2630851946184})
        GPSService._distances.update({sat_red: 769.1254774092456})
        GPSService._distances.update({sat_blue: 184.69975636150687})

        car._calculate_position()
        result = car.get_coordinates()
        expected = Point(894, 718)
        self.assert_nearly_equal(expected, result)

        
    ### SCENARIO 2 ###
    

    def test_get_street_1(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        GPSService._distances.update({sat_green: 721.0693447928569})
        GPSService._distances.update({sat_red: 450.3443127208336})
        GPSService._distances.update({sat_blue: 299.6965131595628})

        car._calculate_position()
        car.get_coordinates()

        street = car.get_street()
        expected = "Margaret Hamilton Straße"
        self.assertEqual(street, expected, f"{expected}, but got {street} for coordinates (418, 756)")


    def test_get_street_empty(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        GPSService._distances.update({sat_green: 838.2630851946184})
        GPSService._distances.update({sat_red: 769.1254774092456})
        GPSService._distances.update({sat_blue: 184.69975636150687})

        car._calculate_position()
        car.get_coordinates()
        expected_point = Point(894, 718)
        # No street available for coordinates (894, 718)
        street = car.get_street()
        expected = ""
        self.assertEqual(street, expected, f"Expected empty string, but got {street} for coordinates {expected_point}")


    def test_get_street_two_streets(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        GPSService._distances.update({sat_green: 613.7686860699232})
        GPSService._distances.update({sat_red: 635.6736584128683})
        GPSService._distances.update({sat_blue: 259.4937378820537})

        car._calculate_position()
        car.get_coordinates()
        expected_point = Point(842, 469)

        street = car.get_street()
        # alphabetic order
        expected = "Grace Hopper Straße / Turing Allee"
        self.assertEqual(street, expected, f"{expected}, but got {street} for coordinates {expected_point}")



    def test_get_street_2(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        GPSService._distances.update({sat_green: 851.4505270419415})
        GPSService._distances.update({sat_red: 651.6018723116133})
        GPSService._distances.update({sat_blue: 182.91254740995763})

        car._calculate_position()
        car.get_coordinates()
        expected_point = Point(630, 857)

        street = car.get_street()
        expected = "Frances Allen Straße"
        self.assertEqual(street, expected, f"{expected}, but got {street} for coordinates {expected_point}")

    def test_get_street_3(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)
        GPSService._distances.update({sat_green: 312.5331982366033})
        GPSService._distances.update({sat_red: 227.19154913860683})
        GPSService._distances.update({sat_blue: 805.4638415223864})

        car._calculate_position()
        car.get_coordinates()
        expected_point = Point(117, 149)

        street = car.get_street()
        expected = "David A. Huffman Straße"
        self.assertEqual(street, expected, f"{expected}, but got {street} for coordinates {expected_point}")

    def test_get_street_4(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        GPSService._distances.update({sat_green: 268.972117514065})
        GPSService._distances.update({sat_red: 310.6976021793538})
        GPSService._distances.update({sat_blue: 455.44813096553594})

        car._calculate_position()
        car.get_coordinates()

        expected_point = Point(519, 280)
        street = car.get_street()
        expected = "Turing Allee"
        self.assertEqual(street, expected, f"{expected}, but got {street} for coordinates {expected_point}")


    def test_get_street_6(self):
        car = Car()
        sat_green = Satellite("SAT-GREEN", 408, 35)
        GPSService._all_satellites.append(sat_green)
        sat_red = Satellite("SAT-RED", 217, 353)
        GPSService._all_satellites.append(sat_red)
        sat_blue = Satellite("SAT-BLUE", 711, 693)
        GPSService._all_satellites.append(sat_blue)

        GPSService._distances.update({sat_green: 503.14312079168883})
        GPSService._distances.update({sat_red: 257.42183279589943})
        GPSService._distances.update({sat_blue: 351.0697936308392})

        car._calculate_position()
        car.get_coordinates()
        expected_point = Point(396, 538)

        street = car.get_street()
        # alphabetic order
        expected = "Dennis Ritchie Straße / Margaret Hamilton Straße"
        self.assertEqual(street, expected, f"{expected}, but got {street} for coordinates {expected_point}")

    def assert_nearly_equal(self, expected, result, image_link=None, scenario_id=None, sentence_id=None):
        try:
            self.assertAlmostEqual(result.x, expected.x, delta=2, msg=f"Expected {expected.x}, but got {result.x}")
            self.assertAlmostEqual(result.y, expected.y, delta=2, msg=f"Expected {expected.y}, but got {result.y}")
        except AssertionError as e:
            if image_link is not None and scenario_id is not None and sentence_id is not None:
                TrilaterationPythonTest.visualization.data.append({
                    "scenarioId": f"{scenario_id}",
                    "sentenceId": f"{sentence_id}",
                    "content": f"<br/><img src='{image_link}' style='width:100%; max-width:1000px;'/><br/>",
                })
            raise e

    @classmethod
    def tearDownClass(cls) -> None:
        TrilaterationPythonTest.visualization.write()


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )