package de.entwicklerheld.armstrongNumbersJava;

import org.junit.*;
import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

public class ArmstrongNumbersJavaTests {

    @Test
    public void test_1_1() {
        int numberToCheck = 0;
        boolean actual = ArmstrongNumbersJava.isArmstrongNumber(numberToCheck);
        boolean expected = true;
        String explanation = getExplanation(numberToCheck, expected);
        assertThat(explanation, actual, is(expected));
    }
    @Test
    public void test_1_2() {
        int numberToCheck = 5;
        boolean actual = ArmstrongNumbersJava.isArmstrongNumber(numberToCheck);
        boolean expected = true;
        String explanation = getExplanation(numberToCheck, expected);
        assertThat(explanation, actual, is(expected));
    }
    @Test
    public void test_1_3() {
        int numberToCheck = 10;
        boolean actual = ArmstrongNumbersJava.isArmstrongNumber(numberToCheck);
        boolean expected = false;
        String explanation = getExplanation(numberToCheck, expected);
        assertThat(explanation, actual, is(expected));
    }
    @Test
    public void test_1_4() {
        for (int i = 0; i < testData.length; i++) {
            int numberToCheck = testData[i].numberToCheck;
            boolean actual = ArmstrongNumbersJava.isArmstrongNumber(numberToCheck);
            boolean expected = testData[i].result;
            String explanation = getExplanation(numberToCheck, expected);
            assertThat(explanation, actual, is(expected));
        }
    }

    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();

    private static String getExplanation(int number, boolean isArmstrongNumber) {
        if (number == 0) {
            return "0 is an Armstrong number, because it contains no digits, and the empty sum (0) raised to the power of 0 is equal to 0.";
        }
        if (isArmstrongNumber) {
            return number + " is an Armstrong number, because " + armstrongExplanation(number);
        } else {
            return number + " is not an Armstrong number, because it does not satisfy the Armstrong condition.";
        }
    }

    private static String armstrongExplanation(int number) {
        int temp = number;
        int numberOfDigits = String.valueOf(number).length();
        StringBuilder explanation = new StringBuilder();

        while (temp != 0) {
            int digit = temp % 10;
            explanation.append(digit).append("^").append(numberOfDigits);
            if (temp / 10 != 0) {
                explanation.append(" + ");
            }
            temp /= 10;
        }

        return explanation.toString() + " = " + number;
    }

    static TestData[] testData = new TestData[]{
            new TestData(153, true),
            new TestData(100, false),
            new TestData(9474, true),
            new TestData(9475, false),
            new TestData(9926315, true),
            new TestData(9926314, false)
    };

    static class TestData {
        int numberToCheck;
        boolean result;

        TestData(int numberToCheck, boolean result) {
            this.numberToCheck = numberToCheck;
            this.result = result;
        }
    }
}