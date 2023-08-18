package de.entwicklerheld.documentScanJava;

import org.junit.*;

import java.util.ArrayList;
import java.util.Arrays;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assume.assumeTrue;

public class DocumentScanJavaTests {

    @Test
    public void testScenario1() {
        String address1 = "Maximilian Müller\\n" +
            "Kastanienallee 45\\n" +
            "10115 Berlin\\n" +
            "Deutschland\\n";

        Address addressRecord1 = new Address("Maximilian Müller", "Kastanienallee", "45", "10115", "Berlin");
        Document document1 = new Document();
        document1 = DocumentHelper.addTextToDocument(address1, document1, 0, 0, 0);
        Address address1Result = DocumentScanJava.findAddress(document1);
        assertThat(address1Result, is(addressRecord1));

        String address2 = "ABC Technologie GmbH\\n" +
            "Gewerbepark 12\\n" +
            "80331 München\\n" +
            "Deutschland\\n";
        Address addressRecord2 = new Address("ABC Technologie GmbH", "Gewerbepark", "12", "80331", "München");
        Document document2 = new Document();
        document2 = DocumentHelper.addTextToDocument(address2, document2, 40, 21, 0);
        Address address2Result = DocumentScanJava.findAddress(document2);
        assertThat(address2Result, is(addressRecord2));

        String address3 = "Humboldt-Universität zu Berlin\\n" +
            "Unter den Linden 6\\n" +
            "10099 Berlin\\n" +
            "Deutschland\\n";
        Address addressRecord3 = new Address("Humboldt-Universität zu Berlin", "Unter den Linden", "6", "10099", "Berlin");
        Document document3 = new Document();
        document3 = DocumentHelper.addTextToDocument(address3, document3, 30, 10, 0);
        Address address3Result = DocumentScanJava.findAddress(document3);
        assertThat(address3Result, is(addressRecord3));


        String address4 = "Stadtverwaltung Frankfurt\\n" +
            "Braubachstraße 15\\n" +
            "60311 Frankfurt am Main\\n" +
            "Deutschland\\n";
        Address addressRecord4 = new Address("Stadtverwaltung Frankfurt", "Braubachstraße", "15", "60311", "Frankfurt am Main");
        Document document4 = new Document();
        document4 = DocumentHelper.addTextToDocument(address4, document4, 8, 12, 0);
        Address address4Result = DocumentScanJava.findAddress(document4);
        assertThat(address4Result, is(addressRecord4));



        String address5 = "Stadtbibliothek Leipzig\\n" +
            "Wilhelm-Leuschner-Platz 10-11\\n" +
            "04107 Leipzig\\n" +
            "Deutschland\\n";
        Address addressRecord5 = new Address("Stadtbibliothek Leipzig", "Wilhelm-Leuschner-Platz", "10-11", "04107", "Leipzig");
        Document document5 = new Document();
        document5 = DocumentHelper.addTextToDocument(address5, document5, 5, 2, 0);
        Address address5Result = DocumentScanJava.findAddress(document5);
        assertThat(address5Result, is(addressRecord5));



        String address6 = "Anna Schmidt\\n" +
            "Bahnhofstraße 28\\n" +
            "50667 Köln\\n" +
            "Deutschland\\n";
        Address addressRecord6 = new Address("Anna Schmidt", "Bahnhofstraße", "28", "50667", "Köln");
        Document document6 = new Document();
        document6 = DocumentHelper.addTextToDocument(address6, document6, 9, 20, 0);
        Address address6Result = DocumentScanJava.findAddress(document6);
        assertThat(address6Result, is(addressRecord6));



        String address7 = "XY Lebensmittel e.K.\\n" +
            "Hafenstraße 3\\n" +
            "28195 Bremen\\n" +
            "Deutschland\\n";
        Address addressRecord7 = new Address("XY Lebensmittel e.K.", "Hafenstraße", "3", "28195", "Bremen");
        Document document7 = new Document();
        document7 = DocumentHelper.addTextToDocument(address7, document7, 10, 10, 0);
        Address address7Result = DocumentScanJava.findAddress(document7);
        assertThat(address7Result, is(addressRecord7));



        String address8 = "Universitätsklinikum Hamburg-Eppendorf\\n" +
            "Martinistraße 52\\n" +
            "20246 Hamburg\\n" +
            "Deutschland\\n";
        Address addressRecord8 = new Address("Universitätsklinikum Hamburg-Eppendorf", "Martinistraße", "52", "20246", "Hamburg");
        Document document8 = new Document();
        document8 = DocumentHelper.addTextToDocument(address8, document8, 0, 0, 0);
        Address address8Result = DocumentScanJava.findAddress(document8);
        assertThat(address8Result, is(addressRecord8));

        String address9 = "Deutsches Museum\\n" +
            "Museumsinsel 1\\n" +
            "80538 München\\n" +
            "Deutschland\\n";
        Address addressRecord9 = new Address("Deutsches Museum", "Museumsinsel", "1", "80538", "München");
        Document document9 = new Document();
        document9 = DocumentHelper.addTextToDocument(address9, document9, 8, 23, 0);
        Address address9Result = DocumentScanJava.findAddress(document9);
        assertThat(address9Result, is(addressRecord9));

        String address10 = "Johann Weber\\n" +
            "Friedenstraße 17\\n" +
            "40212 Düsseldorf\\n" +
            "Deutschland\\n";
        Address addressRecord10 = new Address("Johann Weber", "Friedenstraße", "17", "40212", "Düsseldorf");
        Document document10 = new Document();
        document10 = DocumentHelper.addTextToDocument(address10, document10, 14, 11, 0);
        Address address10Result = DocumentScanJava.findAddress(document10);
        assertThat(address10Result, is(addressRecord10));

        // for (Document d: new ArrayList<>(Arrays.asList(document1,document2,document3,document4,document5,document6,document7,document8,document9,document10))) {
        //     System.out.println(d.toSvg());
        // }
    }

    @Test
    public void testScenario2() {
        if (!DocumentScanJava.hardMode) assumeTrue(false);
        String address1 = "Maximilian Müller\\n" +
            "Kastanienallee 45\\n" +
            "10115 Berlin\\n" +
            "Deutschland\\n";
        Address addressRecord1 = new Address("Maximilian Müller", "Kastanienallee", "45", "10115", "Berlin");
        Document document1 = new Document();
        document1 = DocumentHelper.addTextToDocument(address1, document1, 0, 0, 10);
        Address address1Result = DocumentScanJava.findAddress(document1);
        assertThat(address1Result, is(addressRecord1));


        String address2 = "ABC Technologie GmbH\\n" +
            "Gewerbepark 12\\n" +
            "80331 München\\n" +
            "Deutschland\\n";
        Address addressRecord2 = new Address("ABC Technologie GmbH", "Gewerbepark", "12", "80331", "München");
        Document document2 = new Document();
        document2 = DocumentHelper.addTextToDocument(address2, document2, 30, 30, -10);
        System.out.println(document2.toSvg());
        Address address2Result = DocumentScanJava.findAddress(document2);
        assertThat(address2Result, is(addressRecord2));


        String address3 = "Humboldt-Universität zu Berlin\\n" +
            "Unter den Linden 6\\n" +
            "10099 Berlin\\n" +
            "Deutschland\\n";
        Address addressRecord3 = new Address("Humboldt-Universität zu Berlin", "Unter den Linden", "6", "10099", "Berlin");
        Document document3 = new Document();
        document3 = DocumentHelper.addTextToDocument(address3, document3, 20, 10, 10);
        System.out.println(document3.toSvg());
        Address address3Result = DocumentScanJava.findAddress(document3);
        assertThat(address3Result, is(addressRecord3));


        String address4 = "Stadtverwaltung Frankfurt\\n" +
            "Braubachstraße 15\\n" +
            "60311 Frankfurt am Main\\n" +
            "Deutschland\\n";
        Address addressRecord4 = new Address("Stadtverwaltung Frankfurt", "Braubachstraße", "15", "60311", "Frankfurt am Main");
        Document document4 = new Document();
        document4 = DocumentHelper.addTextToDocument(address4, document4, 20, 10, -5);
        Address address4Result = DocumentScanJava.findAddress(document4);
        assertThat(address4Result, is(addressRecord4));



        String address5 = "Stadtbibliothek Leipzig\\n" +
            "Wilhelm-Leuschner-Platz 10-11\\n" +
            "04107 Leipzig\\n" +
            "Deutschland\\n";
        Address addressRecord5 = new Address("Stadtbibliothek Leipzig", "Wilhelm-Leuschner-Platz", "10-11", "04107", "Leipzig");
        Document document5 = new Document();
        document5 = DocumentHelper.addTextToDocument(address5, document5, 5, 2, 7);
        Address address5Result = DocumentScanJava.findAddress(document5);
        assertThat(address5Result, is(addressRecord5));



        String address6 = "Anna Schmidt\\n" +
            "Bahnhofstraße 28\\n" +
            "50667 Köln\\n" +
            "Deutschland\\n";
        Address addressRecord6 = new Address("Anna Schmidt", "Bahnhofstraße", "28", "50667", "Köln");
        Document document6 = new Document();
        document6 = DocumentHelper.addTextToDocument(address6, document6, 30, 20, -8);
        Address address6Result = DocumentScanJava.findAddress(document6);
        assertThat(address6Result, is(addressRecord6));



        String address7 = "XY Lebensmittel e.K.\\n" +
            "Hafenstraße 3\\n" +
            "28195 Bremen\\n" +
            "Deutschland\\n";
        Address addressRecord7 = new Address("XY Lebensmittel e.K.", "Hafenstraße", "3", "28195", "Bremen");
        Document document7 = new Document();
        document7 = DocumentHelper.addTextToDocument(address7, document7, 20, 20, 7);
        Address address7Result = DocumentScanJava.findAddress(document7);
        assertThat(address7Result, is(addressRecord7));



        String address8 = "Universitätsklinikum Hamburg-Eppendorf\\n" +
            "Martinistraße 52\\n" +
            "20246 Hamburg\\n" +
            "Deutschland\\n";
        Address addressRecord8 = new Address("Universitätsklinikum Hamburg-Eppendorf", "Martinistraße", "52", "20246", "Hamburg");
        Document document8 = new Document();
        document8 = DocumentHelper.addTextToDocument(address8, document8, 0, 0, 5);
        Address address8Result = DocumentScanJava.findAddress(document8);
        assertThat(address8Result, is(addressRecord8));


        String address9 = "Deutsches Museum\\n" +
            "Museumsinsel 1\\n" +
            "80538 München\\n" +
            "Deutschland\\n";
        Address addressRecord9 = new Address("Deutsches Museum", "Museumsinsel", "1", "80538", "München");
        Document document9 = new Document();
        document9 = DocumentHelper.addTextToDocument(address9, document9, 21, 11, 6);
        Address address9Result = DocumentScanJava.findAddress(document9);
        assertThat(address9Result, is(addressRecord9));


        String address10 = "Johann Weber\\n" +
            "Friedenstraße 17\\n" +
            "40212 Düsseldorf\\n" +
            "Deutschland\\n";
        Address addressRecord10 = new Address("Johann Weber", "Friedenstraße", "17", "40212", "Düsseldorf");
        Document document10 = new Document();
        document10 = DocumentHelper.addTextToDocument(address10, document10, 5, 8, -8);
        Address address10Result = DocumentScanJava.findAddress(document10);
        assertThat(address10Result, is(addressRecord10));


        //for (Document d: new ArrayList<>(Arrays.asList(document1,document2,document3,document4,document5,document6,document7,document8,document9,document10))) {
        //    System.out.println(d.toSvg());
        //}
    }

    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();
}