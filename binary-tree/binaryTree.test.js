import {checkTreeEqualness, printTree, reverse} from "../binaryTree";
import {TreeNode} from "../tree";
let fs = require('fs');

beforeEach(() => {
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished")
});

let smallTreeResult, mediumTreeResult, bigTreeResult, scenario2Tree11, scenario2Tree12, scenario2Tree21, scenario2Tree22 = "";

function checkTreeEqualnessTest(actualNode, expectedNode, actualRootNode=null, expectedRootNode=null) {
    if (actualRootNode == null) {
        actualRootNode = actualNode;
    }

    if (expectedRootNode == null) {
        expectedRootNode = expectedNode;
    }

    if (actualNode == null || expectedNode == null) {
        if (actualNode !== expectedNode) {
            fail('Tree length differs');
        }

        return false;
    }

    expect(actualNode.value,
        "Tree does not equal the expected tree: Expected " + expectedNode.value
        + " Actual: " + actualNode.value + " in \n" + printTree(expectedRootNode) + " \nand \n"
        + printTree(actualRootNode)).toBe(expectedNode.value);

    checkTreeEqualnessTest(actualNode.left, expectedNode.left, actualRootNode, expectedRootNode);
    checkTreeEqualnessTest(actualNode.right, expectedNode.right, actualRootNode, expectedRootNode);
}

function treeFactory(rootNode, nodes) {
    const leftSubtree = nodes[0];
    const rightSubtree = nodes[1];

    const leftNodeValue = leftSubtree.shift();
    const rightNodeValue = rightSubtree.shift();

    let leftNode = new TreeNode(leftNodeValue, null, null);
    let rightNode = new TreeNode(rightNodeValue, null, null);

    rootNode.left = leftNode;
    rootNode.right = rightNode;

    if (leftSubtree.length !== 0) {
        treeFactory(leftNode, leftSubtree[0]);
    }

    if (rightSubtree.length !== 0) {
        treeFactory(rightNode, rightSubtree[0]);
    }
}

// First Scenario
test('Print Tree', () => {
    let smallTreeRightLeaf = new TreeNode(3, null, null);
    let smallTreeLeftLeaf = new TreeNode(2, null, null);
    let smallTree = new TreeNode(1, smallTreeLeftLeaf, smallTreeRightLeaf);
    smallTreeResult = printTree(smallTree);
    // put into result data

    let treeExample = new TreeNode(1, null, null);
    treeFactory(treeExample,
        [[
            2, [[4], [5]]
        ],[
            3, [[6], [7]]
        ]]
    );
    mediumTreeResult = printTree(treeExample);
    // put into result data

    let bigTree = new TreeNode(1, null, null);
    treeFactory(bigTree,
        [[
            2, [[4, [[8], [9]]], [5, [[10], [11]]]]
        ], [
            3, [[6, [[12], [13]]], [7, [[14], [15]]]]
        ]]
    );

    bigTreeResult = printTree(bigTree);

});


// Second Scenario
test('Check Equalness', () => {
    // Case 1
    let tree1Root1 = new TreeNode(1, null, null);
    treeFactory(tree1Root1,
        [
            [3, [[7], [6]]],
            [2, [[5], [4]]]
        ]
    );

    let tree2Root1 = new TreeNode(1, null, null);
    treeFactory(tree2Root1,
        [
            [3, [[7], [6]]],
            [2, [[5], [4]]]
        ]
    );
    scenario2Tree11 = printTree(tree1Root1); scenario2Tree12 = printTree(tree2Root1);
    let equal1 = checkTreeEqualness(tree1Root1, tree2Root1);

    let message1 = "Expected checkTreeEqualness to return true but was  " + equal1 + " for \n" + printTree(tree1Root1)
        + " \nand \n" + printTree(tree2Root1);



    // Case 2
    let tree1Root2 = new TreeNode(7, null, null);
    treeFactory(tree1Root2,
        [
            [8, [[10], [11]]],
            [9, [[12], [13]]]
        ]
    );

    let tree2Root2 = new TreeNode(1, null, null);
    treeFactory(tree2Root2,
        [
            [3, [[7], [6]]],
            [2, [[5], [4]]]
        ]
    );
    scenario2Tree21 = printTree(tree1Root2); scenario2Tree22 = printTree(tree2Root2);
    expect(equal1, message1).toBeTruthy(); // This line must be under the initialization + the print for the flowfile
    let equal2 = checkTreeEqualness(tree1Root2, tree2Root2);
    let message2 = "Expected checkTreeEqualness to return false but was  " + equal2 + " for \n" + printTree(tree1Root2)
        + " \nand \n" + printTree(tree2Root2);
    expect(equal2, message2).toBeFalsy();


    // Case 3 - different lengths
    let tree1Root3 = new TreeNode(7, null, null);
    treeFactory(tree1Root3,
        [[3], [2]]
    );

    let tree2Root3 = new TreeNode(1, null, null);
    treeFactory(tree2Root3,
        [
            [3, [[7], [6]]],
            [2, [[5], [4]]]
        ]
    );

    let equal3 = checkTreeEqualness(tree1Root3, tree2Root3);

    let message3 = "Expected checkTreeEqualness to return false but was  " + equal3 + " for \n" + printTree(tree1Root3)
        + " \nand \n" + printTree(tree2Root3);
    expect(equal3, message3).toBeFalsy();

    // Case 4 short tree root node different
    let tree1Root4 = new TreeNode(7, null, null);
    treeFactory(tree1Root4,
        [[3], [2]]
    );

    let tree2Root4 = new TreeNode(1, null, null);
    treeFactory(tree2Root4,
        [
            [3], [2]
        ]
    );

    let equal4 = checkTreeEqualness(tree1Root4, tree2Root4);

    let message4 = "Expected checkTreeEqualness to return false but was " + equal4 + " for \n" + printTree(tree1Root4)
        + " \nand \n" + printTree(tree2Root4);
    expect(equal4, message4).toBeFalsy();


    // Case 5 short tree equal
    let tree1Root5 = new TreeNode(47, null, null);
    treeFactory(tree1Root5,
        [[48], [49]]
    );

    let tree2Root5 = new TreeNode(47, null, null);
    treeFactory(tree2Root5,
        [
            [48], [49]
        ]
    );

    let equal5 = checkTreeEqualness(tree1Root5, tree2Root5);

    let message5 = "Expected checkTreeEqualness to return true but was  " + equal5 + " for \n" + printTree(tree1Root5)
        + " \nand \n" + printTree(tree2Root5);
    expect(equal5, message5).toBeTruthy();

});

test('Tree reverse', () => {
    let actualTree1Root = new TreeNode(1, null, null);
    treeFactory(actualTree1Root,
        [
            [2, [[4], [5]]],
            [3, [[6], [7]]]
        ]
    );

    let expectedTree1Root = new TreeNode(1, null, null);
    treeFactory(expectedTree1Root,
        [
            [3, [[7], [6]]],
            [2, [[5], [4]]]
        ]
    );

    actualTree1Root = reverse(actualTree1Root);

    checkTreeEqualnessTest(actualTree1Root, expectedTree1Root);


    let actualLeftLeaf = new TreeNode(2, null, null);
    let actualRightLeaf = new TreeNode(3, null, null);
    let actualRootNode = new TreeNode(1, actualLeftLeaf, actualRightLeaf);


    let expectedRightLeaf = new TreeNode(2, null, null);
    let expectedLeftLeaf = new TreeNode(3, null, null);
    let expectedRootNode = new TreeNode(1, expectedLeftLeaf, expectedRightLeaf);

    actualRootNode = reverse(actualRootNode);


    checkTreeEqualnessTest(actualRootNode, expectedRootNode);



    let actualTree2Root = new TreeNode(1, null, null);
    treeFactory(actualTree2Root,
        [[
            2, [[4, [[8], [9]]],
                [5, [[10], [11]]]]
        ], [
            3, [[6, [[12], [13]]],
                [7, [[14], [15]]]]
        ]]
    );

    let expectedTree2Root = new TreeNode(1, null, null);
    treeFactory(expectedTree2Root,
        [[
            3, [[7, [[15], [14]]],
                [6, [[13], [12]]]
            ]
        ], [
            2, [[5, [[11], [10]]],
                [4, [[9], [8]]]
            ]

        ]]
    );

    actualTree2Root = reverse(actualTree2Root);

    checkTreeEqualnessTest(actualTree2Root, expectedTree2Root);

});



afterAll(() => {
    let json = [];
    // Scenario 1
    json.push({
        "scenarioId": String(1),
        "sentenceId": String(6),
        "content": "<pre>" + smallTreeResult + "</pre>"
    })
    json.push({
        "scenarioId": String(1),
        "sentenceId": String(8),
        "content": "<pre>" + mediumTreeResult + "</pre>"
    })
    json.push({
        "scenarioId": String(1),
        "sentenceId": String(10),
        "content": "<pre>" + bigTreeResult + "</pre>"
    })


    // Scenario 2
    json.push({
        "scenarioId": String(2),
        "sentenceId": String(2),
        "content": "<pre>" + scenario2Tree11 + "</pre><br/><pre>" + scenario2Tree12 + "</pre>"
    })
    json.push({
        "scenarioId": String(2),
        "sentenceId": String(4),
        "content": "<pre>" + scenario2Tree21 + "</pre><br/><pre>" + scenario2Tree22 + "</pre>"
    })


    let result = JSON.stringify(json);
    fs.writeFileSync('visualization-data.json', result);
});
