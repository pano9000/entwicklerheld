package de.entwicklerheld.messageDistributionJava;

import java.util.Arrays;
import java.util.List;

import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import com.github.pemistahl.lingua.api.*;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;

public class MessageDistributionJava {

    private final Producer<String, String> producer;
    private final LanguageDetector langDetector = LanguageDetectorBuilder.fromAllLanguages().build();
    private final List<String> alertKeywords = Arrays.asList(
        "emergency", "warnung", "warning", "kritisch", 
        "alarm", "critical", "alert", "notification", 
        "securityalert", "error", "fatal", "urgent", 
        "important", "security", "failure", "threat", 
        "hack", "breach", "compromise", "virus", 
        "phishing", "risk"
    );
    public String alertMessageServerUrl = "http://localhost:8081/alert";

    public MessageDistributionJava(Producer<String, String> producer) {
        this.producer = producer;
    }

    public void handleMessage(String message) throws Exception {
        
        // Returns "unknown" string when language is not detected
        Language detectedLang = langDetector.detectLanguageOf(message);
        String topic = String.format("bfv.%1$s-alerts.new-message", detectedLang.name().toLowerCase());
        producer.send(new ProducerRecord<String, String>(topic, message));

        if (this.isAlertMessage(message)) {
            this.handleAlertMessage(message);
        }

    }

    private void handleAlertMessage(String message) throws Exception {

        JSONObject requestBody = new JSONObject();
        requestBody.put("message", message);

        HttpResponse<JsonNode> response = Unirest.post(this.alertMessageServerUrl)
            .header("Content-Type", "application/json")
            .body(requestBody)
            .asJson();
            if (response.getStatus() != 200) {
                throw new Exception("POSTing alert message failed!");
            }
    }

    private Boolean isAlertMessage(String message) {

        String messageCpy = message.toLowerCase();
        for (String alertKeyword : this.alertKeywords) {
            if (messageCpy.contains(alertKeyword)) return true;
        }

        return false;
    }


}
