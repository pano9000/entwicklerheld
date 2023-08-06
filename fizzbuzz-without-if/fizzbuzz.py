def fizzbuzz(number: int):

    mapping = {
        "FalseFalse": number,
        "TrueFalse": "fizz",
        "FalseTrue": "buzz",
        "TrueTrue": "fizzbuzz"
    }

    checkString = str(number % 3 == 0) + str(number % 5 == 0)

    return mapping[checkString]