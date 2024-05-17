package de.entwicklerheld.armstrongNumbersKotlin

fun isArmstrongNumber(numberToCheck: Int): Boolean {

    if (numberToCheck > -1 && numberToCheck < 10) return true;
    if (numberToCheck >= 10 && numberToCheck <= 99) return false;

    var sum = 0;
    val numberStr = numberToCheck.toString();
    for (charDigit in numberStr) {
        var intDigit = charDigit.digitToInt();

        //use for loop to avoid needing to convert to Double then Int again, if we used pow()
        var currentSum = 1;
        for (i in 1..numberStr.length) {
            currentSum *= intDigit;
        }
        sum += currentSum
    }

    return sum == numberToCheck
}
