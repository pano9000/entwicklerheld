package de.entwicklerheld.stateMachine;

import java.util.Set;


public class PolicyRequest extends AbstractPolicyRequest implements IPolicyRequest {

    public PolicyRequest(String state) {
        throw new RuntimeException("Not implemented yet");
    }

    @Override
    public String getLeadState() {
        throw new RuntimeException("Not implemented yet");
    }

    @Override
    public Set<String> getPossibleNextStates() {
        throw new RuntimeException("Not implemented yet");
    }

    @Override
    public boolean transitionState(String to) {
        throw new RuntimeException("Not implemented yet");
    }



}