package de.entwicklerheld.betterplace.challenge.stage3;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.lang.annotation.Annotation;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.reflect.Method;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.StringContains.containsString;
import java.util.HashSet;
import java.util.Set;

public class ChallengeTest {
    @BeforeEach
    void setUp() {
        System.out.println("##polylith[testStarted");
    }

    @Test
    void test_scenarioOne() throws NoSuchMethodException {
        Set<Method> methodsAnnotatedWith = Stage2.TestRunner.findMethodsAnnotatedWith(Stage3.ParameterizedTest.class);

        Method m1 = ChallengeTest.class.getDeclaredMethod("testTestExecution_Wild_Robot");
        Method m2 = ChallengeTest.class.getDeclaredMethod("testTestExecution_Happy_Carlton");
        Method m3 = ChallengeTest.class.getDeclaredMethod("testTestExecution_Moon_Rabbit");
        Method m4 = ChallengeTest.class.getDeclaredMethod("testTestExecution_Fast_Zoom");

        Stage2.TestRunner.TestResult result = new Stage2.TestRunner.TestResult();

        Stage3.ExtendedTestRunner.runTestMethod(result, m1);
        Stage3.ExtendedTestRunner.runTestMethod(result, m2);
        Stage3.ExtendedTestRunner.runTestMethod(result, m3);
        Stage3.ExtendedTestRunner.runTestMethod(result, m4);
        Assertions.assertEquals(1, result.getErrors().size(), "The number of errors is wrong.");
        Assertions.assertEquals(1, result.getFailures().size(), "The number of failures is wrong.");
        Assertions.assertEquals(1, result.getSuccesses().size(), "The number of successes is wrong.");
        Assertions.assertEquals(3, result.getRunnedTests().size(), "The number of runned tests is wrong.");
        Assertions.assertEquals(1, result.getIgnoredTests().size(), "The number of ignored tests is wrong.");

        for (Method method : methodsAnnotatedWith) {
            Stage3.ExtendedTestRunner.runTestMethod(result, method);
        }
        Assertions.assertEquals(3, result.getErrors().size(), "The number of errors is wrong.");
        Assertions.assertEquals(11, result.getFailures().size(), "The number of failures is wrong.");
        Assertions.assertEquals(6, result.getSuccesses().size(), "The number of successes is wrong.");
        Assertions.assertEquals(20, result.getRunnedTests().size(), "The number of runned tests is wrong.");
        Assertions.assertEquals(2, result.getIgnoredTests().size(), "The number of ignored tests is wrong.");
    }

    @Test
    void test_scenarioTwo() throws NoSuchMethodException {
        Set<Method> methodsAnnotatedWith = Stage2.TestRunner.findMethodsAnnotatedWith(Stage3.ParameterizedTest.class);

        Method m1 = ChallengeTest.class.getDeclaredMethod("testTestExecution_Wild_Robot");
        Method m2 = ChallengeTest.class.getDeclaredMethod("testTestExecution_Happy_Carlton");
        Method m3 = ChallengeTest.class.getDeclaredMethod("testTestExecution_Moon_Rabbit");
        Method m4 = ChallengeTest.class.getDeclaredMethod("testTestExecution_Fast_Zoom");

        Stage2.TestRunner.TestResult result = new Stage2.TestRunner.TestResult();

        Stage3.ExtendedTestRunner.runTestMethod(result, m1);
        Stage3.ExtendedTestRunner.runTestMethod(result, m2);
        Stage3.ExtendedTestRunner.runTestMethod(result, m3);
        Stage3.ExtendedTestRunner.runTestMethod(result, m4);
        for (Method method : methodsAnnotatedWith) {
            Stage3.ExtendedTestRunner.runTestMethod(result, method);
        }

        String resultString = Stage2.TestRunner.printResult(result);

        assertThat("Result should contain fully qualified name of class that failed.", resultString, containsString("de.entwicklerheld.betterplace.challenge.stage3.ParameterizedServiceTest"));
        assertThat("Result should contain name of the method that failed.", resultString, containsString("testAddParameterized"));
        assertThat("Result should contain name of the method that failed.", resultString, containsString("testAddParameterized_2"));
        assertThat("Result should contain name of the method that failed.", resultString, containsString("testAddParameterized_3"));
        assertThat("Result should contain name of the method that failed.", resultString, containsString("testTestExecution_Moon_Rabbit"));
        assertThat("Result should contain message of AssertionError for all failed tests.", resultString, containsString("Addition is not working properly"));
        assertThat("Result should contain message of AssertionError for all failed tests.", resultString, containsString("Addition is not working properly again"));
        assertThat("Result should contain message of AssertionError for all failed tests.", resultString, containsString("Addition is not working properly again!"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=7, parameters=[1, 1, 4]}"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=1, parameters=[1, 3]}"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=1, parameters=[2, 3]}"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=1, parameters=[3, 3]}"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=1, parameters=[5, 3]}"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=1, parameters=[6, 3]}"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=1, parameters=[7, 3]}"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=1, parameters=[8, 3]}"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=1, parameters=[9, 3]}"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=7, parameters=[100, 3]}"));

        assertThat("Result should contain name of the method that failed.", resultString, containsString("testTestExecution_Happy_Carlton"));
        assertThat("Result should contain type of exception.", resultString, containsString("java.lang.IllegalArgumentException"));
        assertThat("Result should contain message of exception.", resultString, containsString("Input is required!"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=7, parameters=[]}"));
        assertThat("Result should contain the parameters of the failed test.", resultString, containsString("TestParameters{expectedResult=6, parameters=[]}"));
    }

    @AfterEach
    void tearDown() {
        System.out.println("##polylith[testFinished");
    }

    @Stage1.Test
    public void testTestExecution_Wild_Robot() {
        Stage1.Assert.assertEquals(4, Stage2.Service.add(1, 1, 2), "Addition is not working properly");
    }

    @Stage1.Test
    public void testTestExecution_Moon_Rabbit() {
        Stage1.Assert.assertEquals(2, Stage2.Service.add(1, 1, 2), "Addition is not working properly");
    }

    @Stage1.Test
    public void testTestExecution_Happy_Carlton() {
        Stage1.Assert.assertEquals(4, Stage2.Service.add(), "Addition is not working properly");
    }

    @Stage1.Test(ignore = true)
    public void testTestExecution_Fast_Zoom() {
        Stage1.Assert.assertEquals(4, Stage2.Service.add(1, 1, 2), "Addition is not working properly");
    }
}