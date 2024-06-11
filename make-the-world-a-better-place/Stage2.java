package de.entwicklerheld.betterplace.challenge.stage2;
import org.reflections.Reflections;
import org.reflections.scanners.MethodAnnotationsScanner;
import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.lang.IllegalArgumentException;
import java.util.*;
public class Stage2 {

    public static class Service {

        public static int add(int... summands) {

            if (summands.length < 1) {
                throw new IllegalArgumentException("Input is required!");
            }

            int sum = 0;
            for (int summand : summands) {
                sum += summand;
            }
            return sum;
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
            //https://www.baeldung.com/reflections-library
            Reflections reflections = new Reflections(new MethodAnnotationsScanner());
            return reflections.getMethodsAnnotatedWith(annotation);

        }

        public static void runTestMethod(final de.entwicklerheld.betterplace.challenge.stage2.Stage2.TestRunner.TestResult testResult, final Method method) {

            Class<?> methodClass = method.getDeclaringClass();

            try {
                Stage1.Test test = method.getAnnotation(Stage1.Test.class);

                if (test.ignore()) {
                    testResult.ignoredTests.add(method);
                    return;
                }
                
                // to enable private method to be invoked
                method.setAccessible(true);

                testResult.runnedTests.add(method);

                //handle static and instance methods
                method.invoke(
                    Modifier.isStatic(method.getModifiers()) ? 
                    null : 
                    methodClass.newInstance()
                );

                testResult.successes.add(method.getName());
            }
            // catch errors caused by the invoked method
            catch(InvocationTargetException e) {
                
                String message = String.format(
                    "▶ %s (%s)" +
                    "\n\t✖ %s",
                    method.getName(),
                    methodClass.toString(),
                    e.getTargetException().toString()
                );

                if (e.getTargetException() instanceof AssertionError) {
                    testResult.failures.add(message);   
                } else {
                    testResult.errors.add(message);
                }

            }
            // catch errors caused by the test runner -> shouldn't be counted as testresult, but print a message instead
            catch(Exception e) {
                System.out.println(String.format("Invoking method '%s' failed, this should not happen and is potentially a bug in the testrunner", method.getName()));
            }

        }

        public static String printResult(final de.entwicklerheld.betterplace.challenge.stage2.Stage2.TestRunner.TestResult testResult) {
            String resultOutput = "";
            
            for (String failure : testResult.failures) {
                System.out.println(failure);
                resultOutput += failure + "\n";
            }

            for (String error : testResult.errors) {
                System.out.println(error);
                resultOutput += error + "\n";
            }

            resultOutput += String.format(
                "%d test(s) finished without errors.\n" +
                "%d test(s) were ignored.\n" +
                "%d test(s) failed.\n" +
                "%d test(s) threw an exception.\n",
                testResult.getSuccesses().size(),
                testResult.getIgnoredTests().size(),
                testResult.getFailures().size(),
                testResult.getErrors().size()
            );
            System.out.println(resultOutput);
            return resultOutput;
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
