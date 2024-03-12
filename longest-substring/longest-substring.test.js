import { findLongestSubstring } from "./longest-substring.js";

beforeEach(() => {
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished")
});

test('check findLongestSubstring #1', () => {
    const str1 = "CHECKITWHEREISTHELONGESTSUBSTRING24";
    const str2 = "SUBSTINGWHERECHECKITANTCHECK24ISCHECKWHERE";
    const expected = "CHECKIT";
    const actual = findLongestSubstring(str1, str2);
    expect(actual).toBe(expected);
});

test('check findLongestSubstring #2', () => {
    const str1 = "247WECODEONLINEONENTWICKLERHELDDECHECKITOUT";
    const str2 = "CHECKITOUTWECODEONLINEON24ENTWICKLERHELDOUT";
    const expected = "WECODEONLINEON ENTWICKLERHELD";
    const actual = findLongestSubstring(str1, str2);
    expect(actual).toBe(expected);
});

test('check findLongestSubstring #3', () => {
    const str1 = "DONUTSAREDELICIOUSBUTIALSOLOVECHECK24PIZZA";
    const str2 = "PIZZASAREYUMMYBUTIDOALSOLOVEDONUTSFROMCHECK24";
    const expected = "ALSOLOVE";
    const actual = findLongestSubstring(str1, str2);
    expect(actual).toBe(expected);
});

test('check findLongestSubstring #4', () => {
    const str1 = "ACGZUZAJYÖPRNVREW";
    const str2 = "CJURASCZGZUZAJFYPRNVRE";
    const expected = "GZUZAJ PRNVRE";
    const actual = findLongestSubstring(str1, str2);
    expect(actual).toBe(expected);
});

test('check findLongestSubstring #5', () => {
    const str1 = "ACGTAACCGT";
    const str2 = "GATTACCGTGA";
    const expected = "ACCGT";
    const actual = findLongestSubstring(str1, str2);
    expect(actual).toBe(expected);
});

test('check findLongestSubstring #6', () => {
    const str1 = "ABCDAF";
    const str2 = "DAFBLA";
    const expected = "DAF";
    const actual = findLongestSubstring(str1, str2);
    expect(actual).toBe(expected);
});