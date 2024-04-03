package de.entwicklerheld.primeTestJava;
import java.lang.Math; 


public class PrimeTestJava {
    public static boolean testPrimeNumber(int number) {

        if (number <= 1) {
            return false;
        }

        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;

    }
}
