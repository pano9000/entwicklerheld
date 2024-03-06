package de.entwicklerheld.grainsJava;

import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.junit.Assert.assertEquals;

import org.junit.Ignore;
import org.junit.Rule;
import org.junit.Test;

import java.math.BigInteger;

public class GrainsTests {


    private Grains grains = new Grains();

    @Test
    public void testScenario1() {
        assertEquals(new BigInteger("1"), grains.grainsOnSquare(1));
        assertEquals(new BigInteger("2"), grains.grainsOnSquare(2));
        assertEquals(new BigInteger("4"), grains.grainsOnSquare(3));
        assertEquals(new BigInteger("8"), grains.grainsOnSquare(4));

        assertEquals(new BigInteger("32768"), grains.grainsOnSquare(16));
        assertEquals(new BigInteger("2147483648"), grains.grainsOnSquare(32));
        assertEquals(new BigInteger("9223372036854775808"), grains.grainsOnSquare(64));

        assertEquals(new BigInteger("16"), grains.grainsOnSquare(5));
        assertEquals(new BigInteger("32"), grains.grainsOnSquare(6));
        assertEquals(new BigInteger("64"), grains.grainsOnSquare(7));
        assertEquals(new BigInteger("128"), grains.grainsOnSquare(8));
        assertEquals(new BigInteger("256"), grains.grainsOnSquare(9));
        assertEquals(new BigInteger("512"), grains.grainsOnSquare(10));
        assertEquals(new BigInteger("1024"), grains.grainsOnSquare(11));
        assertEquals(new BigInteger("2048"), grains.grainsOnSquare(12));
        assertEquals(new BigInteger("4096"), grains.grainsOnSquare(13));
        assertEquals(new BigInteger("8192"), grains.grainsOnSquare(14));
        assertEquals(new BigInteger("16384"), grains.grainsOnSquare(15));


        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> grains.grainsOnSquare(0))
                .withMessage("square must be between 1 and 64");


        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> grains.grainsOnSquare(-1))
                .withMessage("square must be between 1 and 64");


        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> grains.grainsOnSquare(65))
                .withMessage("square must be between 1 and 64");

        BigInteger total = grains.grainsOnBoard();
        assertEquals(new BigInteger("18446744073709551615"), total);
    }


    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();
}