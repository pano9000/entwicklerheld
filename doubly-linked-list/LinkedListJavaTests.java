package de.entwicklerheld.linkedListJava;

import org.junit.*;

import java.util.Arrays;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

public class LinkedListJavaTests {

    @Test
    public void test_1_1() {
        LinkedListJava<Integer> list = new LinkedListJava<Integer>();
        int expected = 7;
        list.push(expected);
        Integer actual = list.pop();
        assertThat("Pop should return element " + expected + " from the list, but was " + actual, actual, is(expected));
    }

    @Test
    public void test_1_2() {
        LinkedListJava<Integer> list = new LinkedListJava<Integer>();
        Integer[] expected = new Integer[] { 11, 13 };
        for (int value : expected) {
            list.push(value);
        }

        boolean hasError = false;
        Integer[] actual = new Integer[expected.length];
        for (int i = expected.length - 1; i >= 0; i--) {
            int j = expected.length - 1 - i;
            actual[j] = list.pop();
            if (actual[j] != expected[i]) {
                hasError = true;
            }
        }

        if (hasError) {
            String message = "Push: " + toString(expected, false)
                    + "\nPop should return the elements\n\t"
                    + toString(expected, true) + ", but was:\n\t"
                    + toString(actual, false);
            assertThat(message, false, is(true));
        }
    }

    @Test
    public void test_2_1() {
        LinkedListJava<Integer> list = new LinkedListJava<Integer>();
        int expected = 17;
        list.push(expected);
        Integer actual = list.shift();
        assertThat("Shift should return element " + expected + " from the list, but was " + actual, actual, is(expected));
    }

    @Test
    public void test_2_2() {
        LinkedListJava<Integer> list = new LinkedListJava<Integer>();
        Integer[] expected = new Integer[] { 23, 5 };
        for (int value : expected) {
            list.push(value);
        }

        boolean hasError = false;
        Integer[] actual = new Integer[expected.length];
        for (int i = 0; i < expected.length; i++) {
            actual[i] = list.shift();
            if (actual[i] != expected[i]) {
                hasError = true;
            }
        }

        if (hasError) {
            String message = "Unshift: " + toString(expected, false)
                    + "\nShift should return the elements\n\t"
                    + toString(expected, true) + ", but was:\n\t"
                    + toString(actual, false);
            assertThat(message, false, is(true));
        }
    }

    @Test
    public void test_3_1() {
        LinkedListJava<Integer> list = new LinkedListJava<Integer>();
        int expected = 17;
        list.unshift(expected);
        Integer actual = list.shift();
        assertThat("Unshift should insert an element at the start of the list " + expected + " from the list, but was " + actual, actual, is(expected));
    }

    @Test
    public void test_3_2() {
        LinkedListJava<Integer> list = new LinkedListJava<Integer>();
        Integer[] expected = new Integer[] { 23, 5 };
        for (int value : expected) {
            list.unshift(value);
        }

        boolean hasError = false;
        Integer[] actual = new Integer[expected.length];
        for (int i = expected.length - 1; i >= 0; i--) {
            int j = expected.length - 1 - i;
            actual[j] = list.shift();
            if (actual[j] != expected[i]) {
                hasError = true;
            }
        }

        if (hasError) {
            String message = "Unshift: " + toString(expected, false)
                    + "\nShift should return the elements\n\t"
                    + toString(expected, false) + ", but was:\n\t"
                    + toString(actual, false);
            assertThat(message, false, is(true));
        }
    }

    private static <T> String toString(T[] arr, boolean reverse) {
        String s = "[ ";
        if (arr.length > 0) {
            if (reverse) {
                s += arr[arr.length - 1];
                for (int i = arr.length -2; i >= 0; i--) {
                    s += ", " + arr[i];
                }
            } else {
                s += arr[0];
                for (int i = 1; i < arr.length; i++) {
                    s += ", " + arr[i];
                }
            }
        }
        s += " ]";
        return s;
    }

    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();
}