package de.entwicklerheld.mapsAndPolygonsJava;

import java.util.List;

public class MapService implements Drawable {
    static PolygonProvider polygonProvider = PolygonProvider.getInstance();
    
    // these shouldn't be constant in production I guess
    static final int MAP_WIDTH = 400;
    static final int MAP_HEIGHT = 300;

    //dynamic padding depending on font size
    static private final int PADDING = (int) ((Label.getFontSize() / 100.0f) * 25);
    static private final int FONTSIZE_AND_PADDING = (int) (Label.getFontSize() + PADDING);


    // calculating the area of an irregular polygon with the shoelace algorithm
    public static Double calculatePolygonArea(Point[] vertices) {

        double sum1 = 0, sum2 = 0;
        for (int i = 0; i <= vertices.length-1; i++) {
            int nextIndex = (i != vertices.length-1) ? i+1 : 0;
            sum1 += vertices[i].y() * vertices[nextIndex].x();
            sum2 += vertices[i].x() * vertices[nextIndex].y();
        }

        return Math.abs(sum2 - sum1) / 2;
    }

    public static void calculateAndSetLabelsForPolygons(List<String> labelNames) {

        int i = 0;
        for (Polygon polygon: polygonProvider.getPolygons()) {

            Label label = getOptimalLabel(polygon, labelNames.get(i));

            if (label == null) {
                // set some default "less-optimal value", e.g. centering it anyways
                label = getCenteredLabel(polygon, labelNames.get(i));
            }

            polygon.setLabel(label);
            i++;
        }
    }

    // inspired by http://www.jeffreythompson.org/collision-detection/poly-rect.php
    /**
     * 
     * @param lineAs Point Line A Start
     * @param lineAe Point Line A End
     * @param lineBs Point Line B Start
     * @param lineBe Point Line B End 
     * @return
     */
    private static Boolean isLinesColliding(Point lineAs, Point lineAe, Point lineBs, Point lineBe) {

        float numerator1 = (
            (lineBe.x() - lineBs.x()) * (lineAs.y() - lineBs.y())
            - (lineBe.y() - lineBs.y()) * (lineAs.x() - lineBs.x())
        );

        float numerator2 = (
            (lineAe.x() - lineAs.x()) * (lineAs.y() - lineBs.y())
            - (lineAe.y() - lineAs.y()) * (lineAs.x() - lineBs.x())
        );

        float denominator = (
            (lineBe.y() - lineBs.y()) * (lineAe.x() - lineAs.x())
            - (lineBe.x() - lineBs.x()) * (lineAe.y() - lineAs.y())
        );

        float u1 = numerator1 / denominator;
        float u2 = numerator2 / denominator;

        if (u1 >= 0 
            && u1 <= 1 
            && u2 >= 0 
            && u2 <= 1) {
            return true;
        }

        return false;
    }

    private static Boolean isLabelColliding(Label label, Point lineStart, Point lineEnd) {
        Point[][] labelSides = { 
            {label.getTopLeft(), label.getBottomLeft()},
            {label.getBottomLeft(), label.getBottomRight()},
            {label.getBottomRight(), label.getTopRight()},
            {label.getTopRight(), label.getTopLeft()},
        };

        for (Point[] labelSide : labelSides) {
            if (isLinesColliding(lineStart, lineEnd, labelSide[0], labelSide[1])) {
                return true;
            };
        }
    
        return false;
    }

    private static Boolean isLabelOutsideMap(Label label, int mapWidth, int mapHeight) {
        // some of these checks might be  overkill, as this is a rectangle, where e.g. top and bottom x are *always* the same, 
        // if there is no bug in Label class
        for (Point labelPoint : label.getBoundingBox()) {
            int x = labelPoint.x(), y = labelPoint.y();
            if (x < 0 
                || x > mapWidth 
                || y < 0 
                || y > mapHeight) { 
                return true;
            }
        }
        return false;       
    }


    private static Label getOptimalLabel(Polygon polygon, String labelName ) {

        Point[] currentVertices = polygon.getVertices();

        // loop through all vertices of the polygon, 
        // create a temporary label with same positions as the currentVertex (+ some padding)
        // temporarily create a "line" consisting of currentVertex and nextVertex
        // check if the label "collides" with the current line or the map borders and continue looping
        // until it finds a point that does not collide - return the label then
        // or null, if no non-colliding label is possible
        for (int currentVertexIndex = 0; currentVertexIndex < currentVertices.length; currentVertexIndex++) {

            int nextVertexIndex = (currentVertexIndex != currentVertices.length-1) ? currentVertexIndex+1 : 0;
            Point currentVertex = currentVertices[currentVertexIndex];
            Point nextVertex = currentVertices[nextVertexIndex];

            int yValuePadding = (currentVertex.y() <= FONTSIZE_AND_PADDING) ? FONTSIZE_AND_PADDING : -FONTSIZE_AND_PADDING;

            // unfortunately the CHAR_WIDTH field is set to private
            // so we need to create a label first, to be able to check its width

            Label label = new Label(
                new Point(currentVertex.x(), (currentVertex.y() + yValuePadding)),
                labelName
            );
            
            // unfortunately there are no setters in the Label class, so we need to create a whole new label
            // potentially check for BottomLeft being outside MAP_WIDTH as well, even though that should be not possible?
            if (label.getBottomRight().x() > MAP_WIDTH) {
                int xValuePadding = MAP_WIDTH - PADDING - label.getBottomRight().x();
                label = new Label(
                    new Point((currentVertex.x() + xValuePadding), (currentVertex.y() + yValuePadding)),
                    labelName
                );
            }

            if (!isLabelColliding(label, currentVertex, nextVertex) 
                && !isLabelOutsideMap(label, MAP_WIDTH, MAP_HEIGHT)) {
                return label;
            }

            // in production one would probably also check if the label collides 
            // with any of the other polygons on the map.
        }
        return null;
    }

    private static Label getCenteredLabel(Polygon polygon, String labelName) {

        //create label in polygon center
        Label initialLabel = new Label(
            polygon.getCenter(), 
            labelName
        );

        //calculate center of Label
        Point centerPoint = new Point (
            polygon.getCenter().x() - ((initialLabel.getTopRight().x() - polygon.getCenter().x()) / 2),
            polygon.getCenter().y() - ((initialLabel.getBottomRight().y() - polygon.getCenter().y()) / 2)
        );

        return new Label(centerPoint, labelName);
    }

}