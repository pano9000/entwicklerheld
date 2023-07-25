import { TreeNode } from "./tree.js"
import 'regenerator-runtime/runtime' //required due to Babel

export function printTree(treeNode) {

    const result = [];
    const traverseTree = traverseTreeBFS(treeNode);

    while (true) {
        const currentNode = traverseTree.next();
        if (currentNode.done) break;
        const currentDepth = currentNode.value.depth;
        if (result[currentDepth] === undefined) { result[currentDepth] = [] };
        result[currentDepth].push(currentNode.value.value)

    }
    console.log(result)

    return result.join("\n");

    //const result = recursivePrintTree(treeNode);
    //console.log("resuu", result)
    /**
     * [ 1 ], [ 2, 3 ], [ 4, 5, 6, 7 ]
     * |    1
     * |   / \
     * |  2   3  |
     * | / \ / \
     * |4  5 6  7 |
     */

    /*

             [ 1 ]          |
                            |
        [ 2 ]     [ 3 ]     |
                            |
    [ 4 ] [ 5 ] [ 6 ] [ 7 ] |

    */

}


function* traverseTreeBFS(treeNode) {
    const queue = [treeNode];
    let depth = 0;
    let tempDepth = 1;
    while (queue.length > 0) {
        const currentNode = queue.shift();
        yield {value: currentNode.value, depth }

        if (currentNode.left !== null) {
            queue.push(currentNode.left)
        }

        if (currentNode.right !== null) {
            queue.push(currentNode.right)
        }

        if (tempDepth % 2**depth === 0) {
            depth++;
            tempDepth = 1;
        } else {
            tempDepth++;
        }

    }
}

export function checkTreeEqualness(treeNode1, treeNode2){
    const g1 = traverseTreeBFS(treeNode1);
    const g2 = traverseTreeBFS(treeNode2);

    while(true)
    {
        let currG1 = g1.next();
        let currG2 = g2.next();
        if (currG1.done && currG2.done) return true;
        if (currG1.value.value !== currG2.value.value) return false;
    }

}

export function reverse(treeNode) {

    //reversedNode.left = treeNode.right
    //reversedNode.right = treeNode.left

    //this would be the "lazy"/"cheat" version of a solution, as it just reverses the tree visualization, but does not produce a proper Tree
    /*
    const a = printTree(treeNode);
    console.log("a", a)
    const b = a.map( (entry, index) => {
        if (index == 0) return entry;

        return entry.reverse();
    })
    console.log("b", b)

    return b;
    */
    const g1 = traverseTreeBFS(treeNode);


    g1.next(); // skip first
    const reversedNode = new TreeNode(treeNode.value, null, null);
    let currentDepth = 0;
    /*

        [1]
        [2, 3]
        [4,5,6,7]

        [1]
        [3, 2]
        [7, 6, 5, 4]
        
        { 
            val: 1,
            left: {
                val: 3,
                left: 
            }
        }


    */
    while(true) {
    
        let currentVal = g1.next();
        let nextVal = g1.next();
        console.log("reversee", currentVal.value, nextVal)

        if (currentVal.done) break;
    }

    //reverse here

    console.log(printTree(reversedNode), printTree(treeNode));
    // implement this in scenario 3
    return treeNode;
}
