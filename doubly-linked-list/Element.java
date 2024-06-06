package de.entwicklerheld.linkedListJava;

public final class Element<T> {
    private final T value;
    private Element<T> prev;
    private Element<T> next;

    Element(T value, Element<T> prev, Element<T> next) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }

    public void setPrev(Element<T> prev) {
        this.prev = prev;
    }

    public void setNext(Element<T> next) {
        this.next = next;
    }

    public T getValue() {
        return value;
    }

    public Element<T> getPrev() {
        return prev;
    }

    public Element<T> getNext() {
        return next;
    }
}
