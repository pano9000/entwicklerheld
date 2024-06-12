package de.entwicklerheld.betterplace.challenge.stage1;
import java.lang.annotation.Annotation;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
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
        try {
            Class<?> clazz = Class.forName("de.entwicklerheld.betterplace.challenge.stage1.Stage1$Test");
            try {
                Method ignore = clazz.getMethod("ignore");
                Assertions.assertEquals(boolean.class, ignore.getReturnType(), "'Ignore' should be a boolean.");
                Assertions.assertEquals(false, ignore.getDefaultValue(), "'Ignore' should default to 'false'.");
            } catch (NoSuchMethodException e) {
                Assertions.fail("There should be method called 'ignore'.");
            }
        } catch (ClassNotFoundException e) {
            Assertions.fail("There should be class called 'Test' defined as inner class in Stage1.");
        }
    }

    @Test
    void test_scenarioTwo() {

        try {
            Class<?> clazz = Class.forName("de.entwicklerheld.betterplace.challenge.stage1.Stage1$Test");

            ArrayList<Annotation> annotations = new ArrayList<Annotation>(Arrays.asList(clazz.getAnnotations()));

            Target target = clazz.getAnnotation(Target.class);
            Assertions.assertNotNull(target, "The usage of this annotation should be restricted to methods.");
            Assertions.assertEquals(1, target.value().length, "Annotation Target is not configured properly.");
            Assertions.assertEquals(ElementType.METHOD,
                    target.value()[0],
                    "Annotation Target is not configured properly.");

            Retention retention = clazz.getAnnotation(Retention.class);
            Assertions.assertNotNull(retention, "This annotation should be available at runtime but it is not.");
            Assertions.assertEquals(RetentionPolicy.RUNTIME,
                    retention.value(),
                    "Annotation Retention is not configured properly.");

            Assertions.assertEquals(2, annotations.size(), "Are you sure you need all those annotations?");
        } catch (ClassNotFoundException e) {
            Assertions.fail("There should be a class called 'Test' defined in Stage1.");
        }
    }

    @Test
    void test_scenarioThree() {

        //Boolean
        Stage1.Assert.assertEquals(true, true, "Assertion did not work");
        assertException(true, false);
        assertException(null, true);
        Stage1.Assert.assertEquals((Boolean) null, null, "Assertion did not work");
        assertException(true, null);

        //String
        Stage1.Assert.assertEquals("Test", "Test", "Assertion did not work");
        String testString = "Test";
        Stage1.Assert.assertEquals(testString, testString, "Assertion did not work");
        Stage1.Assert.assertEquals((String) null, null, "Assertion did not work");
        assertException(null, testString);

        //Integer
        Stage1.Assert.assertEquals(1, 1, "Assertion did not work");
        Stage1.Assert.assertEquals(Integer.valueOf(1), Integer.valueOf(1), "Assertion did not work");
        assertException(1, 2);
        assertException(1, null);
        assertException(null, 1);
    }

    @Test
    void test_scenarioFour() {
        String message = "Something went wrong here.";
        try {
            Stage1.Assert.fail(message);
            Assertions.fail("Fail should always throw an AssertionError.");
        } catch (AssertionError e) {
            Assertions.assertEquals(message,
                    e.getMessage(),
                    "Fail should always throw an AssertionError with adequate messages.");
        }
    }

    private void assertException(final Object expected, final Object actual) {
        String message = "Assertion failed.";
        try {
            Stage1.Assert.assertEquals(expected, actual, message);
        } catch (AssertionError e) {
            assertThat("The returned message should contain message.", e.getMessage(), containsString(message));
            assertThat("The returned message should return \"Expected: " + String.valueOf(expected) + ", but got: " + String.valueOf(actual) + "\"",
                    e.getMessage(),
                    containsString("Expected: " + String.valueOf(expected) + ", but got: " + String.valueOf(actual))
            );
            return;
        }
        Assertions.fail("Assertion does not work. Actually \"" + expected + "\" and \"" + actual + "\" are not equals.");
    }

    @AfterEach
    void tearDown() {
        System.out.println("##polylith[testFinished");
    }
}
