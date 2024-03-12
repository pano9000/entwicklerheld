import {validateClientNumber} from "./parity-bit.js";

beforeEach(() => {
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished")
});

test('first scenario', () => {
    assertResult("8456894318", true);
    assertResult("3456848879", false);

    assertResult("9999999999", true);
    assertResult("0000000000", true);
    assertResult("0000000001", false);
    assertResult("4864684516", true);
    assertResult("2134654685", true);
    assertResult("8798231349", true);
    assertResult("0231234987", true);
    assertResult("0354987987", true);
    assertResult("8979432468", true);
    assertResult("2314645649", false);
    assertResult("3267984988", false);
    assertResult("1231654978", false);
    assertResult("1654974646", false);
    assertResult("1654869798", false);
    assertResult("7987987988", false);

    expect(validateClientNumber("A123456789"), "The client number A123456789 should not be valid because it contains letters").toBe(false);
    expect(validateClientNumber("11111111111"), "The client number 11111111111 should not be valid because it is to long").toBe(false);
    expect(validateClientNumber("111"), "The client number 111 should not be valid because it is to short").toBe(false);
});

function assertResult(clientNumber, expectedResult) {
    if (expectedResult) {
        expect(validateClientNumber(clientNumber), "The client number " + clientNumber + " should be valid, because of a correct parity bit.").toBe(expectedResult);
    } else {
        expect(validateClientNumber(clientNumber), "The client number " + clientNumber + " is not valid, because of incorrect parity bit.").toBe(expectedResult);
    }
}