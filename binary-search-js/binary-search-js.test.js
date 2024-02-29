import { find } from "./binary-search-js.js";
import { Result } from "./result.js";
import { expect } from "chai";

const testCases = [
  [
    'test 1 1',
    [[6], 6],
    new Result(0, 0)
  ],

  [
    'test 1 2',
    [[1, 3, 4, 6, 8, 9, 11], 6],
    new Result(0, 3)
  ],

  [
    'test 1 3',
    [[1, 3, 4, 6, 8, 9, 11], 1],
    new Result(2, 0)
  ],

  [
    'test 1 4',
    [[1, 3, 4, 6, 8, 9, 11], 11],
    new Result(2, 6)
  ],

  [
    'test 1 5',
    [[1, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377], 21],
    new Result(0, 5)
  ],

  [
    'test 1 6',
    [[1, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 634], 144],
    new Result(1, 9)
  ],

  [
    'test 2 1',
    [[], 2],
    new Result(0, -1)
  ],

  [
    'test 2 2',
    [[1, 3, 4, 6, 8, 9, 11], 2],
    new Result(3, -1)
  ]
]

const testFunc = (testCase) => {
  return it(testCase[0], () => {
    let arr = testCase[1][0];
    let element = testCase[1][1];
    let actual = find(arr, element);
    let expected = testCase[2];
    expect(actual, `Given an array [ ${arr} ] with ${arr.length} elements the element ${element} should be found in step ${expected.step} and return index ${expected.index}.`).to.deep.equal(expected);
  })
}

describe("Binary Search Tests", () => {
  testCases.forEach(testCase => testFunc(testCase));
});