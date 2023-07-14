package de.entwicklerheld.mapsAndPolygonsJava;

import java.util.List;

public class MapService implements Drawable {
    static PolygonProvider polygonProvider = PolygonProvider.getInstance();


    public static Double calculatePolygonArea(Point[] vertices) {
        // Scenario 1
        return null;
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