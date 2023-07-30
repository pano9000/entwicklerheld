package de.entwicklerheld.restApiJava;

public class IOU {
    private final int id;
    private Person creditor;
    private Person debtor;
    private String description;
    private double amount;

    public IOU(int id, Person debtor, String description, double amount, Person creditor) {
        this.creditor = creditor;
        this.debtor = debtor;
        this.description = description;
        this.amount = amount;
        this.id = id;
    }

    public IOU(Person debtor, String description, double amount, Person creditor) {
        this.creditor = creditor;
        this.debtor = debtor;
        this.description = description;
        this.amount = amount;
        this.id = IOUProvider.getInstance().getIOUs().size() + 1;
    }

    public Person getCreditor() {
        return creditor;
    }

    public Person getDebtor() {
        return debtor;
    }

    public String getDescription() {
        return description;
    }

    public double getAmount() {
        return amount;
    }

    public int getId() {
        return id;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreditor(Person creditor) {
        this.creditor = creditor;
    }

    public void setDebtor(Person debtor) {
        this.debtor = debtor;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final IOU other = (IOU) obj;
        if (this.id != other.id) {
            return false;
        }
        return true;
    }
}
