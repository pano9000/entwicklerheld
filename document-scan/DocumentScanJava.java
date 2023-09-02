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

        //assuming the recognized characters are all in the same width/height
        double charWidth = documentCharacters.get(0).getB().x() - documentCharacters.get(0).getA().x();
        double charHeight = documentCharacters.get(0).getC().y() - documentCharacters.get(0).getA().y();

        Double charSpacingVertical = 
            documentCharColumns.get(documentCharColumns.firstKey()).get(1).getA().y()
            -documentCharColumns.get(documentCharColumns.firstKey()).get(0).getC().y();

        ArrayList<Double> columnKeys = new ArrayList<Double>(documentCharColumns.keySet());

        Double charSpacingHorizontal = 
            documentCharColumns.get(columnKeys.get(1)).get(0).getA().x()
            -documentCharColumns.get(columnKeys.get(0)).get(0).getB().x();
 
        SkewDirection skewDirection = getSkewDirection(documentCharColumns);
        
        Double charAndSpacingHeight = charHeight + charSpacingVertical;
        int charAndSpacingWidth = (int) ((charWidth+charSpacingHorizontal) * 100);
        Double heightComp = (skewDirection == SkewDirection.UP) ? charAndSpacingHeight * -1 : charAndSpacingHeight;

        ArrayList<String> documentRows = new ArrayList<String>();

        for (Character startingChar : documentCharColumns.get(documentCharColumns.firstKey())) {
            String currentRowStr = String.valueOf(startingChar.getCharacter());
            Double currentY = startingChar.getA().y();
            Double currentX = startingChar.getA().x();
            Iterator<Double> keySet = documentCharColumns.keySet().iterator();

            //skip first column
            if (keySet.hasNext()) keySet.next(); 

            while (keySet.hasNext()) {
                Double currInd = keySet.next();
                ArrayList<Character> charColumn = documentCharColumns.get(currInd);
                
                for (int i = 0; i < charColumn.size(); i++) {
                    Character currentChar = charColumn.get(i);
                    Double nextY = currentChar.getA().y();
                    Double nextX = currentChar.getA().x();
                    Boolean comparer = 
                        (skewDirection == SkewDirection.UP) 
                        ? (nextY <= currentY && nextY > currentY + heightComp)
                        : (nextY >= currentY && nextY < currentY + heightComp && (nextX - currentX) < 7.0); //TODO do not hardcode

                    if (comparer) {

                        // detection if space between characters needed
                        int distanceNextCurrCharX = (int) ((nextX - currentX) * 100);
                        if (distanceNextCurrCharX > charAndSpacingWidth) {
                            currentRowStr += " ";
                        }

                        currentRowStr += String.valueOf(currentChar.getCharacter());
                        currentY = nextY;
                        currentX = nextX;
                        break;
                    }
                }
            }

            documentRows.add(currentRowStr);
        };

        return getAddressFromDocumentRows(documentRows);
        
    }

    private static Address getAddressFromDocumentRows(ArrayList<String> documentRows) {
        String recipient, street, houseNumber, zipCode, city;
        recipient = documentRows.get(0);

        ArrayList<String> streetHouse = new ArrayList<String>(Arrays.asList(documentRows.get(1).split(" ")));
        houseNumber = (streetHouse.size() > 1) ? streetHouse.remove(streetHouse.size()-1) : "";
        street = String.join(" ", streetHouse);

        //assuming German Postal Codes for now
        ArrayList<String> zipCity = new ArrayList<String>(Arrays.asList(documentRows.get(2).split(" ")));
        zipCode = (zipCity.size() > 1) ? zipCity.remove(0) : ""; //streetHouse.remove(last);
        city = String.join(" ", zipCity);

        return new Address(recipient, street, houseNumber, zipCode, city);
    }


    private static SkewDirection getSkewDirection(TreeMap<Double, ArrayList<Character>> documentCharColumns) {
        
        //TODO: if the first line consists of only one letter, or a letter followed by a space this will cause bugs
        ArrayList<Double> columnKeys = new ArrayList<Double>(documentCharColumns.keySet());
        //TODO: check for out of bounds
        Character firstC = documentCharColumns.get(columnKeys.get(0)).get(0);
        Character secondC = documentCharColumns.get(columnKeys.get(1)).get(0);
        return ((firstC.getA().y() - secondC.getA().y()) > 0) ? SkewDirection.UP : SkewDirection.DOWN_NONE; 

    }

}
