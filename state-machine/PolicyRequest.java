package de.entwicklerheld.stateMachine;

import java.util.Set;
import java.util.HashMap;
import java.util.HashSet;
import java.math.BigInteger;
import java.util.ArrayList;

public class PolicyRequest extends AbstractPolicyRequest implements IPolicyRequest {
    String currentState;
    HashMap<String, Set<String>> stateTransitions = new HashMap<String, Set<String>>();

    public PolicyRequest(String state) {
        this.currentState = state;
        this.initStateTransitions();
    }

    @Override
    public String getLeadState() {
        return this.currentState;
    }

    @Override
    public Set<String> getPossibleNextStates() {
        return stateTransitions.get(this.currentState);
    }

    @Override
    public boolean transitionState(String to) {
        Boolean isTransitionPossible = stateTransitions.get(this.currentState).contains(to);
        Boolean isIBANValid = isValidIBAN(this.getIBAN());
        
        if (isTransitionPossible && isIBANValid) {
            this.currentState = to;
        }
        return isTransitionPossible && isIBANValid;
    }

    private void initStateTransitions() {

        String[] states = {
            "INCOMPLETE",
            "NEW",
            "IN_REVIEW",
            "READY_FOR_TRANSMISSION",
            "TRANSMITTED",
            "SUCCESSFUL",
            "NOT_SUCCESSFUL",
            "ERROR", 
            "CANCELED",
            "INACTIVE",
            "DUPLICATE_FAKE"
        };


        for (String state : states) {
            this.stateTransitions.put(state, new HashSet<String>());
            if (
                (state != "NOT_SUCCESSFUL") 
                && (state != "ERROR") 
                && (state != "CANCELED")
                && (state != "INACTIVE")
                && (state != "DUPLICATE_FAKE")
                ) {
                this.stateTransitions.get(state).add("ERROR");
            }
        }
        
        this.stateTransitions.get("INCOMPLETE").add("NEW");
        this.stateTransitions.get("INCOMPLETE").add("DUPLICATE_FAKE");

        this.stateTransitions.get("NEW").add("DUPLICATE_FAKE");
        this.stateTransitions.get("NEW").add("IN_REVIEW");

        this.stateTransitions.get("IN_REVIEW").add("READY_FOR_TRANSMISSION");
        this.stateTransitions.get("IN_REVIEW").add("DUPLICATE_FAKE");

        this.stateTransitions.get("READY_FOR_TRANSMISSION").add("TRANSMITTED");

        this.stateTransitions.get("TRANSMITTED").add("SUCCESSFUL");
        this.stateTransitions.get("TRANSMITTED").add("NOT_SUCCESSFUL");

        this.stateTransitions.get("SUCCESSFUL").add("INACTIVE");
        this.stateTransitions.get("SUCCESSFUL").add("CANCELED");

    }


    private Boolean isValidIBAN(String iban) {
        if (iban == null) return false;
        String shiftedIBAN = iban.substring(4) + iban.substring(0, 4);
        String ibanInts = replaceIBANLetterByNumber(shiftedIBAN);
        BigInteger modulo97 = new BigInteger("97");
        Boolean isValidIBAN = (new BigInteger(ibanInts).remainder(modulo97).intValue() == 1);
        System.out.println("sys" + " " + iban + "//" + new BigInteger(ibanInts).remainder(modulo97).intValue() + "//" + isValidIBAN);

        return isValidIBAN;
    }

    private String replaceIBANLetterByNumber(String iban) {

        ArrayList<Integer> ibanInts = new ArrayList<Integer>();
        String ibans = "";
        for (Character letter : iban.toCharArray()) {
            ibanInts.add(Character.getNumericValue(letter));
            ibans += Character.getNumericValue(letter);
        }

        return ibans;

    }


}