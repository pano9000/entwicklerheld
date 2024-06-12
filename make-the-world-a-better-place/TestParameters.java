package de.entwicklerheld.betterplace.challenge.stage3;

import java.util.Arrays;

public class TestParameters {

    Integer expectedResult;

    int[] parameters;

    public TestParameters(final Integer expectedResult, final int[] parameters) {
        this.parameters = parameters;
        this.expectedResult = expectedResult;
    }

    @Override
    public String toString() {
        return "TestParameters{" + "expectedResult=" + expectedResult + ", parameters=" + Arrays.toString(parameters)
                + '}';
    }
}
