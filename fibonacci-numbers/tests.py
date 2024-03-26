from unittest import TestCase, main
from xmlrunner import xmlrunner
from fibonacci_python.task import FibonacciPython
from fibonacci_python.visualization import Visualization


class FibonacciPythonTest(TestCase):
    visualization = Visualization()

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_1(self):
        # Room for your comments:
        # ______________________________
        # ______________________________
        # This line is intentionally left blank.
        self.check_n(1, 0)
        self.check_n(2, 1)
        self.check_n(3, 1)
        self.check_n(4, 2)
        self.check_n(5, 3)
        self.check_n(6, 5)
        self.check_n(7, 8)
        self.check_n(8, 13)
        self.check_n(9, 21)
        self.check_n(10, 34)
        self.check_n(11, 55)
        self.check_n(12, 89)
        self.check_n(13, 144)
        self.check_n(14, 233)
        self.check_n(15, 377)
        self.check_n(16, 610)
        self.check_n(17, 987)
        self.check_n(18, 1597)
        self.check_n(19, 2584)
        self.check_n(20, 4181)
        self.check_n(21, 6765)
        self.check_n(22, 10946)
        self.check_n(23, 17711)
        self.check_n(24, 28657)
        self.check_n(25, 46368)
        self.check_n(26, 75025)
        self.check_n(30, 514229)

    def check_n(self, n, nth_result):
        result = FibonacciPython.fibonacci(n)
        self.assertEqual(result, nth_result, f"Expected the {n}. Fibonacci number to be {nth_result} but was {result}")

    @classmethod
    def tearDownClass(cls) -> None:
        FibonacciPythonTest.visualization.write()


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )