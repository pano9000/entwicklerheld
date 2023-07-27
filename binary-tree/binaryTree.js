import 'regenerator-runtime/runtime' //required due to Babel


function* getBFSTreeTraversalGenerator(treeNode, options = { reverse: false }) {
    const queue = [treeNode];
    let depth = 0;
    let tempDepth = 1;
    while (queue.length > 0) {
        const currentNode = queue.shift();

        if (options.reverse === true) {
            if (currentNode !== null) {
                let tempNode = currentNode.left;
                currentNode.left = currentNode.right;
                currentNode.right = tempNode;
            }
        }

        yield { currentNode, depth }

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
    return treeNode;
}


export function printTree(treeNode) {

    const result = [];
    const treeTraversalGen = getBFSTreeTraversalGenerator(treeNode);

    while (true) {
        const currentNode = treeTraversalGen.next();
        if (currentNode.done) break;
        const currentDepth = currentNode.value.depth;
        if (result[currentDepth] === undefined) { result[currentDepth] = [] };
        result[currentDepth].push(currentNode.value.currentNode.value)
    }
    return result.join("\n");

}


// Step through each node and check if same or not -> exits early, if there is a difference
export function checkTreeEqualness(treeNode1, treeNode2){

    const treeTraversalGens = [getBFSTreeTraversalGenerator(treeNode1), getBFSTreeTraversalGenerator(treeNode2)];
    
    while(true){
        const currentSteps = [treeTraversalGens[0].next(), treeTraversalGens[1].next()];
        if (currentSteps[0].done && currentSteps[1].done) return true;
        if (currentSteps[0].value.currentNode.value !== currentSteps[1].value.currentNode.value) return false;
    }

}

export function reverse(treeNode) {

    const treeTraversalGen = getBFSTreeTraversalGenerator(treeNode, {reverse: true});
    while (true) {
        const currentNode = treeTraversalGen.next();
        if (currentNode.done) {
            return currentNode.value;
        }
    }
}
