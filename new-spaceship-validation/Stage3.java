package de.entwicklerheld.spaceshipchallenge.controller;

import de.entwicklerheld.spaceshipchallenge.components.CheckPersonRequestObject;
import de.entwicklerheld.spaceshipchallenge.components.MessageResponse;
import de.entwicklerheld.spaceshipchallenge.components.PersonCatalog;
import de.entwicklerheld.spaceshipchallenge.components.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;


@RestController
public class AccessPersonController {

    protected final PersonCatalog personCatalog;

    public AccessPersonController(PersonCatalog personCatalog) {
        this.personCatalog = personCatalog;
    }

    @RequestMapping(value = "/check-person", method = RequestMethod.POST)
    public ResponseEntity<MessageResponse> checkPerson(@RequestBody CheckPersonRequestObject request) {
        throw new NotImplementedException();
    }
}

