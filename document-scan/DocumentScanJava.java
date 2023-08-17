package de.entwicklerheld.documentScanJava;


import java.util.ArrayList;
import java.util.TreeMap;

public class DocumentScanJava {

    // Set this to false if you want to skip the second scenario
    public static boolean hardMode = true;

    public static Address findAddress(Document document) {
        // Implement me :)
        //System.out.println(document.toSvg());
        System.out.println(document.getCharacters());
        ArrayList<Character> documentCharacters = document.getCharacters();

        TreeMap<Double, ArrayList<Character>> documentLines = new TreeMap<Double, ArrayList<Character>>();
        System.out.println(documentCharacters);
        
        //sort by Y -> correct line order
        documentCharacters.sort(
            (Character c1, Character c2) -> Double.compare(c1.getA().y(), c2.getA().y())  
        );

        System.out.println(documentCharacters);

        // Group Characters by Y value of their A Point -> same Y value = same line
        for (Character documentCharacter : documentCharacters) {
            double yVal = documentCharacter.getA().y();
            if (!documentLines.containsKey(yVal)) {
                documentLines.put(yVal, new ArrayList<Character>());
            } 
            documentLines.get(yVal).add(documentCharacter);
        }

        System.out.println(documentLines);

        ArrayList<String> documentLineText = new ArrayList<String>();
        ArrayList<ArrayList<String>> documentLineElem = new ArrayList<ArrayList<String>>();

        for (ArrayList<Character> documentLine : documentLines.values()) {
       
            // Sort characters by the X value of their A Point -> set the letters in the correct order
            documentLine.sort(
                (Character c1, Character c2) -> Double.compare(c1.getA().x(), c2.getA().x())  
            );

            String lineText = "";
            ArrayList<String> lineElem = new ArrayList<String>();
            double previousXVal = documentLine.get(0).getA().x();
            int documentLineCounter = documentLine.size() - 1;

            for (Character character : documentLine) {
                double currentXVal = character.getA().x();
                if (currentXVal - previousXVal > 3) {
                    lineElem.add(lineText);
                    lineText = "";
                }
                previousXVal = currentXVal;
                lineText += character.getCharacter();

                if (documentLineCounter-- == 0) {
                    lineElem.add(lineText);
                }

            }
            documentLineText.add(lineText);
            documentLineElem.add(lineElem);
            System.out.println(documentLineText);
        }
        System.out.println(documentLineElem.toString());
        //System.out.println(documentLines.toString());
        return getAddressFromDocumentLine(documentLineElem);

        /*
         * 
         * get all characters -> filter by characters A point -> get the y value -> all with the same y value = same row
         * sort characters of each row by A point -> sort by X value ascending
         * -> if difference between character 1 A and character 2 A is greater than 3 -> add space
         * 
         * 
         * 
         * 
         */
    }

    public static Address getAddressFromDocumentLine(ArrayList<ArrayList<String>> documentLineElem) {

        String recipient, street, houseNumber, zipCode, city;
        recipient = String.join(" ", documentLineElem.get(0));
        street = String.join(" ", documentLineElem.get(1).subList(0, documentLineElem.get(1).size() - 1));
        houseNumber = documentLineElem.get(1).get(documentLineElem.get(1).size() - 1);

        //assuming German Postal Codes for now
        zipCode = documentLineElem.get(2).remove(0);

        city = String.join(" ", documentLineElem.get(2));

        //zipCode = String.join(" ", documentLineElem.get(2).subList(0, documentLineElem.get(2).size() - 1));
        //city = documentLineElem.get(2).get(documentLineElem.get(2).size() - 1);

        System.out.println(recipient + " | " + street + " | " + houseNumber + " | " + zipCode + " | " + city);
        return new Address(recipient, street, houseNumber, zipCode, city);
    }

    //feels wrong to have that in this class, but I cannot edit any of the other classes, so...
    public static void sortCharactersBy(ArrayList<Character> documentCharacters, String axis) {

        documentCharacters.sort(
            (Character c1, Character c2) -> Double.compare(c1.getA().y(), c2.getA().y())  
        );

    }

}
