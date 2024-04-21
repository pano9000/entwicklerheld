package de.entwicklerheld.vendorsBox;

public class Article {
    private String id;
    private String name;

    public Article(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
