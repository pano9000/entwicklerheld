import { buildPages } from "../page-wrapping-js.js";
import { html1, html2, html3 } from "../text-data.js";
import {expect} from "chai";
import domino from "domino";
import fs from "fs"
import {beforeEach, afterEach, after, test} from "node:test"

let json = [];
let visData = [];
let dom;
let document;
let displayNode;
let pageWidth = 500;
let pageHeight = 800;

beforeEach(() => {
    visData = [];
    dom = getDOM();
    document = dom;
    global.document = dom;
    displayNode = document.createElement('div');
    displayNode.style.position = 'absolute';
    displayNode.style.top = '0';
    displayNode.style.left = '0';
    displayNode.style.display = 'block';
    displayNode.style.width = `${pageWidth}px`;
    displayNode.style.maxHeight = `${pageHeight}px`;
    displayNode.style.overflow = 'hidden';
    displayNode.style.fontFamily = 'sans-serif';
    displayNode.style.fontSize = '1.2rem';
    document.body.appendChild(displayNode);

    console.log("##polylith[testStarted");

});

afterEach(() => {
    console.log("##polylith[testFinished");

    if (visData.length > 0) {
        writeVisualisation();
    }
});



after(() => {
    let result = JSON.stringify(json);
    fs.writeFileSync('visualization-data.json', result);
});

test('test_1_1', () => {
    const hasToc = false;
    const data = mockData(html1);
    const actual= buildPages(data, displayNode, pageHeight);

    if (!actual || !actual.pages) {
        expect(false, `Your function should return an object {'pages': pages, 'hasToc': ${hasToc}}`).to.be.true;
    }

    visData = [1,1, html1];

    expect(actual.pages.length, `Expected length of the pages array is 3, but was ${actual.pages.length}`).to.be.eql(3);
    expect(actual.hasToc, `Expected parameter hasToc should be ${hasToc}, but was ${actual.hasToc}`).to.deep.equal(hasToc);
});

test('test_2_1', () => {
    const hasToc = true;
    const data = mockData(html2);
    const actual= buildPages(data, displayNode, pageHeight);

    if (!actual || !actual.pages) {
        expect(false, `Your function should return an object {'pages': pages, 'hasToc': ${hasToc}}`).to.be.true;
    }

    visData = [2, 1, html2];

    expect(actual.pages.length, `Expected length of the pages array is 9, but was ${actual.pages.length}`).to.eql(9);
    expect(actual.hasToc, `Expected parameter hasToc should be ${hasToc}, but was ${actual.hasToc}`).to.deep.equal(hasToc);

    displayNode.innerHTML = actual.pages[0];
    const tocNode = document.getElementById('paged-toc-node');

    if (!tocNode) expect(false, `The first page should be the table of contents containing a node with id 'paged-toc-node', but was null.`).to.be.true;

    let classToken = 'paged-toc-h1';
    let headings = document.getElementsByClassName(classToken);
    let expectedHeadingsCount = 1;
    if (!headings || headings.length === 0) expect(false, `The first page should be the table of contents with all headings of the text having class '${classToken}', but was null.`).to.be.true;
    expect(headings.length, `There should be ${expectedHeadingsCount} h1 heading with class '${classToken}' in the ToC, but was ${headings.length}`).to.be.eql(expectedHeadingsCount);
    let headingText = headings[0].textContent;
    expect(headingText.toLowerCase(), `There should be ${expectedHeadingsCount} h1 heading with class '${classToken}' and Text 'Table of Contents' in the ToC, but was '${headingText}'`).to.be.eql('table of contents');

    classToken = 'paged-toc';
    headings = document.getElementsByClassName(classToken);
    expectedHeadingsCount = 10;

    if (!headings || headings.length === 0) expect(true, `The first page should be the table of contents with all headings of the text having class '${classToken}', but was null.`).to.be.true;
    expect(headings.length, `There should be ${expectedHeadingsCount} h2 headings with class '${classToken}' in the ToC, but was ${headings.length}`).to.deep.equal(expectedHeadingsCount);
});

test('test_2_2', () => {
    const hasToc = true;
    const data = mockData(html3);
    const actual= buildPages(data, displayNode, pageHeight);

    if (!actual || !actual.pages) {
        expect(false, `Your function should return an object {'pages': pages, 'hasToc': ${hasToc}}`).to.be.true;
    }

    visData = [2, 2, html3];

    expect(actual.pages.length, `Expected length of the pages array is 8, but was ${actual.pages.length}`).to.be.equal(8);
    expect(actual.hasToc, `Expected parameter hasToc should be ${hasToc}, but was ${actual.hasToc}`).to.deep.equal(hasToc);

    displayNode.innerHTML = actual.pages[0];
    const tocNode = document.getElementById('paged-toc-node');
    if (!tocNode) expect(false, `The first page should be the table of contents containing a node with id 'paged-toc-node', but was null.`).to.be.true;

    let classToken = 'paged-toc-h1';
    let headings = document.getElementsByClassName(classToken);
    let expectedHeadingsCount = 1;
    if (!headings || headings.length === 0) expect(false, `The first page should be the table of contents with all headings of the text having class '${classToken}', but was null.`).to.be.true;
    expect(headings.length, `There should be ${expectedHeadingsCount} h1 heading with class '${classToken}' in the ToC, but was ${headings.length}`).to.be.eql(expectedHeadingsCount);
    let headingText = headings[0].textContent;
    expect(headingText.toLowerCase(), `There should be ${expectedHeadingsCount} h1 heading with class '${classToken}' and Text 'Table of Contents' in the ToC, but was '${headingText}'`).to.be.eql('table of contents');

    classToken = 'paged-toc';
    headings = document.getElementsByClassName(classToken);
    expectedHeadingsCount = 7;

    if (!headings || headings.length === 0) expect(false, `The first page should be the table of contents with all headings of the text having class '${classToken}', but was null.`).to.be.true;
    expect(headings.length, `There should be ${expectedHeadingsCount} h2 headings with class '${classToken}' in the ToC, but was ${headings.length}`).to.be.eql(expectedHeadingsCount);
});

function mockData(data) {
    for (const textData of data) {
        textData.getHeight = (pageWidth) => {
            const averageCharacterHeight = 20;
            const charactersPerLine = 20;
            const textLength = textData.text.length;
            const lines = Math.ceil(textLength / charactersPerLine);
            const estimatedHeight = lines * averageCharacterHeight;
            return estimatedHeight;
        };
        textData.getWidth = () => {
            return pageWidth;
        };
    }
    return data;
}

function writeVisualisation() {
    if (visData.length !== 0) {
        setVisualization(visData[0], visData[1], visData[2]);
    }
}

function setVisualization(scenarioId, sentenceId, textData) {
    let code = fs.readFileSync("./page-wrapping-js.js", 'utf8');
    code = code.replace(/export /g, '');

    let iframe_content = fs.readFileSync("./visualization/iframe-template.html", 'utf8');
    iframe_content = iframe_content.replace(/##CODE##/g, String(code));

    iframe_content = iframe_content.replace(/'/g, '\\\'');
    iframe_content = iframe_content.replace(/"/g, '&quot;');
    iframe_content = iframe_content.replace(/(?:\r\n|\r|\n)/g, '\\n');

    let visualizationContent = fs.readFileSync("./visualization/visualization-template.html", 'utf8');
    visualizationContent = visualizationContent.replace(/##IFRAMECONTENT##/g,iframe_content);
    json.push({
        "scenarioId": String(scenarioId),
        "sentenceId": String(sentenceId),
        "content": visualizationContent
    });
}

function toString(textData) {
    let arr = [];

    textData.forEach(data => {
        arr.push(`new TextData('${data.text.replace(/'/g, '')}')`);
    });

    return `[\n\t${arr.join(',\n\t')}\n]`;
}

function toJSON(obj) {
    return JSON.stringify(obj, null, 3)
}

function getDOM() {
    return domino.createDocument('<!DOCTYPE html><html><body style="overflow: hidden;"></body></html>');
}