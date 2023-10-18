import { encode } from "./run-length-encoding-javascript";

beforeEach(() => {
      console.log("##polylith[testStarted");
});

afterEach(() => {
      console.log("##polylith[testFinished")
});

test('first scenario', () => {
    check("aaa", "3a");
    check("", "");
    check("aab", "2a1b");
    check("a", "1a");
    check("aba", "1a1b1a");
    check("abc", "1a1b1c");
    check("aaabbc", "3a2b1c");
    check("aaabbaaa", "3a2b3a");
    check("aaabaaa", "3a1b3a");
    check("aaabbbaaa", "3a3b3a");

    check("aAa", "1a1A1a");
    check("aAaAaA", "1a1A1a1A1a1A");
    check("aAaAaAa", "1a1A1a1A1a1A1a");
    check("aAaAaAaA", "1a1A1a1A1a1A1a1A");
    check("aaaaaaaaaabbbb", "10a4b");
    check("aAaAaAaAa", "1a1A1a1A1a1A1a1A1a");
    check("aaabaaa", "3a1b3a");
});

function check(text, encoded_text) {
      let result = encode(text);
      expect(result, "Expected '" + encoded_text + "' for text '" + text + "' but was " + result).toBe(encoded_text);
}