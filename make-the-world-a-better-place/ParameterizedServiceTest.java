package de.entwicklerheld.betterplace.challenge.stage3;
import java.util.Arrays;
import java.util.List;

public class ParameterizedServiceTest {

    @Stage3.ParameterizedTest(parameterProvider = "provideValues")
    public void testAddParameterized(final Integer expectedResult, final int[] parameters) {
        Stage1.Assert.assertEquals(expectedResult, Stage2.Service.add(parameters), "Addition is not working properly");
    }

    @Stage3.ParameterizedTest(parameterProvider = "provideValues", ignore = true)
    public void testAddParameterized_ignored(final Integer expectedResult, final int[] parameters) {
        Stage1.Assert.fail("Test should be ignored");
    }

    @Stage3.ParameterizedTest(parameterProvider = "provideValues2")
    public void testAddParameterized_2(final Integer expectedResult, final int[] parameters) {
        Stage1.Assert.assertEquals(expectedResult, Stage2.Service.add(parameters), "Addition is not working properly again");
    }

    @Stage3.ParameterizedTest(parameterProvider = "provideValues3")
    public void testAddParameterized_3(final Integer expectedResult, final int[] parameters) {
        Stage1.Assert.assertEquals(expectedResult, Stage2.Service.add(parameters), "Addition is not working properly again!");
    }

    public List<TestParameters> provideValues() {
        return Arrays.asList(
            new TestParameters(4, new int[] { 1, 1, 2 }),
            new TestParameters(6, new int[] { 1, 1, 4 }),
            new TestParameters(7, new int[] { 1, 1, 4 }),
            new TestParameters(7, new int[] {})
        );
    }

    public List<TestParameters> provideValues2() {
        return Arrays.asList(
                new TestParameters(1, new int[] {1, 3}),
                new TestParameters(1, new int[] {2, 3}),
                new TestParameters(1, new int[] {3, 3}),
                new TestParameters(1, new int[] {5, 3}),
                new TestParameters(1, new int[] {6, 3}),
                new TestParameters(1, new int[] {7, 3}),
                new TestParameters(1, new int[] {8, 3}),
                new TestParameters(1, new int[] {9, 3})
        );
    }

    public List<TestParameters> provideValues3() {
        return Arrays.asList(
                new TestParameters(4, new int[]{1, 3}),
                new TestParameters(5, new int[]{2, 3}),
                new TestParameters(6, new int[]{3, 3}),
                new TestParameters(7, new int[]{100, 3}),
                new TestParameters(6, new int[]{})
        );
    }
}
