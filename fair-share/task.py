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
            totals["persons"][current_person_name] = 0.0

        totals["persons"][current_person_name] += float(row["amount"])
        totals["overall"] += float(row["amount"])

    number_of_persons = len(totals["persons"])

    if number_of_persons > 0:
        totals["fair_share"] = totals["overall"] / number_of_persons

    return totals


def calculate_refunds(fname):
    file_contents = read_file_content(fname)

    if file_contents == None:
        raise Error


    totals = calculate_totals(file_contents)

    return_value = []
    for person in totals["persons"]:
        return_value.append({
            "person": person,
            "total": totals["persons"][person],
            "refund": totals["persons"][person] - totals["fair_share"]
        })

    return return_value