import random
import string
from unittest import TestCase, main

import xmlrunner as xmlrunner

from alphabet.task import find_first_non_repeated_char

class Solution(object):
    @staticmethod
    def find_occurences(character, sequence):
        sequence = sequence.lower()
        count = 0
        character = character.lower()
        for c in sequence:
            if c == character:
                count += 1
        return count

    @staticmethod
    def find_first_non_repeated_char(sequence: str):
        for c in sequence:
            if Solution.find_occurences(c, sequence) == 1:
                return c
        return None


class AlphabetTest(TestCase):
    def test_non_repeated_chars(self):
        result = find_first_non_repeated_char("EntwicklerHeld")
        self.assertEqual("n", result, f"Expected 'n' but was: '{result}'")

        result = find_first_non_repeated_char(
            "bcdefghiklmnopqrstuvwxyz<!§$%&/()=?äöüôîûQWERTZUIOPÜÄÖLKJHGFDASYYXCVNM;:.,-_")
        self.assertEqual("b", result, f"Expected 'b' but was: '{result}'")

    def test_special_cases(self):
        result = find_first_non_repeated_char("abcabc")
        self.assertEqual(None, result, f"Expected None but was: '{result}'")

        result = find_first_non_repeated_char("")
        self.assertEqual(None, result, f"Expected None but was: '{result}'")

    def test_random(self):
        for i in range(50):
            random_string = ''.join(random.choices(string.ascii_uppercase, k=i))
            result = Solution.find_first_non_repeated_char(random_string)
            self.assertEqual(find_first_non_repeated_char(random_string), result,
                             f"Expected '{result}', but was '{find_first_non_repeated_char(random_string)}' in '{random_string}'")

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_single_letter(self):
        result = find_first_non_repeated_char("E")
        self.assertEqual("E", result, f"Expected 'E' but was: '{result}'")


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False, buffer=False, catchbreak=False)