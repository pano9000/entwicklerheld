package de.entwicklerheld.insuranceMatching;
import java.math.BigDecimal;

public class Insurance {

    private InsuranceType type;
    private String name;
    private String description;
    private BigDecimal monthlyCosts;

    private InsurancePreference insurancePreference;

    public Insurance(String name, InsuranceType type, BigDecimal monthlyCosts, InsurancePreference insurancePreference) {
        this.name = name;
        this.type = type;
        this.monthlyCosts = monthlyCosts;
        this.insurancePreference = insurancePreference;
    }

    public InsurancePreference getInsurancePreference() {
        return insurancePreference;
    }

    public void setInsurancePreference(InsurancePreference insurancePreference) {
        this.insurancePreference = insurancePreference;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getMonthlyCosts() {
        return monthlyCosts;
    }

    public void setMonthlyCosts(BigDecimal monthlyCosts) {
        this.monthlyCosts = monthlyCosts;
    }

    public InsuranceType getType() {
        return type;
    }

    public void setType(InsuranceType type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return String.format("%s (%s)", this.name, this.type);
    }

}
