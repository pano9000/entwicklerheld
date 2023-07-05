from unittest import TestCase, main
from xmlrunner import xmlrunner
from cutting_palindromes_python.task import CuttingPalindromesPython
from cutting_palindromes_python.visualization import Visualization


class CuttingPalindromesPythonTest(TestCase):
    visualization = Visualization()

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_1(self):
        cutting_palindromes_python = CuttingPalindromesPython()
        palindrome_string = "otto"
        actual = cutting_palindromes_python.is_palindrome(palindrome_string)
        expected = True
        self.assertEqual(actual, expected, f"This string is a palindrome! Expected True for the string "
                                           f"'{palindrome_string}' but was False.")

        palindrome_string = "java"
        actual = cutting_palindromes_python.is_palindrome(palindrome_string)
        expected = False
        self.assertEqual(actual, expected, f"This string isn't a palindrome! Expected False for the string "
                                           f"'{palindrome_string}' but was True.")
        palindrome_array = ["php", "anna", "kayak", "level", "mom", "racecar", "radar", "refer", "stats", "wow",
                            "solos", "rotator"]
        expected = True
        for index, string in enumerate(palindrome_array):
            actual = cutting_palindromes_python.is_palindrome(string)
            self.assertEqual(actual, expected, f"This string is a palindrome! Expected True for the string "
                                               f"'{palindrome_string}' but was False.")

        palindrome_array = ["docker", "news", "coins", "coding", "reward", "platform", "job", "code", "editor",
                            "company", "label"]
        expected = False
        for index, string in enumerate(palindrome_array):
            actual = cutting_palindromes_python.is_palindrome(string)
            self.assertEqual(actual, expected, f"This string isn't a palindrome! Expected False for the string "
                                               f"'{palindrome_string}' but was True.")

    def test_2(self):
        cutting_palindromes_python = CuttingPalindromesPython()

        #already palindromes
        palindrome_string = "otto"
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = 0
        self.assertEqual(actual, expected, f"This string is already a palindrome! Expected {expected} cuts for the "
                                           f"string '{palindrome_string}' but were {actual}")
        #strings with only different characters
        palindrome_string = "python"
        string_length = len(palindrome_string)
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = string_length - 1
        self.assertEqual(actual, expected, f"This string consists only of different characters! Expected {expected}"
                                           f" cuts for the string '{palindrome_string}' but were {actual}:"
                                           f"\np|y|t|h|o|n")
        palindrome_array = ["php", "anna", "kayak", "level", "mom", "racecar", "radar", "refer", "stats", "wow",
                            "solos", "rotator"]
        expected = 0
        for string in palindrome_array:
            actual = cutting_palindromes_python.minimum_palindrome_cuts(string)
            self.assertEqual(actual, expected, f"This string is already a palindrome! Expected {expected} cuts "
                                               f"for the string '{palindrome_string}' but were {actual}")

        palindrome_array = ["docker", "news", "coins", "coding", "reward", "platform", "job", "code", "editor",
                            "company"]
        cut_palindrome_array = ["d|o|c|k|e|r", "n|e|w|s", "c|o|i|n|s", "c|o|d|i|n|g", "r|e|w|a|r|d", "p|l|a|t|f|o|r|m",
                                "j|o|b", "c|o|d|e", "e|d|i|t|o|r", "c|o|m|p|a|n|y"]
        for index, string in enumerate(palindrome_array):
            string_length = len(string)
            actual = cutting_palindromes_python.minimum_palindrome_cuts(string)
            expected = string_length - 1
            self.assertEqual(actual, expected, f"This string consists only of different characters! Expected {expected} "
                                               f"cuts for the string '{string}' but were {actual}:"
                                               f"\n{cut_palindrome_array[index]}")

    def test_3(self):
        cutting_palindromes_python = CuttingPalindromesPython()

        #palindromes with 1 cut
        palindrome_string = "radarlevel"
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = 1
        self.assertEqual(actual, expected, f"This string consists of only two palindromes! Expected {expected} cuts "
                                           f"for the string '{palindrome_string}' but were {actual}:"
                                           f"\nradar|level")
        palindrome_string = "levels"
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = 1
        self.assertEqual(actual, expected, f"This string consists of only two palindromes! Expected {expected} cuts "
                                           f"for the string '{palindrome_string}' but were {actual}:"
                                           f"\nlevel|s")
        #palindromes with more cuts
        palindrome_string = "wowphplevel"
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = 2
        self.assertEqual(actual, expected, f"This string consists of three palindromes! Expected {expected} cuts "
                                           f"for the string '{palindrome_string}' but were {actual}")

        palindrome_array = ["phplevel", "momanna", "kayaks", "moms", "racecars", "radarrefer", "statswow", "wowsolos",
                            "solosphp", "rotators"]
        cut_palindrome_array = ["php|level", "mom|anna", "kayak|s", "mom|s", "racecar|s", "radar|refer", "stats|wow",
                                "wow|solos", "solos|php", "rotator|s"]
        expected = 1
        for index, string in enumerate(palindrome_array):
            actual = cutting_palindromes_python.minimum_palindrome_cuts(string)
            self.assertEqual(actual, expected, f"This string consists of only two palindromes! Expected {expected} "
                                               f"cuts for the string '{string}' but were {actual}:"
                                               f"\n{cut_palindrome_array[index]}")

        palindrome_string = "wowaphplevel"
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = 3
        self.assertEqual(actual, expected, f"This string consists of four palindromes! Expected {expected} cuts "
                                           f"for the string '{palindrome_string}' but were {actual}")

        #2 cuts
        palindrome_array = ["phplevels", "momskayak", "momsracecar", "wowakayak", "aabaababa", "abcbaacaadda",
                            "xyxyyzyyy"]
        cut_palindrome_array = ["php|level|s", "mom|s|kayak", "mom|s|racecar", "wow|a|kayak", "aabaa|b|aba",
                                "abcba|aca|adda", "xyx|yyzyy|y"]
        expected = 2
        for index, string in enumerate(palindrome_array):
            actual = cutting_palindromes_python.minimum_palindrome_cuts(string)
            self.assertEqual(actual, expected, f"Expected {expected} cuts for the string '{string}' "
                                               f"but were {actual}:"
                                               f"\n{cut_palindrome_array[index]}")

        #3 cuts
        palindrome_array = ["phplevelwowkayak", "momannaphpotto", "racecarannaphpmom", 'abaxabbx', "abaxbba", "wwwaaxw",
                            "xyyyzyyyabab", "axyxyyzyyy"]
        cut_palindrome_array = ["php|level|wow|kayak", "mom|anna|php|otto", "racecar|anna|php|mom", 'a|baxab|b|x', "aba|x|bb|a",
                                "www|aa|x|w", "x|yyyzyyy|a|bab", "a|xyx|yyzyy|y"]
        expected = 3
        for index, string in enumerate(palindrome_array):
            actual = cutting_palindromes_python.minimum_palindrome_cuts(string)
            self.assertEqual(actual, expected, f"Expected {expected} cuts for the string '{string}' "
                                               f"but were {actual}:"
                                               f"\n{cut_palindrome_array[index]}")

        #more cuts
        palindrome_string = "wowphplevelannaottoracecar"
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = 5
        cut_palindrome = "wow|php|level|anna|otto|racecar"
        self.assertEqual(actual, expected, f"Expected {expected} cuts "
                                           f"for the string '{palindrome_string}' but were {actual}:"
                                           f"\n{cut_palindrome}")

        palindrome_string = "momkayakphpwowotto"
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = 4
        cut_palindrome = "mom|kayak|php|wow|otto"
        self.assertEqual(actual, expected, f"Expected {expected} cuts "
                                           f"for the string '{palindrome_string}' but were {actual}:"
                                           f"\n{cut_palindrome}")

        palindrome_string = "abaxzazazphplevels"
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = 5
        cut_palindrome = "aba|x|zazaz|php|level|s"
        self.assertEqual(actual, expected, f"Expected {expected} cuts "
                                           f"for the string '{palindrome_string}' but were {actual}:"
                                           f"\n{cut_palindrome}")

        palindrome_string = "xyzacazaazninabc"
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = 8
        cut_palindrome = "x|y|zacaz|aa|z|nin|a|b|c"
        self.assertEqual(actual, expected, f"Expected {expected} cuts "
                                           f"for the string '{palindrome_string}' but were {actual}:"
                                           f"\n{cut_palindrome}")

        palindrome_string = "entwicklerheld"
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = 13
        cut_palindrome = "e|n|t|w|i|c|k|l|e|r|h|e|l|d"
        self.assertEqual(actual, expected, f"Expected {expected} cuts for the string '{palindrome_string}' but were "
                                           f"{actual}:\n{cut_palindrome}")

        palindrome_string = "wowentwicklerheld"
        actual = cutting_palindromes_python.minimum_palindrome_cuts(palindrome_string)
        expected = 14
        cut_palindrome = "wow|e|n|t|w|i|c|k|l|e|r|h|e|l|d"
        self.assertEqual(actual, expected, f"Expected {expected} cuts for the string '{palindrome_string}' but were "
                                           f"{actual}:\n{cut_palindrome}")


    @classmethod
    def tearDownClass(cls) -> None:
        CuttingPalindromesPythonTest.visualization.write()


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )
