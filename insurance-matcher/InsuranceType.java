package de.entwicklerheld.insuranceMatching;
/**
 * #insuranceIsALie
 * Fact or Fiction: One of these insurances is fiction - tell us which one on twitter @EntwicklerHeld and @intersoft_AG
 */
public enum InsuranceType {
    ALIEAN_ABDUCTION_INSURANCE ("Alien Abduction Insurance", "If you can prove it, then a high insurance sum beckons."),
    WEDDING_INSURANCE ("Wedding Insurance", "If your partner lets you sit at the wedding, the emotional damage is high enough. The financial damage is covered by the wedding insurance."),
    FALLING_SATELLITES ("Falling satellites", "Should it rain parts from the sky, you should have this insurance. In times, when Elon Musk sends 'Star Links' into the sky, this might be even more relevant."),
    MULTIPLE_BIRTH_INSURANCE ("Multiple-birth insurance", "This insurance covers the costs arising from the surprise of a birth with several children."),
    FORTNITE_ACCOUNT ("Fortnite Account", "Only one game, not for everyone. If you have a valuable account, better insure it against possible dangers, like theft."),
    YOUR_SAFE_RAILING ("Your safe railing", "For everyone with above-average respect for railings. Should it ever give way, you are insured. But only from a certain height of the abyss behind it. Of course!");

    private final String name;
    private final String description;

    private InsuranceType(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public boolean equalsName(String otherName) {
        return name.equals(otherName);
    }

    public String toString() {
        return this.name;
    }
}

