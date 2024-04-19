package de.entwicklerheld.messageDistributionJava;

import org.apache.kafka.clients.producer.Producer;


public class MessageDistributionJava {
    private final Producer<String, String> producer;

    public MessageDistributionJava(Producer<String, String> producer) {
        this.producer = producer;
    }
    public void handleMessage(String message) {
        // implement this
    }


}
