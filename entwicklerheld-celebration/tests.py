from unittest import TestCase, main
import xmlrunner as xmlrunner
from eh_party.task import count_clinking_glasses_for_eh_team
from eh_party.task import count_clinking_glasses_for_variable_number_of_guests
from random import *


class Solution(object):
    @staticmethod
    def count_clinking_glasses_fixed(number_of_guests):
        count = number_of_guests * (number_of_guests - 1) // 2
        return count

    @staticmethod
    def count_clinking_glasses_variable(number_of_guests):
        count = 0
        for i in range(2, number_of_guests + 1):
            count += i * (i - 1) // 2
        return count


class PartyTests(TestCase):
    def test_fixed_number_of_guests(self):
        result = count_clinking_glasses_for_eh_team(3)
        self.assertEqual(3, result, f"Expected '3' but was: '{result}'")

        result = count_clinking_glasses_for_eh_team(7)
        self.assertEqual(Solution.count_clinking_glasses_fixed(7), result, f"Expected '{Solution.count_clinking_glasses_fixed(7)}' but was: '{result}'")

        for i in range(50):
            random_number_of_guests = randint(2, 50)
            result = count_clinking_glasses_for_eh_team(random_number_of_guests)
            self.assertEqual(Solution.count_clinking_glasses_fixed(random_number_of_guests), result, f"Expected '{Solution.count_clinking_glasses_fixed(random_number_of_guests)}' but was: '{result}'")

    def test_variable_number_of_guests(self):
        result = count_clinking_glasses_for_variable_number_of_guests(2)
        self.assertEqual(1, result, f"Expected '1' but was: '{result}'")

        result = count_clinking_glasses_for_variable_number_of_guests(3)
        self.assertEqual(4, result, f"Expected '4' but was: '{result}'")

        result = count_clinking_glasses_for_variable_number_of_guests(7)
        self.assertEqual(Solution.count_clinking_glasses_variable(7), result, f"Expected '{Solution.count_clinking_glasses_variable(7)}' but was: '{result}'")

        for i in range(50):
            random_number_of_guests = randint(2, 50)
            result = count_clinking_glasses_for_variable_number_of_guests(random_number_of_guests)
            self.assertEqual(Solution.count_clinking_glasses_variable(random_number_of_guests), result, f"Expected '{Solution.count_clinking_glasses_variable(random_number_of_guests)}' but was: '{result}'")

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False, buffer=False, catchbreak=False)
