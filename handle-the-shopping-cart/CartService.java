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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.LinkedList;
import java.util.List;
import java.util.Collections;
import java.util.Collection;


@SpringBootApplication
@RestController
public class CartService {

    HashMap<String, Object> data = new HashMap<>();
    //HashMap<String, Recommendation> recommendations = new HashMap<>();
    RecommendationService recommendationService = new RecommendationService();

    @Autowired
    HttpSession httpSession;

    @RequestMapping(value = "/update-cart", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> updateCart() {
        Object userId = httpSession.getAttribute("UserId");
        //System.out.println(userId.toString());
        data.put(userId.toString(), httpSession.getAttribute("Cart"));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/get-cart", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getCart() {
        
        Object userId = httpSession.getAttribute("UserId");
        List<String> sessionCart = getSessionCart(userId.toString());
        return new ResponseEntity<>(sessionCart, HttpStatus.OK);
    }

    @RequestMapping(value = "/checkout-cart", method = RequestMethod.POST)
    public ResponseEntity<String> checkoutCart() {
        CheckoutService checkoutService = CheckoutService.getInstance();
        String userId = (String)httpSession.getAttribute("UserId");
        List<String> sessionCart = getSessionCart(userId);

        if (!checkoutService.checkoutCart(userId, sessionCart)) {
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);    //TODO use correct http status
        };
        
        updateRecommendations(sessionCart);
        //System.out.println(this.recommendationService.data.getOrDefault("0000000000012", new Recommendation("null")).buyCount);
        data.remove(userId);            
        return new ResponseEntity<>(HttpStatus.OK);

    }



    @RequestMapping(value = "/get-recommendations", method = RequestMethod.GET)
    public ResponseEntity<List<String>> getRecommendations() {
        System.out.println("-----------------GetRec-----: ");
        //System.out.println(recommendationService.data.get("0000000000002").buyCount.toString());

        String userId = (String)httpSession.getAttribute("UserId");

        List<String> cart = (List<String>)httpSession.getAttribute("Cart");
        System.out.println("\t-----------cart----: " + cart.toString());

        //List<String> sessionCart = getSessionCart(userId);
        List<String> recommendedEans = new ArrayList<String>();
        //System.out.println("GetRec-----------\n" + sessionCart.toString() + "\n---------------");
        for (String item : cart) {
            String res = recommendationService.getRecommendationForEAN(item, cart, recommendedEans);
            System.out.println("\t\treccomedation for item: '" + item + "' // " + res);
            recommendedEans.add(res);
        }

        //Collections.sort(recommendedEans);

        return new ResponseEntity<>(recommendedEans, HttpStatus.OK);

    }

    private List<String> getSessionCart(String userId) {
        List<String> userCartObj = (List<String>)data.getOrDefault(userId, new LinkedList<String>());

        return userCartObj;

    }

    private void updateRecommendations(List<String> userCartItems) {
    for (String item : userCartItems) {
        recommendationService.addEntry(item, new Recommendation(item));
        Recommendation currentRec = recommendationService.data.get(item);

        for (String sItem : userCartItems) {
            if (!sItem.equals(item)) {
                currentRec.addBoughtWithEntry(sItem);
            }
        }

        }

    }

    private class Recommendation {
        public String ean;
        public Integer buyCount;
        public Map<String, Recommendation> boughtWith;

        public Recommendation(String ean) {
            this.ean = ean;
            this.buyCount = 0;
            this.boughtWith = new HashMap<String, Recommendation>();
        }

        public void addBoughtWithEntry(String boughtWithEan) {
            boughtWith.putIfAbsent(boughtWithEan, new Recommendation(boughtWithEan));
            Recommendation sCurrentRec = boughtWith.get(boughtWithEan);
            sCurrentRec.buyCount++;
        }


    }

    private class RecommendationService {
        public HashMap<String, Recommendation> data = new HashMap<String, Recommendation>();
        public boolean addEntry(String addEan, Recommendation addRecommendation) {
            Recommendation currEntry = data.get(addEan);
            if (currEntry == null) {
                data.put(addEan, addRecommendation);
                return true;
            }
            currEntry.buyCount++;

            for (Map.Entry<String, Recommendation> addRecEntry : addRecommendation.boughtWith.entrySet()) {
                Recommendation w = addRecEntry.getValue();
                currEntry.addBoughtWithEntry(w.ean);
            }

            return true;
        }

        public String getRecommendationForEAN(String ean, List<String> cart, List<String> currentRecommedations) {
            //List<String> highestBuyCountItems = getEanHighestBuyCountItems(ean);
            List<Recommendation> highestBuyCountItems = getItemsSortedBySold(data.get(ean).boughtWith.values());
            System.out.println("\t\t\tgetRecommendationForEAN: " + ean + " // " + highestBuyCountItems.toString());
/*
            // if ean is not in cart and is only one -> use that item
            if (highestBuyCountItems.size() == 1 && !cart.contains(highestBuyCountItems.get(0))) {
                return highestBuyCountItems.get(0);
            }
*/

            // if ean is not in cart and is more then one -> get the one with higher individual buy count
            for (Recommendation highCountItemEan : highestBuyCountItems) {
                if (cart.contains(highCountItemEan.ean)) {
                    System.out.println("\t\t\t\tisAlready in cart, skipping: " + highCountItemEan.ean + " // " + cart.contains(highCountItemEan.ean));
                    continue;
                } 
                return highCountItemEan.ean;
            }

            List<Recommendation> v = getItemsSortedBySold(data.values());
            
            for (Recommendation it : v) {
                if (!cart.contains(it.ean) && !currentRecommedations.contains(it.ean)) {
                    System.out.println("\t\t\t\tGetting most sold item not in cart: " + it.ean);
                    return it.ean;
                }
            }
            // if eans are all in cart -> get most sold item overall -> TODO method
         /*   String mostSold = getMostSoldItemOverall();
            if (!cart.contains(mostSold) && !currentRecommedations.contains(mostSold)) {
                System.out.println("\t\t\tReturning MostSold: " + mostSold + " // ");
                return mostSold;
            }*/
            return "";

        }

        private List<String> getEanHighestBuyCountItems(String ean) {
            Recommendation currRec = data.get(ean);
            List<String> abc = new ArrayList<>();

            int maxBuyCount = 0;
            for ( Recommendation recommendation : currRec.boughtWith.values()) {
                System.out.println("\t\t\t" + recommendation.ean + " // " + recommendation.buyCount);

                if (maxBuyCount < recommendation.buyCount) {
                    maxBuyCount = recommendation.buyCount;
                }

            }

            for (Recommendation recommendation : currRec.boughtWith.values()) {
                if (recommendation.buyCount == maxBuyCount) {
                    abc.add(recommendation.ean);
                }
            }
            System.out.println("\t\t\thighest buycount: " +  maxBuyCount + ": " + abc.toString());
            return abc;

        }

        private String getMostSoldItemOverall() {

            int maxBuyCount = 0;
            String ean = "";
            for ( Recommendation recommendation : data.values()) {
                if (maxBuyCount < recommendation.buyCount) {
                    ean = recommendation.ean;
                    maxBuyCount = recommendation.buyCount;
                }
            }

            return ean;
        }

        private List<Recommendation> getItemsSortedBySold(Collection<Recommendation> originalItems) {

            List<Recommendation> items = new ArrayList<Recommendation>(originalItems);
            //System.out.println("b: " + items.toString());

            Collections.sort(items, (a, b) -> {
                return b.buyCount - a.buyCount;
             });
            //System.out.println("after: " + items.toString());

            return items;
        }

    }


    public static void main(String[] args) throws Exception {
        SpringApplication.run(CartService.class, args);
    }

    private void unused() {
                CheckoutService checkoutService = CheckoutService.getInstance();
        System.out.println("checkoutdata size " + checkoutService.data.size());
        System.out.println("checkiztjeyset " + checkoutService.data.keySet().toString());
        /*
            "0000000000005": {
                buy_count: integer,
                bought_with: {
                    ean: Integer
                }
            }


        */
        HashMap<String, HashMap<String, Object>> abc = new HashMap<String, HashMap<String, Object>>();
        for (List<String> eans : checkoutService.data.values()) {
            System.out.println(eans.toString());
            for (String ean : eans) {
                System.out.println("\t" + ean);

                abc.putIfAbsent(ean, new HashMap<String, Object>());

                HashMap<String, Object> current = abc.get(ean);

                current.putIfAbsent("buyCount", 0);
                current.putIfAbsent("boughtWith", new HashMap<String, Integer>());

                int buyCount = (int) current.get("buyCount");
                current.put("buyCount", ++buyCount);

            }
        }


        
        for (HashMap.Entry<String, HashMap<String, Object>> entry : abc.entrySet()) {
            System.out.println(entry.getKey());
            String hashEan = entry.getKey();

            for (List<String> eans : checkoutService.data.values()) {
                if (!eans.contains(hashEan)) {
                    continue;
                }
                HashMap<String, Integer> boughtWith = (HashMap)entry.getValue().get("boughtWith");

                for (String checkoutEan : eans) {
                    if (!checkoutEan.equals(hashEan)) {
                        Integer buyCountBoughtWith = boughtWith.getOrDefault(checkoutEan, 0);
                        boughtWith.put(checkoutEan, ++buyCountBoughtWith);
                    }
                }

            }

            System.out.println("\t" + entry.getValue().toString());

        }
    }
}

