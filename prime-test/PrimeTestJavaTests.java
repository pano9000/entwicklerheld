package de.entwicklerheld.primeTestJava;

import org.junit.*;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

public class PrimeTestJavaTests {

    @Test
    public void testScenario1() {
        assertThat("Expected false for number 1", PrimeTestJava.testPrimeNumber(1), is(false));
        assertThat("Expected true for number 2", PrimeTestJava.testPrimeNumber(2), is(true));
        assertThat("Expected true for number 3", PrimeTestJava.testPrimeNumber(3), is(true));
        assertThat("Expected false for number 4", PrimeTestJava.testPrimeNumber(4), is(false));
        assertThat("Expected true for number 5", PrimeTestJava.testPrimeNumber(5), is(true));
        assertThat("Expected false for number 6", PrimeTestJava.testPrimeNumber(6), is(false));
        assertThat("Expected true for number 7", PrimeTestJava.testPrimeNumber(7), is(true));
        assertThat("Expected false for number 8", PrimeTestJava.testPrimeNumber(8), is(false));
        assertThat("Expected false for number 9", PrimeTestJava.testPrimeNumber(9), is(false));
        assertThat("Expected false for number 10", PrimeTestJava.testPrimeNumber(10), is(false));
        assertThat("Expected true for number 11", PrimeTestJava.testPrimeNumber(11), is(true));
        assertThat("Expected false for number 12", PrimeTestJava.testPrimeNumber(12), is(false));
        assertThat("Expected true for number 13", PrimeTestJava.testPrimeNumber(13), is(true));
        assertThat("Expected false for number 14", PrimeTestJava.testPrimeNumber(14), is(false));
        assertThat("Expected false for number 15", PrimeTestJava.testPrimeNumber(15), is(false));
        assertThat("Expected false for number 16", PrimeTestJava.testPrimeNumber(16), is(false));
        assertThat("Expected true for number 17", PrimeTestJava.testPrimeNumber(17), is(true));
        assertThat("Expected false for number 18", PrimeTestJava.testPrimeNumber(18), is(false));
        assertThat("Expected true for number 19", PrimeTestJava.testPrimeNumber(19), is(true));
        assertThat("Expected false for number 20", PrimeTestJava.testPrimeNumber(20), is(false));
        assertThat("Expected false for number 21", PrimeTestJava.testPrimeNumber(21), is(false));
        assertThat("Expected false for number 22", PrimeTestJava.testPrimeNumber(22), is(false));
        assertThat("Expected true for number 23", PrimeTestJava.testPrimeNumber(23), is(true));
        assertThat("Expected false for number 24", PrimeTestJava.testPrimeNumber(24), is(false));
        assertThat("Expected false for number 25", PrimeTestJava.testPrimeNumber(25), is(false));
        assertThat("Expected false for number 26", PrimeTestJava.testPrimeNumber(26), is(false));
        assertThat("Expected false for number 27", PrimeTestJava.testPrimeNumber(27), is(false));
        assertThat("Expected false for number 28", PrimeTestJava.testPrimeNumber(28), is(false));
        assertThat("Expected true for number 29", PrimeTestJava.testPrimeNumber(29), is(true));
        assertThat("Expected false for number 30", PrimeTestJava.testPrimeNumber(30), is(false));
        assertThat("Expected true for number 31", PrimeTestJava.testPrimeNumber(31), is(true));
        assertThat("Expected false for number 32", PrimeTestJava.testPrimeNumber(32), is(false));
        assertThat("Expected false for number 33", PrimeTestJava.testPrimeNumber(33), is(false));
        assertThat("Expected false for number 34", PrimeTestJava.testPrimeNumber(34), is(false));

        assertThat("Expected true for number 131071", PrimeTestJava.testPrimeNumber(131071), is(true));
        assertThat("Expected false for number 131072", PrimeTestJava.testPrimeNumber(131072), is(false));
        assertThat("Expected false for number 131073", PrimeTestJava.testPrimeNumber(131073), is(false));

        assertThat("Expected true for number 524287", PrimeTestJava.testPrimeNumber(524287), is(true));
        assertThat("Expected false for number 524288", PrimeTestJava.testPrimeNumber(524288), is(false));
        assertThat("Expected false for number 524289", PrimeTestJava.testPrimeNumber(524289), is(false));
        assertThat("Expected false for number 524290", PrimeTestJava.testPrimeNumber(524290), is(false));
        // assertThat("Expected false for number 524290", PrimeTestJava.testPrimeNumber(Math.pow(2, 521)-1), is(false));
    }

    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();
}