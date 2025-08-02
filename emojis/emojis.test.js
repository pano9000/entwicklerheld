import { replaceEmojis } from "./emojis";

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
    const index = 0;
    const message = check(1, 1, index);

    if (message) {
        expect(false, message).toBe(true);
    }
});

test('test_1_2', () => {
    for (let index = 1; index < testData.length; index++) {
        const message = check(1, 2, index);

        if (message) {
            expect(false, message).toBe(true);
        }
    }
});

function check(scenarioId, sentenceId, index) {
    const errors = [];
    const data = testData[index];
    const text = data.text;
    const expected = data.expected;

    try {
        const actual = replaceEmojis(text);

        if (!actual || actual !== expected) {
            const given = [
                '\nGiven:',
                '\t- text: ' + text,
                '\nExpected: ' + expected,
                '\nActual: ' + actual
            ].join('\n') + '\n';
            errors.push(given);
            if (index !== 0) {
                visData = [scenarioId, sentenceId, `<p><strong>Expected output:</strong></p><p class="emoji-text">${expected}</p>`]
            }
        }

    } catch (e) {
        errors.push(`\nAn error occurred in user code: '${e.message}'\n`);

        if (e.message.endsWith('is not a function')) {
            errors.push('Did you rename the function or remove \'export\'?\n');
        } else {
            errors.push('stack trace');
            errors.push(e.stack);
        }
    }

    if (errors.length === 0) {
        visData = [scenarioId, sentenceId, ""]
        return null;
    }

    return errors.join('\n');
}

const testData = [
  {
    text: "I'm feeling :happy: but also a bit :sad: today.",
    expected: "I'm feeling <span class=\"emoji emoji-happy\"> </span> but also a bit <span class=\"emoji emoji-sad\"> </span> today."
  },
  {
    text: "No emoji here, just text.",
    expected: "No emoji here, just text."
  },
  {
    text: "Wow! :shocked: That's amazing! :love:",
    expected: "Wow! <span class=\"emoji emoji-shocked\"> </span> That's amazing! <span class=\"emoji emoji-love\"> </span>"
  },
  {
    text: "Mixed feelings: :happy: :angry: :thumb:",
    expected: "Mixed feelings: <span class=\"emoji emoji-happy\"> </span> <span class=\"emoji emoji-angry\"> </span> <span class=\"emoji emoji-thumb\"> </span>"
  },
  {
    text: "Unknown code :unicorn: should not be replaced.",
    expected: "Unknown code :unicorn: should not be replaced."
  },
  {
    text: "Multiple same emojis: :tongue: :tongue: :tongue:",
    expected: "Multiple same emojis: <span class=\"emoji emoji-tongue\"> </span> <span class=\"emoji emoji-tongue\"> </span> <span class=\"emoji emoji-tongue\"> </span>"
  },
  {
    text: ":sleepy:...need coffee...:sleepy:",
    expected: "<span class=\"emoji emoji-sleepy\"> </span>...need coffee...<span class=\"emoji emoji-sleepy\"> </span>"
  },
  {
    text: "This is nerdy :nerdy: and fun :happy:!",
    expected: "This is nerdy <span class=\"emoji emoji-nerdy\"> </span> and fun <span class=\"emoji emoji-happy\"> </span>!"
  },
  {
    text: "This text does not contain a valid emoji. :sad",
    expected: "This text does not contain a valid emoji. :sad"
  }
];

function writeVisualization() {
    const scenarioId = visData[0];
    const sentenceId = visData[1];
    const visualizationContent = visData[2]

    json.push({
        "scenarioId": String(scenarioId),
        "sentenceId": String(sentenceId),
        "content": visualizationContent
    });
    // fs.writeFileSync(`visualization-${scenarioId}-${sentenceId}.html`, visualizationContent);
}
