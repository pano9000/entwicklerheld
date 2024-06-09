package entwicklerheldchallenge.stage3;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import entwicklerheldchallenge.Risk;

// not sure what this class is useful for, unless we are supposed to edit fields via Reflection, which wouldn't be too helpful here
//import entwicklerheldchallenge.Costs; 


public class Stage3 {
    //private static final BigDecimal NO_RISK = new BigDecimal(0);
    private static final BigDecimal TWELVE_MONTHS = new BigDecimal(12);

	private static final Map<Risk, Map<LocalDate, BigDecimal>> riskSurcharges = new HashMap<Risk, Map<LocalDate, BigDecimal>>();
	private static final Map<LocalDate, BigDecimal> handlingCosts = new HashMap<LocalDate, BigDecimal>();

    // this feels stupid, these type of values should rather be stored inside a DB 
    // or at the very least be a separate class
    {
        addRiskSurchargeEntry(Risk.NOTHING, "2019-01-01", "0");

        addRiskSurchargeEntry(Risk.SMOKER, "2019-01-01", "0.03"); 
        addRiskSurchargeEntry(Risk.SMOKER, "2020-06-01", "0.04"); 

        addRiskSurchargeEntry(Risk.PROFESSIONAL_GROUP, "2019-01-01", "0.05");
        addRiskSurchargeEntry(Risk.PROFESSIONAL_GROUP, "2022-06-01", "0.065");

        addRiskSurchargeEntry(Risk.EXTREME_ATHLETE, "2019-01-01", "0.08");
        addRiskSurchargeEntry(Risk.EXTREME_ATHLETE, "2020-06-01", "0.075");

        handlingCosts.put(LocalDate.parse("2019-01-01"), new BigDecimal("0.02"));
        handlingCosts.put(LocalDate.parse("2020-06-01"), new BigDecimal("0.025"));
        handlingCosts.put(LocalDate.parse("2022-06-01"), new BigDecimal("0.03"));

    }

    @RequestMapping(path = "/payout", method = RequestMethod.GET)
    public int getPayout(
            @RequestParam int monthlyPayment,
            @RequestParam int lifetimeInYears,
            @RequestParam LocalDate policyStartDate,
            @RequestParam List<Risk> risks
    ) {

		BigDecimal monthlyDeductionRate = handlingCosts.get(getApplicableDateForPolicy(handlingCosts.keySet(), policyStartDate));

		for (Risk risk : risks) {
            Map<LocalDate, BigDecimal> currentRiskSurcharges = riskSurcharges.get(risk);
            LocalDate riskSurchargeDate = getApplicableDateForPolicy(currentRiskSurcharges.keySet(), policyStartDate);
            monthlyDeductionRate = monthlyDeductionRate.add(currentRiskSurcharges.get(riskSurchargeDate));	
		}

		BigDecimal monthlyPaymentBD = BigDecimal.valueOf(monthlyPayment);
        BigDecimal monthlyPayout = monthlyPaymentBD.subtract(monthlyPaymentBD.multiply(monthlyDeductionRate));

        BigDecimal lifetimePayout = 
            monthlyPayout
            .multiply(TWELVE_MONTHS)
            .multiply(BigDecimal.valueOf(lifetimeInYears))
        ;

		return lifetimePayout.intValue();

    }

    private void addRiskSurchargeEntry(Risk risk, String dateStr, String percentageStr) {

        riskSurcharges.putIfAbsent(risk, new HashMap<LocalDate, BigDecimal>());
        riskSurcharges.get(risk).putIfAbsent(LocalDate.parse(dateStr), new BigDecimal(percentageStr));

    }

    private LocalDate getApplicableDateForPolicy(Set<LocalDate> dates, LocalDate policyStartDate) {
        // use reduce?
        LocalDate applicableDate = null;
        long diffDaysApplicableDateToPolicyStartDate = Long.MAX_VALUE;

        for (LocalDate date : dates) {

            if (applicableDate == null) {
                applicableDate = date;
            }

            if (date.isAfter(policyStartDate)) {
                continue;
            }

            long diffDays = ChronoUnit.DAYS.between(date, applicableDate);

            if (diffDays < diffDaysApplicableDateToPolicyStartDate) {
                applicableDate = date;
                diffDaysApplicableDateToPolicyStartDate = diffDays;
            }

        }

        return applicableDate;
    }
}
