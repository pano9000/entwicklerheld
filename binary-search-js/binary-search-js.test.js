import { find } from "../binary-search-js";
import { Result } from "../result";

beforeEach(() => {
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished")
});

test('test 1 1', () => {
    let arr = [6];
    let element = 6;
    let actual = find(arr, element);
    let expected = new Result(0, 0);
    expect(actual, `Given an array [ ${arr} ] with one element the element ${element} should be found in step ${expected.step} an return index ${expected.index}.`).toEqual(expected);
});

test('test 1 2', () => {
    let arr = [1, 3, 4, 6, 8, 9, 11];
    let element = 6;
    let actual = find(arr, element);
    let expected = new Result(0, 3);
    expect(actual, `Given an array [ ${arr} ] with ${arr.length} elements the element ${element} should be found in step ${expected.step} and return index ${expected.index}.`).toEqual(expected);
});

test('test 1 3', () => {
    let arr = [1, 3, 4, 6, 8, 9, 11];
    let element = 1;
    let actual = find(arr, element);
    let expected = new Result(2, 0);
    expect(actual, `Given an array [ ${arr} ] with ${arr.length} elements the element ${element} should be found in step ${expected.step} and return index ${expected.index}.`).toEqual(expected);
});

test('test 1 4', () => {
    let arr = [1, 3, 4, 6, 8, 9, 11];
    let element = 11;
    let actual = find(arr, element);
    let expected = new Result(2, 6);
    expect(actual, `Given an array [ ${arr} ] with ${arr.length} elements the element ${element} should be found in step ${expected.step} and return index ${expected.index}.`).toEqual(expected);
});

test('test 1 5', () => {
    let arr = [1, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
    let element = 21;
    let actual = find(arr, element);
    let expected = new Result(0, 5);
    expect(actual, `Given an array [ ${arr} ] with ${arr.length} elements the element ${element} should be found in step ${expected.step} and return index ${expected.index}.`).toEqual(expected);
});

test('test 1 6', () => {
    let arr = [1, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 634];
    let element = 144;
    let actual = find(arr, element);
    let expected = new Result(1, 9);
    expect(actual, `Given an array [ ${arr} ] with ${arr.length} elements the element ${element} should be found in step ${expected.step} and return index ${expected.index}.`).toEqual(expected);
});

test('test 2 1', () => {
    let arr = [];
    let element = 2;
    let actual = find(arr, element);
    let expected = new Result(0, -1);
    expect(actual, `Given an array [ ${arr} ] with ${arr.length} elements the element ${element} should be found in step ${expected.step} and return index ${expected.index}.`).toEqual(expected);
});

test('test 2 2', () => {
    let arr = [1, 3, 4, 6, 8, 9, 11];
    let element = 2;
    let actual = find(arr, element);
    let expected = new Result(3, -1);
    expect(actual, `Given an array [ ${arr} ] with ${arr.length} elements the element ${element} should be found in step ${expected.step} and return index ${expected.index}.`).toEqual(expected);
});
