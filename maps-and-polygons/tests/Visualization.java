package de.entwicklerheld.test;

import com.google.gson.Gson;
import de.entwicklerheld.mapsAndPolygonsJava.Drawable;
import de.entwicklerheld.mapsAndPolygonsJava.Label;
import de.entwicklerheld.mapsAndPolygonsJava.Polygon;

import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

public class Visualization {
    private static Visualization ins;

    public static Visualization getInstance() {
        if (null == ins)
            ins = new Visualization();
        return ins;
    }

    private Visualization() {
    }

    List<Map<String, String>> jsonObject = new ArrayList<>();

    public void drawMap(int scenarioID, int sentenceID, List<Polygon> polygons, List<Drawable> collisions, String testMethodName) {
        if (collisions == null) {
            collisions = new ArrayList<>();
        }

        StringBuilder resultDiv = new StringBuilder("<iframe style=\"width: 100%; height: 325px; border: none;\" srcdoc='<html><body>");


        UUID uuid = UUID.randomUUID();
        String uuidString = uuid.toString();
        uuidString = uuidString.replaceAll("-", "");

        resultDiv.append("<canvas id=\"canvas-").append(uuidString).append("\" width=\"400\" height=\"300\"></canvas>");

        // draw polygon in canvas
        resultDiv.append("<script type=\"text/javascript\">");
        // alert
        resultDiv.append("function drawToMap").append(uuidString).append("() {");

        resultDiv.append("let canvas = document.getElementById(\"canvas-").append(uuidString).append("\");");
        resultDiv.append("let ctx = canvas.getContext(\"2d\");");
        // draw polygons into canvas
        for (Polygon polygon : polygons) {
            if (polygon == null) {
                continue;
            }
            resultDiv.append("ctx.beginPath();");
            resultDiv.append("ctx.stroke();");
            resultDiv.append("ctx.setLineDash([]);");
            if (collisions.contains(polygon)) {
                resultDiv.append("ctx.strokeStyle = \"red\";");
            } else {
                resultDiv.append("ctx.strokeStyle = \"black\";");
            }
            resultDiv.append("ctx.moveTo(").append(polygon.getVertices()[0].x()).append(", ").append(polygon.getVertices()[0].y()).append(");");
            for (int i = 1; i < polygon.getVertices().length; i++) {
                resultDiv.append("ctx.lineTo(").append(polygon.getVertices()[i].x()).append(", ").append(polygon.getVertices()[i].y()).append(");");
            }

            resultDiv.append("ctx.closePath();");
            resultDiv.append("ctx.stroke();");

            if (polygon.getLabel() == null) {
                continue;
            }

            // draw label border box dashed
            resultDiv.append("ctx.beginPath();");
            resultDiv.append("ctx.setLineDash([3, 3]);");
            Label label = polygon.getLabel();
            if (collisions.contains(label)) {
                resultDiv.append("ctx.strokeStyle = \"red\";");
            } else {
                resultDiv.append("ctx.strokeStyle = \"grey\";");
            }
            resultDiv.append("ctx.rect(").append(label.getTopLeftCornerOfLabelBox().x()).append(", ").append(label.getTopLeftCornerOfLabelBox().y()).append(", ").append(label.getLabelWidth()).append(",").append(label.getLabelHeight()).append(");");
            resultDiv.append("ctx.closePath();");
            resultDiv.append("ctx.stroke();");

            // write label text into label border box
            resultDiv.append("ctx.font = \"").append(Label.getFontSize()).append("px ").append(Label.getFontFamily()).append("\";");
            resultDiv.append("ctx.fillText(\"").append(label.getText()).append("\", ").append(label.getPositionOfTextInBox().x()).append(", ").append(label.getPositionOfTextInBox().y()).append(");");
        }

        resultDiv.append("ctx.closePath();");
        resultDiv.append("ctx.stroke();");

        resultDiv.append("}");
        resultDiv.append("drawToMap").append(uuidString).append("();");
        resultDiv.append("</script>");

        // added border to canvas
        resultDiv.append("<style>");
        resultDiv.append("#canvas-").append(uuidString).append(" {");
        if (collisions.size() == 1) {
            resultDiv.append("border: 1px solid red;");
        } else {
            resultDiv.append("border: 1px solid black;");
        }
        resultDiv.append("}");
        resultDiv.append("</style>");

        // finish div
        resultDiv.append("</body></html>'></iframe>");

        HashMap<String, String> mapCollection = new HashMap<>();
        mapCollection.put("scenarioId", String.valueOf(scenarioID));
        mapCollection.put("sentenceID", String.valueOf(sentenceID));
        mapCollection.put("testMethodName", testMethodName);

        mapCollection.put("content", resultDiv.toString());

        // check if it is already in the list and remove it and add it again use also the testMethodName
        for (Map<String, String> map : jsonObject) {
            if (map.get("scenarioId").equals(String.valueOf(scenarioID)) && map.get("sentenceID").equals(String.valueOf(sentenceID)) && map.get("testMethodName").equals(testMethodName)) {
                jsonObject.remove(map);
                break;
            }
        }

        jsonObject.add(mapCollection);
    }

    private void debugging(StringBuilder resultDiv) {
        try {
            FileWriter fileWriter = new FileWriter("test.html", false);
            fileWriter.write(resultDiv.toString());
            fileWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void writeToFile() {
        List<Map<String, String>> finalJsonObject = new ArrayList<>();
        // hard coded put all visualizations in one scenario and sentence
        HashMap<String, String> finalMapCollection = new HashMap<>();

        // list of all test methods
        StringBuilder result = new StringBuilder();
        for (String testMethodName : Arrays.asList("testLabelingScenario2", "testLabelingScenario3Random1", "testLabelingScenario3Random2", "testLabelInPolygonScenario2")) {
            Map<String, String> entry = findEntry(testMethodName);
            if (entry != null) {
                result.append(entry.get("content"));
            }
        }

        finalMapCollection.put("scenarioId", "2");
        finalMapCollection.put("sentenceID", "3");
        finalMapCollection.put("content", result.toString());

        debugging(result);

        finalJsonObject.add(finalMapCollection);

        Gson gson = new Gson();
        String json = gson.toJson(finalJsonObject);

        try {
            FileWriter file = new FileWriter("visualization-data.json");
            file.write(json);
            file.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("JSON file created: " + finalJsonObject);
    }

    private Map<String, String> findEntry(String testMethodName) {
        for (Map<String, String> map : jsonObject) {
            if (map.get("testMethodName").equals(testMethodName)) {
                return map;
            }
        }
        return null;
    }
}