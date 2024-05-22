package de.entwicklerheld.spaceshipchallenge;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import de.entwicklerheld.spaceshipchallenge.components.PersonCatalog;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Rule;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.http.HttpStatus;


import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {Application.class}, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PersonCheckTest {

    @LocalServerPort
    int port;

    @Autowired
    public PersonCatalog personCatalog;

    @Test
    public void verifyPersonNotInCatalog() throws UnirestException, JSONException {

        JSONObject personJSON = new JSONObject();
        personJSON.put("personName", "Testperson Person");

        String endpointUrl = String.format("http://localhost:%1$d/check-person", this.port);
        System.out.println(endpointUrl);
        HttpResponse<JsonNode> resp = Unirest.post(endpointUrl)
            .header("Content-Type", "application/json")
            .body(personJSON)
            .asJson();

        int responseStatus = resp.getStatus();

        assertEquals(
            String.format("You let a hostile ship with captain '%1$s' inside the mothership. Game over!", personJSON.get("personName")),
            HttpStatus.FORBIDDEN, 
            responseStatus
        );
    }
}

