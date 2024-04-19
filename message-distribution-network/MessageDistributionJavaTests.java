package de.entwicklerheld.messageDistributionJava;

import com.github.pemistahl.lingua.api.Language;
import org.apache.kafka.clients.producer.MockProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;
import org.junit.*;
import org.mockserver.integration.ClientAndServer;
import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.mockserver.integration.ClientAndServer.startClientAndServer;
import static org.mockserver.model.HttpRequest.request;
import static org.mockserver.model.HttpResponse.response;
import static org.mockserver.model.JsonBody.json;

import org.mockserver.verify.VerificationTimes;

import java.util.List;

public class MessageDistributionJavaTests {
    private ClientAndServer mockServer;

    @Before
    public void startServer() {
        // left blank intentionally
    }

    // left blank intentionally




    @Test
    public void testScenario1() throws Exception {
        MockProducer<String, String> producer = new MockProducer<String, String>(true, new StringSerializer(), new StringSerializer());
        MessageDistributionJava messageDistributionJava = new MessageDistributionJava(producer);

        expectLanguage("Das ist eine Testmeldung! Bitte ignorieren Sie diese.", "GERMAN", messageDistributionJava, producer);
        expectLanguage("Bu bir test mesajıdır! Lütfen dikkate almayın.", "TURKISH", messageDistributionJava, producer);
        expectLanguage("This is a test message! Please ignore it.", "ENGLISH", messageDistributionJava, producer);
        expectLanguage("Ez egy tesztüzenet! Kérjük, ne törődjön vele.", "HUNGARIAN", messageDistributionJava, producer);
        expectLanguage("테스트 메시지입니다! 무시해 주세요.", "KOREAN", messageDistributionJava, producer);
        expectLanguage("Tämä on testiviesti! Älä välitä siitä.", "FINNISH", messageDistributionJava, producer);
        expectLanguage("Tai bandomasis pranešimas! Prašome į jį nekreipti dėmesio.", "LITHUANIAN", messageDistributionJava, producer);
        expectLanguage("Це тестове повідомлення! Будь ласка, проігноруйте його.", "UKRAINIAN", messageDistributionJava, producer);
        expectLanguage("Това е тестово съобщение! Моля, игнорирайте го.", "BULGARIAN", messageDistributionJava, producer);
        expectLanguage("Это тестовое сообщение! Пожалуйста, не обращайте на него внимания.", "RUSSIAN", messageDistributionJava, producer);

        expectLanguage("Ceci est un message de test ! Veuillez l'ignorer.", "FRENCH", messageDistributionJava, producer);
        expectLanguage("Questo è un messaggio di prova! Si prega di ignorarlo.", "ITALIAN", messageDistributionJava, producer);
        expectLanguage("¡Este es un mensaje de prueba! Por favor, ignóralo.", "SPANISH", messageDistributionJava, producer);
        expectLanguage("Dit is een testbericht! Negeer het alsjeblieft.", "DUTCH", messageDistributionJava, producer);
        expectLanguage("Este é um mensagem de teste! Por favor, ignore-o.", "PORTUGUESE", messageDistributionJava, producer);
        expectLanguage("To jest wiadomość testowa! Proszę zignorować.", "POLISH", messageDistributionJava, producer);
        expectLanguage("Detta är ett testmeddelande! Vänligen ignorera det.", "SWEDISH", messageDistributionJava, producer);
        expectLanguage("Tämä on testiviesti! Ole hyvä ja ohita se.", "FINNISH", messageDistributionJava, producer);
        expectLanguage("Det er en testbesked! Venligst ignorere det.", "DANISH", messageDistributionJava, producer);
        expectLanguage("Αυτό είναι ένα μήνυμα δοκιμής! Παρακαλώ αγνοήστε το.", "GREEK", messageDistributionJava, producer);
        expectLanguage("Toto je testovací zpráva! Prosím ignorujte to.", "CZECH", messageDistributionJava, producer);
        expectLanguage("Ez egy tesztüzenet! Kérjük, hagyja figyelmen kívül.", "HUNGARIAN", messageDistributionJava, producer);
        expectLanguage("Aceasta este un mesaj de test! Vă rugăm să îl ignorați.", "ROMANIAN", messageDistributionJava, producer);
        expectLanguage("Това е тестово съобщение! Моля, игнорирайте го.", "BULGARIAN", messageDistributionJava, producer);
        expectLanguage("Bu bir test mesajıdır! Lütfen dikkate almayın.", "TURKISH", messageDistributionJava, producer);
        expectLanguage("Это тестовое сообщение! Пожалуйста, не обращайте на него внимания.", "RUSSIAN", messageDistributionJava, producer);
        expectLanguage("Це тестове повідомлення! Будь ласка, проігноруйте його.", "UKRAINIAN", messageDistributionJava, producer);
    }

    @Test
    public void testScenario2() throws Exception {
        mockServer = startClientAndServer(8081);
        MockProducer<String, String> producer = new MockProducer<String, String>(true, new StringSerializer(), new StringSerializer());
        MessageDistributionJava messageDistributionJava = new MessageDistributionJava(producer);

        testAlertMessage(messageDistributionJava, "Emergency", "This is a Test with Keyword Emergency!");
        testAlertMessage(messageDistributionJava, null, "Das ist eine Testmeldung ohne keyword! Bitte ignorieren Sie diese.");
        testAlertMessage(messageDistributionJava, "Emergency", "Das ist eine Notfallmeldung mit dem Wort Emergency! Bitte handeln Sie entsprechend.");
        testAlertMessage(messageDistributionJava, "Warnung", "Das ist eine Warnmeldung mit dem Wort Warnung! Bitte beachten Sie dies.");
        testAlertMessage(messageDistributionJava, "Kritisch", "Das ist eine kritische Meldung mit dem Wort Kritisch! Bitte sofort ueberpruefen.");
        testAlertMessage(messageDistributionJava, "Alert", "Das ist eine Alarmmeldung mit dem Wort Alert! Bitte ignorieren Sie diese nicht.");
        testAlertMessage(messageDistributionJava, "Alarm", "Dies ist eine Benachrichtigung mit dem Wort Alarm! Bitte zur Kenntnis nehmen.");
        testAlertMessage(messageDistributionJava, "SecurityAlert", "Dies ist eine Sicherheitswarnung mit dem Wort SecurityAlert! Bitte beachten.");
        testAlertMessage(messageDistributionJava, "Error", "Dies ist eine Fehlermeldung mit dem Wort Error! Bitte ueberpruefen.");
        testAlertMessage(messageDistributionJava, "Fatal", "Dies ist eine Fatalmeldung mit dem Wort Fatal! Bitte sofort handeln.");
        testAlertMessage(messageDistributionJava, "Urgent", "Dies ist eine dringende Meldung mit dem Wort Urgent! Bitte nicht ignorieren.");
        testAlertMessage(messageDistributionJava, "Important", "Dies ist eine wichtige Meldung mit dem Wort Important! Bitte beachten.");
        testAlertMessage(messageDistributionJava, "Urgent", "Das ist eine dringende Meldung mit dem Wort Urgent! Bitte sofort handeln.");
        testAlertMessage(messageDistributionJava, "Security", "Das ist eine Sicherheitsmeldung mit dem Wort Security! Bitte ueberpruefen.");
        testAlertMessage(messageDistributionJava, "Error", "Das ist eine Fehlermeldung mit dem Wort Error! Bitte ueberpruefen.");
        testAlertMessage(messageDistributionJava, null, "Das ist eine normale Meldung ohne Schluesselwort! Bitte ignorieren Sie diese.");
        testAlertMessage(messageDistributionJava, "Failure", "Das ist eine Ausfallmeldung mit dem Wort Failure! Bitte ueberpruefen.");
        testAlertMessage(messageDistributionJava, "Threat", "Das ist eine Bedrohungsmeldung mit dem Wort Threat! Bitte handeln.");
        testAlertMessage(messageDistributionJava, "Hack", "Das ist eine Hackermeldung mit dem Wort Hack! Bitte sofort handeln.");
        testAlertMessage(messageDistributionJava, "Breach", "Das ist eine Verletzungsmeldung mit dem Wort Breach! Bitte handeln.");
        testAlertMessage(messageDistributionJava, "Compromise", "Das ist eine Kompromissmeldung mit dem Wort Compromise! Bitte handeln.");
        testAlertMessage(messageDistributionJava, "Virus", "Das ist eine Virenwarnung mit dem Wort Virus! Bitte handeln.");
        testAlertMessage(messageDistributionJava, "Phishing", "Das ist eine Phishing-Warnung mit dem Wort Phishing! Bitte handeln.");
        testAlertMessage(messageDistributionJava, "Risk", "Das ist eine Risikomeldung mit dem Wort Risk! Bitte ueberpruefen.");
        testFailAlertMessage(messageDistributionJava, "Emergency", "This is a Test with Keyword Emergency!");
        mockServer.stop();
    }

    private void testAlertMessage(MessageDistributionJava messageDistributionJava, String keyword, String message) throws Exception {
        mockServer.reset();
        mockServer.when(request().withMethod("POST").withPath("/alert"))
                .respond(response().withStatusCode(200).withBody("{ \"status\": \"OK\" }"));
        messageDistributionJava.handleMessage(message);
        if (keyword != null) {
            String body = "{ \"message\": \"" + message + "\" }";
            try {
                mockServer.verify(
                        request().withMethod("POST").withPath("/alert").withBody(json(body))
                        ,
                        VerificationTimes.exactly(1)

                );
            } catch (AssertionError e) {
                throw new AssertionError("Expected Alert Call to http://localhost:8081/alert \nwith body:" + body + "  but it was not detected.\n\nKeyword: '" + keyword + "'\n\nin message: '" + message + "'\n\nshould result in a alert call!", e);
            }
        } else {
            try {
                mockServer.verify(
                        request().withMethod("GET").withPath("/alert"),
                        VerificationTimes.exactly(0)
                );
            } catch (AssertionError e) {
                throw new AssertionError("Did not expect any Alert Call but some were detected for \n message: '" + message + "'\n\n", e);
            }
        }


    }


    private void testFailAlertMessage(MessageDistributionJava messageDistributionJava, String keyword, String message) {
        mockServer.reset();
        mockServer.when(request().withMethod("POST").withPath("/alert"))
                .respond(response().withStatusCode(500).withBody("{ \"status\": \"ERROR\" }"));
        try {
            messageDistributionJava.handleMessage(message);
        } catch (Exception e) {
            return;
        }
        fail("Expected Exception because Alert Service returns HTTP status code 500, but none was thrown!");

    }
    private static void expectLanguage(String message, String language, MessageDistributionJava messageDistributionJava, MockProducer producer) throws Exception {
        messageDistributionJava.handleMessage(message);

        List<ProducerRecord> history = producer.history();
        assertTrue("Expected at least one message to be sent to Kafka but none found", history.size() >= 1);
        ProducerRecord<String, String> record = (ProducerRecord<String, String>) history.get(history.size() - 1);
        assertThat(record.topic(), is("bfv." + language.toString().toLowerCase() + "-alerts.new-message"));
        assertThat(record.value(), is(message));

        producer.history().clear();

    }

    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();
}