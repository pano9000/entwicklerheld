package de.entwicklerheld.cartChallenge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

@SpringBootApplication
@RestController
public class CartService {

    HashMap<String, Object> data = new HashMap<>();

    @Autowired
    HttpSession httpSession;

    @RequestMapping(value = "/update-cart", method = RequestMethod.POST)
    public @ResponseBody
    String updateCart() {
        throw new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED, "Not implemented");
    }

    @RequestMapping(value = "/get-cart", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getCart() {
        throw new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED, "Not implemented");
    }

    @RequestMapping(value = "/checkout-cart", method = RequestMethod.POST)
    public ResponseEntity<String> checkoutCart() {
        CheckoutService checkoutService = CheckoutService.getInstance();
        throw new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED, "Not implemented");
    }

    @RequestMapping(value = "/get-recommendations", method = RequestMethod.GET)
    public ResponseEntity<List<String>> getRecommendations() {
        throw new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED, "Not implemented");
    }


    public static void main(String[] args) throws Exception {
        SpringApplication.run(CartService.class, args);
    }
}
