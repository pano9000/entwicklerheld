from unittest import TestCase, main
import xmlrunner
import os

from fizzbuzz.fizzbuzz import fizzbuzz


class Test(TestCase):

    def test_business_as_usual(self):
        actual = fizzbuzz(1)
        assert actual == 1, "fizzbuzz function called with {}, so it should return {} but was {}. Check if you return an integer.".format(1, 1, actual)

        actual = fizzbuzz(2)
        assert actual == 2, "fizzbuzz function called with {}, so it should return {} but was {}. Check if you return an integer.".format(2, 2, actual)

        actual = fizzbuzz(4)
        assert actual == 4, "fizzbuzz function called with {}, so it should return {} but was {}. Check if you return an integer.".format(4, 4, actual)

        actual = fizzbuzz(7)
        assert actual == 7, "fizzbuzz function called with {}, so it should return {} but was {}. Check if you return an integer.".format(7, 7, actual)

        actual = fizzbuzz(998)
        assert actual == 998, "fizzbuzz function called with {}, so it should return {} but was {}. Check if you return an integer.".format(998, 998, actual)

    def test_fizz(self):
        actual = fizzbuzz(3)
        assert actual == "fizz", "fizzbuzz function called with {}, so it should return {} but was {}".format(3, "fizz", actual)

        actual = fizzbuzz(6)
        assert actual == "fizz", "fizzbuzz function called with {}, so it should return {} but was {}".format(6, "fizz", actual)

        actual = fizzbuzz(111)
        assert actual == "fizz", "fizzbuzz function called with {}, so it should return {} but was {}".format(111, "fizz", actual)

    def test_buzz(self):
        actual = fizzbuzz(5)
        assert actual == "buzz", "fizzbuzz function called with {}, so it should return {} but was {}".format(5, "buzz", actual)

        actual = fizzbuzz(10)
        assert actual == "buzz", "fizzbuzz function called with {}, so it should return {} but was {}".format(10, "buzz", actual)

        actual = fizzbuzz(20)
        assert actual == "buzz", "fizzbuzz function called with {}, so it should return {} but was {}".format(20, "buzz", actual)

        actual = fizzbuzz(500)
        assert actual == "buzz", "fizzbuzz function called with {}, so it should return {} but was {}".format(500, "buzz", actual)

    def test_fizz_buzz(self):
        actual = fizzbuzz(15)
        assert actual == "fizzbuzz", "fizzbuzz function called with {}, so it should return {}".format(15, "fizzbuzz", actual)

        actual = fizzbuzz(30)
        assert actual == "fizzbuzz", "fizzbuzz function called with {}, so it should return {}".format(30, "fizzbuzz", actual)

        actual = fizzbuzz(45)
        assert actual == "fizzbuzz", "fizzbuzz function called with {}, so it should return {}".format(45, "fizzbuzz", actual)

        actual = fizzbuzz(600)
        assert actual == "fizzbuzz", "fizzbuzz function called with {}, so it should return {}".format(600, "fizzbuzz", actual)

    def test_that_no_if_used(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        with open(f'{dir_path}/fizzbuzz.py') as file:
            code_lines = file.readlines()
            for line in code_lines:
                if "if" in line:
                    message = f"You're not allowed to use any 'if' in your code. We found an 'if' in line \n\n{line}\n You rascal ;-)"
                    self.fail(message)

    def setUp(self) -> None:
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )

-------------
from unittest import TestCase, main
import xmlrunner
import os

from fizzbuzz.fizzbuzz import fizzbuzz


class Test(TestCase):

    def test_business_as_usual(self):
        actual = fizzbuzz(1)
        assert actual == 1, "fizzbuzz function called with {}, so it should return {} but was {}. Check if you return an integer.".format(1, 1, actual)

        actual = fizzbuzz(2)
        assert actual == 2, "fizzbuzz function called with {}, so it should return {} but was {}. Check if you return an integer.".format(2, 2, actual)

        actual = fizzbuzz(4)
        assert actual == 4, "fizzbuzz function called with {}, so it should return {} but was {}. Check if you return an integer.".format(4, 4, actual)

        actual = fizzbuzz(7)
        assert actual == 7, "fizzbuzz function called with {}, so it should return {} but was {}. Check if you return an integer.".format(7, 7, actual)

        actual = fizzbuzz(998)
        assert actual == 998, "fizzbuzz function called with {}, so it should return {} but was {}. Check if you return an integer.".format(998, 998, actual)

    def test_fizz(self):
        actual = fizzbuzz(3)
        assert actual == "fizz", "fizzbuzz function called with {}, so it should return {} but was {}".format(3, "fizz", actual)

        actual = fizzbuzz(6)
        assert actual == "fizz", "fizzbuzz function called with {}, so it should return {} but was {}".format(6, "fizz", actual)

        actual = fizzbuzz(111)
        assert actual == "fizz", "fizzbuzz function called with {}, so it should return {} but was {}".format(111, "fizz", actual)

    def test_buzz(self):
        actual = fizzbuzz(5)
        assert actual == "buzz", "fizzbuzz function called with {}, so it should return {} but was {}".format(5, "buzz", actual)

        actual = fizzbuzz(10)
        assert actual == "buzz", "fizzbuzz function called with {}, so it should return {} but was {}".format(10, "buzz", actual)

        actual = fizzbuzz(20)
        assert actual == "buzz", "fizzbuzz function called with {}, so it should return {} but was {}".format(20, "buzz", actual)

        actual = fizzbuzz(500)
        assert actual == "buzz", "fizzbuzz function called with {}, so it should return {} but was {}".format(500, "buzz", actual)

    def test_fizz_buzz(self):
        actual = fizzbuzz(15)
        assert actual == "fizzbuzz", "fizzbuzz function called with {}, so it should return {}".format(15, "fizzbuzz", actual)

        actual = fizzbuzz(30)
        assert actual == "fizzbuzz", "fizzbuzz function called with {}, so it should return {}".format(30, "fizzbuzz", actual)

        actual = fizzbuzz(45)
        assert actual == "fizzbuzz", "fizzbuzz function called with {}, so it should return {}".format(45, "fizzbuzz", actual)

        actual = fizzbuzz(600)
        assert actual == "fizzbuzz", "fizzbuzz function called with {}, so it should return {}".format(600, "fizzbuzz", actual)

    def test_that_no_if_used(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        with open(f'{dir_path}/fizzbuzz.py') as file:
            code_lines = file.readlines()
            for line in code_lines:
                if "if" in line:
                    message = f"You're not allowed to use any 'if' in your code. We found an 'if' in line \n\n{line}\n You rascal ;-)"
                    self.fail(message)

    def setUp(self) -> None:
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )
