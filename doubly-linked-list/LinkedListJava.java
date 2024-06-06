package de.entwicklerheld.linkedListJava;


final class LinkedListJava<T> {
    private Element<T> head = new Element<T>(null, null, null);

    void push(T value) {

        if (head.getValue() == null) {
            head = new Element<T>(value, null, null);
            head.setPrev(head);
            head.setNext(head);
        } else {
            Element<T> currentTail = head.getPrev();
            Element<T> newTail = new Element<T>(value, currentTail, head);
            currentTail.setNext(newTail);
            head.setPrev(newTail);
        }

    }

    T pop() {

        if (head.getValue() == null) {
            return null;
        }

        Element<T> tail = head.getPrev();
        T value = tail.getValue();
        head.setPrev(tail.getPrev());
        
        return value;

    }

    T shift() {

        if (head.getValue() == null) {
            return null;
        }

        T value = head.getValue();
        head = head.getNext();
        return value;

    }

    void unshift(T value) {

        push(value);
        head = head.getPrev();

    }
}