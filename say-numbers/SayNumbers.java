package de.entwicklerheld.sayNumbersJava;
import java.util.HashMap;
import java.util.ArrayList;

// first time touching java, bear with me ;-)

public class SayNumbersJava {

    /*
     * wrote a semi-solution in JavaScript offline first, now lets try "translating" it into Java syntax here
     */
    public static HashMap<String, String> onesMap = new HashMap<String, String>();
    public static HashMap<String, String> tensMap = new HashMap<String, String>();
    public static HashMap<String, String> hundredsMap = new HashMap<String, String>();
    final static int MINIMUM_NUMBER = 0;
    final static long MAXIMUM_NUMBER = 999_999_999_999L;
    private static final String[][] dict = { 
        {
            "zero",
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten",
            "eleven",
            "twelve",
            "thirteen",
            "fourteen",
            "fifteen",
            "sixteen",
            "seventeen",
            "eighteen",
            "nineteen",
        },
        {
            "",
            "",
            "twenty",
            "thirty",
            "fourty",
            "fifty",
            "sixty",
            "fifty",
            "eighty",
            "ninety"
        },
        {
            "hundred",
            "thousand",
            "million",
            "billion"
        }

    };

    private static void setMapValues() {
        onesMap.put("0", "zero");
        onesMap.put("1", "one");
        onesMap.put("2", "two");
        onesMap.put("3", "three");
        onesMap.put("4", "four");
        onesMap.put("5", "five");
        onesMap.put("6", "six");
        onesMap.put("7", "seven");
        onesMap.put("8", "eight");
        onesMap.put("9", "nine");
        onesMap.put("10", "ten");
        onesMap.put("11", "eleven");
        onesMap.put("12", "twelve");
        onesMap.put("13", "thirteen");
        onesMap.put("14", "fourteen");
        onesMap.put("15", "fifteen");
        onesMap.put("16", "sixteen");
        onesMap.put("17", "seventeen");
        onesMap.put("18", "eighteen");
        onesMap.put("19", "nineteen");


        tensMap.put("2", "twenty");
        tensMap.put("3", "thirty");
        tensMap.put("4", "fourty");
        tensMap.put("5", "fifty");
        tensMap.put("6", "sixty");
        tensMap.put("7", "fifty");
        tensMap.put("8", "eighty");
        tensMap.put("9", "ninety");


        hundredsMap.put("0", "hundred");
        hundredsMap.put("1", "thousand");
        hundredsMap.put("2", "million");
        hundredsMap.put("3", "billion");

    }


    private static ArrayList<ArrayList<Character>> splitToChunksOfThree(long number) {
        final int CHUNK_SIZE = 3;
        int j = 0;
        int arrDepth = 0;
        ArrayList<ArrayList<Character>> arr = new ArrayList<>();
        //int[][] arr = {};
        String numberStr = Long.toString(number);
        int numberLength = numberStr.length();

        for (int i = numberLength; i > 0; i--) {
            System.out.println("i: " + i);
            if (j == 3) {
                j = 0;
                arrDepth++;
                System.out.println("arrDe: " + arrDepth);
            }
            j++;

            if (arrDepth >= arr.size()) {
                arr.add(new ArrayList<>());
            }

            arr.get(arrDepth).add(numberStr.charAt(i-1));
            boolean subArrPaddingNeeded = (arr.get(arrDepth).size() < CHUNK_SIZE);

            //pad array with '0's
            if (i == 1 && subArrPaddingNeeded) {
                int paddingCount = CHUNK_SIZE - arr.get(arrDepth).size();

                for (int k = 0; k < paddingCount; k++) {
                    arr.get(arrDepth).add('0');
                }

            }

        }
        System.out.println("arr" + arr);

        return arr;
    }


    private static String getStringFromSplitArray(ArrayList<ArrayList<Character>> numbChunks) {
        System.out.println("arr in GetString" + numbChunks + " " + numbChunks.size());
        ArrayList<ArrayList<String>> strChunks = new ArrayList<>();
        for (int chunk = numbChunks.size() -1; chunk > -1; chunk--) {
            System.out.println("chunk in GetString" + chunk);

            if (chunk >= strChunks.size()) {
                strChunks.add(new ArrayList<>());
            }

            for (int numIndex = numbChunks.get(chunk).size() - 1; numIndex > -1; numIndex--) {
                Character currNumber = numbChunks.get(chunk).get(numIndex);
                Character prevNumber = numbChunks.get(chunk).get(numIndex - 1);
                System.out.println("currNumber in GetString " + currNumber);

                if (numIndex != 2 && currNumber == '0') {
                    continue;
                }

                if (numIndex == 2) {
                    String suffix = dict[2][0];
                    System.out.println(currNumber);

                    String currStr = dict[0][currNumber];
                    strChunks.get(chunk).add(suffix);
                    strChunks.get(chunk).add(currStr);

                    continue;
                }

                if (numIndex == 1) {
                    int charCombNumb = currNumber+prevNumber;
                    Boolean isInBounds = ((charCombNumb >= 0) && (charCombNumb < dict[0].length));
                    if (isInBounds) {
                        String specialNumb = dict[0][charCombNumb];
                        strChunks.get(chunk).add(specialNumb);
                        break;
                    }
                    String tysNumb = dict[1][currNumber];
                    String abc = dict[0][charCombNumb];
                    String tensNumb = (abc == "zero") ? "" : "-"+abc;
                    strChunks.get(chunk).add(tysNumb+tensNumb);
                    break;
                }

                strChunks.get(chunk).add(dict[0][currNumber]);

            }

            if (chunk != 0) {
                strChunks.get(chunk).add(dict[2][chunk]);
            }

        }
        return strChunks.toString();
    }

    // first time touching java, bear with me ;-)
    public static String say(long number) {
        setMapValues(); //find a better way than this -> it will create these values with every run, which does not sound ideal
        System.out.println("\n----number: " + number + "---------\n");

        if (number < MINIMUM_NUMBER || number > MAXIMUM_NUMBER)  {
            String errorMessage = String.format(
                "Please provide a number between %d – %d", 
                MINIMUM_NUMBER,
                MAXIMUM_NUMBER
            );
            throw new IllegalArgumentException(errorMessage);
        }

        ArrayList<ArrayList<Character>> numbChunks = splitToChunksOfThree(number);
        System.out.println("arr " + numbChunks);
        getStringFromSplitArray(numbChunks);

        return null;
    }

}