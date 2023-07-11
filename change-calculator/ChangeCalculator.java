package de.entwicklerheld.changeCalculatorJava;


import java.util.*;

public class ChangeCalculator {
    private final List<Integer> coins;

    public ChangeCalculator(List<Integer> coins) {
        this.coins = coins;
    }

    public List<Integer> computeMostEfficientChange(Integer amount) {
        List<Integer> resultList = new ArrayList<>();
        
        if (amount == 0) return resultList;
        
        resultList = getBestPath(amount, this.coins, new HashMap<Integer, List<Integer>>());

        if (resultList == null || resultList.size() == 0) {
            throw new IllegalArgumentException("Coins cannot be split into the given amount");
        }

        return resultList;
    }


    private List<Integer> getBestPath(Integer target, List<Integer> coins, HashMap<Integer, List<Integer>> memo) {
      if (memo.get(target) != null) return memo.get(target);
      if (target == 0) return new ArrayList<>();
      if (target < 0) return null;

      List<Integer> shortestPath = null;

      for (int coin : coins) {
        int remainder = target - coin;
        List<Integer> remainderPath = getBestPath(remainder, coins, memo);
        if (remainderPath != null) {
            List<Integer> currentPath = new ArrayList<>(remainderPath);
            currentPath.add(coin);
            if (shortestPath == null || currentPath.size() < shortestPath.size()) {
                shortestPath = currentPath;
            }
        }
      }

      memo.put(target, shortestPath);
      return shortestPath;
    }

}