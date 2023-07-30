package de.entwicklerheld.restApiJava;

public class Person {

    private final String firstName;
    private final String lastName;
    private final String address;

    public Person(String lastName, String address, String firstName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }


    public String getAddress() {
        return address;
    }

    public String getLastName() {
        return lastName;
    }

    public String getFirstName() {
        return firstName;
    }

}
