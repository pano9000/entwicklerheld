package de.entwicklerheld.vendorsBox;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.HashMap;

public class VendorsBox {

    private HashMap<String, Double> selectionCount = new HashMap<String, Double>();
    public Vendor findBestVendor(Article article) {
        // scenario 1
        // implement this function
        System.out.println((double)0 + 1);
        List<Vendor> vendorList = Vendor.getVendorsForArticle(article.getId());

        double lowestPrice = getLowestPriceOfVendors(vendorList, article);
        List<Vendor> filteredByPrice = vendorsByPrice(vendorList, article, lowestPrice);

        if (filteredByPrice.size() == 1) {
            return filteredByPrice.get(0);
        }

        List<Vendor> f = filteredByPrice.stream()
                        .sorted((vendorA, vendorB) -> {
                            int shippingTimeA = vendorA.getArticleOffer(article.getId()).getShippingTime();
                            int shippingTimeB = vendorB.getArticleOffer(article.getId()).getShippingTime();

                            if (shippingTimeA < shippingTimeB) return -1;
                            if (shippingTimeB > shippingTimeA) return 1;

                            // if shipping is the same, continue
                            
                            // sort by rating
                            double ratings[] = {vendorA.getRating(), vendorB.getRating()};
                            
                            if (Double.compare(ratings[0], ratings[1]) > 0) return -1;
                            if (Double.compare(ratings[0], ratings[1]) < 0) return 1;

                            // if ratring is the same, continue with number of ratings

                            if (vendorA.getNumberOfRatings() > vendorB.getNumberOfRatings()) return -1;
                            if (vendorA.getNumberOfRatings() < vendorB.getNumberOfRatings()) return 1;
                            

                            // if number of rating is same, continue with availability
                            
                            int availability[] = {vendorA.getArticleOffer(article.getId()).getAvailability(), vendorB.getArticleOffer(article.getId()).getAvailability()};

                            // higher availability == better
                            if (availability[0] > availability[1]) return -1;
                            if (availability[0] < availability[1]) return 1;
                            

                        // sort by rating, then by availability 
                        /*
                            if (shippingTimeA == shippingTimeB) {
                                vendorA.getRating()
                            }
                        */

                            return 0;

                        })
                        .collect(Collectors.toList());





        return f.get(0);
    }

    public Vendor findFairBestVendor(Article article) {

        List<Vendor> vendorList = Vendor.getVendorsForArticle(article.getId());

        double lowestPrice = getLowestPriceOfVendors(vendorList, article);

        List<Vendor> filteredByPrice = vendorsByPrice(vendorList, article, lowestPrice);
        

        Double lowestSelectionCount = filteredByPrice.stream()
            .map(vendor -> selectionCount.getOrDefault(vendor.getId(), (double) 0))
            .reduce(Double.POSITIVE_INFINITY, Double::min);

        List<Vendor> filteredBySelectionCount = filteredByPrice.stream()
            .filter(vendor -> {
                return (Double.compare(selectionCount.getOrDefault(vendor.getId(), (double) 0), lowestSelectionCount) == 0);
            })
            .collect(Collectors.toList());

        Random rand = new Random();
        Vendor bestVendor = filteredBySelectionCount.get(rand.nextInt(filteredBySelectionCount.size()));


        selectionCount.put(bestVendor.getId(), selectionCount.getOrDefault(bestVendor.getId(), (double) 0) + 1);

        return bestVendor;

    }

    private double getLowestPriceOfVendors(List<Vendor> vendorList, Article article) {
        
        return vendorList
                .stream()
                .map(vendor -> vendor.getArticleOffer(article.getId()).getPrice())
                .reduce(Double.POSITIVE_INFINITY, Double::min);
    }

    private List<Vendor> vendorsByPrice(List<Vendor> vendorList, Article article, double lowestPrice) {
        
        return vendorList.stream()
                .filter(vendor -> {
                    double currentVendorPrice = vendor.getArticleOffer(article.getId()).getPrice();
                    return (Double.compare(currentVendorPrice, lowestPrice) == 0);
                })
                .collect(Collectors.toList());
    }

}