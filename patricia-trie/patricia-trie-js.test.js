import {PatriciaTrie, TrieNode} from "../patricia-trie-js";
import {testData_1_2, testData_3} from "./testdata.js";
let fs = require('fs');
let json = [];
let visData = [];

beforeEach(() => {
    visData = [];
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished");

    if (visData.length > 0) {
        writeVisualisation();
    }
});

afterAll(() => {
    let result = JSON.stringify(json);
    fs.writeFileSync('visualization-data.json', result);
});

test('test_1_1', () => {
    const word = "hello";
    const trie = new PatriciaTrie();
    trie.insert(word);
    const actual = search(trie, word);
    const expected = true;
    expect(actual, `The word '${word}' has not been stored properly in the trie.`).toBe(expected);
});
test('test_1_2', () => {
    const testData = testData_1_2;
    const trie = new PatriciaTrie();

    for (let i = 0; i < testData.length; i++) {
        for (const word of testData[i].inserts) {
            trie.insert(word);
        }

        visData.push(1,2, testData[i]);

        for (const searchData of testData[i].search) {
            const word = searchData.word;
            const actual = search(trie, word);
            const expected = searchData.expected;
            const message = expected
                ? `The word '${word}' has not been stored properly in the trie.`
                : `The word '${word}' should not be stored in the trie.`;
            expect(actual, message).toBe(expected);
        }
    }
});
test('test_2_1', () => {
    const word = "hello";
    const trie = new PatriciaTrie();
    trie.insert(word);
    const actual = trie.search(word);
    const expected = true;
    expect(actual, `The word '${word}' has not been found or stored properly in the trie.`).toBe(expected);
});
test('test_2_2', () => {
    const testData = testData_1_2;
    const trie = new PatriciaTrie();

    for (let i = 0; i < testData.length; i++) {
        for (const word of testData[i].inserts) {
            trie.insert(word);
        }

        visData.push(2, 2, testData[i]);

        for (const searchData of testData[i].search) {
            const word = searchData.word;
            const actual = trie.search(word);
            searchData.actual = actual;
            const expected = searchData.expected;
            const message = (expected
                ? `The word '${word}' has not been found or stored properly in the trie.`
                : `The word '${word}' should not be found in the trie.`
                )
                + showData(testData[i]);
            expect(actual, message).toBe(expected);
        }
    }
});
test('test_3_1', () => {
    const inserts = [ "hello", "hell", "hallo", "halle" ];
    const deletes = [ "hallo", "halle", "halloween" ];
    const search = [
        { 'word': 'hallo', 'expected': false },
        { 'word': 'halle', 'expected': false },
        { 'word': 'halloween', 'expected': false },
        { 'word': 'hello', 'expected': true },
        { 'word': 'hell', 'expected': true }
    ];
    const trie = new PatriciaTrie();
    for (let word of inserts) {
        trie.insert(word);
    }
    for (let word of deletes) {
        trie.delete(word);
    }
    for (const searchData of search) {
        const word = searchData.word;
        const actual = trie.search(word);
        searchData.actual = actual;
        const expected = searchData.expected;
        const message = (expected
            ? `The word '${word}' has not been found or stored properly in the trie.`
            : `The word '${word}' should not be found in the trie.`
            )
            + showData({inserts: inserts, deletes: deletes, search: search});

        expect(actual, message).toBe(expected);
    }
});
test('test_3_2', () => {
    const testData = testData_3;
    for (let i = 0; i < testData.length; i++) {
        const inserts = testData[i].inserts;
        const deletes = testData[i].deletes;
        const search = testData[i].search;
        const trie = new PatriciaTrie();
        for (let word of inserts) {
            trie.insert(word);
        }
        for (let word of deletes) {
            trie.delete(word);
        }

        visData.push(3,2, testData[i]);

        let messages = doSearch(trie, {inserts: inserts, deletes: deletes, search: search});
        if (messages.length !== 0) {
            expect(false, messages.join('\n')).toBe(true);
        }
    }
});
function doSearch(trie, data) {
    const search = data.search;
    let messages = [];

    for (const searchData of search) {
        const word = searchData.word;
        const actual = trie.search(word);
        searchData.actual = actual;
        const expected = searchData.expected;
        const message = expected
            ? `The word '${word}' has not been found or stored properly in the trie.`
            : `The word '${word}' should not be found in the trie.`;
        if (actual !== expected) {
            messages.push(message);
        }
    }

    if (messages.length !== 0) {
        messages.push(showData(data))
    }

    return messages;
}
function showData(data) {
    let s = '\n\nGiven:\n{\n';
    if (data.inserts) {
        s += `\tinserts: [ "${data.inserts.join('", "')}" ],\n`;
    }
    if (data.deletes) {
        s += `\tdeletes: [ "${data.deletes.join('", "')}" ],\n`;
    }
    if (data.search) {
        const searchArray = [];

        data.search.forEach(searchData => {
           searchArray.push(`\t\t\{ word: "${searchData.word}", expected: ${searchData.expected}, actual: ${searchData.actual !== undefined ? searchData.actual : 'NA' } \}`);
        });
        if (searchArray.length !== 0) {
            s += `\tsearches: [\n`;
            s += searchArray.join(',\n');
            s += `\n\t]\n`;
        }
    }
    s += '}\n';
    return s;
}

function search(trie, word) {
    let node = trie.root;
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!node.children[char]) {
            return false;
        }
        node = node.children[char];
    }
    return node.isEndOfWord;
}

function toJSON(obj) {
    return JSON.stringify(obj, null, 3);
}

function writeVisualisation() {
    const scenarioId = visData[0];
    const sentenceId = visData[1];
    const data = visData[2];
    const iframeId = `vis_${scenarioId}_${sentenceId}`;
    let code = fs.readFileSync("patricia-trie-js/patricia-trie-js.js", 'utf8');
    code = code.replace(/export /g, '');

    let iframe_content = fs.readFileSync("patricia-trie-js/visualization/viszualization-template.html", 'utf8');
    iframe_content = iframe_content.replace(/##CODE##/g, String(code));
    iframe_content = iframe_content.replace(/##DATA##/g, toJSON(data));

    iframe_content = iframe_content.replace(/\\/g, '\\\\');
    iframe_content = iframe_content.replace(/'/g, '\\\'');
    iframe_content = iframe_content.replace(/"/g, '&quot;');
    iframe_content = iframe_content.replace(/(?:\r\n|\r|\n)/g, '\\n');

    let visualizationContent = fs.readFileSync("patricia-trie-js/visualization/iframe-template.html", 'utf8');
    visualizationContent = visualizationContent.replace(/##IFRAMEID##/g, String(iframeId));
    visualizationContent = visualizationContent.replace(/##IFRAMECONTENT##/g,iframe_content);
    json.push({
        "scenarioId": String(scenarioId),
        "sentenceId": String(sentenceId),
        "content": visualizationContent
    });
    // fs.writeFileSync(`visualization-${scenarioId}-${sentenceId}.html`, visualizationContent);
}