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
        // write your code here
    }
}

