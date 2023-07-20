package de.entwicklerheld.mapsAndPolygonsJava;

public record Point(int x, int y) {

    public String toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}
