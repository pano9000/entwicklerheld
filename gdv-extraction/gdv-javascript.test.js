import {GDVExtractor} from "../gdv-javascript";
import {Client} from "../models";



test("numbers1", () => {
      const filePath = "gdv_files/gdv_example1.txt";
    const gdv = new GDVExtractor(filePath);
    const expectedNumbers = [
          "59999999999",
        "59999999998",
        "59999999997",
        "59999999996",
        "59999999995",
        "59999999994",
        "59999999993",
        "59999999992",
        "59999999991",
        "59999999990",
        "59999999989",
        "59999999988",
        "59999999987",
        "59999999986",
    ];
    assertPolicyNumbers(filePath, expectedNumbers);
});

test("numbers2", () => {
      const filePath = "gdv_files/gdv_example2.txt";
    const gdv = new GDVExtractor(filePath);
    const expectedNumbers = [
          "54729499596",
        "54425671537",
        "32100000001",
        "71345699991",
        "59999090901",
        "59000999994",
        "59000999993",
        "59000999992",
        "59900091111",
        "11111159999999990",
        "11111159999999989",
        "11111159999999988",
        "11111159999999987",
        "11111159999999986",
    ];
    assertPolicyNumbers(filePath, expectedNumbers);
});

test("testGetClients1", () => {
      const expected = [
          {
              lastName: "Kitzelpfütze",
            firstName: "Martina",
            street: "Sebeneteriestr. 44",
            zipCode: "52222",
            city: "Stolberg (Rhld.)",
            countryCode: "D",
            birthdate: getDateWithHour0(1979, 10, 11),
            policyNumber: "B4LTTT"
        },
        {
              lastName: "Pollsmann",
            firstName: "Rudolf",
            street: "Elsholunderstr. 10",
            zipCode: "50825",
            city: "Köln",
            countryCode: "D",
            birthdate: getDateWithHour0(1979, 10, 11),
            policyNumber: "W45WWW"
        },
        {
              lastName: "Pooosmann",
            firstName: "Rudolf",
            street: "Elsholunderstr. 11",
            zipCode: "50825",
            city: "Köln",
            countryCode: "D",
            birthdate: getDateWithHour0(1979, 10, 11),
            policyNumber: "W44WWW"
        },
        {
              lastName: "Pollimann",
            firstName: "Rudolf",
            street: "Elsholunderstr. 41",
            zipCode: "50825",
            city: "Köln",
            countryCode: "D",
            birthdate: getDateWithHour0(1979, 11, 12),
            policyNumber: "W43WWW"
        },
        {
              lastName: "Fresy",
            firstName: "Wilhelm",
            street: "Klerikalstr. 33",
            zipCode: "50354",
            city: "Hürth",
            countryCode: "D",
            birthdate: getDateWithHour0(1979, 11, 12),
            policyNumber: "W45BBB"
        },
        {
              lastName: "Gillensvier",
            firstName: "Herbert",
            street: "Lympfensittich Str. 44",
            zipCode: "51145",
            city: "Köln",
            countryCode: "",
            birthdate: getDateWithHour0(1979, 11, 12),
            policyNumber: "W45KKK"
        },
        {
              lastName: "Gillensdrei",
            firstName: "Hans",
            street: "Lympfensittich Str. 99",
            zipCode: "51145",
            city: "Köln",
            countryCode: "",
            birthdate: getDateWithHour0(1977, 6, 7),
            policyNumber: "W45HHH"
        },
        {
              lastName: "Gillenszwei",
            firstName: "Herbert",
            street: "Lympfensittich Str. 88",
            zipCode: "51145",
            city: "Köln",
            countryCode: "",
            birthdate: getDateWithHour0(1977, 6, 7),
            policyNumber: "W45FFF"
        },
        {
              lastName: "Gillenseins",
            firstName: "Wolfgang",
            street: "Lympfensittich Str. 11",
            zipCode: "51145",
            city: "Köln",
            countryCode: "",
            birthdate: getDateWithHour0(1977, 6, 7),
            policyNumber: "W45EEE"
        },
        {
              lastName: "Auszeilerbx",
            firstName: "Anton",
            street: "Salb 77",
            zipCode: "21073",
            city: "Hamburg",
            countryCode: "D",
            birthdate: getDateWithHour0(1977, 6, 7),
            policyNumber: "USKGGG"
        }
    ];
    const gdvFilePath = "gdv_files/gdv_example1.txt";
    


    // create Client objects from expected data
    for (let i = 0; i < expected.length; i++) {
          const expectedEntry = expected[i];
        expected[i] = new Client(expectedEntry["lastName"], "", expectedEntry["firstName"], expectedEntry["street"], expectedEntry["zipCode"], expectedEntry["city"], expectedEntry["countryCode"], expectedEntry["birthdate"], expectedEntry["policyNumber"]);
    }
    assertClientList(gdvFilePath, expected);
});

test("testGetClients2", () => {
      const expected = [
          new Client("Kirschberger", "", "Hannah", "Sebeneteriestr. 44", "52222", "Stolberg (Rhld.)", "D", getDateWithHour0(1979, 10, 11), "B4LTTT"),
        new Client("Rosenbach", "", "Rudolf", "Elsholunderstr. 10", "50825", "Kiel", "D", getDateWithHour0(1979, 10, 11), "W45WWW"),
        new Client("Bernstein", "", "Rudolf", "Elsholunderstr. 10", "50825", "Kiel", "D", getDateWithHour0(1979, 10, 11), "W44WWW"),
        new Client("Goldmanns", "", "Rudolf", "Elsholunderstr. 41", "50825", "Kiel", "D", getDateWithHour0(1979, 11, 12), "W43WWW"),
        new Client("Fresy", "", "Wilhelm", "Klerikalstr. 33", "50354", "Mainz", "D", getDateWithHour0(1979, 11, 12), "W45BBB"),
        new Client("Schwanenbach", "", "Herbert", "Lympfensittich Str. 44", "51145", "Kiel", "", getDateWithHour0(1979, 11, 12), "W45KKK"),
        new Client("Goldschmidt", "", "Hans", "Lympfensittich Str. 99", "51145", "Kiel", "", getDateWithHour0(1977, 6, 7), "W45HHH"),
        new Client("Wunderlichs", "", "Herbert", "Lympfensittich Str. 88", "51145", "Kiel", "", getDateWithHour0(1977, 6, 7), "W45FFF"),
        new Client("Schonfelder", "", "Wolfgang", "Lympfensittich Str. 11", "51145", "Kiel", "", getDateWithHour0(1977, 6, 7), "W45EEE"),
        new Client("Rosenberger", "", "Anton", "Salb 77", "21073", "Hamburg", "D", getDateWithHour0(1977, 6, 7), "USKGGG")
    ];

    const filePath = "gdv_files/gdv_example2.txt";
    assertClientList(filePath, expected);
});

function getDateWithHour0(year, month, day) {
      const date = new Date(`${year}-${month + 1}-${day}`);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(day);
    return date;
}

function assertPolicyNumbers(gdvFilePath, expected) {
      const gdv = new GDVExtractor(gdvFilePath);
    const result = gdv.getPolicyNumbers();
    expected.sort();
    result.sort();
    const message = `Expected: ${expected} but was: ${result}`;
    expect(result, message).toEqual(expected);
}

function assertClientList(gdvFilePath, expected) {
      const gdv = new GDVExtractor(gdvFilePath);
    const result = gdv.getClients();
    expected.sort((a, b) => a.client_number - b.client_number);
    result.sort((a, b) => a.client_number - b.client_number);
    const message = `Expected: ${JSON.stringify(
          expected
    )} but was: ${JSON.stringify(result)}`;
    expect(result, message).toEqual(expected);
}