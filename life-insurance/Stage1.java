package entwicklerheldchallenge.stage1;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;


@RestController
@RequestMapping(path = "/api")
public class Stage1 {
    private static final BigDecimal HANDLING_COSTS_IN_PERCENT = new BigDecimal("0.02");
    private static final BigDecimal SMOKING_SURCHARGE_IN_PERCENT = new BigDecimal("0.03");
    private static final BigDecimal TWELVE_MONTHS = new BigDecimal("12");


    @RequestMapping(path = "/payout", method = RequestMethod.GET)
    public int getPayout(
            @RequestParam int monthlyPayment,
            @RequestParam int lifetimeInYears,
            @RequestParam boolean isSmoker
    ) {

        BigDecimal monthlyDeductionRate = (isSmoker) ? HANDLING_COSTS_IN_PERCENT.add(SMOKING_SURCHARGE_IN_PERCENT) : HANDLING_COSTS_IN_PERCENT;

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
