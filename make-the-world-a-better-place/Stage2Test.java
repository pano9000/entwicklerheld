package de.entwicklerheld.betterplace.challenge.stage2;
import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.StringContains.containsString;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ChallengeTest {
    @BeforeEach
    void setUp() {
        System.out.println("##polylith[testStarted");
    }

    @Test
    void test_scenarioOne() {
        Assertions.assertEquals(2, Stage2.Service.add(2), "Addition is not working properly");
        Assertions.assertEquals(4, Stage2.Service.add(1, 1, 2), "Addition is not working properly");
        Assertions.assertEquals(3, Stage2.Service.add(1, 2), "Addition is not working properly");
        Assertions.assertEquals(0, Stage2.Service.add(0, 0, 0, 0), "Addition is not working properly");

        IllegalArgumentException thrown = Assertions.assertThrows(IllegalArgumentException.class,
                Stage2.Service::add,
                "Expected add() to throw an exception when adding no parameter, but it didn't");

        Assertions.assertEquals("Input is required!", thrown.getMessage());

    }

    @Test
    void test_scenarioTwo() {
        Set<Method> methodsAnnotatedWithTest = Stage2.TestRunner
                .findMethodsAnnotatedWith(de.entwicklerheld.betterplace.challenge.stage2.Stage1.Test.class);

        Stage2.TestRunner.TestResult result = new Stage2.TestRunner.TestResult();
        Set<String> methodNames = new HashSet<>();
        for (Method method : methodsAnnotatedWithTest) {
            methodNames.add(method.getDeclaringClass().getCanonicalName() + "." + method.getName());
            //Stage2.TestRunner.runTestMethod(result, method);
        }

        Assertions.assertEquals(12,
                methodsAnnotatedWithTest.size(),
                "There is at least one method you haven't found with your classpath scan. "
                        + "There is another class in the source folder I have not told you about yet. Did you find it?");
        Assertions.assertTrue(methodNames.contains("HiddenTest.hidden"),
                "There is at least one method you haven't found with your classpath scan.");
        Assertions.assertTrue(
                methodNames.contains(
                        "de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution_withException"),
                "There is at least one method you haven't found with your classpath scan.");
        Assertions.assertTrue(
                methodNames.contains(
                        "de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution_withException"),
                "There is at least one method you haven't found with your classpath scan.");
        Assertions.assertTrue(
                methodNames.contains(
                        "de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution_withIgnore"),
                "There is at least one method you haven't found with your classpath scan.");

        Assertions.assertTrue(
                methodNames.contains("de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution"),
                "There is at least one method you haven't found with your classpath scan.");
        
        Assertions.assertTrue(methodNames.contains(
                "de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution_withAssertionError"),
                "There is at least one method you haven't found with your classpath scan.");
        checkHeroMethods(methodNames);

        for (Method method : methodsAnnotatedWithTest) {
            Stage2.TestRunner.runTestMethod(result, method);
        }

        //check result
        Assertions.assertEquals(8, result.getErrors().size(), "The number of errors is wrong.");
        Assertions.assertEquals(1, result.getFailures().size(), "The number of failures is wrong.");
        Assertions.assertEquals(2, result.getSuccesses().size(), "The number of successes is wrong.");
        Assertions.assertEquals(11, result.getRunnedTests().size(), "The number of runned tests is wrong.");
        Assertions.assertEquals(1, result.getIgnoredTests().size(), "The number of ignored tests is wrong.");
    }

    @Test
    void test_scenarioThree() {
        String result = Stage2.TestRunner.runTests();

        assertThat("Number of tests without errors should be returned.", result, containsString("2 test(s) finished without errors"));
        assertThat("Number of ignored tests should be returned.", result, containsString("1 test(s) were ignored"));
        assertThat("Number of failed tests should be returned.", result, containsString("1 test(s) failed"));
        assertThat("Number of tests in error should be returned.", result, containsString("8 test(s) threw an exception"));

        assertThat("Result should contain fully qualified name of class that failed.", result, containsString("de.entwicklerheld.betterplace.challenge.stage2.ServiceTest"));
        assertThat("Result should contain name of the method that failed.", result, containsString("testTestExecution_withAssertionError"));
        assertThat("Result should contain message of AssertionError.", result, containsString("Addition is not working properly"));

        assertThat("Result should contain fully qualified name of class with errors.", result, containsString("de.entwicklerheld.betterplace.challenge.stage2.ServiceTest"));
        assertThat("Result should contain name of methods with errors.", result, containsString("testTestExecution_withException"));
        assertThat("Result should contain type of exception.", result, containsString("java.lang.IllegalArgumentException"));
        assertThat("Result should contain message of exception.", result, containsString("Input is required!"));

        assertThat("Result should contain name of methods with errors.", result, containsString("testTestExecution_Professor_Strong"));
        assertThat("Result should contain name of methods with errors.", result, containsString("testTestExecution_Good_Woman"));
        assertThat("Result should contain name of methods with errors.", result, containsString("testTestExecution_Doctor_Good"));
        assertThat("Result should contain name of methods with errors.", result, containsString("testTestExecution_Strength_Woman"));
        assertThat("Result should contain name of methods with errors.", result, containsString("testTestExecution_Captain_Strength"));
        assertThat("Result should contain name of methods with errors.", result, containsString("testTestExecution_Resilient_Woman"));
        assertThat("Result should contain name of methods with errors.", result, containsString("testTestExecution_Doctor_Resilient"));
    }

    void checkHeroMethods(Set<String> methodNames) {
        Assertions.assertTrue(methodNames.contains("de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution_Professor_Strong"), "There is at least one method you haven't found with your classpath scan.");
        Assertions.assertTrue(methodNames.contains("de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution_Good_Woman"), "There is at least one method you haven't found with your classpath scan.");
        Assertions.assertTrue(methodNames.contains("de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution_Doctor_Good"), "There is at least one method you haven't found with your classpath scan.");
        Assertions.assertTrue(methodNames.contains("de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution_Strength_Woman"), "There is at least one method you haven't found with your classpath scan.");
        Assertions.assertTrue(methodNames.contains("de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution_Captain_Strength"), "There is at least one method you haven't found with your classpath scan.");
        Assertions.assertTrue(methodNames.contains("de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution_Resilient_Woman"), "There is at least one method you haven't found with your classpath scan.");
        Assertions.assertTrue(methodNames.contains("de.entwicklerheld.betterplace.challenge.stage2.ServiceTest.testTestExecution_Doctor_Resilient"), "There is at least one method you haven't found with your classpath scan.");
    }

    @AfterEach
    void tearDown() {
        System.out.println("##polylith[testFinished");
    }

}