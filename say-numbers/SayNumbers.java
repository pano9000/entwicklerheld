package de.entwicklerheld.sayNumbersJava;
import java.util.ArrayList;

public class SayNumbersJava {
    
    private static final int MINIMUM_NUMBER = 0;
    private static final long MAXIMUM_NUMBER = 999_999_999_999L;

    private static final String[][] dict = { 
        {
            "zero",
            "one", "two", "three", "four", "five",
            "six", "seven", "eight", "nine", "ten",
            "eleven", "twelve", "thirteen", "fourteen", "fifteen", 
            "sixteen", "seventeen", "eighteen", "nineteen",
        },
        {
            "", "",
            "twenty", "thirty", "forty", "fifty",
            "sixty", "fifty", "eighty", "ninety"
        },
        {
            "hundred", "thousand", "million", "billion"
        }
    };


    public static String say(long number) {

        if (number < MINIMUM_NUMBER || number > MAXIMUM_NUMBER)  {
            String errorMessage = String.format(
                "Please provide a number between %d – %d", 
                MINIMUM_NUMBER,
                MAXIMUM_NUMBER
            );
            throw new IllegalArgumentException(errorMessage);
        }

        return chunksToString( numberToChunks(number) );
    }

    /**
     * Create an ArrayList that contains an ArrayList of Integers, split into block of three, from the supplied number.
     * E.g. something like the following [ [1, 2, 3], [1, 0, 0] ] for the number 1123
     * @param number
     * @return ArrayList<ArrayList<Integer>>
     */
    private static ArrayList<ArrayList<Integer>> numberToChunks(long number) {
        String numberStr = Long.toString(number);
        int numberLength = numberStr.length();            
        ArrayList<ArrayList<Integer>> chunks = new ArrayList<>();
        final int MAX_CHUNK_SIZE = 3;

        int currentChunkSize = 0;
        int chunksDepth = 0;

        for (int i = numberLength - 1; i >= 0; i--) {

            if (currentChunkSize == MAX_CHUNK_SIZE) {
                chunksDepth++;
                currentChunkSize = 0;
            }
            currentChunkSize++;

            if (chunksDepth >= chunks.size()) {
                chunks.add(new ArrayList<>());
            }

            ArrayList<Integer> currentChunk = chunks.get(chunksDepth);
            Integer currentNumber = Character.getNumericValue(numberStr.charAt(i));
            currentChunk.add(currentNumber);

            //pad array with '0's, if necessary
            if (i == 0) {
                if (currentChunk.size() < MAX_CHUNK_SIZE) {
                    int paddingCount = MAX_CHUNK_SIZE - currentChunk.size();
    
                    for (int j = 0; j < paddingCount; j++) {
                        currentChunk.add(0);
                    }
                }
            }

        }
        return chunks;
    }

    private static String chunksToString(ArrayList<ArrayList<Integer>> chunks) {
        
        ArrayList<String> strArr = new ArrayList<>();

        for (int chunkDepth = chunks.size() - 1; chunkDepth >= 0; chunkDepth--) {
            
            // special handling for 0 - "zero"
            if (chunks.size() == 1 && isChunkAllZeroes(chunks.get(0))) {
                strArr.add(dict[0][0]);
                break;
            }

            // get String of chunk
            strArr.add(
                String.join(" ", chunkToStringArray(chunks.get(chunkDepth)))
            );

            // add "thousand" / "million" / etc. suffix if required, depeding on on "chunkDepth"
            if (chunkDepth != 0 && !isChunkAllZeroes(chunks.get(chunkDepth))) {
                strArr.add(dict[2][chunkDepth]);
            }

        }

        return String.join(" ", strArr).trim();
    }

    private static ArrayList<String> chunkToStringArray(ArrayList<Integer> chunk) {
        ArrayList<String> result = new ArrayList<>();

        // add "hundred" to string, if required, then continue
        if (chunk.get(2) != 0) {
            result.add(dict[0][chunk.get(2)]);
            result.add(dict[2][0]); //adds "hundred" to string            
        }

        if (chunk.get(1) == 1) {
            int concatNumber = Integer.parseInt( "" + chunk.get(1) + chunk.get(0) );
            Boolean isInBounds = ((concatNumber >= 0) && (concatNumber < dict[0].length));
            if (isInBounds) {
                String concatNumberStr = dict[0][concatNumber];
                result.add(concatNumberStr);
                return result;
            }
        }

        if (chunk.get(1) != 0) {
            String str = dict[1][chunk.get(1)];

            if (chunk.get(0) != 0) {
                str += "-" + dict[0][chunk.get(0)];
            }
            result.add(str);
            return result;
        }

        if (chunk.get(0) != 0) {
            result.add(dict[0][chunk.get(0)]);
            return result;
        }

        return result;
    }

    private static Boolean isChunkAllZeroes(ArrayList<Integer> intChunk) {
        for (int i = 0; i < intChunk.size(); i++) {
          if (intChunk.get(i) != 0) return false;
        }
        return true;
    }

}