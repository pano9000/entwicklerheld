package de.entwicklerheld.stateMachine;

import java.util.Set;
import java.util.HashMap;
import java.util.HashSet;
import java.math.BigInteger;

public class PolicyRequest extends AbstractPolicyRequest implements IPolicyRequest {
    String currentState;
    static HashMap<String, Set<String>> stateTransitions = new HashMap<String, Set<String>>();

    static {
        initStateTransitions();
    }

    public PolicyRequest(String state) {
        this.currentState = state;
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

    static private void initStateTransitions() {

        String[] transitionStates = {
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

        for (String state : transitionStates) {
            stateTransitions.put(state, new HashSet<String>());
            if ((state != "NOT_SUCCESSFUL") 
                && (state != "ERROR") 
                && (state != "CANCELED")
                && (state != "INACTIVE")
                && (state != "DUPLICATE_FAKE")) {
                    stateTransitions.get(state).add("ERROR");
            }
        }
        
        stateTransitions.get("INCOMPLETE").add("NEW");
        stateTransitions.get("INCOMPLETE").add("DUPLICATE_FAKE");

        stateTransitions.get("NEW").add("DUPLICATE_FAKE");
        stateTransitions.get("NEW").add("IN_REVIEW");

        stateTransitions.get("IN_REVIEW").add("READY_FOR_TRANSMISSION");
        stateTransitions.get("IN_REVIEW").add("DUPLICATE_FAKE");

        stateTransitions.get("READY_FOR_TRANSMISSION").add("TRANSMITTED");

        stateTransitions.get("TRANSMITTED").add("SUCCESSFUL");
        stateTransitions.get("TRANSMITTED").add("NOT_SUCCESSFUL");

        stateTransitions.get("SUCCESSFUL").add("INACTIVE");
        stateTransitions.get("SUCCESSFUL").add("CANCELED");

    }


    private Boolean isValidIBAN(String iban) {
        if (iban == null) return false;
        String shiftedIBAN = iban.substring(4) + iban.substring(0, 4);
        String replacedIBAN = replaceIBANLetterByNumber(shiftedIBAN);
        BigInteger modulo97 = new BigInteger("97");
        Boolean isValidIBAN = (new BigInteger(replacedIBAN).remainder(modulo97).intValue() == 1);

        return isValidIBAN;
    }

    private String replaceIBANLetterByNumber(String iban) {
        String replacedIBAN = "";
        for (Character letter : iban.toUpperCase().toCharArray()) {
            replacedIBAN += Character.getNumericValue(letter);
        }

        return replacedIBAN;
    }


}