from math import floor
from unittest import TestCase, main
from xmlrunner import xmlrunner
from armstrong_numbers_python.task import is_armstrong_number


class ArmstrongNumbersPythonTest(TestCase):

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_1_1(self):
        number = 0
        expected = True
        actual = is_armstrong_number(number)
        explanation = get_explanation(number, expected)
        self.assertEqual(actual, expected, explanation)

    def test_1_2(self):
        number = 5
        expected = True
        actual = is_armstrong_number(number)
        explanation = get_explanation(number, expected)
        self.assertEqual(actual, expected, explanation)

    def test_1_3(self):
        number = 10
        expected = False
        actual = is_armstrong_number(number)
        explanation = get_explanation(number, expected)
        self.assertEqual(actual, expected, explanation)

    def test_1_4(self):
        for i in range(len(test_data)):
            number = test_data[i]["number"]
            expected = test_data[i]["expected"]
            actual = is_armstrong_number(number)
            explanation = get_explanation(number, expected)
            self.assertEqual(actual, expected, explanation)


def get_explanation(number, is_armstrong_number):
    if number == 0:
        return "0 is an Armstrong number, because it contains no digits, and the empty sum (0) raised to the power of 0 is equal to 0."
    if is_armstrong_number:
        return f"{number} is an Armstrong number, because {armstrong_explanation(number)}"
    return f"{number} is not an Armstrong number, because it does not satisfy the Armstrong condition."


def armstrong_explanation(number):
    temp = number
    numberOfDigits = len(f"{number}")
    explanation = []

    while temp != 0:
        digit = temp % 10
        explanation.insert(0, f"{digit}^{numberOfDigits}")
        temp = floor(temp / 10)

    s = " + ".join(explanation)
    return f"{s} = {number}"


test_data = [
    {"number": 153, "expected": True},
    {"number": 100, "expected": False},
    {"number": 9474, "expected": True},
    {"number": 9475, "expected": False},
    {"number": 9926315, "expected": True},
    {"number": 9926314, "expected": False}
]

if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )