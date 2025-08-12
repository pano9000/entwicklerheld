package de.entwicklerheld.bulpSwitcher;


public class BulpSwitcher {
    public static BulbResult simulate(int numberOfBulbs) {

        // Initialize Array and perform "Round #1"
        boolean[] bulbStates = new boolean[numberOfBulbs];
        for (int i = 0; i < bulbStates.length; i++) {
            bulbStates[i] = true;
        }

        // Remaining rounds
        for (int round = 2; round <= numberOfBulbs; round++) {

            for (int bulbIdx = 0; bulbIdx < bulbStates.length; bulbIdx++) {

                // offset by one, since bulb count does not start at 0, but 1
                if ((bulbIdx + 1) % round == 0) {
                    bulbStates[bulbIdx] = !bulbStates[bulbIdx];
                }

            }

        }

        return new BulbResult(
            BulpSwitcher.getBinaryStateString(bulbStates), 
            BulpSwitcher.getOnCount(bulbStates)
        );

    }

    private static int getOnCount(boolean[] bulbStates) {

        int bulbOnCount = 0;
        for (boolean bulbState : bulbStates) {
            if (bulbState) {
                bulbOnCount++;
            }
        }

        return bulbOnCount;

    }

    private static String getBinaryStateString(boolean[] bulbStates) {

        StringBuilder binaryStateString = new StringBuilder();

        for (boolean bulbState : bulbStates) {
            String currentState = bulbState ? "1" : "0";
            binaryStateString.append(currentState);

        }

        return binaryStateString.toString();

    }
}