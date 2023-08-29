package de.entwicklerheld.documentScanJava;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.TreeMap;

public class DocumentScanJava {

    // Set this to false if you want to skip the second scenario
    public static boolean hardMode = true;

    public static Address findAddress(Document document) {
        ArrayList<Character> documentCharacters = document.getCharacters();

        TreeMap<Double, ArrayList<Character>> documentCharColumns = new TreeMap<Double, ArrayList<Character>>();
        TreeMap<Double, ArrayList<Character>> documentCharRows = new TreeMap<Double, ArrayList<Character>>();

        documentCharacters.sort(
            (Character c1, Character c2) -> Double.compare(c1.getA().x(), c2.getA().x())  
        );

        // Group Characters by X value of their A Point -> same X value = same horizontal line
        for (Character documentCharacter : documentCharacters) {
            double xVal = documentCharacter.getA().x();
            if (!documentCharColumns.containsKey(xVal)) {
                documentCharColumns.put(xVal, new ArrayList<Character>());
            } 
            documentCharColumns.get(xVal).add(documentCharacter);
        }

        double minYVal = 999999.9; //TODO fix -> find a better way than that
        double maxYVal = 0.0; //TODO fix -> find a better way than that
        double minXVal = 999999.9;
        double maxXVal = 0.0;

        //assuming the characters are all recognized in the same width/height
        double charWidth = documentCharacters.get(0).getB().x() - documentCharacters.get(0).getA().x();
        double charHeight = documentCharacters.get(0).getC().y() - documentCharacters.get(0).getA().y();
        System.out.println(charWidth + "//" + charHeight);

        for (ArrayList<Character> documentCharColumn : documentCharColumns.values()) {

            //sort each Character in Column by Y -> correct line order
            documentCharColumn.sort(
                (Character c1, Character c2) -> Double.compare(
                    c1.getA().y(), 
                    c2.getA().y()
                    )  
            );
        }

        ArrayList<String> documentRows = new ArrayList<String>();

        ArrayList<Double> docCharColKeys = new ArrayList<Double>(documentCharColumns.keySet());
        
        Character firstC = documentCharColumns.get(docCharColKeys.get(0)).get(0);
        Character secondC = documentCharColumns.get(docCharColKeys.get(1)).get(0);
        Boolean goesUp = ((firstC.getA().y() - secondC.getA().y()) > 0) ? true : false; 
        System.out.println(goesUp + " // " + firstC + " // " + secondC + " // " + (firstC.getA().y() - secondC.getA().y()));
        Double heightComp = (goesUp) ? -4.0 : 4.0;
        for (Character startingChar : documentCharColumns.get(documentCharColumns.firstKey())) {
            String currentRowStr = String.valueOf(startingChar.getCharacter());
            Double currentY = startingChar.getA().y();
            Double currentX = startingChar.getA().x();
            Iterator<Double> keySet = documentCharColumns.keySet().iterator();
            if (keySet.hasNext()) {
                keySet.next(); //skip first column
            }
            while (keySet.hasNext()) {
                Double currInd = keySet.next();
                ArrayList<Character> abc = documentCharColumns.get(currInd);
                
                for (int i = 0; i < abc.size(); i++) {
                    Double nextY = abc.get(i).getA().y();
                    Double nextX = abc.get(i).getA().x();

                    if (goesUp) {
                        if (nextY <= currentY && nextY > currentY + heightComp) {

                            if (Double.compare((nextX - currentX), 3.0) > 0) {
                                //space detection
                                currentRowStr += " ";
                            }
                            currentRowStr += String.valueOf(abc.get(i).getCharacter());
                            currentY = nextY;
                            currentX = nextX;
                            break;
                        }

                    } else {

                        if (nextY >= currentY && nextY < currentY + heightComp && (nextX - currentX) < 7) {

                            if (Double.compare((nextX - currentX), 3.0) > 0) {
                                //space detection
                                currentRowStr += " ";
                            }
                            currentRowStr += String.valueOf(abc.get(i).getCharacter());
                            currentY = nextY;
                            currentX = nextX;
                            break;
                        }

                    }

                }
                
            }
            documentRows.add(currentRowStr);


        };
                      System.out.println("------aa\n\n"+ documentRows +" \n\n");

        return getAddressFromDocumentLine(documentRows);
        
    }

    public static Address getAddressFromDocumentLine(ArrayList<String> documentLineElem) {

        String recipient, street, houseNumber, zipCode, city;

        recipient = documentLineElem.get(0);

        ArrayList<String> streetHouse = new ArrayList<String>(Arrays.asList(documentLineElem.get(1).split(" ")));
        houseNumber = (streetHouse.size() > 1) ? streetHouse.remove(streetHouse.size()-1) : ""; //streetHouse.remove(last);
        street = String.join(" ", streetHouse);

        //assuming German Postal Codes for now
        ArrayList<String> zipCity = new ArrayList<String>(Arrays.asList(documentLineElem.get(2).split(" ")));
        zipCode = (zipCity.size() > 1) ? zipCity.remove(0) : ""; //streetHouse.remove(last);
        city = String.join(" ", zipCity);

        return new Address(recipient, street, houseNumber, zipCode, city);
    }

    //feels wrong to have that in this class, but I cannot edit any of the other classes, so...
    public static void sortCharactersBy(ArrayList<Character> documentCharacters, String axis) {

        documentCharacters.sort(
            (Character c1, Character c2) -> Double.compare(c1.getA().y(), c2.getA().y())  
        );

    }

}


/*
 * 
 */