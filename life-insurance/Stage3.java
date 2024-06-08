package entwicklerheldchallenge.stage3;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import entwicklerheldchallenge.Risk;
import entwicklerheldchallenge.Costs;


public class Stage3 {
    private static final BigDecimal NO_RISK = new BigDecimal(0);


    @RequestMapping(path = "/payout", method = RequestMethod.GET)
    public int getPayout(
            @RequestParam int monthlyPayment,
            @RequestParam int lifetimeInYears,
            @RequestParam LocalDate policyStartDate,
            @RequestParam List<Risk> risks
    ) {
        // Implement this method
        // You can also add new methods or functions
        throw new RuntimeException("Not implemented yet.");

    }
}
