package de.entwicklerheld.betterplace.challenge.stage3;

import org.reflections.util.ClasspathHelper;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
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

            if (method.getAnnotation(Stage1.Test.class) != null) {
                Stage2.TestRunner.runTestMethod(testResult, method);
                return;
            } 
            
            ParameterizedTest parameterizedTest = method.getAnnotation(ParameterizedTest.class);

            if (parameterizedTest.ignore()) {
                testResult.getIgnoredTests().add(method);
                return;
            }

            try {
                Class<?> methodClass = method.getDeclaringClass();

                Method getParametersMethod = methodClass.getMethod(parameterizedTest.parameterProvider());
                @SuppressWarnings("unchecked") 
                List<TestParameters> testParams = (List<TestParameters>) getParametersMethod.invoke(methodClass.newInstance());

                for (TestParameters testParameter : testParams) {
                    testResult.getRunnedTests().add(method);

                    try {
                        // to enable private method to be invoked
                        method.setAccessible(true);
                        method.invoke(
                            (
                                Modifier.isStatic(method.getModifiers()) ?
                                null :
                                methodClass.newInstance()
                            ), 
                            testParameter.expectedResult, testParameter.parameters);
                    }
                    catch(InvocationTargetException e) {
                        String message = String.format(
                            "▶ %s (%s)" +
                            "\n\t✖ %s" +
                            "\n\t%s",
                            method.getName(),
                            methodClass.toString(),
                            e.getTargetException().toString(),
                            testParameter
                        );

                        if (e.getTargetException() instanceof AssertionError) {
                            testResult.getFailures().add(message);   
                        } else {
                            testResult.getErrors().add(message);
                        }
                        continue;
                    }
                    testResult.getSuccesses().add(method.getName());

                }

            }
            // catch errors caused by the test runner -> shouldn't be counted as testresult, but print a message instead
            catch(Exception e) {
                System.out.println(
                    String.format(
                        "Invoking method '%s' failed, this should not happen and is potentially a bug in the testrunner:\n\t%s", 
                        method.getName(),
                        e.toString())
                    );
            }        
        }
    }

}
