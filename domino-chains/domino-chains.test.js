import {chain} from "./dominoes-javascript.js";
import { expect } from "chai";


// test('first scenario', () => {
//     var actual = foo();
//     expect(actual, "This is a more descriptive message than the default assertion error message").toBe(undefined);
// });


function runTest(dominoes, expected) {
    if (expected) {
        runTestsExpectingChain(dominoes);
    } else {
        runTestsExpectingNull(dominoes);
    }
}

function runTestsExpectingNull(dominoes) {
    const result = chain(dominoes);
    expect(result, 'Result should be null for dominoes: ' + JSON.stringify(dominoes)).to.equal(null);
}

function runTestsExpectingChain(dominoes) {
    const originalDominos = JSON.parse(JSON.stringify(dominoes));
    let result = chain(dominoes);
    expect(result, 'Result should not be null for dominoes: ' + JSON.stringify(originalDominos)).to.not.equal(null);
    expect(result, "The number of dominoes in the output equals the number of dominoes in the input which was not true for dominoes " + JSON.stringify(originalDominos) + " and result " + JSON.stringify(result)).to.have.lengthOf(originalDominos.length);

    //it('For each adjacent pair of dominoes ... (a, b), (c, d) ...: b is equal to c.', () => {
    expect(result
        .map((v, i) => {
            if (i === result.length - 1) return true;
            return v[1] === result[i + 1][0];
        })
        .every(Boolean), "Expected for each adjacent pair of dominoes ... (a, b), (c, d) ...: b is equal to c. This was not the case for dominoes " + JSON.stringify(originalDominos) + " and result " + JSON.stringify(result)).to.equal(true);

    if (dominoes.length > 0) {

            expect(result, "Result must not be null for " + JSON.stringify(originalDominos)).to.not.equal(null);
            expect(result[0][0] === result[result.length - 1][1], "Expected for dominoes on the ends (a, b) ... (c, d): a is equal to d. This was not the case for dominoes " + JSON.stringify(originalDominos) + " and result " + JSON.stringify(result)).to.equal(true);

    }

    // 4. Every domino appears in the output an equal number of times as the number of times it appears in the input.
    // (in other words, the dominoes in the output are the same dominoes as the ones in the input)
    const sortDomino = (domino) => [...domino].sort();
    expect(originalDominos.map(sortDomino).sort(), "Expected that the result should have the same dominoes. This was not the case for dominoes " + JSON.stringify([...dominoes].map(sortDomino).sort()) + " and result " + JSON.stringify([...result].map(sortDomino).sort())).toEqual([...result].map(sortDomino).sort());
}


it('scenario1', () => {
    runTest([[1, 1]], true);
    runTest([[1, 2]], false);
    runTest([[1, 2], [3, 1], [2, 3],], true);
    runTest([[1, 2], [1, 3], [2, 3],], true);
    runTest([[1, 2], [4, 1], [2, 3],], false);
    runTest([[1, 1], [2, 2],], false);
    runTest([[1, 2], [2, 1], [3, 4], [4, 3],], false);
    runTest([[1, 2], [2, 3], [3, 1], [4, 4],], false);
    runTest([[1, 2], [2, 3], [3, 1], [2, 4], [2, 4],], true);
    runTest([[1, 2], [2, 3], [3, 1], [1, 1], [2, 2], [3, 3],], true);
    runTest([[1, 2], [5, 3], [3, 1], [1, 2], [2, 4], [1, 6], [2, 3], [3, 4], [5, 6],], true);
});