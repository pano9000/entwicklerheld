package de.entwicklerheld.bulpSwitcher;

import java.util.Objects;

public class BulbResult {
    public final String binaryState;
    public final int countOn;

    public BulbResult(String binaryState, int countOn) {
        this.binaryState = binaryState;
        this.countOn = countOn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BulbResult)) return false;
        BulbResult that = (BulbResult) o;
        return countOn == that.countOn && Objects.equals(binaryState, that.binaryState);
    }

    @Override
    public int hashCode() {
        return Objects.hash(binaryState, countOn);
    }

    @Override
    public String toString() {
        return "BulbResult{state='" + binaryState + "', on=" + countOn + "}";
    }
}
