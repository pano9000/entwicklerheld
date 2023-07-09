package de.entwicklerheld.changeCalculatorJava;

import org.hamcrest.Matchers;
import org.junit.*;

import java.util.Arrays;
import java.util.List;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertThrows;

public class ChangeCalculatorJavaTests {
    @Test
    public void testChange() {
        ChangeCalculator changeCalculator1 = new ChangeCalculator(asList(1, 5, 10, 25, 100));
        List<Integer> result1 = changeCalculator1.computeMostEfficientChange(25);
        assertThat("Expected result [25] for coins [1, 5, 10, 25, 100] but was " + result1, singletonList(25), Matchers.containsInAnyOrder(result1.toArray()));

        ChangeCalculator changeCalculator2 = new ChangeCalculator(asList(1, 5, 10, 25, 100));
        List<Integer> result2 = changeCalculator2.computeMostEfficientChange(15);
        assertThat("Expected result [5, 10] for coins [1, 5, 10, 25, 100] but was " + result2, asList(5, 10), Matchers.containsInAnyOrder(result2.toArray()));

        ChangeCalculator changeCalculatorZero = new ChangeCalculator(asList(1, 5, 10, 25, 100));
        List<Integer> resultZero = changeCalculatorZero.computeMostEfficientChange(0);
        assertThat("Expected empty list for coins [1, 5, 10, 25, 100] but was " + resultZero, emptyList(), Matchers.equalTo(resultZero));


        assertThrows("Expected IllegalArgumentException for negative amounts, but none was thrown.", IllegalArgumentException.class, () -> {
            ChangeCalculator changeCalculatorNegative = new ChangeCalculator(asList(1, 2, 5));
            changeCalculatorNegative.computeMostEfficientChange(-5);
        });

        assertThrows("Expected IllegalArgumentException for coins [5, 10] and amount 3 because it cannot be split.", IllegalArgumentException.class, () -> {
            ChangeCalculator changeCalculatorImpossible = new ChangeCalculator(asList(5, 10));
            changeCalculatorImpossible.computeMostEfficientChange(3);
        });

    }


    @Test
    public void testComplexCases() {
        ChangeCalculator changeCalculatorNotGreedy = new ChangeCalculator(asList(1, 2, 5, 10, 20, 50));
        List<Integer> resultNotGreedy = changeCalculatorNotGreedy.computeMostEfficientChange(63);
        assertThat("Expected result [50, 10, 2, 1] for coins [1, 2, 5, 10, 20, 50] and amount 63 but was " + resultNotGreedy, Arrays.asList(50, 10, 2, 1), Matchers.containsInAnyOrder(resultNotGreedy.toArray()));

        ChangeCalculator changeCalculator = new ChangeCalculator(asList(1, 4, 15, 20, 50));
        List<Integer> result = changeCalculator.computeMostEfficientChange(23);
        assertThat("Expected result [4, 4, 15] for coins [1, 4, 15, 20, 50] and amount 23 but was " + result, asList(4, 4, 15), Matchers.containsInAnyOrder(result.toArray()));

        ChangeCalculator changeCalculatorGreedy1 = new ChangeCalculator(asList(1, 5, 10, 21, 25));
        List<Integer> resultGreedy1 = changeCalculatorGreedy1.computeMostEfficientChange(63);
        assertThat("Expected result [21, 21, 21] for coins [1, 5, 10, 21, 25] and amount 63 but was " + resultGreedy1, asList(21, 21, 21), Matchers.containsInAnyOrder(resultGreedy1.toArray()));

        ChangeCalculator changeCalculatorGreedy2 = new ChangeCalculator(asList(2, 5, 10, 20, 50));
        List<Integer> resultGreedy2 = changeCalculatorGreedy2.computeMostEfficientChange(21);
        assertThat("Expected result [2, 2, 2, 5, 10] for coins [2, 5, 10, 20, 50] and amount 21 but was " + resultGreedy2, asList(2, 2, 2, 5, 10), Matchers.containsInAnyOrder(resultGreedy2.toArray()));

        ChangeCalculator changeCalculatorGreedy3 = new ChangeCalculator(asList(4, 5));
        List<Integer> resultGreedy3 = changeCalculatorGreedy3.computeMostEfficientChange(27);
        assertThat("Expected result [4, 4, 4, 5, 5, 5] for coins [4, 5] and amount 27 but was " + resultGreedy3, asList(4, 4, 4, 5, 5, 5), Matchers.containsInAnyOrder(resultGreedy3.toArray()));


        assertThrows("The total 94 cannot be represented in the given currency of 5, 10. Expected IllegalArgumentException but none was thrown.", IllegalArgumentException.class, () -> {
            ChangeCalculator changeCalculatorImpossible2 = new ChangeCalculator(asList(5, 10));
            changeCalculatorImpossible2.computeMostEfficientChange(94);
        });

        // "Random" Tests
        ChangeCalculator changeCalculatorRnd1 = new ChangeCalculator(asList(1, 2, 5));
        List<Integer> resultRnd1 = changeCalculatorRnd1.computeMostEfficientChange(11);
        assertThat("Expected result [1, 5, 5] for coins [1, 2, 5] amount 11 but was " + resultRnd1, Arrays.asList(1, 5, 5), Matchers.containsInAnyOrder(resultRnd1.toArray()));


        ChangeCalculator changeCalculatorRnd2 = new ChangeCalculator(asList(1, 5, 10, 25));
        List<Integer> resultRnd2 = changeCalculatorRnd2.computeMostEfficientChange(68);
        assertThat("Expected result [25, 25, 10, 5, 1, 1, 1] for coins [1, 5, 10, 25] amount 68 but was " + resultRnd2, Arrays.asList(25, 25, 10, 5, 1, 1, 1), Matchers.containsInAnyOrder(resultRnd2.toArray()));

        ChangeCalculator changeCalculatorRnd3 = new ChangeCalculator(asList(1, 2, 5, 10));
        List<Integer> resultRnd3 = changeCalculatorRnd3.computeMostEfficientChange(30);
        assertThat("Expected result [10, 10, 10] for coins [1, 2, 5, 10] amount 30 but was " + resultRnd3, Arrays.asList(10, 10, 10), Matchers.containsInAnyOrder(resultRnd3.toArray()));

        ChangeCalculator changeCalculatorRnd4 = new ChangeCalculator(asList(1, 3, 7, 32));
        List<Integer> resultRnd4 = changeCalculatorRnd4.computeMostEfficientChange(14);
        assertThat("Expected result [7, 7] for coins [1, 3, 7, 32] amount 14 but was " + resultRnd4, Arrays.asList(7, 7), Matchers.containsInAnyOrder(resultRnd4.toArray()));

        ChangeCalculator changeCalculatorRnd5 = new ChangeCalculator(asList(1, 2, 3, 5));
        List<Integer> resultRnd5 = changeCalculatorRnd5.computeMostEfficientChange(10);
        assertThat("Expected result [5, 5] for coins [1, 2, 3, 5] and amount 10 but was " + resultRnd5, Arrays.asList(5, 5), Matchers.containsInAnyOrder(resultRnd5.toArray()));

        ChangeCalculator changeCalculatorRnd6 = new ChangeCalculator(asList(2, 6, 8));
        List<Integer> resultRnd6 = changeCalculatorRnd6.computeMostEfficientChange(12);
        assertThat("Expected result [6, 6] for coins [2, 6, 8] and amount 12 but was " + resultRnd6, Arrays.asList(6, 6), Matchers.containsInAnyOrder(resultRnd6.toArray()));

        ChangeCalculator changeCalculatorRnd7 = new ChangeCalculator(asList(1, 3, 4));
        List<Integer> resultRnd7 = changeCalculatorRnd7.computeMostEfficientChange(6);
        assertThat("Expected result [3, 3] for coins [1, 3, 4] and amount 6 but was " + resultRnd7, Arrays.asList(3, 3), Matchers.containsInAnyOrder(resultRnd7.toArray()));

        ChangeCalculator changeCalculatorRnd8 = new ChangeCalculator(asList(1, 2, 5, 10, 20, 50));
        List<Integer> resultRnd8 = changeCalculatorRnd8.computeMostEfficientChange(63);
        assertThat("Expected result [50, 10, 2, 1] for coins [1, 2, 5, 10, 20, 50] and amount 63 but was " + resultRnd8, Arrays.asList(50, 10, 2, 1), Matchers.containsInAnyOrder(resultRnd8.toArray()));

        ChangeCalculator changeCalculatorRnd9 = new ChangeCalculator(asList(1, 2, 4, 8, 16));
        List<Integer> resultRnd9 = changeCalculatorRnd9.computeMostEfficientChange(15);
        assertThat("Expected result [8, 4, 2, 1] for coins [1, 2, 4, 8, 16] and amount 15 but was " + resultRnd9, Arrays.asList(8, 4, 2, 1), Matchers.containsInAnyOrder(resultRnd9.toArray()));

        // ChangeCalculator changeCalculator3 = new ChangeCalculator(asList(1, 2, 5, 10, 20, 50, 100));
        // List<Integer> result3 = changeCalculator3.computeMostEfficientChange(999);
        /// assertThat("Expected result [2, 2, 5, 20, 20, 50, 100, 100, 100, 100, 100, 100, 100, 100, 100] for coins [1, 2, 5, 10, 20, 50, 100] but was " + result3, asList(2, 2, 5, 20, 20, 50, 100, 100, 100, 100, 100, 100, 100, 100, 100), Matchers.containsInAnyOrder(result3.toArray()));

    }


    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();
}