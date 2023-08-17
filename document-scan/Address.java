package de.entwicklerheld.documentScanJava;

public record Address(String recipient, String street, String houseNumber, String zipCode, String city) {
    public Address {
        if (recipient == null || recipient.isBlank()) {
            throw new IllegalArgumentException("recipient must not be null or blank");
        }
        if (street == null || street.isBlank()) {
            throw new IllegalArgumentException("street must not be null or blank");
        }
        if (houseNumber == null || houseNumber.isBlank()) {
            throw new IllegalArgumentException("houseNumber must not be null or blank");
        }
        if (zipCode == null || zipCode.isBlank()) {
            throw new IllegalArgumentException("zipCode must not be null or blank");
        }
        if (city == null || city.isBlank()) {
            throw new IllegalArgumentException("city must not be null or blank");
        }
    }
}
