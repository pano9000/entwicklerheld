class FakedLinearRegressionEstimator:
    def __init__(self):
        self.intercept = None
        self.slope = None

    def train(self, X: list, Y: list) -> None:
        self.intercept = 0.0
        self.slope = 0.0

    def predict(self, x: float) -> float:
        return 0.0
        
    def save_predict(self, x: float) -> float:
        if self.intercept is None or self.slope is None:
            raise Exception("Estimator is not trained and cannot predict values")
        return self.predict(x)