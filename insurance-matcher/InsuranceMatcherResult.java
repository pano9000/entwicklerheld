package de.entwicklerheld.insuranceMatching;

import java.math.BigDecimal;

public class InsuranceMatcherResult {

    private InsurancePreference insurancePreference;
    private Insurance insurance;
    private BigDecimal matchingScore;

    public InsuranceMatcherResult() {}

    public InsuranceMatcherResult(Insurance insurance, InsurancePreference insurancePreference, BigDecimal matchingScore) {
        this.insurance = insurance;
        this.insurancePreference = insurancePreference;
        this.matchingScore = matchingScore;
    }

    public InsuranceMatcherResult(Insurance insurance) {
        this.insurance = insurance;
        this.insurancePreference = null;
        this.matchingScore = new BigDecimal("0.0");
    }

    public InsurancePreference getInsurancePreference() {
        return insurancePreference;
    }

    public void setInsurancePreference(InsurancePreference insurancePreference) {
        this.insurancePreference = insurancePreference;
    }

    public Insurance getInsurance() {
        return insurance;
    }

    public void setInsurance(Insurance insurance) {
        this.insurance = insurance;
    }

    public BigDecimal getMatchingScore() {
        return matchingScore;
    }

    public void setMatchingScore(BigDecimal matchingScore) {
        this.matchingScore = matchingScore;
    }

    @Override
    public String toString() {
        // yeah, okay you found this. but... it has to look good in the assertion message, so calm down. if this algorithm goes live we will make this more readable!!
        return String.format("\n\nInsuranceMatcherResult\ninsurance:                   %s\ninsurancePreference:         %s\nuserInsurancePreference:     %s\nmatchingScore:               %f\n\n", this.insurance, this.getInsurance().getInsurancePreference(), this.insurancePreference, this.matchingScore);
    }

    @Override
    public boolean equals(Object object) {
        if (object == this) {
            return true;
        }

        if (!(object instanceof InsuranceMatcherResult)) {
            return false;
        }

        InsuranceMatcherResult insuranceMatcherResult = (InsuranceMatcherResult) object;

        return this.insurance == insuranceMatcherResult.insurance
            && this.matchingScore.compareTo(insuranceMatcherResult.matchingScore) == 0
            && this.insurancePreference == insuranceMatcherResult.insurancePreference;
    }
}
