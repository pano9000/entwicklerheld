#from typing import List
import csv

class FairShareCalculator:
    def __init__(self, filename):
        self.filename = filename
        self.raw_shares = []
        self.totals = {
            "overall": 0.0,
            "fair_share": 0.0,
            "persons": {},
        }

    def read_file_content(self):
        try:
            with open(self.filename) as file:
                self.raw_shares = list(csv.DictReader(file, delimiter=";", fieldnames=["type", "name", "amount"]))
        except Exception as err:
            print(f"An error occured trying to read the file: ${err}")
            raise Exception

    
    def calculate_totals(self):

        for row in self.raw_shares:        
            current_person_name = row["name"]

            if not current_person_name in self.totals["persons"]:
                self.totals["persons"][current_person_name] = {
                    "person": current_person_name,
                    "total": 0.0,
                    "refund": 0.0
                }

            self.totals["persons"][current_person_name]["total"] += float(row["amount"])
            self.totals["overall"] += float(row["amount"])    

    def calculate_fair_share(self):
        number_of_persons = len(self.totals["persons"])

        if number_of_persons > 0:
            self.totals["fair_share"] = self.totals["overall"] / number_of_persons

    def calculate_refund_per_person(self):
        for person in self.totals["persons"]:
            current_person = self.totals["persons"][person]
            current_person["refund"] = current_person["total"] - self.totals["fair_share"]


    def get_formatted_output(self):
        return list(map(lambda person : self.totals["persons"][person], list(self.totals["persons"])))


def calculate_refunds(fname):
    fairShareCalculator = FairShareCalculator(fname)
    fairShareCalculator.read_file_content()
    fairShareCalculator.calculate_totals()
    fairShareCalculator.calculate_fair_share()
    fairShareCalculator.calculate_refund_per_person()
    return fairShareCalculator.get_formatted_output()
