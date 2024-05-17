package de.entwicklerheld.armstrongNumbersJava;


public class ArmstrongNumbersJava {
    public static boolean isArmstrongNumber(int numberToCheck) {
        if (numberToCheck > -1 && numberToCheck < 10) return true;
        if (numberToCheck >= 10 && numberToCheck <= 99) return false;

        int sum = 0;
        char[] numberStr = Integer.toString(numberToCheck).toCharArray();

        for (char charDigit : numberStr) {
            int intDigit = Character.getNumericValue(charDigit);

            //use for loop to avoid needing to convert to Double then Int again, if we used pow()
            int currentSum = 1;
            for (int i = 1; i<= numberStr.length; i++) {
                currentSum *= intDigit;
            }

            sum += currentSum;
        }

        return (sum == numberToCheck);

    }
}