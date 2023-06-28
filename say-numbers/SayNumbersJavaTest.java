package de.entwicklerheld.sayNumbersJava;

import org.junit.Rule;
import org.junit.Test;

import static org.assertj.core.api.Assertions.*;

public class SayNumbersJavaTests {

    @Test
    public void test1() {
        assertThat(SayNumbersJava.say(0)).isEqualTo("zero");

        assertThat(SayNumbersJava.say(1)).isEqualTo("one");

        assertThat(SayNumbersJava.say(14)).isEqualTo("fourteen");

        assertThat(SayNumbersJava.say(20)).isEqualTo("twenty");

        assertThat(SayNumbersJava.say(22)).isEqualTo("twenty-two");

        assertThat(SayNumbersJava.say(100)).isEqualTo("one hundred");

        assertThat(SayNumbersJava.say(123)).isEqualTo("one hundred twenty-three");

        assertThat(SayNumbersJava.say(1_000)).isEqualTo("one thousand");

        assertThat(SayNumbersJava.say(987_654_321_123L))
                .isEqualTo("nine hundred eighty-seven billion six hundred fifty-four million" +
                        " three hundred twenty-one thousand one hundred twenty-three");

        assertThat(SayNumbersJava.say(1_234)).isEqualTo("one thousand two hundred thirty-four");

        assertThat(SayNumbersJava.say(1_000_000)).isEqualTo("one million");

        assertThat(SayNumbersJava.say(1_002_345)).isEqualTo("one million two thousand three hundred forty-five");

        assertThat(SayNumbersJava.say(1_000_000_000)).isEqualTo("one billion");

    }

    @Test()
    public void illegalNegativeNumber() {
        try {
            SayNumbersJava.say(-1);
        } catch (IllegalArgumentException e) {
            return;
        }
        throw new AssertionError("Expected IllegalArgumentException for number -1 but none was thrown");

    }

    @Test()
    public void illegalTooBigNumber() {
        try {
            SayNumbersJava.say(1_000_000_000_000L);
        } catch (IllegalArgumentException e) {
            return;
        }
        throw new AssertionError("Expected IllegalArgumentException for number 1_000_000_000_000L but none was thrown");
    }

    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();
}