package entwicklerheldchallenge.stage1;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;


@RestController
@RequestMapping(path = "/api")
public class Stage1 {
    private static final BigDecimal HANDLING_COSTS_IN_PERCENT = new BigDecimal("2");
    private static final BigDecimal SMOKING_SURCHARGE_IN_PERCENT = new BigDecimal("3");


    @RequestMapping(path = "/payout", method = RequestMethod.GET)
    public int getPayout(
            @RequestParam int monthlyPayment,
            @RequestParam int lifetimeInYears,
            @RequestParam boolean isSmoker
    ) {
        // Implement this method
        // You can also add new methods or functions
        throw new RuntimeException("Not implemented yet.");
    }
}
