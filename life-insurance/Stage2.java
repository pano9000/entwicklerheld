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
	private static final BigDecimal HANDLING_COSTS_IN_PERCENT = new BigDecimal(2);
	private static final BigDecimal NO_RISK = new BigDecimal(0);
	private static final BigDecimal SMOKING_SURCHARGE_IN_PERCENT = new BigDecimal(3);
	private static final BigDecimal RISKY_PROFESSIONAL_GROUP_SURCHARGE_IN_PERCENT = new BigDecimal(5);
	private static final BigDecimal EXTREME_ATHLETE_SURCHARGE_IN_PERCENT = new BigDecimal(8);


	@RequestMapping(path = "/payout", method = RequestMethod.GET)
	public int getPayout(
			@RequestParam int monthlyPayment,
			@RequestParam int lifetimeInYears,
			@RequestParam List<Risk> risks
	) {
		// Implement this method
		// You can also add new methods or functions
		throw new RuntimeException("Not implemented yet.");
	}
}
