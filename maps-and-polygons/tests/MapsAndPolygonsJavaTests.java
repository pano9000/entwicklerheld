package de.entwicklerheld.test;

import java.util.*;

import de.entwicklerheld.mapsAndPolygonsJava.*;
import org.junit.*;

import static de.entwicklerheld.test.PolygonHelperFunctions.distanceBetweenTwoPoints;
import static org.junit.Assert.*;

public class MapsAndPolygonsJavaTests {

    private static final PolygonProvider polygonProvider = PolygonProvider.getInstance();

    private static final double DELTA = 1e-15;
    private static final Visualization visualization = Visualization.getInstance();

    @Test
    public void testCalculateParkAreaScenario1() {
        // GIVEN
        Point[] parkPosition = new Point[]{
                new Point(50, 150),
                new Point(45, 250),
                new Point(120, 240),
                new Point(200, 250),
                new Point(200, 150),
                new Point(350, 170),
                new Point(370, 50),
                new Point(220, 50),
                new Point(220, 100),
                new Point(50, 100),
        };
        Polygon park = new Polygon(parkPosition, "Westpark München");
        polygonProvider.addPolygon(park);

        // WHEN
        // visualization.drawMap(1, 3, polygonProvider.getPolygons(), null);
        Double calculatePolygonArea = MapService.calculatePolygonArea(park.getVertices());

        // THEN
        assertArea(park, 38675.0, calculatePolygonArea);
    }

//    @Test
//    public void testCalculateParkAreaScenario1Random() {
//        // GIVEN
//        Point[] parkPosition = new Point[]{
//                new Point(50, 150),
//                new Point(45, 250),
//                new Point(120, 240),
//                new Point(200, 250),
//                new Point(200, 150),
//                new Point(350, 170),
//                new Point(370, 50),
//                new Point(220, 50),
//                new Point(220, 100),
//                new Point(50, 100),
//        };
//        Polygon park = new Polygon(parkPosition, "Westpark München");
//        polygonProvider.addPolygon(park);
//
//        // WHEN
//        // visualization.drawMap(1, 4, polygonProvider.getPolygons(), null);
//        Double calculatePolygonArea = MapService.calculatePolygonArea(park.getVertices());
//
//        // THEN
//        assertArea(park, 38675.0, calculatePolygonArea);
//    }

    @Test
    public void testCalculateOtherParkScenario1Random() {
        // GIVEN
        PolygonProvider polygonProvider = PolygonProvider.getInstance();
        Point startPointPark1 = new Point(50, 20);
        Point[] parkPosition = new Point[]{
                startPointPark1,
                new Point(60, 280),
                new Point(100, 280),
                new Point(100, 250),
        };
        Polygon park = new Polygon(parkPosition, "Stadtwerke München 'Dream Park' 1");
        polygonProvider.addPolygon(park);

        // WHEN
        // visualization.drawMap(1, 4, polygonProvider.getPolygons(), null);
        Double calculatePolygonArea = MapService.calculatePolygonArea(park.getVertices());

        // THEN
        assertArea(park, 5950.0, calculatePolygonArea);
    }

    @Test
    public void testCalculateOtherParkScenario1Random2() {
        // GIVEN
        PolygonProvider polygonProvider = PolygonProvider.getInstance();
        Point startPointPark1 = new Point(50, 20);
        Point[] parkPosition1 = new Point[]{
                startPointPark1,
                new Point(45, 100),
                new Point(100, 170),
                new Point(100, 40),
        };
        Polygon park = new Polygon(parkPosition1, "Stadtwerke München 'Dream Park' 2");
        polygonProvider.addPolygon(park);

        // WHEN
        // visualization.drawMap(1, 4, polygonProvider.getPolygons(), null);
        Double calculatePolygonArea = MapService.calculatePolygonArea(park.getVertices());

        // THEN
        assertArea(park, 5625.0, calculatePolygonArea);
    }

    @Test
    public void testCalculateOtherParkScenario1Random3() {
        // GIVEN
        PolygonProvider polygonProvider = PolygonProvider.getInstance();
        Point startPoint = new Point(250, 20);
        Point[] parkPosition = new Point[]{
                startPoint,
                new Point(245, 100),
                new Point(300, 130),
                new Point(330, 40),
        };
        Polygon park = new Polygon(parkPosition, "Welcome to the Jungle");
        polygonProvider.addPolygon(park);

        // WHEN
        // visualization.drawMap(1, 4, polygonProvider.getPolygons(), null);
        Double calculatePolygonArea = MapService.calculatePolygonArea(park.getVertices());

        // THEN
        assertArea(park, 6175.0, calculatePolygonArea);
    }

    /**
     * --------------------- Scenario 2 --------------------------
     **/
    @Test
    public void testLabelingScenario2() {
        // GIVEN multiple polygons with different sizes which should not overlap
        Point startPointPark1 = new Point(50, 20);
        Point[] parkPosition1 = new Point[]{
                startPointPark1,
                new Point(45, 100),
                new Point(100, 170),
                new Point(100, 40),
        };
        Polygon park2 = new Polygon(parkPosition1);
        polygonProvider.addPolygon(park2);

        Point startPointPark2 = new Point(50, 250);
        Point[] parkPosition2 = new Point[]{
                startPointPark2,
                new Point(60, 280),
                new Point(100, 280),
                new Point(100, 250),
        };
        Polygon park = new Polygon(parkPosition2);
        polygonProvider.addPolygon(park);

        // Park 3
        // top right
        Point startPoint3 = new Point(250, 20);
        Point[] parkPosition3 = new Point[]{
                startPoint3,
                new Point(245, 100),
                new Point(300, 130),
                new Point(330, 40),
        };
        Polygon park3 = new Polygon(parkPosition3);
        polygonProvider.addPolygon(park3);

        List<Polygon> checkList = new ArrayList<>(polygonProvider.getPolygons());

        // following label names
        List<String> labelNames = Arrays.asList("Westpark München", "SWM Park", "Englischer Garten");

        // WHEN
        MapService.calculateAndSetLabelsForPolygons(new ArrayList<>(labelNames));

        // THEN
        checkThatPolygonProviderIsUnchanged(checkList);
        int scenarioID = 2;
        int sentenceID = 3;String testMethodName = "testLabelingScenario2";

        checkLabelNames(labelNames);
        visualization.drawMap(scenarioID, sentenceID, polygonProvider.getPolygons(), null, testMethodName);


        checkThatLabelsAreNotOutsideOfTheMap(scenarioID, sentenceID, testMethodName);
        checkThatLabelsAreNotCollidingWithEachOther(scenarioID, sentenceID, testMethodName);
        checkThatLabelsAreNotCollidingWithPolygons(scenarioID, sentenceID, testMethodName);
        checkThatEachTopLeftOfLabelIsTheNearestToPolygon(scenarioID, sentenceID, testMethodName);
    }

    @Test
    public void testLabelingScenario3Random1() {
        // GIVEN multiple polygons with different sizes which should not overlap
        Point startPointPark1 = new Point(50, 20);
        Point[] parkPosition1 = new Point[]{
                startPointPark1,
                new Point(45, 100),
                new Point(110, 170),
                new Point(120, 40),
        };
        Polygon park2 = new Polygon(parkPosition1);
        polygonProvider.addPolygon(park2);

        Point startPointPark2 = new Point(50, 250);
        Point[] parkPosition2 = new Point[]{
                startPointPark2,
                new Point(60, 280),
                new Point(120, 280),
                new Point(130, 250),
        };
        Polygon park = new Polygon(parkPosition2);
        polygonProvider.addPolygon(park);

        // Park 3
        // top right
        Point startPoint3 = new Point(250, 20);
        Point[] parkPosition3 = new Point[]{
                startPoint3,
                new Point(245, 100),
                new Point(300, 130),
                new Point(330, 40),
        };
        Polygon park3 = new Polygon(parkPosition3);
        polygonProvider.addPolygon(park3);

        // Park 3
        // top right
        Point startPoint4 = new Point(250, 200);
        Point[] parkPosition4 = new Point[]{
                startPoint4,
                new Point(245, 250),
                new Point(300, 270),
                new Point(310, 200),
        };
        Polygon park4 = new Polygon(parkPosition4);
        polygonProvider.addPolygon(park4);

        List<Polygon> checkList = new ArrayList<>(polygonProvider.getPolygons());

        // following label names
        List<String> labelNames = Arrays.asList("Westpark München", "SWM Park", "Englischer Garten", "Olympiapark München");

        // WHEN
        MapService.calculateAndSetLabelsForPolygons(new ArrayList<>(labelNames));

        // THEN
        checkThatPolygonProviderIsUnchanged(checkList);
        int scenarioID = 2;
        int sentenceID = 3;String testMethodName = "testLabelingScenario3Random1";

        checkLabelNames(labelNames);
        visualization.drawMap(scenarioID, sentenceID, polygonProvider.getPolygons(), null, testMethodName);

        checkThatLabelsAreNotOutsideOfTheMap(scenarioID, sentenceID, testMethodName);
        checkThatLabelsAreNotCollidingWithEachOther(scenarioID, sentenceID, testMethodName);
        checkThatLabelsAreNotCollidingWithPolygons(scenarioID, sentenceID, testMethodName);
        checkThatEachTopLeftOfLabelIsTheNearestToPolygon(scenarioID, sentenceID, testMethodName);
    }

    @Test
    public void testLabelingScenario3Random2() {
        // GIVEN multiple polygons with different sizes which should not overlap
        Point startPointPark1 = new Point(10, 10);
        Point[] parkPosition1 = new Point[]{
                startPointPark1,
                new Point(45, 100),
                new Point(250, 170),
                new Point(310, 40),
        };
        Polygon park2 = new Polygon(parkPosition1);
        polygonProvider.addPolygon(park2);

        Point startPointPark2 = new Point(50, 250);
        Point[] parkPosition2 = new Point[]{
                startPointPark2,
                new Point(60, 200),
                new Point(120, 280),
        };
        Polygon park = new Polygon(parkPosition2);
        polygonProvider.addPolygon(park);

        // Park 3
        // top right
        Point startPoint3 = new Point(250, 220);
        Point[] parkPosition3 = new Point[]{
                startPoint3,
                new Point(245, 280),
                new Point(300, 280),
                new Point(330, 220),
        };
        Polygon park3 = new Polygon(parkPosition3);
        polygonProvider.addPolygon(park3);


        List<Polygon> checkList = new ArrayList<>(polygonProvider.getPolygons());

        // following label names
        List<String> labelNames = Arrays.asList("Westpark München", "SWM Park", "Englischer Garten");

        // WHEN
        MapService.calculateAndSetLabelsForPolygons(new ArrayList<>(labelNames));

        // THEN
        checkThatPolygonProviderIsUnchanged(checkList);
        int scenarioID = 2;
        int sentenceID = 3;String testMethodName = "testLabelingScenario3Random2";

        checkLabelNames(labelNames);

        visualization.drawMap(scenarioID, sentenceID, polygonProvider.getPolygons(), null, testMethodName);

        checkThatLabelsAreNotOutsideOfTheMap(scenarioID, sentenceID, testMethodName);
        checkThatLabelsAreNotCollidingWithEachOther(scenarioID, sentenceID, testMethodName);
        checkThatLabelsAreNotCollidingWithPolygons(scenarioID, sentenceID, testMethodName);
        checkThatEachTopLeftOfLabelIsTheNearestToPolygon(scenarioID, sentenceID, testMethodName);
    }

    @Test
    public void testLabelInPolygonScenario2() {
        // GIVEN
        Point[] parkPosition = new Point[]{
                new Point(10, 10),
                new Point(20, 290),
                new Point(390, 290),
                new Point(390, 10),
        };
        Polygon park = new Polygon(parkPosition);
        polygonProvider.addPolygon(park);

        List<Polygon> checkList = new ArrayList<>(polygonProvider.getPolygons());
        List<String> westParkMunich = Arrays.asList("Großer Garten");
        // WHEN
        MapService.calculateAndSetLabelsForPolygons(new ArrayList<>(westParkMunich));
        int scenarioID = 2;
        int sentenceID = 3;String testMethodName = "testLabelInPolygonScenario2";

        // THEN
        checkThatPolygonProviderIsUnchanged(checkList);
        checkLabelNames(westParkMunich);

        visualization.drawMap(scenarioID, sentenceID, polygonProvider.getPolygons(), null, testMethodName);
        checkThatLabelsAreNotOutsideOfTheMap(scenarioID, sentenceID, testMethodName);
        checkThatLabelsAreNotCollidingWithEachOther(scenarioID, sentenceID, testMethodName);
        checkThatLabelsAreNotCollidingWithPolygons(scenarioID, sentenceID, testMethodName);

    }

    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();

    @AfterClass
    public static void writeVisualization() {
        MapsAndPolygonsJavaTests.visualization.writeToFile();
    }

    @Before
    public void init() {
        polygonProvider.clear();
    }

    /**
     * Assertion Helper Functions
     **/
    private void assertArea(Polygon park, Double expectedArea, Double calculatePolygonArea) {
        assertNotNull(String.format("The area of the park (%s) should not be null", park), calculatePolygonArea);
        assertEquals(String.format("The area of the park (%s) should be %s", park, calculatePolygonArea), expectedArea, calculatePolygonArea, DELTA);
    }

    private void checkThatLabelsAreNotOutsideOfTheMap(int scenarioID, int sentenceID, String testMethodName) {
        List<Polygon> polygons = polygonProvider.getPolygons();
        for (Polygon polygon : polygons) {
            Label label = polygon.getLabel();
            Point[] labelBorderBox = label.getBoundingBox();
            for (Point point : labelBorderBox) {
                boolean inWidth = point.x() >= 0 && point.x() <= 400;
                boolean inHeight = point.y() >= 0 && point.y() <= 300;
                if (!inWidth || !inHeight) {
                    visualization.drawMap(scenarioID, sentenceID, polygons, Arrays.asList(label), testMethodName);
                }
                assertTrue(String.format("The label (%s) should not be outside of the map", label), inWidth);
                assertTrue(String.format("The label (%s) should not be outside of the map", label), inHeight);
            }
        }
    }


    private void checkThatPolygonProviderIsUnchanged(List<Polygon> checkList) {
        List<Polygon> polygons = polygonProvider.getPolygons();
        // check that the vertices haven't changed
        for (int index = 0; index < checkList.size(); index++) {
            Polygon polygon = polygons.get(index);
            Polygon checkPolygon = checkList.get(index);
            assertArrayEquals("Don't change the position of the Polygons. It is not that easy to move parks ;-)", checkPolygon.getVertices(), polygon.getVertices());
        }
        assertEquals("The polygon provider should not have changed. Don't add or remove items", checkList, polygons);
    }

    private static void checkLabelNames(List<String> labelNames) {
        List<Polygon> polygons = polygonProvider.getPolygons();
        for (int index = 0; index < labelNames.size(); index++) {
            String expectedLabelName = labelNames.get(index);
            Polygon polygon = polygons.get(index);
            Label label = polygon.getLabel();
            assertNotNull("label should not be null", label);
            assertEquals(String.format("The label for the %s polygon (%s) should be '%s' and NOT '%s'", index + 1, polygon, expectedLabelName, label.getText()), expectedLabelName, label.getText());
        }
    }

    private void checkThatLabelsAreNotCollidingWithEachOther(int scenarioId, int sentenceId, String testMethodName) {
        for (Label label : polygonProvider.getLabels()) {
            List<Label> labels = polygonProvider.getLabels();
            for (Label otherLabel : labels) {
                if (otherLabel != label) {
                    boolean labelCollidingWithOtherLabel = PolygonHelperFunctions.isLabelCollidingWithOtherLabel(label, otherLabel);
                    if (labelCollidingWithOtherLabel) {
                        visualization.drawMap(scenarioId, sentenceId, polygonProvider.getPolygons(), Arrays.asList(label, otherLabel), testMethodName);
                    }
                    assertFalse(String.format("The label '%s' should not collide with the label '%s'", label, otherLabel), labelCollidingWithOtherLabel);
                }
            }
        }
    }

    private void checkThatLabelsAreNotCollidingWithPolygons(int scenarioId, int sentenceId, String testMethodName) {
        for (Label label : polygonProvider.getLabels()) {
            List<Polygon> polygons = polygonProvider.getPolygons();
            for (Polygon polygon : polygons) {
                boolean labelCollidingWithPolygon = PolygonHelperFunctions.isLabelCollidingWithPolygon(label, polygon);
                if (labelCollidingWithPolygon) {
                    visualization.drawMap(scenarioId, sentenceId, polygonProvider.getPolygons(), Arrays.asList(label, polygon), testMethodName);
                }
                assertFalse(String.format("The label '%s' should not collide with the polygon '%s' (index %s)", label, polygon, polygons.indexOf(polygon)), labelCollidingWithPolygon);
            }
        }
    }

    private void checkThatEachTopLeftOfLabelIsTheNearestToPolygon(int scenarioID, int sentenceID, String testMethodName) {
        List<Label> labels = polygonProvider.getLabels();
        for (Label label : labels) {
            Point topLeft = label.getTopLeft();
            Polygon calculatedNearestPolygonOfLabel = findNearestPolygon(topLeft);
            Polygon polygonForLabel = findPolygonForLabel(label);

            if(calculatedNearestPolygonOfLabel == null || calculatedNearestPolygonOfLabel.getLabel() != label) {
                visualization.drawMap(scenarioID, sentenceID, polygonProvider.getPolygons(), Arrays.asList(label, polygonForLabel), testMethodName);
            }
            assertEquals(String.format("The nearest polygon for %s should be %s and NOT %s", label, polygonForLabel, calculatedNearestPolygonOfLabel), polygonForLabel, calculatedNearestPolygonOfLabel);

            Label closestLabel = findClosestLabel(polygonForLabel);
            if(closestLabel != label) {
                visualization.drawMap(scenarioID, sentenceID, polygonProvider.getPolygons(), Arrays.asList(label, polygonForLabel), testMethodName);
                assertEquals(String.format("The nearest label for the %s should be '%s' and NOT '%s'", polygonForLabel, label, closestLabel), label, closestLabel);
            }
        }
    }

    private Label findClosestLabel(Polygon polygon) {
        List<Label> labels = polygonProvider.getLabels();
        Label resultLabel = null;
        int shortestDistance = Integer.MAX_VALUE;
        for(Point polygonPoint : polygon.getVertices()) {
            for (Label label : labels) {
                int actualDistance = distanceBetweenTwoPoints(polygonPoint, label.getTopLeft());
                if(actualDistance < shortestDistance) {
                    resultLabel = label;
                    shortestDistance = actualDistance;
                }
            }
        }

        return resultLabel;
    }


    private Polygon findPolygonForLabel(Label label) {
        List<Polygon> polygons = polygonProvider.getPolygons();
        for (Polygon polygon : polygons) {
            if(polygon.getLabel() == label) {
                return polygon;
            }
        }
        return null;
    }

    private Polygon findNearestPolygon(Point topLeft) {
        Polygon resultPolygon = null;
        int shortestDistance = Integer.MAX_VALUE;
        List <Polygon> polygons = polygonProvider.getPolygons();
        for (Polygon polygon : polygons) {
            for(Point polygonPoint : polygon.getVertices()) {
                int actualDistance = distanceBetweenTwoPoints(topLeft, polygonPoint);
                if(actualDistance < shortestDistance) {
                    resultPolygon = polygon;
                    shortestDistance = actualDistance;
                }
            }
        }
        return resultPolygon;
    }
}