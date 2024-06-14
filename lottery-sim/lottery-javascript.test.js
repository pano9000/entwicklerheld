import {generateLotteryTicket, checkIfWinner, simulateLottery} from "../lottery-javascript";

let fs = require('fs');
let json = [];
let visData = [];

beforeEach(() => {
    visData = [];
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished");

    if (visData.length !== 0) {
        writeVisualization();
    }
});

afterAll(() => {
    let result = JSON.stringify(json);
    fs.writeFileSync('visualization-data.json', result);
});

test('test_1_1', () => {
    const actual = generateLotteryTicket();
    const result = validateTicket(actual, 'ticket');
    if (result.length !== 0) {
        expect(false, '- ' + result.join('\n- ')).toBe(true);
    }
});

test('test_2_1', () => {
    const ticket = [1, 2, 3, 4, 5, 6];
    const winningNumbers = [2, 4, 6, 8, 10];
    const actual = checkIfWinner(ticket, winningNumbers);
    const expected = 3;
    expect(actual, `[ ${ticket.join(', ')} ] and [ ${winningNumbers.join(', ')} ] have ${expected} element${expected !== 1 ? 's' : ''} in common.`).toBe(expected);
});

test('test_2_2', () => {
    for(let i = 0; i < test_data_2_2.length; i++) {
        const ticket = test_data_2_2[i].ticket;
        const winningNumbers = test_data_2_2[i].winningNumbers;
        const expected = test_data_2_2[i].expected;
        const actual = checkIfWinner(ticket, winningNumbers);
        expect(actual, `Test data ${i}: [ ${ticket.join(', ')} ] and [ ${winningNumbers.join(', ')} ] have ${expected} element${expected !== 1 ? 's' : ''} in common.`).toBe(expected);
    }
});

test('test_3_1', () => {
    const draws = 6;
    const result = simulateLottery(draws);
    visData = [3, 1, result];
    const resultErrors = checkResultErrors(result, draws);

    if (resultErrors.length > 0) {
        expect(false, '- ' + resultErrors.join('\n- ')).toBe(true);
    }

    totalWinCount = 0;
    totalWinnings = 0;
    result.draws.forEach((draw, index) => {
        const drawErrors = checkDrawErrors(draw, index, result.userTicket);

        if (drawErrors.length > 0) {
            expect(false, '- ' + drawErrors.join('\n- ')).toBe(true);
        }
    });

    if (result.hasOwnProperty('totalWinCount')) {
        expect(result.totalWinCount, `Expected total win count is ${totalWinCount}, but was ${result.totalWinCount}`).toBe(totalWinCount);
    }
    if (result.hasOwnProperty('totalWinnings')) {
        expect(result.totalWinnings, `Expected total winnings is ${totalWinnings}, but was ${result.totalWinnings}`).toBe(totalWinnings);
    }
});

let totalWinCount = 0;
let totalWinnings = 0;

function validateTicket(ticket, type) {
    const errors = [];

    // Check if the ticket is an array
    if (!Array.isArray(ticket)) {
        errors.push(`The ${type} must be an array.`);
    } else {
        // Check if the ticket contains exactly 6 numbers
        if (ticket.length !== 6) {
            errors.push(`The ${type}  must contain exactly 6 numbers.`);
        }

        // Check if all elements in the array are numbers
        const allNumbers = ticket.every(num => typeof num === 'number' && Number.isInteger(num));
        if (!allNumbers) {
            errors.push(`All elements in the ${type}  must be integers.`);
        }

        // Check if all numbers are between 1 and 49
        const allInRange = ticket.every(num => num >= 1 && num <= 49);
        if (!allInRange) {
            errors.push(`All numbers in the ${type} must be between 1 and 49.`);
        }

        // Check if all numbers are unique
        const uniqueNumbers = new Set(ticket);
        if (uniqueNumbers.size !== ticket.length) {
            errors.push(`All numbers in the ${type} must be unique.`);
        }
    }

    if (errors.length !== 0) {
        errors.push(type + ': ' + toJSON(ticket))
    }

    return errors;
}

function checkResultErrors(result, draws) {
    const errors = [];

    if (typeof result !== 'object') {
        errors.push("The result is not an object.");
    } else {
        if (!result.hasOwnProperty('userTicket')) {
            errors.push("The result does not contain 'userTicket' property.");
        } else {
            const errors2 = validateTicket(result.userTicket, 'ticket');
            if (errors2.length !== 0) {
                errors2.forEach(error => {
                    errors.push(error);
                });
            }
        }

        if (!result.hasOwnProperty('draws')) {
            errors.push("The result does not contain 'draws' property.");
        } else if (!Array.isArray(result.draws)) {
            errors.push("'draws' property is not an array.");
        } else if (result.draws.length !== draws) {
            errors.push(`'draws' property should contain ${draws} elements, but was ${result.draws.length}.`);
        }

        if (!result.hasOwnProperty('totalWinCount')) {
            errors.push("The result does not contain 'totalWinCount' property.");
        }
        if (!result.hasOwnProperty('totalWinnings')) {
            errors.push("The result does not contain 'totalWinnings' property.");
        }

        if (errors.length !== 0) {
            errors.push('result: ' + toJSON(result));
        }
    }

    return errors;
}

function checkDrawErrors(draw, index, userTicket) {
    const errors = [];

    if (typeof draw !== 'object') {
        errors.push(`Draw at index ${index} is not an object.`);
    } else {
        if (!draw.hasOwnProperty('drawNumber')) {
            errors.push(`Draw at index ${index} does not contain 'drawNumber' property.`);
        }
        if (!draw.hasOwnProperty('winningTicket')) {
            errors.push(`Draw at index ${index} does not contain 'winningTicket' property.`);
        } else if (!Array.isArray(draw.winningTicket)) {
            errors.push(`'winningTicket' property of draw at index ${index} is not an array.`);
        } else {
            const errors2 = validateTicket(draw.winningTicket, `draw ${index}`);
            if (errors2.length !== 0) {
                errors2.forEach(error => {
                    errors.push(error);
                });
            }
        }
        if (!draw.hasOwnProperty('matchCount')) {
            errors.push(`Draw at index ${index} does not contain 'matchCount' property.`);
        } else if (Array.isArray(draw.winningTicket)) {
            totalWinCount += draw.matchCount > 1 ? 1 : 0;
            const expected = checkForWin(userTicket, draw.winningTicket);
            const actual = draw.matchCount;
            if (expected !== actual) {
                errors.push(`[ ${userTicket.join(', ')} ] and [ ${draw.winningTicket.join(', ')} ] have ${expected} element${expected !== 1 ? 's' : ''} in common, but was ${actual}.`)
            }
        }
        if (!draw.hasOwnProperty('winAmount')) {
            errors.push(`Draw at index ${index} does not contain 'winAmount' property.`);
        } else if (Array.isArray(draw.winningTicket)) {
            const matches = checkForWin(userTicket, draw.winningTicket);
            const expected = calculateWin(matches);
            totalWinnings += expected;
            const actual = draw.winAmount;
            if (expected !== actual) {
                errors.push(`Expected win amount for ${matches} match${matches !== 1 ? 'es' : ''} is ${expected}, but was ${actual}`);
            }
        }
    }

    return errors;
}

const winAmounts = [0, 0, 10, 50, 100, 10000, 1000000];

function calculateWin(matches) {
    return matches >= 0 && matches < winAmounts.length ? winAmounts[matches] : 0;
}

function checkForWin(ticket, winningNumbers) {
    const winningSet = new Set(winningNumbers);
    let matchCount = 0;
    for (const number of ticket) {
        if (winningSet.has(number)) {
            matchCount++;
        }
    }

    return matchCount;
}

function writeVisualization() {
    const scenarioId = visData[0];
    const sentenceId = visData[1];
    const data = visData[2];
    const iframeId = `vis_${scenarioId}_${sentenceId}`;
    let code = fs.readFileSync("lottery-javascript/lottery-javascript.js", 'utf8');
    code = code.replace(/export /g, '');

    let iframe_content = fs.readFileSync("lottery-javascript/visualization/visualization-template.html", 'utf8');
    iframe_content = iframe_content.replace(/##CODE##/g, String(code));
    iframe_content = iframe_content.replace(/##DATA##/g, toJSON(data));

    iframe_content = iframe_content.replace(/\\/g, '\\\\');
    iframe_content = iframe_content.replace(/'/g, '\\\'');
    iframe_content = iframe_content.replace(/"/g, '&quot;');
    iframe_content = iframe_content.replace(/(?:\r\n|\r|\n)/g, '\\n');

    let visualizationContent = fs.readFileSync("lottery-javascript/visualization/iframe-template.html", 'utf8');
    visualizationContent = visualizationContent.replace(/##IFRAMEID##/g, String(iframeId));
    visualizationContent = visualizationContent.replace(/##IFRAMECONTENT##/g,iframe_content);
    json.push({
        "scenarioId": String(scenarioId),
        "sentenceId": String(sentenceId),
        "content": visualizationContent
    });
    fs.writeFileSync(`visualization-${scenarioId}-${sentenceId}.html`, visualizationContent);
}

function displaySimulationResults(simulationData) {
    let html = '<h2>Lottery Simulation Results</h2>';

    if (typeof simulationData !== 'object' ||
        !simulationData.hasOwnProperty('userTicket') ||
        !simulationData.hasOwnProperty('totalWinCount') ||
        !simulationData.hasOwnProperty('totalWinnings') ||
        !simulationData.hasOwnProperty('draws') ||
        !Array.isArray(simulationData.draws)) {
        html += '<p>Error: Invalid simulation data.</p>';
        return html;
    }

    html += '<h3>User Ticket</h3>';
    if (Array.isArray(simulationData.userTicket)) {
        html += '<p>' + simulationData.userTicket.join(', ') + '</p>';
    } else {
        html += '<p>Error: User ticket data is invalid.</p>';
    }

    html += '<h3>Summary</h3>';
    if (typeof simulationData.totalWinCount === 'number' && typeof simulationData.totalWinnings === 'number') {
        html += '<p>Total Wins: ' + simulationData.totalWinCount + '</p>';
        html += '<p>Total Winnings: $' + simulationData.totalWinnings.toFixed(2) + '</p>';
    } else {
        html += '<p>Error: Invalid total win count or total winnings data.</p>';
    }

    html += '<h3>Draws</h3>';
    html += '<table>';
    html += '<tr><th>Draw Number</th><th>Winning Ticket</th><th>Match Count</th><th>Win Amount</th></tr>';
    simulationData.draws.forEach((draw, index) => {
        html += '<tr>';
        if (typeof draw === 'object' && draw.hasOwnProperty('drawNumber') &&
            Array.isArray(draw.winningTicket) && typeof draw.matchCount === 'number' && typeof draw.winAmount === 'number') {
            html += '<td>' + draw.drawNumber + '</td>';
            html += '<td>' + draw.winningTicket.join(', ') + '</td>';
            html += '<td>' + draw.matchCount + '</td>';
            html += '<td>$' + draw.winAmount.toFixed(2) + '</td>';
        } else {
            html += '<td colspan="4">Error: Draw at index ' + index + ' is invalid.</td>';
        }
        html += '</tr>';
    });
    html += '</table>';

    return html;
}

function toJSON(obj) {
    return JSON.stringify(obj, null, 3);
}

const test_data_2_2 = [
    {
        ticket: [1, 2, 3, 4, 5, 6],
        winningNumbers: [7, 8, 9, 10, 11, 12],
        expected: 0
    },
    {
        ticket: [1, 2, 3, 4, 5, 6],
        winningNumbers: [2, 4, 6, 8, 10, 12],
        expected: 3
    },
    {
        ticket: [5, 10, 15, 20, 25, 30],
        winningNumbers: [10, 20, 30, 40, 50, 60],
        expected: 3
    },
    {
        ticket: [1, 22, 33, 44, 55, 66],
        winningNumbers: [11, 22, 33, 44, 55, 66],
        expected: 5
    },
    {
        ticket: [1, 3, 5, 7, 9, 11],
        winningNumbers: [2, 3, 5, 7, 9, 11],
        expected: 5
    },
    {
        ticket: [1, 2, 3, 4, 5, 6],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        expected: 6
    }
];