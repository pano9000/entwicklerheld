package de.entwicklerheld.documentScanJava;

import java.util.ArrayList;

public class Document {
    private final ArrayList<Character> characters;

    public Document(ArrayList<Character> characters) {
        this.characters = characters;
    }
    public Document() {
        this.characters = new ArrayList<>();
    }

    public ArrayList<Character> getCharacters() {
        return characters;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Document: \n");
        for (Character character : characters) {
            sb.append(character.toString());
        }
        return sb.toString();
    }

    public String toSvg() {
        StringBuilder sb = new StringBuilder();
        String style = """
                 <style>
                    text {
                      font: 20px "Source Code Pro", monospace;
                    }
                  </style>
                """;
        sb.append("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1300\" height=\"500\" viewBox=\"0 0 1300 500\" style=\"background-color:#fafafa; margin:10px;\"> ");
        sb.append(style);
        for (Character character : characters) {
            sb.append(character.toSvg());
        }
        sb.append("</svg>");
        return sb.toString();
    }
}
