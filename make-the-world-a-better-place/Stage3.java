package de.entwicklerheld.betterplace.challenge.stage3;

import org.reflections.util.ClasspathHelper;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URL;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


public class Stage3 {

    @Target({ ElementType.METHOD })
    @Retention(value = RetentionPolicy.RUNTIME)
    public @interface ParameterizedTest {

        boolean ignore() default false;

        String parameterProvider();
    }


    public static class ExtendedTestRunner extends Stage2.TestRunner {

        public static void main(String[] args) {
            System.out.println(runTests());
        }

        public static String runTests() {
            Set<Method> testMethods = new HashSet<>();
            testMethods.addAll(findMethodsAnnotatedWith(Stage1.Test.class));
            testMethods.addAll(findMethodsAnnotatedWith(ParameterizedTest.class));

            TestResult testResult = new TestResult();

            for (Method method : testMethods) {
                runTestMethod(testResult, method);
            }

            return printResult(testResult);
        }

        public static void runTestMethod(final TestResult testResult, final Method method) {
            // STAGE 3
        }
    }

}
