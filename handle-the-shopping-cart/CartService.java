package de.entwicklerheld.cartChallenge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.List;
import java.util.Collections;
import java.util.Collection;


@SpringBootApplication
@RestController
public class CartService {

    HashMap<String, Object> userCarts = new HashMap<>();
    RecommendationService recommendationService = new RecommendationService();

    @Autowired
    HttpSession httpSession;

    @RequestMapping(value = "/update-cart", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> updateCart() {

        String userId = (String) httpSession.getAttribute("UserId");
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);    
        }

        List<String> sessionCart = getCartFromSession();

        userCarts.put(
            userId, 
            (sessionCart != null) ? sessionCart : new LinkedList<String>()
        );

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/get-cart", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getCart() {
        
        String userId = (String) httpSession.getAttribute("UserId");
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);    
        }

        List<String> userCart = getCartByUserId(userId);
        httpSession.setAttribute("Cart", userCart);

        return new ResponseEntity<>(userCart, HttpStatus.OK);
    }

    @RequestMapping(value = "/checkout-cart", method = RequestMethod.POST)
    public ResponseEntity<String> checkoutCart() {
        // ideally this should be dependency injected as function parameter
        CheckoutService checkoutService = CheckoutService.getInstance();

        String userId = (String) httpSession.getAttribute("UserId");
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);    
        }

        List<String> userCart = getCartByUserId(userId);

        // throw error, if checkout fails
        if (!checkoutService.checkoutCart(userId, userCart)) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        };
        
        recommendationService.updateRecommendationsFromCart(userCart);
        userCarts.remove(userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @RequestMapping(value = "/get-recommendations", method = RequestMethod.GET)
    public ResponseEntity<List<String>> getRecommendations() {

        String userId = (String)httpSession.getAttribute("UserId");
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);    
        }

        // it is weird, that here the cart is only available from the session and not the stored user data
        List<String> userCart = getCartFromSession();
        List<String> recommendedEans = recommendationService.getRecommendationsForCart(userCart);

        return new ResponseEntity<>(recommendedEans, HttpStatus.OK);
    }

    private List<String> getCartByUserId(String userId) {
        return (List<String>) userCarts.getOrDefault(userId, new LinkedList<String>());
    }

    private List<String> getCartFromSession() {
        Object httpSessionCart = httpSession.getAttribute("Cart");
        return (httpSessionCart instanceof List) ? (List<String>) httpSessionCart : new LinkedList<String>();
    }


    // this should've been a separate file ideally, but we cannot do that here :-(
    private class Recommendation {
        public String ean;
        public Integer buyCount;
        public Map<String, Recommendation> boughtWith;

        public Recommendation(String ean) {
            this.ean = ean;
            this.buyCount = 1;
            this.boughtWith = new HashMap<String, Recommendation>();
        }

        public void addBoughtWithEntry(String boughtWithEan) {
            if (boughtWith.get(boughtWithEan) == null) {
                boughtWith.put(boughtWithEan, new Recommendation(boughtWithEan));
            } else {
                boughtWith.get(boughtWithEan).buyCount++;
            }
        }

        @Override
        public String toString() {
            return String.format("EAN: %s | Buy Count: %d | boughtWith: %s", ean, buyCount, boughtWith.toString());
        }

    }

    // this should've been a separate file ideally, but we cannot do that here :-(
    private class RecommendationService {
        public HashMap<String, Recommendation> recommendationData = new HashMap<String, Recommendation>();

        public void addEntry(String ean, Recommendation recommendation) {

            Recommendation currentEntry = recommendationData.get(ean);

            if (currentEntry == null) {
                recommendationData.put(ean, recommendation);
            } else {
                currentEntry.buyCount++;
            }

            for (Recommendation addRecEntry : recommendation.boughtWith.values()) {
                if (!ean.equals(addRecEntry.ean)) {
                    currentEntry.addBoughtWithEntry(addRecEntry.ean);
                }
            }

        }

        public void updateRecommendationsFromCart(List<String> cart) {
            for (String ean : cart) {
                addEntry(ean, new Recommendation(ean));
                Recommendation currentRec = recommendationService.recommendationData.get(ean);

                for (String sEan : cart) {
                    if (!sEan.equals(ean)) {
                        currentRec.addBoughtWithEntry(sEan);
                    }
                }
            }

        }

        public String getRecommendationForEAN(String ean, List<String> cart, List<String> recommendedEans) {
            List<Recommendation> boughtWithEans = getItemsSortedBySold(recommendationData.get(ean).boughtWith.values());

            // try to get suitable item from "boughtWith" first
            for (Recommendation item : boughtWithEans) {
                if (!cart.contains(item.ean)) {
                    return item.ean;
                } 
            }

            // try to get suitable item from all items, if boughtWith items are all already in the cart
            List<Recommendation> allItems = getItemsSortedBySold(recommendationData.values());
            for (Recommendation item : allItems) {
                if (!cart.contains(item.ean) && !recommendedEans.contains(item.ean)) {
                    return item.ean;
                }
            }

            return null;
        }


        public List<String> getRecommendationsForCart(List<String> cart) {
            
            List<String> recommendedEans = new ArrayList<String>();

            for (String item : cart) {
                String recommendedEan = getRecommendationForEAN(item, cart, recommendedEans);
                if (recommendedEan != null) {
                    recommendedEans.add(recommendedEan);
                }
            }

            Collections.sort(recommendedEans);
            return recommendedEans;
        }

        private List<Recommendation> getItemsSortedBySold(Collection<Recommendation> originalItems) {
            List<Recommendation> items = new ArrayList<Recommendation>(originalItems);
            Collections.sort(items, (a, b) -> b.buyCount - a.buyCount);
            return items;
        }

    }


    public static void main(String[] args) throws Exception {
        SpringApplication.run(CartService.class, args);
    }

}
