import json
import traceback
from unittest import TestCase, main
import xmlrunner
from fair_share.task import calculate_refunds
from fair_share.visualization import Visualization


class FairShareTest(TestCase):
    visualization = Visualization()

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def tests(self):
        index = 0
        message = self.check(index, 1, 1)

        if message is not None:
            self.assertEqual(False, True, message)

        index = 1
        message = self.check(index, 1, 2)

        if message is not None:
            self.assertEqual(False, True, message)

        index = 2
        message = self.check(index, 1, 2)

        if message is not None:
            self.assertEqual(False, True, message)

    def check(self, index, scenario_id, sentence_id):
        errors = []
        fname = test_data[index]["fname"]
        expenses = test_data[index]["expenses"]  # read_csv(fname)
        expected_refunds = test_data[index]["expected"]

        try:
            refunds = calculate_refunds(fname)

            if refunds is None:
                errors.append(f"Expected list of objects, got None")
            else:
                if len(refunds) != len(expected_refunds):
                    errors.append(f"Expected list of {len(expected_refunds)} objects, got {len(refunds)}")
                else:
                    has_error = False

                    for j in range(len(refunds)):
                        if "person" not in refunds[j]:
                            errors.append(f"Missing key 'person' in refunds")
                            has_error = True
                        if "total" not in refunds[j]:
                            errors.append(f"Missing key 'total' in refunds")
                            has_error = True
                        if "refund" not in refunds[j]:
                            errors.append(f"Missing key 'refund' in refunds")
                            has_error = True
                        if has_error:
                            break

                    if not has_error:
                        for i in range(len(expected_refunds)):
                            found = False
                            expected_refund = expected_refunds[i]
                            has_error = False

                            for j in range(len(refunds)):
                                if refunds[j]["person"] == expected_refund["person"]:
                                    found = True
                                    if (round(refunds[j]["total"], 2) != round(expected_refund["total"], 2)
                                            or round(refunds[j]["refund"], 2) != round(expected_refund["refund"], 2)):
                                        errors.append(f"Expected {expected_refund},\ngot {refunds[j]}")
                                        has_error = True
                                    break

                            if not found or has_error:
                                if not found:
                                    errors.append(f"Missing refund: {expected_refund}")
                                break

                        vis_data = {
                            "expenses": expenses,
                            "persons": None,
                            "refunds": refunds
                        }
                        self.visualization.add([scenario_id, sentence_id, vis_data])

        except Exception as e:
            trace = traceback.format_exc()
            errors.append(f"An error occurred in user code: {e}\n{trace}")

        if len(errors) == 0:
            return None

        given = [
            f"\nGiven:",
            f"File: {fname}",
            f"Expenses: {json.dumps(expenses, indent=3)}",
            "\n\n"
        ]
        return "\n".join(given) + "\n".join(errors)

    @classmethod
    def tearDownClass(cls) -> None:
        FairShareTest.visualization.write()


def read_csv(fname):
    with open(fname, "r") as file:
        lines = file.readlines()

    content = []

    for line in lines:
        activity, name, amount = line.strip().split(";")
        amount = float(amount)
        content.append({
            "activity": activity,
            "payer": name,
            "amount": amount
        })

    return content


test_data = [
    {
        "fname": "fair_share/data-1-1.csv",
        "expenses": [
            {"activity": "Mini Golf", "payer": "Roger", "amount": 47.4},
            {"activity": "Bowling", "payer": "Roger", "amount": 30.9},
            {"activity": "Paintball", "payer": "Lena", "amount": 25.4},
            {"activity": "Photo Booth", "payer": "Roger", "amount": 47.6},
            {"activity": "Karaoke Night", "payer": "Roger", "amount": 28.1}
        ],
        "persons": ["Roger", "Lena"],
        "expected": [
            {"person": "Roger", "total": 154, "refund": 64.3},
            {"person": "Lena", "total": 25.4, "refund": -64.3}
        ]
    },
    {
        "fname": "fair_share/data-1-2.csv",
        "expenses": [
            {"activity": "Escape Room", "payer": "Jack", "amount": 40.7},
            {"activity": "Concert Tickets", "payer": "Roger", "amount": 47.8},
            {"activity": "Board Game Night", "payer": "Adam", "amount": 47.1},
            {"activity": "Movie Night", "payer": "Jack", "amount": 29.7},
            {"activity": "Museum Entry", "payer": "Jack", "amount": 41.1}
        ],
        "persons": ["Jack", "Roger", "Adam"],
        "expected": [
            {"person": "Jack", "total": 111.5, "refund": 42.7},
            {"person": "Roger", "total": 47.8, "refund": -21},
            {"person": "Adam", "total": 47.1, "refund": -21.7}
        ]
    },
    {
        "fname": "fair_share/data-1-3.csv",
        "expenses": [
            {"activity": "Bumper Cars", "payer": "Otto", "amount": 36.3},
            {"activity": "Swing Boats", "payer": "Edward", "amount": 42.1},
            {"activity": "Ferris Wheel", "payer": "Otto", "amount": 39.9},
            {"activity": "Merry-Go-Round", "payer": "David", "amount": 55.4},
            {"activity": "Haunted House", "payer": "Philipp", "amount": 58.6},
            {"activity": "Roller Coaster", "payer": "Mark", "amount": 50.6}
        ],
        "persons": ["Otto", "Edward", "David", "Philipp", "Mark"],
        "expected": [
            {"person": "Otto", "total": 76.19999999999999, "refund": 19.62},
            {"person": "Philipp", "total": 58.6, "refund": 2.02},
            {"person": "David", "total": 55.4, "refund": -1.18},
            {"person": "Mark", "total": 50.6, "refund": -5.98},
            {"person": "Edward", "total": 42.1, "refund": -14.48}
        ]
    },
]


if __name__ == '__main__':
    with open('results.xml', 'wb') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )