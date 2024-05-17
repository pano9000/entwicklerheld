from unittest import TestCase, main
import xmlrunner as xmlrunner
from linear_regression import utils
from linear_regression import visualization
from linear_regression import samples
from linear_regression.manual_linear_regression import FakedLinearRegressionEstimator
from sklearn.datasets import make_regression
from matplotlib import pyplot
import numpy as np


class ManualLinearRegressionTest(TestCase):

    test_visualization = visualization.Visualization()

    def test_manual_linear_regression_estimator_1(self):
        samples_1 = samples.SAMPLES_0.copy()
        np.random.seed(4224)
        np.random.shuffle(samples_1)
        train_samples, test_samples = samples_1[:500], samples_1[500:]

        train_samples_x = [item[0] for item in train_samples]
        train_samples_y = [item[1] for item in train_samples]

        test_samples_x = [item[0] for item in test_samples]
        test_samples_y = [item[1] for item in test_samples]

        faked_estimator = FakedLinearRegressionEstimator()

        faked_estimator.train(
            ["It's", "all", "about", "your", "brain"],
            ["Believe", "in", "your", "skills", "!"],
        )
        error = utils.calculate_mse(
            test_samples_x,
            test_samples_y,
            faked_estimator.intercept,
            faked_estimator.slope,
        )

        # you should not change these values, because the visualization.py depends on them
        my_dpi = 96
        pyplot.figure(figsize=(800 / my_dpi, 800 / my_dpi), dpi=my_dpi)

        pyplot.scatter(test_samples_x, test_samples_y)
        y_pred = faked_estimator.intercept + faked_estimator.slope * np.asarray(
            test_samples_x
        )
        pyplot.plot(test_samples_x, y_pred, color="r")

        pyplot.savefig("diagram-1-1.svg", dpi=my_dpi)
        ManualLinearRegressionTest.test_visualization.add_item("diagram-1-1.svg", 1, 1)

        self.assertLessEqual(
            error,
            100.0,
            msg="Your entered coefficients are not good enough to match the samples you see in the plot. The squared error is to high.",
        )

        x_to_predict = 0.4900665072521192
        expected_predicted_y_value = (
            faked_estimator.intercept + faked_estimator.slope * x_to_predict
        )
        actual_predicted_y_value = faked_estimator.save_predict(x_to_predict)
        self.assertAlmostEqual(
            expected_predicted_y_value,
            actual_predicted_y_value,
            places=4,
            msg="You don't calculate the correct value based on the linear regression formula and the intercept and slope of your estimator.",
        )

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def tearDownClass():
        ManualLinearRegressionTest.test_visualization.create_visualization_json_file()


if __name__ == "__main__":
    with open("results.xml", "w") as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False,
        )