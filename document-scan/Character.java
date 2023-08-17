package de.entwicklerheld.documentScanJava;

public class Character {
    private final char character;
    private final Point a;
    private final Point b;
    private final Point c;
    private final Point d;

    public Character(char character, Point a, Point b, Point c, Point d) {
        this.character = character;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    public char getCharacter() {
        return character;
    }

    public Point getA() {
        return a;
    }

    public Point getB() {
        return b;
    }

    public Point getC() {
        return c;
    }

    public Point getD() {
        return d;
    }

    public String toString() {
        return character + " (" + a.x() + " | " + a.y() + ")" + " (" + b.x() + " | " + b.y() + ")" + " (" + c.x() + " | " + c.y() + ")" + " (" + d.x() + " | " + d.y() + ")" + "\n";
    }

    public String toSvg() {
        return "<polygon points=\"" + a.x()*10 + "," + a.y()*10 + " " + b.x()*10 + "," + b.y()*10 + " " + d.x()*10 + "," + d.y()*10 + " " + c.x()*10 + "," + c.y()*10 + "\" style=\"fill:#c8c8d3;\" /><text  x=\"" + (a.x()*10 + 5) + "\" y=\"" + (a.y()*10 + 20) + "\">"+this.character +"</text>";
    }
}
