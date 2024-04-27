package de.entwicklerheld.insuranceMatching;

import java.math.BigDecimal;

class InsuranceMatcher {

    static InsuranceMatcherResult getBestMatch(
            Insurance[] insuranceDatabase,
            InsuranceType insuranceType,
            InsurancePreference usersInsurancePreference
    ) {

        BigDecimal currBestPrice = null;
        Insurance bestMatchingInsurance = null;
        InsurancePreferenceMatch bestMatchingInsurancePreference = null;

        for (Insurance currInsurance : insuranceDatabase) {

            if (!currInsurance.getType().equals(insuranceType)) continue;

            InsurancePreferenceMatch insurancePreferenceMatch = new InsurancePreferenceMatch(
                usersInsurancePreference, currInsurance.getInsurancePreference()
            );

            if (!insurancePreferenceMatch.isMatching) continue;

            if (currBestPrice == null || currInsurance.getMonthlyCosts().compareTo(currBestPrice) == -1) {
                currBestPrice = currInsurance.getMonthlyCosts();
                bestMatchingInsurance = currInsurance;
                bestMatchingInsurancePreference = insurancePreferenceMatch;
            }
        }

        InsuranceMatcherResult result = (bestMatchingInsurance == null) 
            ? null
            : (usersInsurancePreference == null)
                ? new InsuranceMatcherResult(bestMatchingInsurance)
                : new InsuranceMatcherResult(
                    bestMatchingInsurance,
                    usersInsurancePreference,
                    bestMatchingInsurancePreference.score
                );

        return result;
    }


    private static class InsurancePreferenceMatch {

        private int scale = 4;
        private int rounding = BigDecimal.ROUND_HALF_UP;

        private BigDecimal thresholdAvg = new BigDecimal("90.0000");
        private BigDecimal thresholdSum = new BigDecimal("0.9000");
        private BigDecimal thresholdDeductible = new BigDecimal("0.5000");
        private BigDecimal maxQuotient = new BigDecimal("1.1000");
        
        public BigDecimal insuredSumDeviationQuotient;
        public BigDecimal deductibleDeviationQuotient;
        public BigDecimal specificInsuredSumDeviationQuotient;
        public BigDecimal score;
        public Boolean isMatching;
        
        public InsurancePreferenceMatch(InsurancePreference userPreference, InsurancePreference insurancePreference) {
            this.init(userPreference, insurancePreference);
        }

        //unused here, but while we are at it, let's make the threshold changeable, if required
        public InsurancePreferenceMatch(InsurancePreference userPreference, InsurancePreference insurancePreference, BigDecimal[] matchingThresholds) {
            this.thresholdSum = matchingThresholds[0];
            this.thresholdDeductible = matchingThresholds[1];
            this.thresholdAvg = matchingThresholds[2];
            this.maxQuotient =  matchingThresholds[3];
            this.init(userPreference, insurancePreference);
        }
        private void init(InsurancePreference userPreference, InsurancePreference insurancePreference) {
                if (userPreference != null) {
                    this.insuredSumDeviationQuotient = this.calcQuotient(userPreference.getInsuredSum(), insurancePreference.getInsuredSum());
                    this.deductibleDeviationQuotient = this.calcQuotient(insurancePreference.getDeductible(), userPreference.getDeductible());
                    this.specificInsuredSumDeviationQuotient = this.calcQuotient(userPreference.getSpecificInsuredSum(), insurancePreference.getSpecificInsuredSum());
                    
                    this.score = this.calcAverage();
                    this.isMatching = this.checkIfMatch();
            } else {
                this.isMatching = true;
            }

        }

        private BigDecimal calcQuotient(BigDecimal a, BigDecimal b) {
            BigDecimal quotient = b.divide(a, this.scale, this.rounding);
            return (quotient.compareTo(this.maxQuotient) == -1) ? quotient : this.maxQuotient;
        }

        private BigDecimal calcAverage() {
            return  this.insuredSumDeviationQuotient
                        .add(this.deductibleDeviationQuotient)
                        .add(this.specificInsuredSumDeviationQuotient)
                        .multiply(new BigDecimal("100.0000"))
                        .divide(new BigDecimal("3.0000"), this.scale, this.rounding);
        }

        private Boolean checkIfMatch() {
            return ((this.score.compareTo(this.thresholdAvg) == -1) 
                    || (this.insuredSumDeviationQuotient.compareTo(this.thresholdSum) == -1)
                    || (this.specificInsuredSumDeviationQuotient.compareTo(this.thresholdSum) == -1)
                    || (this.deductibleDeviationQuotient.compareTo(this.thresholdDeductible) == -1)) 
                    ? false 
                    : true;
        }

    }

}