package de.entwicklerheld.restApiJava;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.net.URI;


public class IOUApi {

    private static IOUProvider iouProvider = IOUProvider.getInstance();

    private static String[] getPathFromUri(String path) {
        try {
            //get rid of first forwardslash for easier processing later on
            String uriPath = new URI(path).getPath().substring(1); 
            return uriPath.split("/");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public static Response<JSONArray> handleRequest(HttpRequest request) {

        Integer iouId = null;
        String[] pathParts = getPathFromUri(request.getPath());
        if (pathParts == null) return new Response<JSONArray>(500);
        if (pathParts[0].equals("ious") == false) return new Response<JSONArray>(404);

        if (pathParts.length > 1) {
            try {
                //this should rather be done in separate validation stage before already
                iouId = Integer.parseInt(pathParts[1]); 
            } catch(Exception e) {
                return new Response<JSONArray>(400);
            }
        }

        switch (request.getMethod()) {
            case "GET":                
                return handleGet(request, iouId);
            case "POST":
                return handlePost(request);
            case "PATCH":
                return handlePatch(request, iouId);
            case "DELETE":
                return handleDelete(request, iouId);
            default:
                return new Response<JSONArray>(500);
        }

    };

    private static Response<JSONArray> handleGet(HttpRequest request, Integer iouId) {

        JSONArray resBody;
        if (iouId == null) {
            List<IOU> ious = iouProvider.getIOUs();
            resBody = new JSONArray(ious);
        } else {
            IOU iou = iouProvider.getIOU(iouId);
            if (iou == null) return new Response<JSONArray>(404);
            JSONObject iouJSON = new JSONObject(iou);
            resBody = new JSONArray();
            resBody.put(iouJSON);
        }
        
        return new Response<JSONArray>(200, resBody);

    }


    private static Response<JSONArray> handlePost(HttpRequest request) {

        //in real world you need to do some body validation here using some library,
        // ideally with a pre-defined scheme of the expected/allowed JSON data 

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
            return new Response<JSONArray>(201, resBody);
            
        } catch (Exception e) {
            System.out.println(e);
            return new Response<JSONArray>(500);
        }

    }

    private static Response<JSONArray> handleDelete(HttpRequest request, Integer iouId) {
        if (iouId == null) return new Response<JSONArray>(400);

        iouProvider.removeIOU(iouProvider.getIOU(iouId));
        
        Response<JSONArray> response = new Response<JSONArray>(204);
        return response;

    }

    private static Response<JSONArray> handlePatch(HttpRequest request, Integer iouId) {

        if (iouId == null) return new Response<JSONArray>(400);
        IOU iou = iouProvider.getIOU(iouId);

        if (iou == null) return new Response<JSONArray>(404);

        JSONObject reqBody;
        JSONArray resBody = new JSONArray();

        try {
            reqBody = new JSONObject(request.getBody());
            String[] attributeKeys = JSONObject.getNames(reqBody);
            for (String key : attributeKeys) {
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
            return new Response<JSONArray>(500);
        }
        
        resBody.put(new JSONObject(iou));
        return new Response<JSONArray>(200, resBody);

    }

}