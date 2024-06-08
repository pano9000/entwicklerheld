package de.entwicklerheld.knapsackJava;

import java.util.HashMap;
import java.util.List;

public class TestData {
    public double maximumWeight;
    public HashMap<String, Double> rating;
    public List<Item> items;
    public List<Item> expected;

    public TestData(double maximumWeight, HashMap<String, Double> rating, List<Item> items, List<Item> expected) {
        this.maximumWeight = maximumWeight;
        this.rating = rating;
        this.items = items;
        this.expected = expected;
    }

    public static TestData testData_1_1() {
        List<Item> items = List.of(
                new Item("1", "Tablet", 1.0),
                new Item("2", "Laptop", 2.5),
                new Item("3", "Headphones", 0.3),
                new Item("4", "Smartphone", 0.5),
                new Item("5", "Water Bottle", 0.7)
        );
        double maximumWeight = 4.0;
        HashMap<String, Double> rating = new HashMap<>();
        rating.put("2", 200.0); // Laptop
        rating.put("4", 150.0); // Smartphone
        rating.put("1", 100.0); // Tablet
        rating.put("3", 50.0); // Headphones
        rating.put("5", 20.0); // Water Bottle
        List<Item> expected = List.of(
                new Item("2", "Laptop", 2.5),
                new Item("3", "Headphones", 0.3),
                new Item("4", "Smartphone", 0.5),
                new Item("5", "Water Bottle", 0.7)
        );
        return new TestData(maximumWeight, rating, items, expected);
    }

    public static TestData testData_1_2() {
        List<Item> items = List.of(
                new Item("1", "Tablet", 1.0),
                new Item("2", "Laptop", 2.5),
                new Item("3", "Headphones", 0.3),
                new Item("4", "Smartphone", 0.5),
                new Item("5", "Water Bottle", 0.7),
                new Item("6", "Power Bank", 0.4)
        );
        double maximumWeight = 5.0;
        HashMap<String, Double> rating = new HashMap<>();
        rating.put("2", 200.0); // Laptop
        rating.put("4", 150.0); // Smartphone
        rating.put("1", 100.0); // Tablet
        rating.put("3", 50.0); // Headphones
        rating.put("5", 20.0); // Water Bottle
        rating.put("6", 80.0); // Power Bank
        List<Item> expected = List.of(
                new Item("1", "Tablet", 1.0),
                new Item("2", "Laptop", 2.5),
                new Item("3", "Headphones", 0.3),
                new Item("5", "Water Bottle", 0.7),
                new Item("6", "Power Bank", 0.4)
        );
        return new TestData(maximumWeight, rating, items, expected);
    }

    public static TestData testData_1_3() {
        List<Item> items = List.of(
                new Item("1", "Tablet", 1.0),
                new Item("2", "Laptop", 2.5),
                new Item("3", "Headphones", 0.3),
                new Item("4", "Smartphone", 0.5),
                new Item("5", "Water Bottle", 0.7),
                new Item("6", "Power Bank", 0.4),
                new Item("7", "Sunglasses", 0.2)
        );
        double maximumWeight = 5.0;
        HashMap<String, Double> rating = new HashMap<>();
        rating.put("2", 200.0); // Laptop
        rating.put("4", 150.0); // Smartphone
        rating.put("1", 100.0); // Tablet
        rating.put("3", 50.0); // Headphones
        rating.put("5", 20.0); // Water Bottle
        rating.put("6", 80.0); // Power Bank
        rating.put("7", 30.0); // Sunglasses
        List<Item> expected = List.of(
                new Item("1", "Tablet", 1.0),
                new Item("2", "Laptop", 2.5),
                new Item("3", "Headphones", 0.3),
                new Item("5", "Water Bottle", 0.7),
                new Item("7", "Sunglasses", 0.2)
        );
        return new TestData(maximumWeight, rating, items, expected);
    }

    public static TestData testData_1_4() {
        List<Item> items = List.of(
                new Item("1", "Tablet", 1.0),
                new Item("3", "Headphones", 0.3),
                new Item("4", "Smartphone", 0.5),
                new Item("5", "Water Bottle", 0.7),
                new Item("6", "Power Bank", 0.4),
                new Item("7", "Sunglasses", 0.2),
                new Item("8", "Notebook", 0.8)
        );
        double maximumWeight = 3.0;
        HashMap<String, Double> rating = new HashMap<>();
        rating.put("2", 200.0); // Laptop
        rating.put("4", 150.0); // Smartphone
        rating.put("1", 100.0); // Tablet
        rating.put("3", 50.0); // Headphones
        rating.put("5", 20.0); // Water Bottle
        rating.put("6", 80.0); // Power Bank
        rating.put("7", 30.0); // Sunglasses
        rating.put("8", 90.0); // Notebook
        List<Item> expected = List.of(
                new Item("1", "Tablet", 1.0),
                new Item("3", "Headphones", 0.3),
                new Item("5", "Water Bottle", 0.7),
                new Item("7", "Sunglasses", 0.2),
                new Item("8", "Notebook", 0.8)
        );
        return new TestData(maximumWeight, rating, items, expected);
    }

    public static TestData testData_1_5() {
        List<Item> items = List.of(
                new Item("1", "Tablet", 1.0),
                new Item("3", "Headphones", 0.3),
                new Item("4", "Smartphone", 0.5),
                new Item("5", "Water Bottle", 0.7),
                new Item("6", "Power Bank", 0.4),
                new Item("7", "Sunglasses", 0.2),
                new Item("8", "Notebook", 0.8),
                new Item("9", "Umbrella", 0.6)
        );
        double maximumWeight = 4.0;
        HashMap<String, Double> rating = new HashMap<>();
        rating.put("2", 200.0); // Laptop
        rating.put("4", 150.0); // Smartphone
        rating.put("1", 100.0); // Tablet
        rating.put("3", 50.0); // Headphones
        rating.put("5", 20.0); // Water Bottle
        rating.put("6", 80.0); // Power Bank
        rating.put("7", 30.0); // Sunglasses
        rating.put("8", 90.0); // Notebook
        rating.put("9", 40.0); // Umbrella
        List<Item> expected = List.of(
                new Item("1", "Tablet", 1.0),
                new Item("3", "Headphones", 0.3),
                new Item("5", "Water Bottle", 0.7),
                new Item("6", "Power Bank", 0.4),
                new Item("7", "Sunglasses", 0.2),
                new Item("8", "Notebook", 0.8),
                new Item("9", "Umbrella", 0.6)
        );
        return new TestData(maximumWeight, rating, items, expected);
    }

    public static TestData testData_1_6() {
        List<Item> items = List.of(
                new Item("1", "Backpack", 3.0),
                new Item("2", "Camera", 1.5),
                new Item("3", "Tent", 5.0),
                new Item("4", "Sleeping Bag", 2.0),
                new Item("5", "Flashlight", 0.3),
                new Item("6", "Map", 0.2),
                new Item("7", "Cooking Stove", 1.8),
                new Item("8", "First Aid Kit", 0.7),
                new Item("9", "Binoculars", 0.6),
                new Item("10", "Hiking Boots", 1.2),
                new Item("11", "Compass", 0.1),
                new Item("12", "Water Purifier", 1.0),
                new Item("13", "Pocket Knife", 0.4),
                new Item("14", "Rain Jacket", 0.9),
                new Item("15", "Hat", 0.5)
        );
        double maximumWeight = 12.0;
        HashMap<String, Double> rating = new HashMap<>();
        rating.put("1", 80.0); // Backpack
        rating.put("2", 120.0); // Camera
        rating.put("3", 150.0); // Tent
        rating.put("4", 100.0); // Sleeping Bag
        rating.put("5", 30.0); // Flashlight
        rating.put("6", 20.0); // Map
        rating.put("7", 90.0); // Cooking Stove
        rating.put("8", 40.0); // First Aid Kit
        rating.put("9", 50.0); // Binoculars
        rating.put("10", 70.0); // Hiking Boots
        rating.put("11", 10.0); // Compass
        rating.put("12", 80.0); // Water Purifier
        rating.put("13", 40.0); // Pocket Knife
        rating.put("14", 60.0); // Rain Jacket
        rating.put("15", 30.0); // Hat
        List<Item> expected = List.of(
                new Item("1", "Backpack", 3.0),
                new Item("3", "Tent", 5.0),
                new Item("4", "Sleeping Bag", 2.0),
                new Item("6", "Map", 0.2),
                new Item("7", "Cooking Stove", 1.8)
        );
        return new TestData(maximumWeight, rating, items, expected);
    }

    public static TestData testData_1_7() {
        List<Item> items = List.of(
                new Item("1", "Backpack", 3.0),
                new Item("2", "Camera", 1.5),
                new Item("3", "Tent", 5.0),
                new Item("4", "Sleeping Bag", 2.0),
                new Item("5", "Flashlight", 0.3),
                new Item("6", "Map", 0.2),
                new Item("7", "Cooking Stove", 1.8),
                new Item("8", "First Aid Kit", 0.7),
                new Item("9", "Binoculars", 0.6),
                new Item("10", "Hiking Boots", 1.2),
                new Item("11", "Compass", 0.1),
                new Item("12", "Water Purifier", 1.0),
                new Item("13", "Pocket Knife", 0.4),
                new Item("14", "Rain Jacket", 0.9),
                new Item("15", "Hat", 0.5)
        );
        double maximumWeight = 15.0;
        HashMap<String, Double> rating = new HashMap<>();
        rating.put("1", 80.0); // Backpack
        rating.put("2", 120.0); // Camera
        rating.put("3", 150.0); // Tent
        rating.put("4", 100.0); // Sleeping Bag
        rating.put("5", 30.0); // Flashlight
        rating.put("6", 20.0); // Map
        rating.put("7", 90.0); // Cooking Stove
        rating.put("8", 40.0); // First Aid Kit
        rating.put("9", 50.0); // Binoculars
        rating.put("10", 70.0); // Hiking Boots
        rating.put("11", 10.0); // Compass
        rating.put("12", 80.0); // Water Purifier
        rating.put("13", 40.0); // Pocket Knife
        rating.put("14", 60.0); // Rain Jacket
        rating.put("15", 30.0); // Hat
        List<Item> expected = List.of(
                new Item("1", "Backpack", 3.0),
                new Item("3", "Tent", 5.0),
                new Item("4", "Sleeping Bag", 2.0),
                new Item("6", "Map", 0.2),
                new Item("7", "Cooking Stove", 1.8),
                new Item("8", "First Aid Kit", 0.7),
                new Item("9", "Binoculars", 0.6),
                new Item("10", "Hiking Boots", 1.2),
                new Item("15", "Hat", 0.5)
        );
        return new TestData(maximumWeight, rating, items, expected);
    }
}
