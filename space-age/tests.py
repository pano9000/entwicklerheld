from unittest import TestCase, main
import xmlrunner
from space_age_python.task import calculate_space_age


class SpaceAgePythonTest(TestCase):

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_1_1(self):
        index = 0
        data = test_data[index]
        message = check(data)
        if message is not None:
            self.fail(message)

    def test_1_2(self):
        index = 1
        data = test_data[index]
        message = check(data)
        if message is not None:
            self.fail(message)

    def test_1_3(self):
        for index in range(2, len(test_data)):
            data = test_data[index]
            message = check(data)
            if message is not None:
                self.fail(message)


def get_error_on_planet(planet):
    return f"'{planet}' is not a valid planet"


def check(data):
    errors = []

    try:
        actual = calculate_space_age(data["seconds"], data["on"])
        if data["expected"] is None:
            error = get_error_on_planet(data["on"])
            errors.append(f"expected error: \"{error}\" but got \"{str(actual)}\"")
        elif actual != data["expected"]:
            errors.append("expected " + str(data["expected"]) + " but got " + str(actual))
    except Exception as e:
        if data["expected"] is not None:
            errors.append(str(e))
        else:
            error = get_error_on_planet(data["on"])
            if str(e) != error:
                errors.append(f"expected error: \"{error}\" but got \"{str(e)}\"")

    if len(errors) == 0:
        return None

    given = [
        "",
        "Given:",
        "\t- seconds: " + str(data["seconds"]),
        "\t- planet: " + str(data["on"]),
        ""
    ]
    return "\n".join(given + errors)


test_data = [
    {
        "seconds": 2129871239,
        "on": "mars",
        "expected": 35.88
    },
    {
        "seconds": 1000000000,
        "on": "pluto",
        "expected": None
    },
    {
        "seconds": 2134835688,
        "on": "mercury",
        "expected": 280.88
    },
    {
        "seconds": 189839836,
        "on": "venus",
        "expected": 9.78
    },
    {
        "seconds": 901876382,
        "on": "jupiter",
        "expected": 2.41
    },
    {
        "seconds": 1000000000,
        "on": "earth",
        "expected": 31.69
    },
    {
        "seconds": 2000000000,
        "on": "saturn",
        "expected": 2.15
    },
    {
        "seconds": 1000000000,
        "on": "sun",
        "expected": None
    },
    {
        "seconds": 1210123456,
        "on": "uranus",
        "expected": 0.46
    },
    {
        "seconds": 1821023456,
        "on": "neptune",
        "expected": 0.35
    },
    {
        "seconds": 1000000000,
        "on": "moon",
        "expected": None
    },
]

if __name__ == '__main__':
    with open('results.xml', 'wb') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )
