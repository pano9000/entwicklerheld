package entwicklerheldchallenge.stage2;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import entwicklerheldchallenge.Risk;


public class Stage2 {
	private static final BigDecimal HANDLING_COSTS_IN_PERCENT = new BigDecimal("0.02");
	private static final BigDecimal NO_RISK = new BigDecimal(0);
	private static final BigDecimal SMOKING_SURCHARGE_IN_PERCENT = new BigDecimal("0.03");
	private static final BigDecimal RISKY_PROFESSIONAL_GROUP_SURCHARGE_IN_PERCENT = new BigDecimal("0.05");
	private static final BigDecimal EXTREME_ATHLETE_SURCHARGE_IN_PERCENT = new BigDecimal("0.08");
	private static final BigDecimal TWELVE_MONTHS = new BigDecimal(12);
	private static final Map<Risk, BigDecimal> riskToPercentage = new HashMap<Risk, BigDecimal>();
	
	{
		riskToPercentage.put(Risk.NOTHING, NO_RISK);
		riskToPercentage.put(Risk.SMOKER, SMOKING_SURCHARGE_IN_PERCENT);
		riskToPercentage.put(Risk.PROFESSIONAL_GROUP, RISKY_PROFESSIONAL_GROUP_SURCHARGE_IN_PERCENT);
		riskToPercentage.put(Risk.EXTREME_ATHLETE, EXTREME_ATHLETE_SURCHARGE_IN_PERCENT);
	}

	@RequestMapping(path = "/payout", method = RequestMethod.GET)
	public int getPayout(
			@RequestParam int monthlyPayment,
			@RequestParam int lifetimeInYears,
			@RequestParam List<Risk> risks
	) {
		
		BigDecimal monthlyDeductionRate = HANDLING_COSTS_IN_PERCENT;
		for (Risk risk : risks) {
			monthlyDeductionRate = monthlyDeductionRate.add(riskToPercentage.get(risk));	
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
}
