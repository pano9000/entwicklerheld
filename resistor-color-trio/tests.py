from unittest import TestCase, main
from xmlrunner import xmlrunner
from resistor_color_trio_python.task import label


class ResistorColorTrioPythonTest(TestCase):

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_1_1(self):
        data = test_data['test_data_1_1']
        colors = data['colors']
        actual = label(colors)
        expected = data['expected']
        result = check_label(colors, expected, actual)

        if len(result) > 0:
            self.fail(result)

    def test_1_2(self):
        data = test_data['test_data_1_2']
        colors = data['colors']
        actual = label(colors)
        expected = data['expected']
        result = check_label(colors, expected, actual)

        if len(result) > 0:
            self.fail(result)

    def test_1_3(self):
        data = test_data['test_data_1_3']
        colors = data['colors']
        actual = label(colors)
        expected = data['expected']
        result = check_label(colors, expected, actual)

        if len(result) > 0:
            self.fail(result)

    def test_1_4(self):
        data = test_data['test_data_1_4']
        colors = data['colors']
        actual = label(colors)
        expected = data['expected']
        result = check_label(colors, expected, actual)

        if len(result) > 0:
            self.fail(result)

    def test_1_5(self):
        data = test_data['test_data_1_5']
        colors = data['colors']
        actual = label(colors)
        expected = data['expected']
        result = check_label(colors, expected, actual)

        if len(result) > 0:
            self.fail(result)

    def test_1_6(self):
        data = test_data['test_data_1_6']
        colors = data['colors']
        actual = label(colors)
        expected = data['expected']
        result = check_label(colors, expected, actual)

        if len(result) > 0:
            self.fail(result)

    def test_1_7(self):
        data = test_data['test_data_1_7']
        colors = data['colors']
        actual = label(colors)
        expected = data['expected']
        result = check_label(colors, expected, actual)

        if len(result) > 0:
            self.fail(result)

    def test_1_8(self):
        data = test_data['test_data_1_8']
        colors = data['colors']
        actual = label(colors)
        expected = data['expected']
        result = check_label(colors, expected, actual)

        if len(result) > 0:
            self.fail(result)

    def test_1_9(self):
        data = test_data['test_data_1_9']
        colors = data['colors']
        actual = label(colors)
        expected = data['expected']
        result = check_label(colors, expected, actual)

        if len(result) > 0:
            self.fail(result)

    def test_1_10(self):
        data = test_data['test_data_1_10']
        colors = data['colors']
        actual = label(colors)
        expected = data['expected']
        result = check_label(colors, expected, actual)

        if len(result) > 0:
            self.fail(result)


def check_label(colors: str, expected: str, actual: str) -> str:
    if expected == actual:
        return ""

    return f"Given colors: {'-'.join(colors)}\nExpected: \"{expected}\", but was \"{actual}\""


test_data = {
    'test_data_1_1': {
        'colors': ["orange", "orange", "black"],
        'expected': "33 ohms"
    },
    'test_data_1_2': {
        'colors': ["blue", "grey", "brown"],
        'expected': "680 ohms"
    },
    'test_data_1_3': {
        'colors': ["red", "black", "red"],
        'expected': "2 kiloohms"
    },
    'test_data_1_4': {
        'colors': ["green", "brown", "orange"],
        'expected': "51 kiloohms"
    },
    'test_data_1_5': {
        'colors': ["yellow", "violet", "yellow"],
        'expected': "470 kiloohms"
    },
    'test_data_1_6': {
        'colors': ["blue", "violet", "blue"],
        'expected': "67 megaohms"
    },
    'test_data_1_7': {
        'colors': ["black", "black", "black"],
        'expected': "0 ohms"
    },
    'test_data_1_8': {
        'colors': ["white", "white", "white"],
        'expected': "99 gigaohms"
    },
    'test_data_1_9': {
        'colors': ["black", "grey", "black"],
        'expected': "8 ohms"
    },
    'test_data_1_10': {
        'colors': ["blue", "green", "yellow", "orange"],
        'expected': "650 kiloohms"
    },
}


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )