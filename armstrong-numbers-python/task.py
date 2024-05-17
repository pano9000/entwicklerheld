def is_armstrong_number(number):
    
    if (number > -1 and number < 10):
        return True
    if (number >= 10 and number <= 99):
        return False

    sum = 0
    strNumber = str(number)
    for digit in strNumber:
        sum += int(digit)**len(strNumber)
    
    return sum == number