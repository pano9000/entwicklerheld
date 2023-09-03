package de.entwicklerheld.documentScanJava;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.TreeMap;

public class DocumentScanJava {

    // Set this to false if you want to skip the second scenario
    public static boolean hardMode = true;

    private static enum SkewDirection {
        UP,
        DOWN_NONE,
    };

    public static Address findAddress(Document document) {
        TreeMap<Double, ArrayList<Character>> documentCharColumns = getDocumentCharColumns(document);
        validateDocumentCharColumns(documentCharColumns);
        SkewDirection skewDirection = getSkewDirection(documentCharColumns);
        int[] charAndSpacingValues = getCharAndSpacingValues(documentCharColumns);
        ArrayList<String> documentRowsStrings = getDocumentRowsStrings(charAndSpacingValues, skewDirection, documentCharColumns);

        return getAddressFromDocumentRowsStrings(documentRowsStrings);
        
    }

    private static TreeMap<Double, ArrayList<Character>> getDocumentCharColumns(Document document) {
        ArrayList<Character> documentCharacters = document.getCharacters();
        TreeMap<Double, ArrayList<Character>> documentCharColumns = new TreeMap<Double, ArrayList<Character>>();

        // a bit simplified approach:
        // Group Characters by X value of their A Point -> same X value = same horizontal line
        // in reality the skewed text would mean that the X values will be skewed as well,
        // so this grouping would not work likely without some additional work
        for (Character documentCharacter : documentCharacters) {
            double xVal = documentCharacter.getA().x();
            if (!documentCharColumns.containsKey(xVal)) {
                documentCharColumns.put(xVal, new ArrayList<Character>());
            } 
            documentCharColumns.get(xVal).add(documentCharacter);
        }

        //sort each Character in Column by Y -> to get correct line order
        for (ArrayList<Character> documentCharColumn : documentCharColumns.values()) {
            documentCharColumn.sort(
                (Character c1, Character c2) -> Double.compare(c1.getA().y(), c2.getA().y())  
            );
        }

        return documentCharColumns;

    }

    private static void validateDocumentCharColumns(TreeMap<Double, ArrayList<Character>> documentCharColumns) {
        int rowCount = documentCharColumns.firstEntry().getValue().size();
        //assuming addresses need to have minimun 3 rows: Name, Address, postal code/City
        if (rowCount < 3) {
            throw new Error("Invalid/Incomplete Address supplied. Expected 3 Rows, but only found " + rowCount + ". Aborting.");
        };
    }

    private static SkewDirection getSkewDirection(TreeMap<Double, ArrayList<Character>> documentCharColumns) {
        
        //TODO: if the first line consists of only one letter, or a letter followed by a space this will cause bugs
        ArrayList<Double> columnKeys = new ArrayList<Double>(documentCharColumns.keySet());

        Character firstC = documentCharColumns.get(columnKeys.get(0)).get(0);
        Character secondC = documentCharColumns.get(columnKeys.get(1)).get(0);
    
        return ((firstC.getA().y() - secondC.getA().y()) > 0) ? SkewDirection.UP : SkewDirection.DOWN_NONE; 
    }

    private static int[] getCharAndSpacingValues (TreeMap<Double, ArrayList<Character>>  documentCharColumns) {

        ArrayList<Double> columnKeys = new ArrayList<Double>(documentCharColumns.keySet());

        ArrayList<Character> firstCharColumn = documentCharColumns.get(columnKeys.get(0));
        Character firstCharacter = firstCharColumn.get(0);

        //assuming the recognized characters are all in the same width/height
        //TODO: if the first line consists of only one letter, or a letter followed by a space this will cause bugs

        Double charWidth = 
            firstCharacter.getB().x() 
            - firstCharacter.getA().x();

        Double charHeight = 
            firstCharacter.getC().y()
            - firstCharacter.getA().y();

        Double charSpacingX = 
            documentCharColumns.get(columnKeys.get(1)).get(0).getA().x()
            - firstCharacter.getB().x();

        Double charSpacingY = 
            firstCharColumn.get(1).getA().y()
            - firstCharacter.getC().y();

        // round to 2 digits and truncate
        int charAndSpacingHeight = (int) ((charHeight + charSpacingY) * 100);
        int charAndSpacingWidth = (int) ((charWidth+charSpacingX) * 100);

        return new int[] {charAndSpacingHeight, charAndSpacingWidth};

    }

    private static ArrayList<String> getDocumentRowsStrings(
        int[] charAndSpacingValues, 
        SkewDirection skewDirection,
        TreeMap<Double, ArrayList<Character>> documentCharColumns
    ) {

        int charAndSpacingHeight = charAndSpacingValues[0];
        int charAndSpacingWidth = charAndSpacingValues[1];
        int heightComp = (skewDirection == SkewDirection.UP) ? charAndSpacingHeight * -1 : charAndSpacingHeight;

        ArrayList<String> documentRowsStrings = new ArrayList<String>();

        for (Character startingChar : documentCharColumns.get(documentCharColumns.firstKey())) {
            String currentRowStr = String.valueOf(startingChar.getCharacter());
            int currentY = (int) (startingChar.getA().y() * 100);
            int currentX = (int) (startingChar.getA().x() * 100);
            Iterator<Double> keySet = documentCharColumns.keySet().iterator();

            //skip first column
            if (keySet.hasNext()) keySet.next(); 

            while (keySet.hasNext()) {
                Double currInd = keySet.next();
                ArrayList<Character> charColumn = documentCharColumns.get(currInd);
                
                for (int i = 0; i < charColumn.size(); i++) {
                    Character currentChar = charColumn.get(i);
                    int nextY = (int) (currentChar.getA().y() * 100);
                    int nextX = (int) (currentChar.getA().x() * 100);

                    int xDistanceNextToCurrChar = (nextX - currentX);
                    Boolean isMaxOneSpaceAway  = (xDistanceNextToCurrChar <= ((charAndSpacingWidth * 2) + Math.floor(charAndSpacingWidth*0.1)));
                
                    Boolean isCharacterInRow = (skewDirection == SkewDirection.UP) 
                        ? (
                            nextY <= currentY 
                            && nextY > currentY + heightComp 
                            && isMaxOneSpaceAway
                        )
                        : (
                            nextY >= currentY 
                            && nextY < currentY + heightComp 
                            && isMaxOneSpaceAway
                        );


                    if (isCharacterInRow) {

                        // detection if space between characters needed
                        Boolean spaceDetected = (xDistanceNextToCurrChar - charAndSpacingWidth) >= charAndSpacingWidth;

                        if (spaceDetected) {
                            currentRowStr += " ";
                        }

                        currentRowStr += String.valueOf(currentChar.getCharacter());
                        currentY = nextY;
                        currentX = nextX;
                        break;
                    }
                }
            }

            documentRowsStrings.add(currentRowStr);
        };

        return documentRowsStrings;

    }


    private static Address getAddressFromDocumentRowsStrings(ArrayList<String> documentRowsStrings) {
        System.out.println("doc" + documentRowsStrings);
        String recipient, street, houseNumber, zipCode, city;
        recipient = documentRowsStrings.get(0);

        ArrayList<String> streetHouse = new ArrayList<String>(Arrays.asList(documentRowsStrings.get(1).split(" ")));
        houseNumber = (streetHouse.size() > 1) ? streetHouse.remove(streetHouse.size()-1) : "";
        street = String.join(" ", streetHouse);

        //assuming German Postal Codes for now
        ArrayList<String> zipCity = new ArrayList<String>(Arrays.asList(documentRowsStrings.get(2).split(" ")));
        zipCode = (zipCity.size() > 1) ? zipCity.remove(0) : ""; //streetHouse.remove(last);
        city = String.join(" ", zipCity);

        return new Address(recipient, street, houseNumber, zipCode, city);
    }


}
