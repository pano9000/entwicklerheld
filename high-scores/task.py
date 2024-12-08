class HighScores:
    def __init__(self, scores):
        self.scores = scores

    def latest(self):
        raise NotImplementedError

    def personal_best(self):
        raise NotImplementedError

    def personal_top_three(self):
        raise NotImplementedError
