from unittest import TestCase, main
import sys
from xmlrunner import xmlrunner
from area.task import Area, AreaHelper
sys.setrecursionlimit(10000)


class TestHelper(object):
    @staticmethod
    def test_map_equality(expected_area, actual_area, raise_error=True):
        assert actual_area is not None, "The returned Area must not be None"
        errors = []
        expected_map = expected_area.map
        actual_map = actual_area.map

        for y, row in enumerate(expected_map):
            for x, cell in enumerate(row):
                try:
                    if actual_map[y][x] != expected_map[y][x]:
                        errors.append((x, y))
                except IndexError:
                    errors.append((x, y))

        if raise_error and len(errors) != 0:
            error_map = TestHelper.generate_area_string(actual_area, errors)
            print(errors)
            error_message = f"Area does not equal the expected: \n{error_map}"
            raise AssertionError(error_message)

        return errors

    @staticmethod
    def generate_area_string(area: Area, errors=None):
        if errors is None:
            errors = []

        result = f"┌{'───' * len(area.map[0])}┐\n"
        for y, row in enumerate(area.map):
            result += "│"
            for x, point in enumerate(row):
                if (x, y) not in errors:
                    result += f" {point} "
                else:
                    result += f"›{point}‹"
            result += "│\n"
        result += f"└{'───' * len(area.map[0])}┘\n"
        return result


class FillAreaTests(TestCase):
    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_scenario_1(self):
        map = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]

        area = Area(map=map)
        actual_area = AreaHelper.fill_area(area)

        expected = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]

        expected_area = Area(expected)

        TestHelper.test_map_equality(expected_area, actual_area)

        # ------ CASE 2 ------
        map = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]

        area = Area(map=map)
        actual_area = AreaHelper.fill_area(area)

        expected = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]

        expected_area = Area(expected)

        TestHelper.test_map_equality(expected_area, actual_area)

    def test_scenario_edge_cases(self):
        map = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]

        area = Area(map=map)
        actual_area = AreaHelper.fill_area(area)

        expected = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]

        expected_area = Area(expected)

        TestHelper.test_map_equality(expected_area, actual_area)

        # ----- CASE 2 -----

        map = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]

        area = Area(map=map)
        actual_area = AreaHelper.fill_area(area)

        expected = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]

        expected_area = Area(expected)

        TestHelper.test_map_equality(expected_area, actual_area)



    def test_scenario_complex_cases(self):
        map = [
            [1, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]

        area = Area(map=map)
        actual_area = AreaHelper.fill_area(area)

        expected = [
            [1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]

        expected_area = Area(expected)

        TestHelper.test_map_equality(expected_area, actual_area)

        from area.examples import examples
        from random import shuffle
        shuffle(examples)
        for example in examples:
            area = Area(map=example.get("task"))
            actual_area = AreaHelper.fill_area(area)
            expected_area = Area(map=example.get("solution"))
            TestHelper.test_map_equality(expected_area, actual_area)


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False, buffer=False, catchbreak=False)
