import { colorize } from "../easter-egg-coloring-js";

let fs = require('fs');
let json = [];
let visData = [];
let hasPassed = false;

beforeEach(() => {
    console.log("##polylith[testStarted");
    visData = [];
    hasPassed = false;
});

afterEach(() => {
    if (!hasPassed && visData.length > 0) {
        writeVisualisation();
    }
    console.log("##polylith[testFinished");
});

afterAll(() => {
    let result = JSON.stringify(json);
    fs.writeFileSync('visualization-data.json', result);
});

test('test_1_1', () => {
    const result = run_test(1, 1, nodes_1_1, colors_1_1);
    if (result) {
        expect(result.actual, result.message).toEqual(result.expected);
    }
    hasPassed = true;
});

test('test_1_2', () => {
    const result = run_test(1, 2, nodes_1_2, colors_1_2);
    if (result) {
        expect(result.actual, result.message).toEqual(result.expected);
    }
    hasPassed = true;
});

test('test_1_3', () => {
    const result = run_test(1, 3, nodes_1_3, colors_1_3);
    if (result) {
        expect(result.actual, result.message).toEqual(result.expected);
    }
    hasPassed = true;
});

test('test_1_4', () => {
    if (!hasPassed) return;
    const result = run_test(1, 3, nodes_1_4, colors_1_4);
    if (result) {
        expect(result.actual, result.message).toEqual(result.expected);
    }
});

function run_test(scenarioId, sentenceId, nodes, availableColors) {
    const coloredNodes = colorize([...nodes], [...availableColors]);
    const result = checkColoring(nodes, coloredNodes, availableColors);
    if (result) {
        if (result.illegalColors) {
            visData = [scenarioId, sentenceId, result.illegalColors, availableColors, false];
        } else if (!result.hideVisualisation) {
            visData = [scenarioId, sentenceId, coloredNodes, availableColors];
        }
    }
    return result;
}

function compareGraphs(nodes1, nodes2) {
    // Check if the number of nodes is different
    if (nodes1.length !== nodes2.length) {
        return false;
    }

    // Sort the node arrays by ID to consider the order
    nodes1.sort((a, b) => a.id.localeCompare(b.id));
    nodes2.sort((a, b) => a.id.localeCompare(b.id));

    // Check the equality of nodes
    for (let i = 0; i < nodes1.length; i++) {
        const node1 = nodes1[i];
        const node2 = nodes2[i];

        // Check node IDs
        if (node1.id !== node2.id) {
            return false;
        }

        // Check the number of neighbors
        if (node1.neighbors.length !== node2.neighbors.length) {
            return false;
        }

        // Sort neighbors by ID to consider the order
        node1.neighbors.sort();
        node2.neighbors.sort();

        // Check the equality of neighbors
        for (let j = 0; j < node1.neighbors.length; j++) {
            if (node1.neighbors[j] !== node2.neighbors[j]) {
                return false;
            }
        }
    }

    return true; // Graphs are identical
}

function checkColoring(nodes, coloredNodes, availableColors) {
    if (!coloredNodes) {
        return {
            expected: 'Array',
            actual: null,
            message: 'The function colorize should return an array, but was null.',
            hideVisualisation: true
        }
    }
    if (!compareGraphs(nodes, coloredNodes)) {
        return {
            expected: 0,
            actual: 1,
            message: 'The structure of the original graph has been modified.',
            hideVisualisation: true
        }
    }
    nodes.forEach((node1) => {
        const node2 = coloredNodes.find((node) => node.id === node1.id);
        if (node2) {
            node1.color = node2.color;
        }
    });
    let notColored = [];
    let illegalColors = new Set();
    let colorCheck = [];
    nodes.forEach(node => {
        if (!availableColors.includes(node.color)) {
            illegalColors.add(node.color);
        }
        if (node.color === defaultColor) {
            notColored.push(node.id);
        } else {
            let errorNodes = [];
            node.neighbors.forEach(neighborId => {
                const neighborNode = nodes.find(n => n.id === neighborId);
                if (node.color === neighborNode.color) {
                    errorNodes.push(neighborId);
                }
            });
            if (errorNodes.length > 0) {
                const errorMessage = `- Node ${node.id} has the same color ${node.color} as its neighbors: [ ${errorNodes.join(', ')} ].`;
                colorCheck.push(errorMessage);
            }
        }
    });
    if (notColored.length > 0) {
        return {
            expected: 0,
            actual: notColored.length,
            message: `There are nodes that have not been colored: [ ${notColored.join(', ')} ]`,
            hideVisualisation: true
        };
    }
    if (illegalColors.size > 0) {
        const illegalColorsArray = [...illegalColors];
        return {
            expected: 0,
            actual: illegalColorsArray.length,
            message: `There are colors used that are not contained in the available colors. [ ${illegalColorsArray.join(', ')} ]`,
            illegalColors: illegalColorsArray
        };
    }
    if (colorCheck.length > 0) {
        return {
            expected: 0,
            actual: colorCheck.length,
            message: `Some connected nodes have the same color:\n   ${colorCheck.join('\n   ')}`
        };
    }
    return null;
}

const defaultColor = '#eeeeee';
const nodes_1_1 = [
    { id: "A", color: defaultColor, neighbors: ["B", "C"] },
    { id: "B", color: defaultColor, neighbors: ["A", "C"] },
    { id: "C", color: defaultColor, neighbors: ["A", "B"] }
];
const colors_1_1 = [
    '#ff0000', '#00ff00', '#0000ff'
];
const nodes_1_2 = [
        { id: 'A', color: defaultColor, neighbors: ['E', 'B'], },
        { id: 'B', color: defaultColor, neighbors: ['A', 'C'], },
        { id: 'C', color: defaultColor, neighbors: ['B', 'D'], },
        { id: 'D', color: defaultColor, neighbors: ['C', 'E'], },
        { id: 'E', color: defaultColor, neighbors: ['D', 'A'], },
 ];
const colors_1_2 = [
    '#ffff00', '#00ff00', '#0000ff'
];
const nodes_1_3 = [
        { id: 'A', color: defaultColor, neighbors: ['B', 'G']},
        { id: 'B', color: defaultColor, neighbors: ['A', 'C', 'H']},
        { id: 'C', color: defaultColor, neighbors: ['B', 'D', 'I']},
        { id: 'D', color: defaultColor, neighbors: ['C', 'E', 'J']},
        { id: 'E', color: defaultColor, neighbors: ['D', 'F', 'K']},
        { id: 'F', color: defaultColor, neighbors: ['E', 'L']},
        { id: 'G', color: defaultColor, neighbors: ['A', 'H', 'M']},
        { id: 'H', color: defaultColor, neighbors: ['B', 'G', 'I', 'N']},
        { id: 'I', color: defaultColor, neighbors: ['C', 'H', 'J', 'O']},
        { id: 'J', color: defaultColor, neighbors: ['D', 'I', 'K', 'P']},
        { id: 'K', color: defaultColor, neighbors: ['E', 'J', 'L', 'Q']},
        { id: 'L', color: defaultColor, neighbors: ['F', 'K', 'R']},
        { id: 'M', color: defaultColor, neighbors: ['G', 'N', 'S']},
        { id: 'N', color: defaultColor, neighbors: ['H', 'M', 'O', 'T']},
        { id: 'O', color: defaultColor, neighbors: ['I', 'N', 'P', 'U']},
        { id: 'P', color: defaultColor, neighbors: ['J', 'O', 'Q']},
        { id: 'Q', color: defaultColor, neighbors: ['K', 'P', 'R']},
        { id: 'R', color: defaultColor, neighbors: ['L', 'Q']},
        { id: 'S', color: defaultColor, neighbors: ['M', 'T']},
        { id: 'T', color: defaultColor, neighbors: ['N', 'S', 'U']},
        { id: 'U', color: defaultColor, neighbors: ['O', 'T']},
 ];
const colors_1_3 = [
    '#ff0000', '#ff8800', '#ffff00', '#00ff00'
];
const nodes_1_4 = [
        { id: 'A0', color: defaultColor, neighbors: ['A1', 'A2']},
        { id: 'A1', color: defaultColor, neighbors: ['A0', 'A3', 'A4']},
        { id: 'A10', color: defaultColor, neighbors: ['A4', 'A21', 'A22']},
        { id: 'A11', color: defaultColor, neighbors: ['A5', 'A23', 'A24']},
        { id: 'A12', color: defaultColor, neighbors: ['A5', 'A25', 'A26']},
        { id: 'A13', color: defaultColor, neighbors: ['A6', 'A27', 'A28']},
        { id: 'A14', color: defaultColor, neighbors: ['A6', 'A29', 'A30']},
        { id: 'A15', color: defaultColor, neighbors: ['A7', 'A31', 'A32']},
        { id: 'A16', color: defaultColor, neighbors: ['A7', 'A33', 'A34']},
        { id: 'A17', color: defaultColor, neighbors: ['A8', 'A35', 'A36']},
        { id: 'A18', color: defaultColor, neighbors: ['A8', 'A37', 'A38']},
        { id: 'A19', color: defaultColor, neighbors: ['A9', 'A39']},
        { id: 'A2', color: defaultColor, neighbors: ['A0', 'A5', 'A6']},
        { id: 'A20', color: defaultColor, neighbors: ['A9']},
        { id: 'A21', color: defaultColor, neighbors: ['A10']},
        { id: 'A22', color: defaultColor, neighbors: ['A10']},
        { id: 'A23', color: defaultColor, neighbors: ['A11']},
        { id: 'A24', color: defaultColor, neighbors: ['A11']},
        { id: 'A25', color: defaultColor, neighbors: ['A12']},
        { id: 'A26', color: defaultColor, neighbors: ['A12']},
        { id: 'A27', color: defaultColor, neighbors: ['A13']},
        { id: 'A28', color: defaultColor, neighbors: ['A13']},
        { id: 'A29', color: defaultColor, neighbors: ['A14']},
        { id: 'A3', color: defaultColor, neighbors: ['A1', 'A7', 'A8']},
        { id: 'A30', color: defaultColor, neighbors: ['A14']},
        { id: 'A31', color: defaultColor, neighbors: ['A15']},
        { id: 'A32', color: defaultColor, neighbors: ['A15']},
        { id: 'A33', color: defaultColor, neighbors: ['A16']},
        { id: 'A34', color: defaultColor, neighbors: ['A16']},
        { id: 'A35', color: defaultColor, neighbors: ['A17']},
        { id: 'A36', color: defaultColor, neighbors: ['A17']},
        { id: 'A37', color: defaultColor, neighbors: ['A18']},
        { id: 'A38', color: defaultColor, neighbors: ['A18']},
        { id: 'A39', color: defaultColor, neighbors: ['A19']},
        { id: 'A4', color: defaultColor, neighbors: ['A1', 'A9', 'A10']},
        { id: 'A5', color: defaultColor, neighbors: ['A2', 'A11', 'A12']},
        { id: 'A6', color: defaultColor, neighbors: ['A2', 'A13', 'A14']},
        { id: 'A7', color: defaultColor, neighbors: ['A3', 'A15', 'A16']},
        { id: 'A8', color: defaultColor, neighbors: ['A3', 'A17', 'A18']},
        { id: 'A9', color: defaultColor, neighbors: ['A4', 'A19', 'A20']},
 ];
const colors_1_4 = [
    '#ff0000', '#ffff00', '#0000ff'
];

function writeVisualisation() {
    if (visData.length === 4) {
        setVisualization(visData[0], visData[1], visData[2], visData[3]);
    } else {
        setColorVisualization(visData[0], visData[1], visData[2], visData[3]);
    }
}

function showColors(colors) {
    let list = [];
    colors.map((color) => {
        list.push(`<span class="color-dot" style="background-color: ${color}"></span> ${color}`);
    });

    return `<span class="color-info">${list.join('</span> <span class="color-info">')}</span>`;
}

function setColorVisualization(scenarioId, sentenceId, usedColors, availableColors) {
    const content = `<style>
.visualisation-info {
    background-color: #999;
    color: #000;
    padding: 1rem;
    border-radius: 12px;
}
.colors {
    padding: 1rem 1rem 0rem 1rem;
    vertical-align: top;
    text-align: left;
}
.color-info {
    margin: 0.5rem 1rem 0.5rem 0rem;
    display: inline-flex;
}
.color-dot {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
    border: 1px solid #fff;
    border-radius: 50%;
}
</style>
<div class="visualisation-info">
    <p>
        Available Colors<br/>
        <div class="colors">${showColors(availableColors)}</div>
    </p>
    <p>
        Used Colors<br/>
        <div class="colors">${showColors(usedColors)}</div>
    </p>  
</div>`;
    json.push({
        "scenarioId": String(scenarioId),
        "sentenceId": String(sentenceId),
        "content": content
    });
}

function setVisualization(scenarioId, sentenceId, nodes, colors) {
    let code = fs.readFileSync("easter-egg-coloring-js/easter-egg-coloring-js.js", 'utf8');
    code = code.replace(/export /g, '');
    let content = fs.readFileSync("easter-egg-coloring-js/tests/graphvisualisation-template.html", 'utf8');
    content = content.replace(/##NODES##/g, nodesToString(nodes));
    content = content.replace(/##COLORS##/g, `[ '${colors.join("', '")}' ]`);
    content = content.replace(/##CODE##/g, String(code));
    content = content.replace(/</g, '&lt;');
    content = content.replace(/>/g, '&gt;');
    content = content.replace(/"/g, '&quot;');
    let iframe_content = fs.readFileSync("easter-egg-coloring-js/tests/graphvisualisation-iframe-template.html", 'utf8');
    iframe_content = iframe_content.replace(/##SCENARIOID##/g, String(scenarioId));
    iframe_content = iframe_content.replace(/##SENTENCEID##/g, String(sentenceId));
    iframe_content = iframe_content.replace(/##VISUALISATIONCONTENT##/g, String(content));

    json.push({
        "scenarioId": String(scenarioId),
        "sentenceId": String(sentenceId),
        "content": iframe_content
    });
}

function nodesToString(nodes) {
    let str = "[\n";
    nodes.forEach(node => {
        str += `\t{ id: '${node.id}', color: defaultColor, `;
        if (node.neighbors && node.neighbors.length > 0) {
            str += `neighbors: [ '${node.neighbors.join("', '")}' ],`;
        } else {
            str += "[],";
        }
        str += " },\n";
    });
    str += " ]\n";
    return str;
}
