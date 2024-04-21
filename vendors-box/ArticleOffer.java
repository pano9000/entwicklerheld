package de.entwicklerheld.vendorsBox;

public class ArticleOffer {
    private String articleId;
    private double price;
    private int availability;
    private int shippingTime;

    public ArticleOffer(String articleId, double price, int availability, int shippingTime) {
        this.articleId = articleId;
        this.price = price;
        this.availability = availability;
        this.shippingTime = shippingTime;
    }

    public String getArticleId() {
        return articleId;
    }

    public double getPrice() {
        return price;
    }

    public int getAvailability() {
        return availability;
    }

    public int getShippingTime() {
        return shippingTime;
    }
}
