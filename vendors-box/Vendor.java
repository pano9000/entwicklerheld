package de.entwicklerheld.vendorsBox;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Vendor {
    private final static HashMap<String, Vendor> vendors = new HashMap<String, Vendor>();

    public static void clearVendors() {
        vendors.clear();
    }

    public static List<Vendor> getVendorsForArticle(String articleId) {
        return vendors.entrySet().stream()
                .filter(vendor -> vendor.getValue().offersArticle(articleId))
                .map(Map.Entry::getValue)
                .collect(Collectors.toList());
    }

    public static void addVendor(Vendor vendor) {
        String vendorId = vendor.getId();

        if (vendors.containsKey(vendorId)) {
            vendors.replace(vendorId, vendor);
        }
        else {
            vendors.put(vendorId, vendor);
        }
    }

    private String id;
    private String name;
    private double rating;
    private int numberOfRatings;
    private HashMap<String, ArticleOffer> offers;

    public Vendor(String id, String name, double rating, int numberOfRatings) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.numberOfRatings = numberOfRatings;
        this.offers = new HashMap<String, ArticleOffer>();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getRating() {
        return rating;
    }

    public int getNumberOfRatings() {
        return numberOfRatings;
    }

    public boolean offersArticle(String articleId) {
        return offers.containsKey(articleId);
    }

    public ArticleOffer getArticleOffer(String articleId) {
        if (!offersArticle(articleId))
            return null;

        return offers.get(articleId);
    }

    public void addArticleOffer(ArticleOffer articleOffer) {
        String articleId = articleOffer.getArticleId();

        if (offers.containsKey(articleId)) {
            offers.replace(articleId, articleOffer);
        }
        else {
            offers.put(articleId, articleOffer);
        }
    }
}
