package de.entwicklerheld.mapsAndPolygonsJava;

import java.util.List;

import javax.swing.text.StyledEditorKit.BoldAction;

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
        final int MAP_WIDTH = 400;
        final int MAP_HEIGHT = 300;

        int i = 0;
        for (Polygon polygon: polygonProvider.getPolygons()) {
            int fontSize = (int) (Label.getFontSize());
            final int PADDING = (int) (Label.getFontSize() / 100 * 25);
            //int fontSizeAndPadding = (int) (Label.getFontSize() + PADDING);
            int fontSizeAndPadding = (int) (Label.getFontSize() + 4);
            


            Point[] currentVertices = polygon.getVertices();
            
            //create label in polygon center
            Label initialLabel = new Label(
                polygon.getCenter(), 
                labelNames.get(i)
            );

            //calculate center of Label
            Point centerInitLabel = new Point (
                polygon.getCenter().x() - ((initialLabel.getTopRight().x() - polygon.getCenter().x()) / 2),
                polygon.getCenter().y() - ((initialLabel.getBottomRight().y() - polygon.getCenter().y()) / 2)
            );

            initialLabel = new Label(
                centerInitLabel, 
                labelNames.get(i)
            );


            Label newLabel = initialLabel;
            // loop through polygons vertices and check if the label can be set without colliding
            for (int currentVertexIndex = 0; currentVertexIndex < currentVertices.length; currentVertexIndex++) {
                System.out.println("currentvert" + " " + currentVertexIndex + "// " + labelNames.get(i) + " ----------");

                int nextVertexIndex = (currentVertexIndex != currentVertices.length-1) ? currentVertexIndex+1 : 0;
                Point currentVertex = currentVertices[currentVertexIndex];
                Point nextVertex = currentVertices[nextVertexIndex];

                if ((checkLabelCollision(newLabel, currentVertex, nextVertex) == false)
                    && (checkMapCollision(newLabel, MAP_WIDTH, MAP_HEIGHT) == false)) {
                    break;
                }

                //try label above/below of point
                System.out.println("yyy " + currentVertex.y() + " padd " + fontSizeAndPadding + " result:" + (currentVertex.y() - fontSizeAndPadding +2));
                int yValue = (currentVertex.y() <= fontSizeAndPadding) ? fontSizeAndPadding : -fontSizeAndPadding;
                newLabel = new Label(
                    new Point(currentVertex.x(), (currentVertex.y() + yValue)),
                    labelNames.get(i)
                );

                if ((checkLabelCollision(newLabel, currentVertex, nextVertex) == false)
                    && (checkMapCollision(newLabel, MAP_WIDTH, MAP_HEIGHT) == false)) {
                    break;
                } 
                
                //try moving label of map to the left - moving to right not needed, as we only have LTR no RTL writing
                //int xValue = (currentVertex.x() + newLabel.getLabelWidth() > MAP_WIDTH - 2)
              
              
              /*   int xxx = ((MAP_WIDTH - 2) - (currentVertex.x() + newLabel.getLabelWidth()));

                newLabel = new Label(
                    new Point(currentVertex.x() + xxx, (currentVertex.y() + yValue)),
                    labelNames.get(i)
                );


                if ((checkLabelCollision(newLabel, currentVertex, nextVertex) == false)
                    && (checkMapCollision(newLabel, MAP_WIDTH, MAP_HEIGHT) == false)) {
                    break;
                } 

*/
                System.out.println("coliis " + labelNames.get(i) + " " + checkLabelCollision(initialLabel, currentVertex, nextVertex));

            }
            polygon.setLabel(newLabel);


            i++;
            //int boundaryX = MAP_X - (polygon.getVertices()[0].x() + initialLabel.getLabelWidth());
            // handle map borders
            // handle park borders, by checking the next and last point in vertices?

            // -> create helper function to find the "best" Polygon point to use as starting point?
            /*
                check for each point:
                    label height
                        if out of map Y
                        if touches border of current polygon
                    label width
                        if out of map X
                    label 



                    - try to add label in center
                    - try to add label on top left outside
                    - try to add label on top left inside
             */
/* 
            Label label = new Label(
                new Point(
                    polygon.getVertices()[0].x() + 2, 
                    polygon.getVertices()[0].y() + yValue
                ), 
                labelNames.get(i)
            );
            System.out.println(label.getLabelHeight() + "//" + label.getLabelWidth());
            polygon.setLabel(label);
            */

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
    private static Boolean checkLinesCollision(Point lineAs, Point lineAe, Point lineBs, Point lineBe) {

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

        if (u1 >= 0 && u1 <= 1 && u2 >= 0 && u2 <= 1) {
            return true;
        }
          return false;

    }

    private static Boolean checkLabelCollision(Label label, Point lineStart, Point lineEnd) {
        Point[][] labelSides = { 
            {label.getTopLeft(), label.getBottomLeft()},
            {label.getBottomLeft(), label.getBottomRight()},
            {label.getBottomRight(), label.getTopRight()},
            {label.getTopRight(), label.getTopLeft()},
        };

        for (Point[] labelSide : labelSides) {
            if (checkLinesCollision(lineStart, lineEnd, labelSide[0], labelSide[1]) == true) {
                System.out.println(lineStart + " // " + lineEnd + " // " + labelSide[0] + " -- " + labelSide[1] );
                return true;
            };
            
        }
        
        System.out.println("nocollision : " + lineStart + " // " + lineEnd + " // " + label );

        return false;
    }

    private static Boolean checkMapCollision(Label label, int mapWidth, int mapHeight) {

        Point[][] mapSides = {
            {new Point(0, mapHeight), new Point(0, 0)},
            {new Point(0, 0), new Point(mapWidth, 0)},
            {new Point(mapWidth, 0), new Point(mapWidth, mapHeight)},
            {new Point(mapWidth, mapHeight), new Point(0, mapHeight)}
        };

        for (Point[] mapSide : mapSides) {
            if (checkLabelCollision(label, mapSide[0], mapSide[1]) == true) {
                return true;
            };
        }

        return false;
    }
}