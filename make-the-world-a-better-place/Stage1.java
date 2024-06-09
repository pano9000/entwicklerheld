package de.entwicklerheld.betterplace.challenge.stage1;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

class Stage1 {

    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.METHOD)
    @interface Test{
        boolean ignore() default false;
    }
    public static class Assert {

        public static void assertEquals(final Object expected, final Object actual, final String message) {

            if (!(expected == actual || (expected != null && expected.equals(actual)))) {

                throw new AssertionError(
                    String.format("%s. Expected: %s, but got: %s",
                        message,
                        expected,
                        actual
                    )
                );
            }
            
        }

        public static void fail(final String message) {
            throw new AssertionError(message);
        }

    }

}
