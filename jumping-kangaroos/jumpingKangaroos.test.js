import {isCompletable, getMinimalNumberOfJumps} from "./jumpingKangaroos.js";
import { expect } from "chai";


const testFunc = (funcToTest) => {

  return (testCase) => {
    const [expectation, numbers] = testCase;

    it(`${expectation} ->\t${numbers}`, () => {
      const returnValue = funcToTest(numbers);
      expect(returnValue, `Expected '${expectation}' for numbers: [${numbers}] but was '${returnValue}'`).to.equal(expectation)
    })
  }

}


describe('first scenario', () => {

  const testCases = [
    [ true,   [2,0,3] ],
    [ false,  [1,0,1] ],
    [ true,   [2,0,1] ],
    [ false,  [2,0,0,1] ],
    [ true,   [3,0,3,0] ],
    [ false,  [4,0,1,1,0,3] ],
    [ false,  [5,4,3,2,1,0,2] ],
    [ false,  [4,2,1,0,0,4] ],
    [ false,  [1,0,2] ],
    [ true,   [4,2,1,0,2] ],
  ];

  testCases.forEach(testFunc(isCompletable));


});

describe('second scenario', () => {

  const testCases = [
    [ true,  [1,2,1,1] ],
    [ true,  [1,1,1,1,1] ],
    [ true,  [1,2,1,2,1,2] ],
    [ true,  [2,0,3,5,0,1,2,1,3] ],
    [ true,  [3,3,3,3,2,1,3] ],
    [ true,  [5,4,3,2,1,2,0,2] ],
    [ true,  [1,4,0,1,1,2] ],
    [ true,  [1,1,2,1,2,1,2] ],
    [ false, [2,0,1,0,3] ],
    [ false, [4,0,1,1,0,3] ],
    [ false, [5,4,3,2,1,0,2] ],
    [ false, [1,2,1,0,3] ],
    [ false, [3,3,2,1,0,2] ],
    [ false, [4,2,1,0,0,4] ],
    [ false, [1,0,2] ],
    [ false, [1,1,1,0,1] ],
    [ false, [2,2,2,0,0,2] ],
  ];

  testCases.forEach(testFunc(isCompletable));

});


describe('third scenario', () => {

    /* difficult examples where you can jump less than the number */
  const testCases = [

    [ true, [2,2,0,1] ],
    [ true, [2,3,1,1,4] ],
    [ true, [3,0,2,0,4] ],
    [ true, [2,2,0,2,0,2] ],
    [ true, [1,2,2,0,4] ],
    [ true, [5,3,1,2,3,1,0,4] ],
    [ true, [3,5,0,0,0,0,2] ],
    [ true, [2,0,1,2,3,0,1,2] ],
    [ true, [3,1,2,0,2] ],
    [ true, [1,2,0,3,3,0,0,1] ],
    [ false, [3,2,1,0,4] ],
    [ false, [2,0,0,2] ],
    [ false, [2,2,0,0,2] ],
    [ false, [4,3,2,1,0,1] ],
    [ false, [1,1,2,1,0,1] ],
    [ false, [2,0,2,2,0,2,0,0,2] ],
    [ false, [4,0,2,3,0,1,0,1] ],
    [ false, [1,2,3,0,1,0,1] ],
    [ false, [5,3,0,0,1,0,2] ],
    [ false, [1,4,0,1,0,0,1] ]
  ];

  testCases.forEach(testFunc(isCompletable));


});


describe('fourth scenario', () => {

    /* now you have to return the minimal number of jumps you need to reach the last number, so you are searching for the best path*/
    /*for test cases which are false, return 0*/

    const testCases = [
      [ 2, [3,2,0,1,2] ],
      [ 0, [1,4,0,1,0,0,1] ],
      [ 1, [5,4,3,2,1,2] ],
      [ 1, [3,1,1,1] ],
      [ 1, [4,2,2,0,2] ],
      [ 1, [2,0,1] ],
      [ 3, [1,1,1,2] ],
      [ 2, [2,1,1,1] ],
      [ 2, [3,0,2,1,2] ],
      [ 4, [2,2,0,3,1,2,0,1] ],
      [ 3, [1,2,3,1,1,1] ],
      [ 3, [2,0,1,1,2] ],
      [ 3, [3,2,1,2,0,2,0,1] ],
      [ 3, [3,1,1,2,3,1,1,1] ],
      [ 1, [5,3,0,0,1,1] ],
      [ 2, [1,4,1,1,1,1] ],
      [ 2, [2,3,1,1,2] ],
      [ 2, [4,3,2,2,1,1] ],
      [ 6, [1,1,2,2,0,3,1,3,2,1,1] ],
      [ 3, [5,4,4,1,1,0,2,0,2] ],
      [ 4, [2,4,3,5,1,1,2,0,1,1] ],
    ];
    testCases.forEach(testFunc(getMinimalNumberOfJumps));
});