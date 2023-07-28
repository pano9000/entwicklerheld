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

    const treeValues = [];
    const treeTraversalGen = getBFSTreeTraversalGenerator(treeNode);

    while (true) {
        const currentNode = treeTraversalGen.next();
        if (currentNode.done) break;
        const currentDepth = currentNode.value.depth;
        if (treeValues[currentDepth] === undefined) { treeValues[currentDepth] = [] };
        treeValues[currentDepth].push(currentNode.value.currentNode.value)
    }

    const treePrinter = new TreePrinter(treeValues);

    return treePrinter.printCentered()    
}


class TreePrinter {
    static ITEM_PADDING = 4; // [.x.] -> 4 extra characters wrapping the number
    static SPACE_BETWEEN = 2; // a bit buggy with values higher than 3
    treeValuesT;
    maxLineWidth;
    depth;

    constructor(treeValues) {
       this.treeValuesT = TreePrinter.transformNumbers(treeValues);
       this.maxLineWidth = TreePrinter.getLineWidth(treeValues[treeValues.length-1], 1); //last line will always be the one with most entries
       this.depth = treeValues.length;
    }

    static transformNumbers(treeValues) {
        const transformedNumbers = treeValues.map(line => {
            const currentLineHighestNumLen = TreePrinter.getLineHighestNumberLength(line);
            return line.map( node => `[ ${node}`.padEnd(currentLineHighestNumLen + TreePrinter.ITEM_PADDING - 1, " ") + "]")
        })
        return transformedNumbers;
    }

    static getLineHighestNumberLength(line) {
        return line.reduce( (accum, curr) => (curr > accum) ? curr : accum, 0).toString().length;
    }

    static getLineWidth(line, treeDepth) {
        return ((line.length * (TreePrinter.getLineHighestNumberLength(line) + TreePrinter.ITEM_PADDING)) + ((line.length - 1) * TreePrinter.SPACE_BETWEEN**treeDepth));
    }

    printCentered() {
        let tempDepth = this.depth;
        const transformedLines = this.treeValuesT.map(line => {
            const currentLineWidth = TreePrinter.getLineWidth(line, tempDepth);
            const startIndexStringInsert = Math.ceil(this.maxLineWidth/2) - Math.ceil(currentLineWidth/2);
            const separator = "".padStart(TreePrinter.SPACE_BETWEEN**tempDepth, ".")
            tempDepth--;
            return line.join(separator).padStart(startIndexStringInsert+currentLineWidth, ".").padEnd(this.maxLineWidth, ".")
        });
        return transformedLines.join("\n\n");
    }

    printBalanced() {
        //TODO
    }

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