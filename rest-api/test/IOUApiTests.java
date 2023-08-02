package de.entwicklerheld.restApiJava;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.*;

import static org.junit.Assert.*;


import java.io.Console;
import java.util.List;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

public class IOUApiTests {

    @Test
    public void testRestService() throws JSONException {
        IOUProvider iouProvider = IOUProvider.getInstance();
        Person johnDoe = new Person("Doe", "123 Main Street", "John");
        Person janeDoe = new Person("Doe", "123 Main Street", "Jane");
        Person sharonErickson = new Person("Lynn", "442 Hollywoo Street", "Sarah");
        Person dexterBeltran = new Person("Beltran", "742 Evergreen Terrace", "Dexter");
        IOU iou1 = new IOU(1, janeDoe, "Lunch", 12.34, johnDoe);
        IOU iou2 = new IOU(2, sharonErickson, "Pizza", 50, dexterBeltran);

        JSONObject jsonForIOU1 = createJsonforIOU(iou1);
        JSONObject jsonForIOU2 = createJsonforIOU(iou2);

        iouProvider.addIOU(iou1);
        iouProvider.addIOU(iou2);


        // url GET http://localhost:8080/ious/
        HttpRequest getRequest = new HttpRequest("GET", "http://localhost:8080/ious/", "");
        Response<JSONArray> response = IOUApi.handleRequest(getRequest);
        assertNotNull("Response must not be null", response);
        assertThat(response.getStatusCode(), is(200));
        // System.out.println(response.getBody().toString(1));
        // compared via string because it does not work with JSONArray
        assertThat(response.getBody().toString(), is(new JSONArray(List.of(jsonForIOU1, jsonForIOU2)).toString()));


        // url GET http://localhost:8080/ious/1
        HttpRequest getRequestEntity = new HttpRequest("GET", "http://localhost:8080/ious/1", "");
        Response<JSONArray> responseEntity = IOUApi.handleRequest(getRequestEntity);
        assertNotNull("Response must not be null", responseEntity);
        assertThat(responseEntity.getStatusCode(), is(200));
        assertThat(responseEntity.getBody().toString(), is(new JSONArray(List.of(jsonForIOU1)).toString()));

        // url GET http://localhost:8080/ious/2
        HttpRequest getRequestEntity2 = new HttpRequest("GET", "http://localhost:8080/ious/2", "");
        Response<JSONArray> responseEntity2 = IOUApi.handleRequest(getRequestEntity2);
        assertNotNull("Response must not be null", responseEntity2);
        assertThat(responseEntity2.getStatusCode(), is(200));
        assertThat(responseEntity2.getBody().toString(), is(new JSONArray(List.of(jsonForIOU2)).toString()));

        // url GET http://localhost:8080/ious/4711
        HttpRequest getRequestEntityNotFound = new HttpRequest("GET", "http://localhost:8080/ious/4711", "");
        Response<JSONArray> responseEntityNotFound = IOUApi.handleRequest(getRequestEntityNotFound);
        assertNotNull("Response must not be null", responseEntityNotFound);
        assertThat(responseEntityNotFound.getStatusCode(), is(404));


        // url POST http://localhost:8080/ious/
        JSONObject json = new JSONObject();
        json.put("creditor", createJsonForPerson(janeDoe));
        json.put("description", "Another Lunch.... why does Jane never brings money?");
        json.put("amount", 35);
        json.put("debtor", createJsonForPerson(johnDoe));
        // System.out.println(json.toString());
        HttpRequest postRequest = new HttpRequest("POST", "http://localhost:8080/ious/", json.toString());
        Response<JSONArray> responsePost = IOUApi.handleRequest(postRequest);
        assertNotNull("Response must not be null", responsePost);
        json.put("id", 3);
        assertThat(responsePost.getStatusCode(), is(201));
        assertEquals("Expected IOU instance to be saved with id 3", IOUProvider.getInstance().getIOU(3),new IOU(3, janeDoe, "Another Lunch.... why does Jane never brings money?", 35, johnDoe));
        assertThat(responsePost.getBody().toString(), is(new JSONArray(List.of(json)).toString()));


        // url DELETE http://localhost:8080/ious/3
        HttpRequest deleteRequest = new HttpRequest("DELETE", "http://localhost:8080/ious/3", "");
        Response<JSONArray> responseDelete = IOUApi.handleRequest(deleteRequest);
        assertNotNull("Response must not be null", responseDelete);
        assertThat(responseDelete.getStatusCode(), is(204));
        assertThat(responseDelete.getBody(), is(nullValue()));

        // url DELETE http://localhost:8080/ious/
        HttpRequest deleteRequestAll = new HttpRequest("DELETE", "http://localhost:8080/ious/", "");
        Response<JSONArray> responseDeleteAll = IOUApi.handleRequest(deleteRequestAll);
        assertNotNull("Response must not be null", responseDeleteAll);
        assertThat(responseDeleteAll.getStatusCode(), is(400));
        assertThat(responseDeleteAll.getBody(), is(nullValue()));


        // url PATCH http://localhost:8080/ious/1
        json = new JSONObject();
        json.put("amount", 50);
        HttpRequest patchRequest = new HttpRequest("PATCH", "http://localhost:8080/ious/1", json.toString());
        Response<JSONArray> responsePatch = IOUApi.handleRequest(patchRequest);
        String message = "PATCH request to http://localhost:8080/ious/1 with " + json.toString();
        // System.out.println(json.toString());
        assertNotNull(message + " Response must not be null", responsePatch);
        assertThat(responsePatch.getStatusCode(), is(200));
        jsonForIOU1.put("amount", 50);

        assertThat(message, responsePatch.getBody().toString(), is(new JSONArray(List.of(jsonForIOU1)).toString()));

        // url PATCH http://localhost:8080/ious/1
        json = new JSONObject();
        json.put("description", "Lunch with Jane");
        HttpRequest patchRequest2 = new HttpRequest("PATCH", "http://localhost:8080/ious/1", json.toString());
        Response<JSONArray> responsePatch2 = IOUApi.handleRequest(patchRequest2);
        String message2 = "PATCH request to http://localhost:8080/ious/1 with " + json.toString();
        assertNotNull(message2 + " Response must not be null", responsePatch2);
        assertThat(responsePatch2.getStatusCode(), is(200));
        jsonForIOU1.put("description", "Lunch with Jane");

        assertThat(message2, responsePatch2.getBody().toString(), is(new JSONArray(List.of(jsonForIOU1)).toString()));

        // url PATCH http://localhost:8080/ious/1
        json = new JSONObject();
        json.put("creditor", createJsonForPerson(sharonErickson));
        HttpRequest patchRequest3 = new HttpRequest("PATCH", "http://localhost:8080/ious/1", json.toString());
        Response<JSONArray> responsePatch3 = IOUApi.handleRequest(patchRequest3);
        String message3 = "PATCH request to http://localhost:8080/ious/1 with " + json.toString();
        assertNotNull(message3 + " Response must not be null", responsePatch3);
        assertThat(responsePatch3.getStatusCode(), is(200));
        jsonForIOU1.put("creditor", createJsonForPerson(sharonErickson));

        assertThat(message3, responsePatch3.getBody().toString(), is(new JSONArray(List.of(jsonForIOU1)).toString()));

        // url PATCH http://localhost:8080/ious/1
        json = new JSONObject();
        json.put("debtor", createJsonForPerson(sharonErickson));
        HttpRequest patchRequest4 = new HttpRequest("PATCH", "http://localhost:8080/ious/1", json.toString());
        Response<JSONArray> responsePatch4 = IOUApi.handleRequest(patchRequest4);
        String message4 = "PATCH request to http://localhost:8080/ious/1 with " + json.toString();
        assertNotNull(message4 + " Response must not be null", responsePatch4);
        assertThat(responsePatch4.getStatusCode(), is(200));
        jsonForIOU1.put("debtor", createJsonForPerson(sharonErickson));

        assertThat(message4, responsePatch4.getBody().toString(), is(new JSONArray(List.of(jsonForIOU1)).toString()));

        // url PATCH http://localhost:8080/ious/1
        json = new JSONObject();
        json.put("creditor", createJsonForPerson(sharonErickson));
        json.put("description", "Lunch with Jane");
        json.put("amount", 50);
        json.put("debtor", createJsonForPerson(sharonErickson));
        HttpRequest patchRequest5 = new HttpRequest("PATCH", "http://localhost:8080/ious/1", json.toString());
        Response<JSONArray> responsePatch5 = IOUApi.handleRequest(patchRequest5);
        String message5 = "PATCH request to http://localhost:8080/ious/1 with " + json.toString();
        assertNotNull(message5 + " Response must not be null", responsePatch5);
        assertThat(responsePatch5.getStatusCode(), is(200));
        jsonForIOU1.put("creditor", createJsonForPerson(sharonErickson));
        jsonForIOU1.put("description", "Lunch with Jane");
        jsonForIOU1.put("amount", 50);
        jsonForIOU1.put("debtor", createJsonForPerson(sharonErickson));

        assertThat(message5, responsePatch5.getBody().toString(), is(new JSONArray(List.of(jsonForIOU1)).toString()));

        // url PATCH http://localhost:8080/ious/5433
        json = new JSONObject();
        json.put("amount", 50);
        HttpRequest patchRequest6 = new HttpRequest("PATCH", "http://localhost:8080/ious/5433", json.toString());
        Response<JSONArray> responsePatch6 = IOUApi.handleRequest(patchRequest6);
        String message6 = "PATCH request to http://localhost:8080/ious/5433 with " + json.toString();
        assertNotNull(message6 + " Response must not be null", responsePatch6);
        assertThat(responsePatch6.getStatusCode(), is(404));
        assertThat(responsePatch6.getBody(), is(nullValue()));


        // url PATCH http://localhost:8080/ious/
        json = new JSONObject();
        json.put("amount", 50);
        HttpRequest patchRequest7 = new HttpRequest("PATCH", "http://localhost:8080/ious/", json.toString());
        Response<JSONArray> responsePatch7 = IOUApi.handleRequest(patchRequest7);
        String message7 = "PATCH request to http://localhost:8080/ious/ with " + json.toString();
        assertNotNull(message7 + " Response must not be null", responsePatch7);
        assertThat(responsePatch7.getStatusCode(), is(400));
        assertThat(responsePatch7.getBody(), is(nullValue()));


    }

    private JSONObject createJsonForPerson(Person person) throws JSONException {
        JSONObject json = new JSONObject();
        json.put("firstName", person.getFirstName());
        json.put("lastName", person.getLastName());
        json.put("address", person.getAddress());
        return json;
    }

    private JSONObject createJsonforIOU(IOU iou) throws JSONException {
        JSONObject json = new JSONObject();
        json.put("id", iou.getId());
        json.put("creditor", createJsonForPerson(iou.getCreditor()));
        json.put("description", iou.getDescription());
        json.put("amount", iou.getAmount());
        json.put("debtor", createJsonForPerson(iou.getDebtor()));
        return json;
    }

    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();
}