package de.entwicklerheld.cartChallenge;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

public class CheckoutService {
    HashMap<String, List<String>> data = new HashMap<>();
    private static CheckoutService INSTANCE;

    public boolean checkoutCart(String userId, List<String> eans) {
        this.checkoutCart(userId, eans.toArray(new String[]{String.valueOf(eans)}));
        data.put(userId, eans);
        return true;
    }

    public boolean checkoutCart(String userId, String... eans) {
        LinkedList<String> allEans = new LinkedList<>(Arrays.asList(eans));
        data.put(userId, allEans);
        return true;
    }

    public static CheckoutService getInstance() {
        if (CheckoutService.INSTANCE == null) {
            CheckoutService.INSTANCE = new CheckoutService();
        }

        return CheckoutService.INSTANCE;
    }
}
