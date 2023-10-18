import { decode, encode } from "./run-length-encoding-javascript.js";
import { expect } from "chai";

const testCasesEnc = [
  ["aaa", "3a"],
  ["", ""],
  ["aab", "2a1b"],
  ["a", "1a"],
  ["aba", "1a1b1a"],
  ["abc", "1a1b1c"],
  ["aaabbc", "3a2b1c"],
  ["aaabbaaa", "3a2b3a"],
  ["aaabaaa", "3a1b3a"],
  ["aaabbbaaa", "3a3b3a"],
  ["aAa", "1a1A1a"],
  ["aAaAaA", "1a1A1a1A1a1A"],
  ["aAaAaAa", "1a1A1a1A1a1A1a"],
  ["aAaAaAaA", "1a1A1a1A1a1A1a1A"],
  ["aaaaaaaaaabbbb", "10a4b"],
  ["aAaAaAaAa", "1a1A1a1A1a1A1a1A1a"],
  ["aaabaaa", "3a1b3a"],
]

describe("#Encode", () => {

  testCasesEnc.forEach(testCase => {
    getTestCheckEnc(testCase);
  });

})

describe("#Decode", () => {
  testCasesEnc.forEach(testCase => {
    getTestCheckDec(testCase);
  });

});


function getTestCheckEnc(testCase) {
  return it(`Case: '${testCase.join(", ")}'`, () => {
    const [text, encoded_text] = testCase;
    const result = encode(text);
    expect(result, `Expected '${encoded_text}' for text '${text}' but was '${result}'`).to.eql(encoded_text);
  })
}

function getTestCheckDec(testCase) {
  return it(`Case: '${testCase[1]}, ${testCase[0]}'`, () => {
    const [text, encoded_text] = testCase;
    const result = decode(encoded_text);
    expect(result, `Expected '${text}' for encoded text '${encoded_text}' but was '${result}'`).to.eql(text);
  })
}

