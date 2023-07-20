package de.entwicklerheld.test;

import de.entwicklerheld.mapsAndPolygonsJava.Label;
import de.entwicklerheld.mapsAndPolygonsJava.Point;
import de.entwicklerheld.mapsAndPolygonsJava.Polygon;

import java.util.List;

public class PolygonHelperFunctions {
    public static boolean isLabelCollidingWithOtherLabel(Label label, Label otherLabel) {
        if (label == null || otherLabel == null) {
            return false;
        }
        return checkIfTwoRectanglesOverlap(label.getBoundingBox(), otherLabel.getBoundingBox());
    }

    private static boolean checkIfTwoRectanglesOverlap(Point[] rect1, Point[] rect2) {
        return rect1[0].x() < rect2[2].x() && rect1[2].x() > rect2[0].x() && rect1[0].y() < rect2[2].y() && rect1[2].y() > rect2[0].y();
    }

    public static boolean isLabelCollidingWithPolygon(Label label, Polygon polygon) {
        if (label == null || polygon == null) {
            return false;
        }
        return checkIfAnyEdgeOfThePolygonOverlapsLabelBoundingBox(polygon, label);
    }

    public static boolean isLabelCompletelyInsidePolygon(Label label, Polygon polygon) {
        if (label == null || polygon == null) {
            return false;
        }
        return label.getBoundingBox()[0].x() > polygon.getVertices()[0].x() && label.getBoundingBox()[0].y() > polygon.getVertices()[0].y() && label.getBoundingBox()[2].x() < polygon.getVertices()[2].x() && label.getBoundingBox()[2].y() < polygon.getVertices()[2].y();
    }

    public static boolean checkIfAnyEdgeOfThePolygonOverlapsLabelBoundingBox(Polygon polygon, Label label) {
        // check if any edge of the polygon overlaps the label bounding box
        for (int i = 0; i < polygon.getVertices().length; i++) {
            if (i == polygon.getVertices().length - 1) {
                if (checkIfTwoLinesOverlap(polygon.getVertices()[i], polygon.getVertices()[0], label.getBoundingBox()[0], label.getBoundingBox()[1])) {
                    return true;
                }
                if (checkIfTwoLinesOverlap(polygon.getVertices()[i], polygon.getVertices()[0], label.getBoundingBox()[1], label.getBoundingBox()[2])) {
                    return true;
                }
                if (checkIfTwoLinesOverlap(polygon.getVertices()[i], polygon.getVertices()[0], label.getBoundingBox()[2], label.getBoundingBox()[3])) {
                    return true;
                }
                if (checkIfTwoLinesOverlap(polygon.getVertices()[i], polygon.getVertices()[0], label.getBoundingBox()[3], label.getBoundingBox()[0])) {
                    return true;
                }
            } else {
                if (checkIfTwoLinesOverlap(polygon.getVertices()[i], polygon.getVertices()[i + 1], label.getBoundingBox()[0], label.getBoundingBox()[1])) {
                    return true;
                }
                if (checkIfTwoLinesOverlap(polygon.getVertices()[i], polygon.getVertices()[i + 1], label.getBoundingBox()[1], label.getBoundingBox()[2])) {
                    return true;
                }
                if (checkIfTwoLinesOverlap(polygon.getVertices()[i], polygon.getVertices()[i + 1], label.getBoundingBox()[2], label.getBoundingBox()[3])) {
                    return true;
                }
                if (checkIfTwoLinesOverlap(polygon.getVertices()[i], polygon.getVertices()[i + 1], label.getBoundingBox()[3], label.getBoundingBox()[0])) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Check if two lines overlap. This is done by checking if the orientation of the two lines is different.
     * If the orientation is different, the lines overlap.
     * If the orientation is the same, the lines do not overlap.
     * If the orientation is 0, the lines are collinear and we need to check if one of the vertices of the line is on the other line.
     * Detailed description here https://www.dcs.gla.ac.uk/~pat/52233/slides/Geometry1x1.pdf
     */
    private static boolean checkIfTwoLinesOverlap(Point vertex1, Point vertex2, Point boundingBoxVertex1, Point boundingBoxVertex2) {
        int orientation1 = orientation(vertex1, vertex2, boundingBoxVertex1);
        int orientation2 = orientation(vertex1, vertex2, boundingBoxVertex2);
        int orientation3 = orientation(boundingBoxVertex1, boundingBoxVertex2, vertex1);
        int orientation4 = orientation(boundingBoxVertex1, boundingBoxVertex2, vertex2);

        if (orientation1 != orientation2 && orientation3 != orientation4) {
            return true;
        }

        if (orientation1 == 0 && onSegment(vertex1, boundingBoxVertex1, vertex2)) {
            return true;
        }
        if (orientation2 == 0 && onSegment(vertex1, boundingBoxVertex2, vertex2)) {
            return true;
        }
        if (orientation3 == 0 && onSegment(boundingBoxVertex1, vertex1, boundingBoxVertex2)) {
            return true;
        }
        if (orientation4 == 0 && onSegment(boundingBoxVertex1, vertex2, boundingBoxVertex2)) {
            return true;
        }

        return false;
    }

    /**
     * Check if a point is on a line between two other points.
     */
    private static boolean onSegment(Point startPoint, Point pointWhichIsMaybeOnLine, Point endpoint) {
        return pointWhichIsMaybeOnLine.x() <= Math.max(startPoint.x(), endpoint.x()) && pointWhichIsMaybeOnLine.x() >= Math.min(startPoint.x(), endpoint.x()) && pointWhichIsMaybeOnLine.y() <= Math.max(startPoint.y(), endpoint.y()) && pointWhichIsMaybeOnLine.y() >= Math.min(startPoint.y(), endpoint.y());
    }

    /**
     * Check the orientation of three points.
     * If the orientation is 0, the points are collinear. This means that the points are on the same line.
     * If the orientation is 1, the points are clockwise. This means that the points are on the left side of the line.
     * If the orientation is 2, the points are counterclockwise. This means that the points are on the right side of the line.
     */
    private static int orientation(Point vertex, Point vertex1, Point boundingBox) {
        int val = (vertex1.y() - vertex.y()) * (boundingBox.x() - vertex1.x()) - (vertex1.x() - vertex.x()) * (boundingBox.y() - vertex1.y());
        if (val == 0) {
            return 0;
        }
        return (val > 0) ? 1 : 2;
    }


    public static int distanceBetweenTwoPoints(Point point1, Point point2) {
        return (int) Math.sqrt(Math.pow(point1.x() - point2.x(), 2) + Math.pow(point1.y() - point2.y(), 2));
    }
}