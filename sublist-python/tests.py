from unittest import TestCase, main
from xmlrunner import xmlrunner

from sublist_python.choices import CheckResult
from sublist_python.task import SublistPython
from sublist_python.visualization import Visualization


class SublistPythonTest(TestCase):
    visualization = Visualization()

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_case_1(self):
        self.assertEqual(SublistPython.check_sublist([1, 2], [1, 2]), CheckResult.EQUAL)

    def test_case_2(self):
        self.assertEqual(SublistPython.check_sublist([1], [1, 2]), CheckResult.SUBLIST)

    def test_case_3(self):
        self.assertEqual(SublistPython.check_sublist([1, 2], [1]), CheckResult.SUPERLIST)

    def test_case_4(self):
        self.assertEqual(SublistPython.check_sublist([1, 2], [2, 1]), CheckResult.UNEQUAL)

    def test_empty_lists(self):
        self.assertEqual(SublistPython.check_sublist([], []), CheckResult.EQUAL)

    def test_empty_list_within_non_empty_list(self):
        self.assertEqual(SublistPython.check_sublist([], [1, 2, 3]), CheckResult.SUBLIST)

    def test_non_empty_list_contains_empty_list(self):
        self.assertEqual(SublistPython.check_sublist([1, 2, 3], []), CheckResult.SUPERLIST)

    def test_other_lists(self):
        self.assertEqual(SublistPython.check_sublist([1, 2, 3], [1, 2, 3]), CheckResult.EQUAL)

        self.assertEqual(SublistPython.check_sublist([1, 2, 3], [2, 3, 4]), CheckResult.UNEQUAL)

        self.assertEqual(SublistPython.check_sublist([1, 2, 5], [0, 1, 2, 3, 1, 2, 5, 6]), CheckResult.SUBLIST)

        self.assertEqual(SublistPython.check_sublist([1, 1, 2], [0, 1, 1, 1, 2, 1, 2]), CheckResult.SUBLIST)

        self.assertEqual(SublistPython.check_sublist([0, 1, 2], [0, 1, 2, 3, 4, 5]), CheckResult.SUBLIST)

        self.assertEqual(SublistPython.check_sublist([2, 3, 4], [0, 1, 2, 3, 4, 5]), CheckResult.SUBLIST)

        self.assertEqual(SublistPython.check_sublist([3, 4, 5], [0, 1, 2, 3, 4, 5]), CheckResult.SUBLIST)

        self.assertEqual(SublistPython.check_sublist([0, 1, 2, 3, 4, 5], [0, 1, 2]), CheckResult.SUPERLIST)

        self.assertEqual(SublistPython.check_sublist([0, 1, 2, 3, 4, 5], [2, 3]), CheckResult.SUPERLIST)

        self.assertEqual(SublistPython.check_sublist([0, 1, 2, 3, 4, 5], [3, 4, 5]), CheckResult.SUPERLIST)

        self.assertEqual(SublistPython.check_sublist([1, 3], [1, 2, 3]), CheckResult.UNEQUAL)

        self.assertEqual(SublistPython.check_sublist([1, 2, 3], [1, 3]), CheckResult.UNEQUAL)

        self.assertEqual(SublistPython.check_sublist([1, 2], [1, 22]), CheckResult.UNEQUAL)

        self.assertEqual(SublistPython.check_sublist([1, 2, 3], [3, 2, 1]), CheckResult.UNEQUAL)

        self.assertEqual(SublistPython.check_sublist([1, 0, 1], [10, 1]), CheckResult.UNEQUAL)

        self.assertEqual(SublistPython.check_sublist(["a c"], ["a", "c"]), CheckResult.UNEQUAL)

        self.check_large_lists()
        self.check_spread_sublist()

    def check_large_lists(self):
        self.assertEqual(
            SublistPython.check_sublist(
                list(range(1000)) * 1000 + list(range(1000, 1100)),
                list(range(900, 1050)),
            ),
            CheckResult.SUPERLIST,
        )

    def check_spread_sublist(self):
        self.assertEqual(
            SublistPython.check_sublist(list(range(3, 200, 3)), list(range(15, 200, 15))), CheckResult.UNEQUAL
        )

    @classmethod
    def tearDownClass(cls) -> None:
        SublistPythonTest.visualization.write()


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )