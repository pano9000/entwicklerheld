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


@RestController
public class AccessController {

    protected final ICheckInLog checkInLog;

    public AccessController(ICheckInLog checkInLog) {
        this.checkInLog = checkInLog;
    }

    public static boolean isValidShipId(String shipId) {
        
        int checksumAccumulator = 0;
        for (int i = 0; i <= shipId.length() - 2; i++) {
            checksumAccumulator += Character.getNumericValue(shipId.charAt(i)) * (i+1);
        }
        int checksumMod = checksumAccumulator % 11;
        char finalCheckDigit = (checksumMod == 10) ? 'X' : Character.forDigit(checksumMod, 10);

        return (shipId.charAt(shipId.length() - 1) == finalCheckDigit);
    }

    @RequestMapping(value = "/check-in", method = RequestMethod.POST)
    public ResponseEntity<MessageResponse> checkIn(@RequestBody CheckInRequestObject request) {

        MessageResponse responseMsg = new MessageResponse();

        if (!AccessController.isValidShipId(request.shipID)) {
            responseMsg.message = "Ship ID invalid. Defense system activated!";
            return new ResponseEntity<>(responseMsg, HttpStatus.FORBIDDEN);
        } 
        
        // should we check here, if the ship is already checked in, before checking in again?
        this.checkInLog.checkIn(request.shipID);
        responseMsg.message = "Ship ID valid. Welcome back!";
        return new ResponseEntity<>(responseMsg, HttpStatus.OK);
    
    }
}

