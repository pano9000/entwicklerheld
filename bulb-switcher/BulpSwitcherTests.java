package de.entwicklerheld.bulpSwitcher;

import org.junit.*;

import java.io.PrintWriter;
import java.io.StringWriter;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

public class BulpSwitcherTests {

    @Test
    public void test_1_1() {
        int index = 0;
        String result = check(index);

        if (null != result) {
            assertThat(result, false, is(true));
        }
    }

    @Test
    public void test_1_2() {
        for (int index = 1; index < TestData.testData.length; index++) {
            String result = check(index);

            if (null != result) {
                assertThat(result, false, is(true));
            }
        }
    }

    private static String check(int index) {
        try {
            TestData data = TestData.testData[index];
            int n = data.n;
            BulbResult expected = data.expected;
            BulbResult actual = BulpSwitcher.simulate(n);

            if (!expected.equals(actual)) {
                return "\nGiven:"
                        + "\n\t- n: " + n
                        + "\n\nExpected result: " + expected
                        + "\nActual: " + actual
                        + "\nExplanation:\n" + explain(n);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();
            return "An error occurred in user code: " + e.getLocalizedMessage() + "\n" + sStackTrace;
        }
        return null;
    }

    private static String explain(int n) {
        StringBuilder s = new StringBuilder();
        boolean[] bulbs = new boolean[n]; // false = off

        for (int round = 1; round <= n; round++) {
            for (int i = round - 1; i < n; i += round) {
                bulbs[i] = !bulbs[i];
            }

            StringBuilder state1 = new StringBuilder();
            StringBuilder state2 = new StringBuilder();
            int count = 0;

            for (boolean bulb : bulbs) {
                if (bulb) {
                    state1.append("🔴");
                    state2.append("1");
                    count++;
                } else {
                    state1.append("⚫"); // Or "0", or "⬛", etc.
                    state2.append("0");
                }
            }

            s.append((round < 10 ? " " : "") + round + "\t" + state1.toString() + "\t" + state2.toString() + "\t" + count + "\n");
        }


        return s.toString();
    }

    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();
}