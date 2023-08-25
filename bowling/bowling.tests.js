import {Bowling} from '../bowling';

beforeEach(() => {
      console.log("##polylith[testStarted");
});

afterEach(() => {
      console.log("##polylith[testFinished")
});


test('should be able to score a game with all zeros', () => {
      const rolls = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });
    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] should be able to score a game with all zeros').toEqual(0);
});

test('should be able to score a game with no strikes or spares', () => {
      const rolls = [
          3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6,
    ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });
    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] should be able to score a game with no strikes or spares').toEqual(90);
});

test('a spare followed by zeros is worth ten points', () => {
      const rolls = [
          6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });
    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] a spare followed by zeros is worth ten points').toEqual(10);
});

test('points scored in the roll after a spare are counted twice', () => {
      const rolls = [
          6, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });
    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] points scored in the roll after a spare are counted twice').toEqual(16);
});

test('consecutive spares each get a one roll bonus', () => {
      const rolls = [
          5, 5, 3, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });
    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] consecutive spares each get a one roll bonus').toEqual(31);
});

test('a spare in the last frame gets a one roll bonus that is counted once', () => {
      const rolls = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 7,
    ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });
    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] a spare in the last frame gets a one roll bonus that is counted once').toEqual(17);
});

test('a strike earns ten points in a frame with a single roll', () => {
      const rolls = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });
    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] a spare in the last frame gets a one roll bonus that is counted once').toEqual(10);
});

test('points scored in the two rolls after a strike are counted twice as a bonus', () => {
      const rolls = [10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });

    expect(bowling.score()).toEqual(26, 'Given rolls: [' + rolls.toString() + '] points scored in the two rolls after a strike are counted twice as a bonus');
});

test('consecutive strikes each get the two roll bonus', () => {
      const rolls = [10, 10, 10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });

    expect(bowling.score()).toEqual(81, 'Given rolls: [' + rolls.toString() + '] consecutive strikes each get the two roll bonus');
});

test('a strike in the last frame gets a two roll bonuses that is counted once', () => {
      const rolls = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 1,
    ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });

    expect(bowling.score()).toEqual(18, 'Given rolls: [' + rolls.toString() + '] a strike in the last frame gets a two roll bonus that is counted once');
});

test('rolling a spare with the two roll bonus does not get a bonus roll', () => {
      const rolls = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 3,
    ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });

    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] rolling a spare with the two roll bonus does not get a bonus roll').toEqual(20);
});

test('strikes with the two roll bonus do not get bonus rolls', () => {
      const rolls = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10
    ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });

    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] strikes with the two roll bonus do not get bonus rolls').toEqual(30);
});

test('a strike with the one roll bonus after a spare in the last frame does not get a bonus', () => {
      const rolls = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 10,
    ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });

    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] a strike with the one roll bonus after a spare in the last frame does not get a bonus').toEqual(20);
});

test('all strikes is a perfect game', () => {
      const rolls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });

    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] all strikes is a perfect game').toEqual(300);
});

test('two bonus rolls after a strike in the last frame can score more than 10 points if one is a strike', () => {
      const rolls = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 6,
    ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
          bowling.roll(roll);
    });

    expect(bowling.score(), 'Given rolls: [' + rolls.toString() + '] two bonus rolls after a strike in the last frame can score more than 10 points if one is a strike').toEqual(26);
});
