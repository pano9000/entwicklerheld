package de.entwicklerheld.knapsackJava;

import java.util.Objects;

public class Item {
    private String id;
    private String name;
    private double weight;
    
    public Item(String id, String name, double weight) {
        this.id = id;
        this.name = name;
        this.weight = weight;
    }
    
    public String getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public double getWeight() {
        return weight;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return Double.compare(item.weight, weight) == 0 && id.equals(item.id) && name.equals(item.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, weight);
    }

    @Override
    public String toString() {
        return "Item {" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", weight=" + weight +
                '}';
    }
}
