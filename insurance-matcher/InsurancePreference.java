package de.entwicklerheld.insuranceMatching;

import java.math.BigDecimal;

public class InsurancePreference {

    private BigDecimal insuredSum;
    private BigDecimal deductible;
    private BigDecimal specificInsuredSum;

    public InsurancePreference(BigDecimal insuredSum, BigDecimal deductible, BigDecimal specificInsuredSum) {
        this.insuredSum = insuredSum;
        this.deductible = deductible;
        this.specificInsuredSum = specificInsuredSum;
    }

    public BigDecimal getInsuredSum() {
        return insuredSum;
    }

    public void setInsuredSum(BigDecimal insuredSum) {
        this.insuredSum = insuredSum;
    }

    public BigDecimal getDeductible() {
        return deductible;
    }

    public void setDeductible(BigDecimal deductible) {
        this.deductible = deductible;
    }

    public BigDecimal getSpecificInsuredSum() {
        return specificInsuredSum;
    }

    public void setSpecificInsuredSum(BigDecimal specificInsuredSum) {
        this.specificInsuredSum = specificInsuredSum;
    }

    @Override
    public String toString() {
        return String.format("insuredSum = %f, deductible = %f, specificInsuredSum = %f", this.insuredSum, this.deductible, this.specificInsuredSum);
    }

    @Override
    public boolean equals(Object object) {
        if (object == this) {
            return true;
        }

        if (!(object instanceof InsurancePreference)) {
            return false;
        }

        InsurancePreference insurancePreference = (InsurancePreference) object;

        return this.insuredSum.compareTo(insurancePreference.insuredSum) == 0
                && this.deductible.compareTo(insurancePreference.deductible) == 0
                && this.specificInsuredSum.compareTo(insurancePreference.specificInsuredSum) == 0;
    }

}
