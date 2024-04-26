package de.entwicklerheld.insuranceMatching;

//import java.util.stream.Collectors;
import java.util.stream.*;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

class InsuranceMatcher {

    static InsuranceMatcherResult getBestMatch(
            Insurance[] insuranceDatabase,
            InsuranceType insuranceType,
            InsurancePreference usersInsurancePreference
    ) {

        // get insurances by matching type
        List<Insurance> filteredInsurances = Arrays.stream(insuranceDatabase)
            .filter(currInsurance -> insuranceType.equals(currInsurance.getType()))
            .sorted((insuranceA, insuranceB) -> insuranceA.getMonthlyCosts().compareTo(insuranceB.getMonthlyCosts()))
            .collect(Collectors.toList());

        if (filteredInsurances.size() == 0) {
            return null;
        }

        // if there is no preference, return the one with the lowest price
        if (usersInsurancePreference == null) {
            return new InsuranceMatcherResult(filteredInsurances.get(0));
        }

        // get insurances by matching user Preference
        List<Insurance> moreFilteredInsurances = filteredInsurances.stream()

            .filter(currInsurance -> {
                InsurancePreferenceCalc wat = new InsurancePreferenceCalc(usersInsurancePreference, currInsurance.getInsurancePreference());
                if ( 
                    (wat.avgDeviation.compareTo(new BigDecimal("90")) == -1) 
                    || (wat.deviationInsuredSumQ.compareTo(new BigDecimal("0.9000")) == -1)
                    || (wat.deviationSpecificInsuredSumQ.compareTo(new BigDecimal("0.9000")) == -1)
                    || (wat.deviationDeductibleQ.compareTo(new BigDecimal("0.5000")) == -1)
                ) {
                    return false;
                }
                return true;
            })
            .sorted((insuranceA, insuranceB) -> insuranceA.getMonthlyCosts().compareTo(insuranceB.getMonthlyCosts()))
            .collect(Collectors.toList());
        

        if (moreFilteredInsurances.size() == 0) {
            return null;
        }

        if (moreFilteredInsurances.size() > 0) {
            return new InsuranceMatcherResult(
                moreFilteredInsurances.get(0),
                usersInsurancePreference,
                new InsurancePreferenceCalc(usersInsurancePreference, moreFilteredInsurances.get(0).getInsurancePreference()).avgDeviation
         );
        }

        
        
        return new InsuranceMatcherResult(filteredInsurances.get(0));
    }

    //TODO rename to something better fitting
    private static class InsurancePreferenceCalc {

        private int scale = 4;
        private int rounding = BigDecimal.ROUND_HALF_UP;

        private BigDecimal baseHundred = new BigDecimal("100.0000");
        private BigDecimal baseThree = new BigDecimal("3.0000");
        private BigDecimal maxMatch = new BigDecimal("1.1000");
        
        private BigDecimal deviationInsuredSumQ;
        private BigDecimal deviationDeductibleQ;
        private BigDecimal deviationSpecificInsuredSumQ;
        public BigDecimal avgDeviation;
        
        public InsurancePreferenceCalc(InsurancePreference userPreference, InsurancePreference insurancePreference) {

            this.deviationInsuredSumQ = this.calcWeightedQuotient(userPreference.getInsuredSum(), insurancePreference.getInsuredSum());
            this.deviationDeductibleQ = this.calcWeightedQuotient(insurancePreference.getDeductible(), userPreference.getDeductible());
            this.deviationSpecificInsuredSumQ = this.calcWeightedQuotient(userPreference.getSpecificInsuredSum(), insurancePreference.getSpecificInsuredSum());
            
            this.calcAverage(userPreference, insurancePreference);

        }
        private void calcAverage(InsurancePreference userPreference, InsurancePreference insurancePreference) {

            BigDecimal sum = this.deviationInsuredSumQ.add(this.deviationDeductibleQ).add(this.deviationSpecificInsuredSumQ);
            BigDecimal toHundred = sum.multiply(this.baseHundred);

            this.avgDeviation = toHundred.divide(this.baseThree, this.scale, this.rounding);
        }

        private BigDecimal calcWeightedQuotient(BigDecimal a, BigDecimal b) {
            BigDecimal quotient = b.divide(a, this.scale, this.rounding);
            return (quotient.compareTo(this.maxMatch) == -1) ? quotient : this.maxMatch;
        }

    }

}