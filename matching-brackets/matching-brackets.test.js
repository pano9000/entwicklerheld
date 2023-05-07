import {isPaired} from '../matching-brackets';
import { expect } from 'chai';

beforeEach(() => {
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished")
});
// Scenario 1
test('empty string', () => {
    expect(isPaired('', "The empty string '' should result in true")).to.equal(true);
});

// Scenario 2
test('paired square brackets', () => {
    expect(isPaired('[]', "The input '[]' should result in true")).to.equal(true);
});
test('paired curly braces', () => {
    expect(isPaired('{}', "The input '{}' should result in true")).to.equal(true);
});
test('paired brackets', () => {
    expect(isPaired('()', "The input '()' should result in true")).to.equal(true);
});

// Scenario 2 - other tests
test('paired square brackets1', () => {
    expect(isPaired('[({})]'), "The input '[({})]' should result in true").to.equal(true);
    expect(isPaired('{ }'), "The input '{ }' should result in true").to.equal(true);
    expect(isPaired('{[]}'), "The input '{[]}' should result in true").to.equal(true);
    expect(isPaired('[({})]'), "The input '[({})]' should result in true").to.equal(true);
    expect(isPaired('[({})]{}()'), "The input '[({})]{}()' should result in true").to.equal(true);
});

// Scenario 3
test('unpaired brackets', () => {
    expect(isPaired('[['), "The input '[[' should result in false").to.equal(false);
});

test('wrong ordered brackets', () => {
    expect(isPaired('}{'), "The input '}{' should result in false").to.equal(false);
});

test('wrong closing bracket', () => {
    expect(isPaired('{)'), "The input '{)' should result in false").to.equal(false);
});

// Scenario 3 - other tests
test('partially paired brackets', () => {
    expect(isPaired('{[])'), "The input '{[])' should result in false").to.equal(false);
    expect(isPaired('{[)][]}'), "The input '{[)][]}' should result in false").to.equal(false);
    expect(isPaired('({[)][]}'), "The input '({[)][]}' should result in false").to.equal(false);
    expect(isPaired('({[)][]}((())'), "The input '({[)][]}((())' should result in false").to.equal(false);
    expect(isPaired('({[){][]}[['), "The input '({[){][]}[[' should result in false").to.equal(false);
});

// Scenario 4
test('complex latex expression', () => {
    expect(
        isPaired(
            '\\left(\\begin{array}{cc} \\frac{1}{3} & x\\\\ \\mathrm{e}^{x} &... x^2 \\end{array}\\right)'
        ), "The input '\\\\left(\\\\begin{array}{cc} \\\\frac{1}{3} & x\\\\\\\\ \\\\mathrm{e}^{x} &... x^2 \\\\end{array}\\\\right)' should result in true"
    ).to.equal(true);
});

test('math expression', () => {
    expect(isPaired('(((185 + 223.85) * 15) - 543)/2'), "The input '(((185 + 223.85) * 15) - 543)/2' should result in true").to.equal(true);
});

// Scenario 4 - other tests
test('paired and nested brackets', () => {
    expect(isPaired('([{}({}[])])'), "The input '([{}({}[])])' should result in true").to.equal(true);
    expect(isPaired('{[)][]}'), "The input '{[)][]}' should result in false").to.equal(false);
    expect(isPaired('([{])'), "The input '([{])' should result in false").to.equal(false);
    expect(isPaired('[({]})'), "The input '[({]})' should result in false").to.equal(false);
    expect(isPaired('{}['), "The input '{}[' should result in false").to.equal(false);
    expect(isPaired('[]]'), "The input '[]]' should result in false").to.equal(false);
    expect(isPaired('([{a}({b}[])c]d)'), "The input '([{a}({b}[])c]d)' should result in true").to.equal(true);
    expect(isPaired('(((185 + 223.85) * 15) - 543/2'), "The input '(((185 + 223.85) * 15) - 543/2' should result in false").to.equal(false);
});