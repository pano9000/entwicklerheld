import {isPaired} from './matching-brackets.js';
import { expect } from 'chai';

// Scenario 1
it('empty string', () => {
    expect(isPaired('', "The empty string '' should result in true")).to.equal(true);
});

// Scenario 2
it('paired square brackets', () => {
    expect(isPaired('[]', "The input '[]' should result in true")).to.equal(true);
});
it('paired curly braces', () => {
    expect(isPaired('{}', "The input '{}' should result in true")).to.equal(true);
});
it('paired brackets', () => {
    expect(isPaired('()', "The input '()' should result in true")).to.equal(true);
});

// Scenario 2 - other tests
it('paired square brackets1', () => {
    expect(isPaired('[({})]'), "The input '[({})]' should result in true").to.equal(true);
    expect(isPaired('{ }'), "The input '{ }' should result in true").to.equal(true);
    expect(isPaired('{[]}'), "The input '{[]}' should result in true").to.equal(true);
    expect(isPaired('[({})]'), "The input '[({})]' should result in true").to.equal(true);
    expect(isPaired('[({})]{}()'), "The input '[({})]{}()' should result in true").to.equal(true);
});

// Scenario 3
it('unpaired brackets', () => {
    expect(isPaired('[['), "The input '[[' should result in false").to.equal(false);
});

it('wrong ordered brackets', () => {
    expect(isPaired('}{'), "The input '}{' should result in false").to.equal(false);
});

it('wrong closing bracket', () => {
    expect(isPaired('{)'), "The input '{)' should result in false").to.equal(false);
});

// Scenario 3 - other tests
it('partially paired brackets', () => {
    expect(isPaired('{[])'), "The input '{[])' should result in false").to.equal(false);
    expect(isPaired('{[)][]}'), "The input '{[)][]}' should result in false").to.equal(false);
    expect(isPaired('({[)][]}'), "The input '({[)][]}' should result in false").to.equal(false);
    expect(isPaired('({[)][]}((())'), "The input '({[)][]}((())' should result in false").to.equal(false);
    expect(isPaired('({[){][]}[['), "The input '({[){][]}[[' should result in false").to.equal(false);
});

// Scenario 4
it('complex latex expression', () => {
    expect(
        isPaired(
            '\\left(\\begin{array}{cc} \\frac{1}{3} & x\\\\ \\mathrm{e}^{x} &... x^2 \\end{array}\\right)'
        ), "The input '\\\\left(\\\\begin{array}{cc} \\\\frac{1}{3} & x\\\\\\\\ \\\\mathrm{e}^{x} &... x^2 \\\\end{array}\\\\right)' should result in true"
    ).to.equal(true);
});

it('math expression', () => {
    expect(isPaired('(((185 + 223.85) * 15) - 543)/2'), "The input '(((185 + 223.85) * 15) - 543)/2' should result in true").to.equal(true);
});

// Scenario 4 - other tests
it('paired and nested brackets', () => {
    expect(isPaired('([{}({}[])])'), "The input '([{}({}[])])' should result in true").to.equal(true);
    expect(isPaired('{[)][]}'), "The input '{[)][]}' should result in false").to.equal(false);
    expect(isPaired('([{])'), "The input '([{])' should result in false").to.equal(false);
    expect(isPaired('[({]})'), "The input '[({]})' should result in false").to.equal(false);
    expect(isPaired('{}['), "The input '{}[' should result in false").to.equal(false);
    expect(isPaired('[]]'), "The input '[]]' should result in false").to.equal(false);
    expect(isPaired('([{a}({b}[])c]d)'), "The input '([{a}({b}[])c]d)' should result in true").to.equal(true);
    expect(isPaired('(((185 + 223.85) * 15) - 543/2'), "The input '(((185 + 223.85) * 15) - 543/2' should result in false").to.equal(false);
});