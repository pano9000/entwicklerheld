import Move from "./Move";
import { christmasTreeOfHanoi } from "./christmas-tree-of-hanoi-javascript";

beforeEach(() => {
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished")
});

test('first scenario', () => {
    let sourceTreeStand = "A";
    let destinationTreeStand = "C";
    let auxiliaryTreeStand = "B";

    let treeLayers = 1;
    let expected = [new Move(1, sourceTreeStand, destinationTreeStand)]
    let result = christmasTreeOfHanoi(treeLayers, sourceTreeStand, destinationTreeStand, auxiliaryTreeStand);
    expect(result, "\nFor amount of treeLayers = " + treeLayers).toStrictEqual(expected);

    treeLayers = 2;
    expected = [
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(2, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand)
    ];
    result = christmasTreeOfHanoi(treeLayers, sourceTreeStand, destinationTreeStand, auxiliaryTreeStand);
    expect(result, "\nFor amount of treeLayers = " + treeLayers).toStrictEqual(expected);

    treeLayers = 3;
    expected = [
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(3, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand)
    ];
    result = christmasTreeOfHanoi(treeLayers, sourceTreeStand, destinationTreeStand, auxiliaryTreeStand);
    expect(result, "\nFor amount of treeLayers = " + treeLayers).toStrictEqual(expected);

    treeLayers = 4;
    expected = [
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(2, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(3, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(2, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(4, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(2, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(3, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(2, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand)
    ];
    result = christmasTreeOfHanoi(treeLayers, sourceTreeStand, destinationTreeStand, auxiliaryTreeStand);
    expect(result, "\nFor amount of treeLayers = " + treeLayers).toStrictEqual(expected);

    treeLayers = 5;
    expected = [
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(3, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(4, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(3, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(5, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(3, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(4, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(3, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand)
    ];
    result = christmasTreeOfHanoi(treeLayers, sourceTreeStand, destinationTreeStand, auxiliaryTreeStand);
    expect(result, "\nFor amount of treeLayers = " + treeLayers).toStrictEqual(expected);

    treeLayers = 6;
    expected = [
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(2, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(3, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(2, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(4, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(2, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(3, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(2, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(5, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(2, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(3, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(2, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(4, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(2, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(3, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(2, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(6, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(2, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(3, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(2, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(4, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(2, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(3, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(2, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(5, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(2, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(3, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(2, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(4, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand),
            new Move(2, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, sourceTreeStand),
            new Move(3, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, auxiliaryTreeStand),
            new Move(2, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, destinationTreeStand)
    ];
    result = christmasTreeOfHanoi(treeLayers, sourceTreeStand, destinationTreeStand, auxiliaryTreeStand);
    expect(result, "\nFor amount of treeLayers = " + treeLayers).toStrictEqual(expected);

    treeLayers = 7;
    expected = [
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(3, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(4, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(3, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(5, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(3, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(4, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(3, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(6, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(3, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(4, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(3, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(5, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(3, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(4, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(3, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(7, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(3, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(4, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(3, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(5, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(3, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(4, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(3, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(6, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(3, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(4, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(3, destinationTreeStand, auxiliaryTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(5, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(3, auxiliaryTreeStand, sourceTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(2, destinationTreeStand, sourceTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(4, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand),
            new Move(2, sourceTreeStand, auxiliaryTreeStand),
            new Move(1, destinationTreeStand, auxiliaryTreeStand),
            new Move(3, sourceTreeStand, destinationTreeStand),
            new Move(1, auxiliaryTreeStand, sourceTreeStand),
            new Move(2, auxiliaryTreeStand, destinationTreeStand),
            new Move(1, sourceTreeStand, destinationTreeStand)
    ];
    result = christmasTreeOfHanoi(treeLayers, sourceTreeStand, destinationTreeStand, auxiliaryTreeStand);
    expect(result, "\nFor amount of treeLayers = " + treeLayers).toStrictEqual(expected);
});