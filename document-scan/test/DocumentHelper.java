package de.entwicklerheld.documentScanJava;

import java.util.ArrayList;
import java.util.Collections;

public class DocumentHelper {
      public static Document addTextToDocument(String text, Document document, double offsetX, double offsetY) {
          ArrayList<Character> characters = document.getCharacters();
          double originalXOffset = offsetX;
          int charWidth = 2;
          int charHeight = 3;
          int spacing = 1;
  
          for (int i = 0; i < text.length(); i++) {
              char character = text.charAt(i);
              if (character == ' ') {
                  offsetX += charWidth + spacing;
                  continue;
            }
            if (character == '\\n') {
                  offsetX = originalXOffset;
                  offsetY += charHeight + spacing;
                  continue;
            }

            Point a = new Point(offsetX, offsetY);
            Point b = new Point(offsetX + charWidth, offsetY);
            Point c = new Point(offsetX, offsetY + charHeight);
            Point d = new Point(offsetX + charWidth, offsetY + charHeight);

            characters.add(new Character(character, a, b, c, d));
            offsetX += charWidth + spacing;
        }
        return new Document(characters);
    }

    public static Document addTextToDocument(String text, Document document, double offsetX, double offsetY, double angle) {
          ArrayList<Character> characters = new ArrayList<>(document.getCharacters());
  
          double originalXOffset = offsetX;
          double lineYOffset = offsetY;
          int charWidth = 2;
          int charHeight = 3;
          int spacing = 1;
  
          double radianAngle = Math.toRadians(angle);
          double deltaX = (charWidth + spacing) * Math.cos(radianAngle);
          double deltaY = (charWidth + spacing) * Math.sin(radianAngle);
          for (int i = 0; i < text.length(); i++) {
              char character = text.charAt(i);
  
  
              if (character == '\\n') {
                  offsetX = originalXOffset;
                  lineYOffset += charHeight + spacing;
                  offsetY = lineYOffset;
                  continue;
            }

            Point a = new Point(offsetX, offsetY);
            Point b = new Point(offsetX + charWidth, offsetY);
            Point c = new Point(offsetX, offsetY + charHeight);
            Point d = new Point(offsetX + charWidth, offsetY + charHeight);

            offsetX += deltaX;
            offsetY += deltaY;
            if (character == ' ') {
                  continue;
            }
            characters.add(new Character(character, a, b, c, d));
        }
        Collections.shuffle(characters);
        return new Document(characters);
    }

}
"