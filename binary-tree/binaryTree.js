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

    let testT = [ 
        [ 1 ],
        [ 2, 3 ],
        [ 4, 5, 6, 7 ],
        [ 8, 9, 10, 11, 12, 13, 14, 15 ],
        [ 
            16, 17, 18, 19, 20, 21, 22, 24, 
            25, 26, 27, 28, 29, 30, 31, 32
        ] 
    ]
    const treeP = new treePrinter(result);
    //console.log("ppp a\n", treeP.printCentered() + "\nppp b\n")
    
    //console.log("ttt a\n", getTreePrintStr(testT) + "\nttt b\n")


    return treeP.printCentered()
    // need to report this XSS vulnerability to EntwicklerHeld ->
    //return "<div style=\"text-align: center\" onclick=\"alert('yo'); console.log(document)\"><img src=\"image.gif\" onerror=\"(async () => { a = await fetch('https://dummyjson.com/products/1'); b=await a.json(); console.log(b)})()\">" + result.join("\n") + "</div>";

}


class treePrinter {
    static ITEM_PADDING = 4; // [.x.] -> 4 extra characters
    static SPACE_BETWEEN = 2;
    treeValuesT;
    maxLineWidth;
    depth;

    constructor(treeValues) {
       this.treeValuesT = treePrinter.transformNumbers(treeValues);
       this.maxLineWidth = treePrinter.getLineWidth(treeValues[treeValues.length-1], 1); //last line will always be the one with most entries
       this.depth = treeValues.length;
    }

    static transformNumbers(treeValues) {
        const transformedNumbers = treeValues.map(line => {
            const currentLineHighestNumLen = treePrinter.getLineHighestNumberLength(line);
            return line.map( node => `[ ${node}`.padEnd(currentLineHighestNumLen + treePrinter.ITEM_PADDING - 1, " ") + "]")
        })
        return transformedNumbers;
    }

    static getLineHighestNumberLength(line) {
        return line.reduce( (accum, curr) => (curr > accum) ? curr : accum, 0).toString().length;
    }

    static getLineWidth(line, treeDepth) {
        return ((line.length * (treePrinter.getLineHighestNumberLength(line) + treePrinter.ITEM_PADDING)) + ((line.length - 1) * treePrinter.SPACE_BETWEEN**treeDepth));
    }

    printCentered() {
        const transformedLines = this.treeValuesT.map(line => {
            const currentLineWidth = treePrinter.getLineWidth(line, this.depth);
            const startIndexStringInsert = (Math.ceil(this.maxLineWidth/2) - (Math.ceil(currentLineWidth/2)));
            const separator = "".padStart(treePrinter.SPACE_BETWEEN**this.depth, ".")

            this.depth--;
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
