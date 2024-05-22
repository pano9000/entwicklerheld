package de.entwicklerheld.spaceshipchallenge.controller;

import de.entwicklerheld.spaceshipchallenge.components.CheckInRequestObject;
import de.entwicklerheld.spaceshipchallenge.components.ICheckInLog;
import de.entwicklerheld.spaceshipchallenge.components.MessageResponse;
import de.entwicklerheld.spaceshipchallenge.components.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;


@RestController
public class AccessController {

    protected final ICheckInLog checkInLog;

    public AccessController(ICheckInLog checkInLog) {
        this.checkInLog = checkInLog;
    }

    public static boolean isValidShipId(String shipId) {
        throw new NotImplementedException();
    }

    @RequestMapping(value = "/check-in", method = RequestMethod.POST)
    public ResponseEntity<MessageResponse> checkIn(@RequestBody CheckInRequestObject request) {
        throw new NotImplementedException();
    }
}

