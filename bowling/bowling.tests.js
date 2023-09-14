import {Bowling} from './bowling.js';
import { expect } from 'chai';

class TestCase {
  constructor(title, rolls, expectedScore) {
    this.title = title;
    this.rolls = rolls;
    this.expectedScore = expectedScore
  }
}

const testFunc = (testCase) => {
  const {title, rolls, expectedScore} = testCase;

  return it(title, () => {
    const bowling = new Bowling();

    rolls.forEach((roll) => {
      bowling.roll(roll);
    });

    const score = bowling.score();
    expect(score, `Expected '${expectedScore}' for rolls: '${rolls}' but was '${score}'`).to.equal(expectedScore);
  });
}

const testCases = [
  new TestCase("should be able to score a game with all zeros",
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    0
  ),

  new TestCase("should be able to score a game with no strikes or spares",
    [3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6],
    90
  ),

  new TestCase("a spare followed by zeros is worth ten points",
    [6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    10
  ),

  new TestCase("points scored in the roll after a spare are counted twice",
    [6, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    16
  ),

  new TestCase("consecutive spares each get a one roll bonus",
    [5, 5, 3, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    31
  ),

  new TestCase("a spare in the last frame gets a one roll bonus that is counted once",
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 7],
    17
  ),

  new TestCase("a strike earns ten points in a frame with a single roll",
    [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    10
  ),

  new TestCase("points scored in the two rolls after a strike are counted twice as a bonus",
    [10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    26
  ),

  new TestCase("consecutive strikes each get the two roll bonus",
    [10, 10, 10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    81
  ),

  new TestCase("a strike in the last frame gets a two roll bonuses that is counted once",
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 1],
    18
  ),

  new TestCase("rolling a spare with the two roll bonus does not get a bonus roll",
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 3],
    20
  ),

  new TestCase("strikes with the two roll bonus do not get bonus rolls",
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10],
    30
  ),

  new TestCase("a strike with the one roll bonus after a spare in the last frame does not get a bonus",
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 10],
    20
  ),

  new TestCase("all strikes is a perfect game",
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    300
  ),

  new TestCase("two bonus rolls after a strike in the last frame can score more than 10 points if one is a strike",
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 6],
    26
  )
];

const errorTestCases = [
  new TestCase("When providing an non-integer, it should throw an Error",
    ["a"]
  ),
  new TestCase("When providing an non-positive integer, it should throw an Error",
    [-1]
  ),
  new TestCase("When providing an number that is higher than the initial pins, it should throw an Error",
    [11]
  ),
  new TestCase("When providing an number that is higher than the remaining pins, it should throw an Error",
    [5, 8]
  ),
  new TestCase("When providing undefined as pins, it should throw an Error",
    [5, undefined]
  ),
  new TestCase("When providing null as pins, it should throw an Error",
    [5, null]
  ),
]

const errorTestFunc = (testCase) => {
  const {title, rolls, expectedScore} = testCase;

  return it(title, () => {


    expect(
      () => {
        const bowling = new Bowling();

        rolls.forEach((roll) => {
          bowling.roll(roll);
        });
      }
    ).to.throw();

  });
}

describe("Bowling Tests", () => {
  testCases.forEach(testCase => testFunc(testCase));
});

describe("Bowling Tests Errors", () => {
  errorTestCases.forEach(errorTestCase => errorTestFunc(errorTestCase));
});