package de.entwicklerheld.betterplace.challenge.stage2;
import org.reflections.Reflections;
import org.reflections.scanners.MethodAnnotationsScanner;
import org.reflections.util.ClasspathHelper;
import org.reflections.util.ConfigurationBuilder;
import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URL;
import java.util.*;

public class Stage2 {

    public static class Service {

        public static int add(int... summands) {
            // STAGE 2
            return 0;
        }
    }


    public static class TestRunner {

        public static void main(String[] args) {
            runTests();
        }

        public static String runTests() {
            Set<Method> testMethods = findMethodsAnnotatedWith(Stage1.Test.class);
            de.entwicklerheld.betterplace.challenge.stage2.Stage2.TestRunner.TestResult testResult = new de.entwicklerheld.betterplace.challenge.stage2.Stage2.TestRunner.TestResult();
            for (Method method : testMethods) {
                runTestMethod(testResult, method);
            }
            return printResult(testResult);
        }

        public static Set<Method> findMethodsAnnotatedWith(Class<? extends Annotation> annotation) {
            // STAGE 2
            return new HashSet<>();
        }

        public static void runTestMethod(final de.entwicklerheld.betterplace.challenge.stage2.Stage2.TestRunner.TestResult testResult, final Method method) {
            // STAGE 2
        }

        public static String printResult(final de.entwicklerheld.betterplace.challenge.stage2.Stage2.TestRunner.TestResult testResult) {
            // STAGE 2
            return "";
        }

        public static class TestResult {

            List<String> failures;

            List<String> errors;

            List<String> successes;

            List<Method> runnedTests;

            List<Method> ignoredTests;

            public TestResult() {
                failures = new ArrayList<>();
                errors = new ArrayList<>();
                successes = new ArrayList<>();
                runnedTests = new ArrayList<>();
                ignoredTests = new ArrayList<>();
            }

            public List<String> getFailures() {
                return failures;
            }

            public List<String> getErrors() {
                return errors;
            }

            public List<String> getSuccesses() {
                return successes;
            }

            public List<Method> getRunnedTests() {
                return runnedTests;
            }

            public List<Method> getIgnoredTests() {
                return ignoredTests;
            }

        }
    }



}
