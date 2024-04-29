package de.entwicklerheld.scalechallenge;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

class Scale {
    static List<Integer> getMasses(Integer weight, List<Integer> allMasses) {
        return getBestPath(weight, allMasses, new HashMap<Integer, List<Integer>>());
    }

    static private List<Integer> getBestPath(Integer target, List<Integer> masses, HashMap<Integer, List<Integer>> memo) {
      if (memo.get(target) != null) return memo.get(target);
      if (target == 0) return new ArrayList<>();
      if (target < 0) return null;

      List<Integer> shortestPath = null;

      for (int mass : masses) {
        int remainder = target - mass;
        List<Integer> remainderPath = getBestPath(remainder, masses, memo);
        if (remainderPath != null) {
            List<Integer> currentPath = new ArrayList<>(remainderPath);
            currentPath.add(mass);
            if (shortestPath == null || currentPath.size() < shortestPath.size()) {
                shortestPath = currentPath;
            }
        }
      }

      memo.put(target, shortestPath);
      return shortestPath;
    }
}
