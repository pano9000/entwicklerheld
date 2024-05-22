package de.entwicklerheld.spaceshipchallenge.components;

public interface ICheckInLog {
    public void checkIn(String shipID);

    public boolean isAlreadyCheckedIn(String shipID);
}
