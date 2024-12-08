from unittest import TestCase, main
from xmlrunner import xmlrunner
from high_scores_python.task import HighScores


class HighScoresPythonTest(TestCase):
    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_1_1(self):
        index = 0
        scores = test_data_1[index]["scores"]
        expected = test_data_1[index]["expected"]
        actual = HighScores(scores).latest()
        message = f"Given highscores {scores}, expected latest to be {expected}, but was {actual}"
        self.assertEqual(expected, actual, message)

    def test_1_2(self):
        for index in range(1, len(test_data_1)):
            scores = test_data_1[index]["scores"]
            expected = test_data_1[index]["expected"]
            actual = HighScores(scores).latest()
            message = f"Given highscores {scores}, expected latest to be {expected}, but was {actual}"
            self.assertEqual(expected, actual, message)

    def test_2_1(self):
        index = 0
        scores = test_data_2[index]["scores"]
        expected = test_data_2[index]["expected"]
        actual = HighScores(scores).personal_best()
        message = f"Given highscores {scores}, expected personal best to be {expected}, but was {actual}"
        self.assertEqual(expected, actual, message)

    def test_2_2(self):
        for index in range(1, len(test_data_2)):
            scores = test_data_2[index]["scores"]
            expected = test_data_2[index]["expected"]
            actual = HighScores(scores).personal_best()
            message = f"Given highscores {scores}, expected personal best to be {expected}, but was {actual}"
            self.assertEqual(expected, actual, message)

    def test_3_1(self):
        index = 0
        scores = test_data_3[index]["scores"]
        expected = test_data_3[index]["expected"]
        actual = HighScores(scores).personal_top_three()
        message = f"Given highscores {scores}, expected personal best to be {expected}, but was {actual}"
        self.assertEqual(expected, actual, message)

    def test_3_2(self):
        for index in range(1, len(test_data_3)):
            scores = test_data_3[index]["scores"]
            expected = test_data_3[index]["expected"]
            actual = HighScores(scores).personal_top_three()
            message = f"Given highscores {scores}, expected personal top three to be {expected}, but was {actual}"
            self.assertEqual(expected, actual, message)


test_data_1 = [
    {
        "scores": [100, 0, 90, 30],
        "expected": 30
    },
    {
        "scores": [0, 90, 30, 100],
        "expected": 100
    },
    {
        "scores": [30, 100, 0],
        "expected": 0
    },
    {
        "scores": [0, 90],
        "expected": 90
    },
    {
        "scores": [25],
        "expected": 25
    },
]

test_data_2 = [
    {
        "scores": [100, 0, 90, 30],
        "expected": 100
    },
    {
        "scores": [21, 200, 5, 99, 150, 200],
        "expected": 200
    },
    {
        "scores": [30, 100, 0],
        "expected": 100
    },
    {
        "scores": [0, 90],
        "expected": 90
    },
    {
        "scores": [25],
        "expected": 25
    },
]


test_data_3 = [
    {
        "scores": [40, 20, 40, 30],
        "expected": [40, 40, 30]
    },
    {
        "scores": [21, 200, 5, 99, 150, 200],
        "expected": [200, 200, 150]
    },
    {
        "scores": [10, 1, 2, 10, 3, 10, 4, 5, 6],
        "expected": [10, 10, 10]
    },
    {
        "scores": [10, 10, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        "expected": [10, 10, 10]
    },
    {
        "scores": [10, 100],
        "expected": [100, 10]
    },
    {
        "scores": [100],
        "expected": [100]
    },
]
if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )