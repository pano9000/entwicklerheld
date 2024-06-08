package de.entwicklerheld.knapsackJava;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.ArrayList;

class Knapsack {
    public static List<Item> select(double maximumWeight, HashMap<String, Double> rating, List<Item> items) {

        Set<List<Item>> itemCombinations = getItemCombinations(items);
        List<Item> bestItems = new LinkedList<>();
        double bestScore = Double.NEGATIVE_INFINITY;
        for (List<Item> currCombination : itemCombinations) {
            double currentScore = getListWeightedScore(currCombination, maximumWeight, rating);
            int comparisonResult = Double.compare(currentScore, bestScore);
    
            if (comparisonResult > 0) {
                bestScore = currentScore;
                bestItems = currCombination;
            }
        }

        return bestItems;

    }

    private static double getListWeightedScore(List<Item> items, double maximumWeight, HashMap<String, Double> rating) {

        /**
         * weight -> the closer to zero the better -> normalize so that 0 remaining weight gives 100 score
         * items -> the more items the better -> normalize to same area as rating (100+)
         * rating -> the higher the better, but item count and weight are more important
         */

        int NORMALIZATION_RATE = 100;

        double remainingWeight = maximumWeight;
        double ratingSum = 0;
        double itemCount = 0;

        for (Item item : items) {
            itemCount++;
            remainingWeight -= item.getWeight();
            if (remainingWeight < 0) {
                return Double.NEGATIVE_INFINITY;
            }
            ratingSum += rating.get(item.getId());
        }

        double score = 
            (NORMALIZATION_RATE / (remainingWeight + 1)) 
            + ratingSum 
            + (itemCount * NORMALIZATION_RATE)
        ;

        return score;

    }

    private static void generateCombinations(List<Item> items, int start, List<Item> current, Set<List<Item>> result) {
        result.add(new ArrayList<>(current));
        for (int i = start; i < items.size(); i++) {
            current.add(items.get(i));
            generateCombinations(items, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }

    public static Set<List<Item>> getItemCombinations(List<Item> items) {
        Set<List<Item>> result = new HashSet<>();
        generateCombinations(items, 0, new ArrayList<>(), result);
        return result;
    }


}
