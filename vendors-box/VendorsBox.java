package de.entwicklerheld.vendorsBox;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.HashMap;

public class VendorsBox {

    private HashMap<String, Double> vendorSelectionCount = new HashMap<String, Double>();
    public Vendor findBestVendor(Article article) {

        List<Vendor> vendorsWithLowestPrice = getVendorsWithLowestPrice(article);

        List<Vendor> vendorsSortedByCriteria = vendorsWithLowestPrice.stream()
                        .sorted((vendorA, vendorB) -> {
                            // sort by shipping times
                            // lower == better
                            int shippingTimes[] = {
                                vendorA.getArticleOffer(article.getId()).getShippingTime(),
                                vendorB.getArticleOffer(article.getId()).getShippingTime()
                            };
                            if (shippingTimes[0] < shippingTimes[1]) return -1;
                            if (shippingTimes[0] > shippingTimes[1]) return 1;


                            // if shipping is the same, continue with comparing by rating
                            // higher == better
                            double ratings[] = {vendorA.getRating(), vendorB.getRating()};                            
                            if (Double.compare(ratings[0], ratings[1]) > 0) return -1;
                            if (Double.compare(ratings[0], ratings[1]) < 0) return 1;


                            // if rating is the same, continue with comparing number of ratings
                            // higher == better
                            int numberOfRatings[] = {vendorA.getNumberOfRatings(), vendorB.getNumberOfRatings()};
                            if (numberOfRatings[0] > numberOfRatings[1]) return -1;
                            if (numberOfRatings[0] < numberOfRatings[1]) return 1;
                            

                            // if number of rating is same, continue with comparing availability qty  
                            // higher == better
                            int availability[] = {
                                vendorA.getArticleOffer(article.getId()).getAvailability(), 
                                vendorB.getArticleOffer(article.getId()).getAvailability()
                            };
                            if (availability[0] > availability[1]) return -1;
                            if (availability[0] < availability[1]) return 1;

                            return 0;
                        })
                        .collect(Collectors.toList());

        return vendorsSortedByCriteria.get(0);
    }

    public Vendor findFairBestVendor(Article article) {


        List<Vendor> vendorsWithLowestPrice = getVendorsWithLowestPrice(article);

        Double minVendorSelectionCount = vendorsWithLowestPrice.stream()
            .map(vendor -> vendorSelectionCount.getOrDefault(vendor.getId(), 0.0))
            .reduce(Double.POSITIVE_INFINITY, Double::min);

        List<Vendor> vendorsWithLowestSelectionCount = vendorsWithLowestPrice.stream()
            .filter(vendor -> (Double.compare(vendorSelectionCount.getOrDefault(vendor.getId(), 0.0), minVendorSelectionCount) == 0))
            .collect(Collectors.toList());

        Vendor bestVendor;

        if (vendorsWithLowestSelectionCount.size() == 1) {
            bestVendor = vendorsWithLowestSelectionCount.get(0);
        } else {
            Random rand = new Random();
            bestVendor = vendorsWithLowestSelectionCount.get(rand.nextInt(vendorsWithLowestSelectionCount.size()));
        }

        vendorSelectionCount.put(bestVendor.getId(), vendorSelectionCount.getOrDefault(bestVendor.getId(), 0.0) + 1);

        return bestVendor;

    }

    private double getLowestPriceOfVendors(List<Vendor> vendors, Article article) {
        
        return vendors.stream()
                .map(vendor -> vendor.getArticleOffer(article.getId()).getPrice())
                .reduce(Double.POSITIVE_INFINITY, Double::min);
    }

    private List<Vendor> getVendorsWithLowestPrice(Article article) {

        List<Vendor> articleVendors = Vendor.getVendorsForArticle(article.getId());

        double lowestPrice = getLowestPriceOfVendors(articleVendors, article);

        List<Vendor> vendorsWithLowestPrice = articleVendors.stream()
            .filter(vendor -> {
                double currentVendorPrice = vendor.getArticleOffer(article.getId()).getPrice();
                return (Double.compare(currentVendorPrice, lowestPrice) == 0);
            })
            .collect(Collectors.toList());

        return vendorsWithLowestPrice;
    }

}