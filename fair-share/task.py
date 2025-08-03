#from typing import List
import csv

def read_file_content(fname):
    try:
        with open(fname) as file:
            return list(csv.DictReader(file, delimiter=";", fieldnames=["type", "name", "amount"]))
    except Exception as err:
        print(f"An error occured trying to read the file: ${err}")
        return None

def calculate_totals(shares):
    totals = {
        "overall": 0.0,
        "fair_share": 0.0,
        "persons": {},
    }

    for row in shares:
        current_person_name = row["name"]

        if not current_person_name in totals["persons"]:
            totals["persons"][current_person_name] = {
                "person": current_person_name,
                "total": 0.0,
                "refund": 0.0
            }

        totals["persons"][current_person_name]["total"] += float(row["amount"])
        totals["overall"] += float(row["amount"])

    return totals

def calculate_fair_share(totals):
    number_of_persons = len(totals["persons"])

    if number_of_persons > 0:
        totals["fair_share"] = totals["overall"] / number_of_persons

def calculate_refund_per_person(totals):
    for person in totals["persons"]:
        current_person = totals["persons"][person]
        current_person["refund"] = current_person["total"] - totals["fair_share"]


def get_formatted_output(totals):
    return list(map(lambda person : totals["persons"][person], list(totals["persons"])))


def calculate_refunds(fname):
    file_contents = read_file_content(fname)

    if file_contents == None:
        raise Error

    totals = calculate_totals(file_contents)
    calculate_fair_share(totals)
    calculate_refund_per_person(totals)

    return get_formatted_output(totals)