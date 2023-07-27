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

        const maxNodesInCurrentDepth = 2**depth;
        if (tempDepth % maxNodesInCurrentDepth === 0) {
            depth++;
            tempDepth = 1;
        } else {
            tempDepth++;
        }
    }
}

function* mirrorTree(t) {

    //I need to work with a queue here it seems
    let tree = t;
    let count = 0;
    //let treeDir = 
    //if (count == 0)
    current
    while(true) {
        if (count === 1) {
            console.log("in 1 yielllld")

            count = 0;
            console.log("mirrrtrrr", tree, "yieeeeld")
            tree.right = yield;
        } else {
            count++;
            console.log("mirrrtrrr", tree, "yieeeeld")
            tree.left = yield;
        }
        console.log("after else yielllld", new Date())
    }
}

// Step through each node and check if same or not -> exits early, if there is a difference
export function checkTreeEqualness(treeNode1, treeNode2){

    const treeGenerators = [traverseTreeBFS(treeNode1), traverseTreeBFS(treeNode2)];
    
    while(true){
        const currentSteps = [treeGenerators[0].next(), treeGenerators[1].next()];
        if (currentSteps[0].done && currentSteps[1].done) return true;
        if (currentSteps[0].value.value !== currentSteps[1].value.value) return false;
    }

}

export function reverse(treeNode) {

    const reversedTreeNode = JSON.parse(JSON.stringify(treeNode));
    const queue = [reversedTreeNode];

    while (queue.length > 0) {

        const currentNode = queue.shift();

        //shift
        if (currentNode !== null) {
            let tempNode = currentNode.left;
            currentNode.left = currentNode.right;
            currentNode.right = tempNode;
        }
        //

        if (currentNode.left !== null) {
            queue.push(currentNode.left)
        }

        if (currentNode.right !== null) {
            queue.push(currentNode.right)
        }


    }

    console.log("reverse", printTree(reversedTreeNode));

    return reversedTreeNode

}
