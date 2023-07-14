package de.entwicklerheld.mapsAndPolygonsJava;

import java.util.List;

public class MapService implements Drawable {
    static PolygonProvider polygonProvider = PolygonProvider.getInstance();


    public static Double calculatePolygonArea(Point[] vertices) {
        // calculating the area of an irregular polygon with the shoelace algorithm
        // multiply the y coordinate of each row with the x coordinate in the row below
        // multiply the x coordinate of each row with the y coordinate in the row below
        // subtract second sum from first, absolute value, then divide result by 2 -> area
        
        double sum1 = 0, sum2 = 0;
        for (int i = 0; i <= vertices.length-1; i++) {
            int nextIndex = (i != vertices.length-1) ? i+1 : 0;
            sum1 += vertices[i].y() * vertices[nextIndex].x();
            sum2 += vertices[i].x() * vertices[nextIndex].y();
        }

        return Math.abs(sum2 - sum1) / 2;
    }

    public static void calculateAndSetLabelsForPolygons(List<String> labelNames) {
        // Scenario 2
        int i = 0;
        for (Polygon polygon: polygonProvider.getPolygons()) {
            polygon.setLabel(new Label(new Point(0, 0), labelNames.get(i)));
            i++;
        }
    }
}