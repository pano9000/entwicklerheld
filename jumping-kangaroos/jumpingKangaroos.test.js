import {isCompletable, getMinimalNumberOfJumps} from "../jumpingKangaroos";

test('first scenario', () => {
    let numbers = [2,0,3];
    let actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);

    numbers = [1,0,1];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [2,0,1];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [2,0,0,1];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [3,0,3,0];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [4,0,1,1,0,3];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [5,4,3,2,1,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [4,2,1,0,0,4];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [1,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [4,2,1,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);

});

test('second scenario', () => {
    /* simple examples */
    let numbers = [1,2,1,1];
    let actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [1,1,1,1,1];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [1,2,1,2,1,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [2,0,3,5,0,1,2,1,3];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [3,3,3,3,2,1,3];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [5,4,3,2,1,2,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [1,4,0,1,1,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [1,1,2,1,2,1,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [2,0,1,0,3];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [4,0,1,1,0,3];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [5,4,3,2,1,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [1,2,1,0,3];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [3,3,2,1,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [4,2,1,0,0,4];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [1,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [1,1,1,0,1];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [2,2,2,0,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers: ['+numbers+'] but was: '+actual).toBe(false);

});


test('third scenario', () => {
    /* difficult examples where you can jump less than the number */
    let numbers = [2,2,0,1];
    let actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers: ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [2,3,1,1,4];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [3,0,2,0,4];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [2,2,0,2,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [1,2,2,0,4];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [5,3,1,2,3,1,0,4];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [3,5,0,0,0,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [2,0,1,2,3,0,1,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [3,1,2,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [1,2,0,3,3,0,0,1];
    actual = isCompletable(numbers);
    expect(actual, 'Expected true for numbers ['+numbers+'] but was: '+actual).toBe(true);
    numbers = [3,2,1,0,4];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [2,0,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [2,2,0,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [4,3,2,1,0,1];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [1,1,2,1,0,1];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [2,0,2,2,0,2,0,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [4,0,2,3,0,1,0,1];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [1,2,3,0,1,0,1];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [5,3,0,0,1,0,2];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers ['+numbers+'] but was: '+actual).toBe(false);
    numbers = [1,4,0,1,0,0,1];
    actual = isCompletable(numbers);
    expect(actual, 'Expected false for numbers ['+numbers+'] but was: '+actual).toBe(false);

});


test('fourth scenario', () => {
    /* now you have to return the minimal number of jumps you need to reach the last number, so you are searching for the best path*/
    /*for test cases which are false, return 0*/
    let numbers = [3,2,0,1,2];
    let actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 2 for numbers ['+numbers+'] but was: '+actual).toBe(2);
    numbers = [1,4,0,1,0,0,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 0 for numbers ['+numbers+'] but was: '+actual).toBe(0);
    numbers = [5,4,3,2,1,2];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 1 for numbers ['+numbers+'] but was: '+actual).toBe(1);
    numbers = [3,1,1,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 1 for numbers ['+numbers+'] but was: '+actual).toBe(1);
    numbers = [4,2,2,0,2];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 1 for numbers ['+numbers+'] but was: '+actual).toBe(1);
    numbers = [2,0,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 1 for numbers ['+numbers+'] but was: '+actual).toBe(1);
    numbers = [1,1,1,2];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 3 for numbers ['+numbers+'] but was: '+actual).toBe(3);
    numbers = [2,1,1,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 2 for numbers ['+numbers+'] but was: '+actual).toBe(2);
    numbers = [3,0,2,1,2];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 2 for numbers ['+numbers+'] but was: '+actual).toBe(2);
    numbers = [2,2,0,3,1,2,0,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 4 for numbers ['+numbers+'] but was: '+actual).toBe(4);
    numbers = [1,2,3,1,1,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 3 for numbers ['+numbers+'] but was: '+actual).toBe(3);
    numbers = [2,0,1,1,2];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 3 for numbers ['+numbers+'] but was: '+actual).toBe(3);
    numbers = [3,2,1,2,0,2,0,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 3 for numbers ['+numbers+'] but was: '+actual).toBe(3);
    numbers = [3,1,1,2,3,1,1,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 3 for numbers ['+numbers+'] but was: '+actual).toBe(3);
    numbers = [5,3,0,0,1,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 1 for numbers ['+numbers+'] but was: '+actual).toBe(1);
    numbers = [1,4,1,1,1,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 2 for numbers ['+numbers+'] but was: '+actual).toBe(2);
    numbers = [2,3,1,1,2];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 2 for numbers ['+numbers+'] but was: '+actual).toBe(2);
    numbers = [4,3,2,2,1,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 2 for numbers ['+numbers+'] but was: '+actual).toBe(2);
    numbers = [1,1,2,2,0,3,1,3,2,1,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 6 for numbers ['+numbers+'] but was: '+actual).toBe(6);
    numbers = [5,4,4,1,1,0,2,0,2];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 3 for numbers ['+numbers+'] but was: '+actual).toBe(3);
    numbers = [2,4,3,5,1,1,2,0,1,1];
    actual = getMinimalNumberOfJumps(numbers);
    expect(actual, 'Expected 4 for numbers ['+numbers+'] but was: '+actual).toBe(4);

});

beforeEach(() => {
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished")
});
