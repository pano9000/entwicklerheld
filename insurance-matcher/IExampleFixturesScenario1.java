package de.entwicklerheld.insuranceMatching;

import java.math.BigDecimal;

interface IExampleFixturesScenario1 {

    public static final Insurance[] EXAMPLE_INSURANCE_DATABASE = new Insurance[]{
            new Insurance("Race & space", InsuranceType.FALLING_SATELLITES, new BigDecimal("5.00"), null),
            new Insurance("Kalanta", InsuranceType.FALLING_SATELLITES, new BigDecimal("45.24"), null),
            new Insurance("42ers", InsuranceType.FALLING_SATELLITES, new BigDecimal("19.24"), null),
            new Insurance("21ers", InsuranceType.FALLING_SATELLITES, new BigDecimal("34.24"), null),
            new Insurance("The broken ones", InsuranceType.WEDDING_INSURANCE, new BigDecimal("22.00"), null),
            new Insurance("Ice & Fire", InsuranceType.WEDDING_INSURANCE, new BigDecimal("10.11"), null),
            new Insurance("Umbrella", InsuranceType.WEDDING_INSURANCE, new BigDecimal("19.21"), null),
            new Insurance("Cold feet", InsuranceType.WEDDING_INSURANCE, new BigDecimal("50.25"), null),
            new Insurance("Bring it back", InsuranceType.WEDDING_INSURANCE, new BigDecimal("12.02"), null),
            new Insurance("SH", InsuranceType.FORTNITE_ACCOUNT, new BigDecimal("16.56"), null),
            new Insurance("G4A.it", InsuranceType.FORTNITE_ACCOUNT, new BigDecimal("16.45"), null),
            new Insurance("PlayAnd!Stop", InsuranceType.FORTNITE_ACCOUNT, new BigDecimal("16.23"), null),
            new Insurance("FarmersInc", InsuranceType.FORTNITE_ACCOUNT, new BigDecimal("16.29"), null),
    };

}
