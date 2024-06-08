package de.entwicklerheld.knapsackJava;

import org.junit.*;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

public class KnapsackJavaTests {

    @Test
    public void test_1_1() {
        String result = runTest(TestData.testData_1_1());

        if (null != result) {
            assertThat(result, null == result, is(true));
        }
    }

    @Test
    public void test_1_2() {
        String result = runTest(TestData.testData_1_2());

        if (null != result) {
            assertThat(result, null == result, is(true));
        }
    }

    @Test
    public void test_1_3() {
        String result = runTest(TestData.testData_1_3());

        if (null != result) {
            assertThat(result, null == result, is(true));
        }
    }

    @Test
    public void test_1_4() {
        String result = runTest(TestData.testData_1_4());

        if (null != result) {
            assertThat(result, null == result, is(true));
        }
    }

    @Test
    public void test_1_5() {
        String result = runTest(TestData.testData_1_5());

        if (null != result) {
            assertThat(result, null == result, is(true));
        }
    }

    @Test
    public void test_1_6() {
        String result = runTest(TestData.testData_1_6());

        if (null != result) {
            assertThat(result, null == result, is(true));
        }
    }

    @Test
    public void test_1_7() {
        String result = runTest(TestData.testData_1_7());

        if (null != result) {
            assertThat(result, null == result, is(true));
        }
    }

    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();

    public static String runTest(TestData testData) {
        try {
            ArrayList<Item> clonedItems = new ArrayList<Item>();
            clonedItems.addAll(testData.items);
            List<Item> actual = Knapsack.select(testData.maximumWeight, testData.rating, clonedItems);

            if (null == actual) {
                return "The result should be List<Item>, but was null.";
            }

            String expectedStr = lists2String("Expected result: " + testData.expected.size(), testData.expected, testData.items, testData.rating, testData.maximumWeight);
            String actualStr = lists2String("Actual result: " + actual.size(), testData.items, actual, testData.rating, testData.maximumWeight);

            // Check if the size of the actual result matches the size of the expected result
            if (actual.size() != testData.expected.size()) {
                return "Incorrect number of items selected.\n" + expectedStr + "\n" + actualStr;
            }

            // Check if each item in the actual result is contained in the expected result
            for (Item item : testData.expected) {
                if (!actual.contains(item)) {
                    return "The selection should contain: " + item.toString() +"\n" + expectedStr + "\n" + actualStr;
                }
            }

            // All tests passed
            return null;
        } catch (Exception e) {
            // If an exception occurs, return the error message
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();
            return "There was an error in call of select: " + e.getLocalizedMessage() + "\n" + sStackTrace;
        }
    }

    private static String lists2String(String text, List<Item> list1, List<Item> list2, HashMap<String, Double> ratings, double maximumWeight) {
        double weightSum = 0.0;
        double ratingSum = 0.0;
        String s = text + "\n";
        for (Item item : list1) {
            if (list2.contains(item)) {
                double rating = ratings.getOrDefault(item.getId(), 0.0);
                double weight = item.getWeight();
                s += "\t- " + item.getName() + "(weight: " + weight + ", rating: " + rating + ")\n";
                weightSum += weight;
                ratingSum += rating;
            }
        }
        s += "\nSum of weights: " + weightSum + " / " + maximumWeight + "\nTotal rating: " + ratingSum + "\n";
        return s;
    }
}