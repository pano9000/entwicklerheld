package de.entwicklerheld.restApiJava;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.net.URI;

public class IOUApi {

    private static IOUProvider iouProvider = IOUProvider.getInstance();
    //private static ApiEndpoint[] apiEndpoints = {new ApiEndpoint("/ious"), new ApiEndpoint("/ious/:id")};


    private static void getPathParameter(HttpRequest request) {

        try {
            URI uri = new URI(request.getPath());
            System.out.println("uripath // " +uri.getPath().split("/"));
            List<String> a = new ArrayList<>();
        } catch (Exception e) {
            // TODO: handle exception
        }

    }

    public static Response<JSONArray> handleRequest(HttpRequest request) {
        System.out.println(""+request.getMethod() + " / " + request.getPath() + " / " + request.getBody() + "\n");
        String[] pathParts = request.getPath().split("/");
        getPathParameter(request);

        try {
            URI uri = new URI(request.getPath());
            System.out.println("uripath // " +uri.getPath());
        } catch (Exception e) {
            // TODO: handle exception
        }

       /*  if (pathParts[3] != "ious") {
            return new Response<>(404);
        }*/

        switch (request.getMethod()) {
            case "GET":
                return handleGet(request);
            case "POST":
                return handlePost(request);
            case "PATCH":
                return handlePatch(request);
            case "DELETE":
                return handleDelete(request);
            default:
                return null;
        }

    };

    private static Response handleGet(HttpRequest request) {

        String[] pathParts = request.getPath().split("ious/");
        System.out.println("handleGET" + " / " + pathParts.length);
        
        if (pathParts.length == 1) {
            List<IOU> ious = iouProvider.getIOUs();
            JSONArray body = new JSONArray(ious);
            Response<JSONArray> response = new Response<JSONArray>(200, body);
            return response;
        } else {
            IOU iou = iouProvider.getIOU(Integer.parseInt(pathParts[1]));
            if (iou == null) {
                Response response = new Response(404);
                return response;
            }
            JSONObject iouJSON = new JSONObject(iou);
            JSONArray resBody = new JSONArray();
            resBody.put(iouJSON);
            return new Response(200, resBody);
        }
            


    }

    private static Response<JSONArray> handlePost(HttpRequest request) {

        //do some body validation here

        try {
            JSONObject reqBody = new JSONObject(request.getBody());
            
            JSONObject debtorJ = reqBody.getJSONObject("debtor");
            JSONObject creditorJ = reqBody.getJSONObject("creditor");
            
            Person debtor = new Person(
                debtorJ.getString("lastName"), 
                debtorJ.getString("address"), 
                debtorJ.getString("firstName")
            );

            Person creditor = new Person(
                creditorJ.getString("lastName"), 
                creditorJ.getString("address"), 
                creditorJ.getString("firstName")
            );
                    
            IOU iou = new IOU(
                debtor, 
                reqBody.getString("description"), 
                reqBody.getDouble("amount"), 
                creditor
            );

            iouProvider.addIOU(iou);
            JSONObject iouJSON = new JSONObject(iou);
            JSONArray resBody = new JSONArray();
            resBody.put(iouJSON);
            return new Response(201, resBody);
            
        } catch (Exception e) {
            System.out.println(e);
            return new Response(500);
        }

    }

    private static Response<JSONArray> handleDelete(HttpRequest request) {

        String[] pathParts = request.getPath().split("ious/");
        int statusCode;

        if (pathParts.length == 1) {

            statusCode = 400;

        } else {
            iouProvider.removeIOU(iouProvider.getIOU(Integer.parseInt(pathParts[1])));
            statusCode = 204;
        }
        
        Response<JSONArray> response = new Response<JSONArray>(statusCode);
        return response;

    }

    private static Response<JSONArray> handlePatch(HttpRequest request) {
        String[] pathParts = request.getPath().split("ious/");
        Integer iouId = (pathParts.length == 1) ? null : Integer.parseInt(pathParts[1]);

        if (iouId == null) {
            return new Response<JSONArray>(400);
        }

        IOU iou = iouProvider.getIOU(iouId);

        if (iou == null) {
            return new Response<JSONArray>(404);
        }

        System.out.println("patchyy // " + request.getBody());
        JSONObject reqBody;
        JSONArray resBody = new JSONArray();
        try {
            reqBody = new JSONObject(request.getBody());
            String[] attributeKeys = JSONObject.getNames(reqBody);
            for (String key : attributeKeys) {
                System.out.println("getNamessss // " + key);
                switch (key) {
                    case "amount":
                        iou.setAmount(reqBody.getDouble(key));
                        break;
                    case "creditor":
                        JSONObject creditorJ = reqBody.getJSONObject(key);
                        Person updatedCreditor = new Person(
                            creditorJ.getString("lastName"), 
                            creditorJ.getString("address"), 
                            creditorJ.getString("firstName")
                        );
                        iou.setCreditor(updatedCreditor);
                        break;
                    case "debtor":
                        JSONObject debtorJ = reqBody.getJSONObject(key);
                        Person updatedDebtor = new Person(
                            debtorJ.getString("lastName"), 
                            debtorJ.getString("address"), 
                            debtorJ.getString("firstName")
                        );
                        iou.setDebtor(updatedDebtor);
                        break;
                    case "description":
                        iou.setDescription(reqBody.getString(key));
                    default:
                        break;
                }
            }
            
        } catch (Exception e) {
            // TODO: handle exception
            return new Response(500);
        }
        
        resBody.put(new JSONObject(iou));
        return new Response(200, resBody);

    }

/*
    class Router {
        String[] pathParts = request.getPath().split("/");
        System.out.println("pathp" + " / " + pathParts.length + "// " + pathParts[3] );
    }
 */

    class ApiEndpoint {
        private final String endpointName;
        public ApiEndpoint(String endpointName) {
            this.endpointName = endpointName;
        }
    }

}