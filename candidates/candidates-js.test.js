import {selectCandidatesForJobOffers} from "../candidates-js";
import {qualificationsByPosition} from "../qualifications-by-position.js";
import {TEST_DATA_1_1, TEST_DATA_1_2, TEST_DATA_1_3, TEST_DATA_1_4, TEST_DATA_1_5} from "./testdata.js";
let fs = require('fs');

let visData = [];
let errors = [];
const json = [];

beforeEach(() => {
    visData = [];
    errors = [];
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished");

    if (visData.length !== 0) {
        setVisualisation(visData, errors);
    }
});

afterAll(() => {
    let result = JSON.stringify(json);
    fs.writeFileSync('visualization-data.json', result);
});

test('test_1_1', () => {
    const data= TEST_DATA_1_1;
    const candidates = copyCandidates(data.candidates);
    const jobOffers = copyJobOffers(data.jobOffers);
    try {
        const actual = selectCandidatesForJobOffers(candidates, jobOffers);
        const result = checkResult(actual, data);
        visData = [1, 1, data, actual];

        if (result !== undefined) {
            expect(result, result).toBe(undefined);
        }
    } catch (e) {
        throw e;
    }
});

test('test_1_2', () => {
    const data= TEST_DATA_1_2;
    const candidates = copyCandidates(data.candidates);
    const jobOffers = copyJobOffers(data.jobOffers);
    try {
        const actual = selectCandidatesForJobOffers(candidates, jobOffers);
        const result = checkResult(actual, data);
        visData = [1, 2, data, actual];

        if (result !== undefined) {
            expect(result, result).toBe(undefined);
        }
    } catch (e) {
        throw e;
    }
});

test('test_1_3', () => {
    const data= TEST_DATA_1_3;
    const candidates = copyCandidates(data.candidates);
    const jobOffers = copyJobOffers(data.jobOffers);

    try {
        const actual = selectCandidatesForJobOffers(candidates, jobOffers);
        const result = checkResult(actual, data);
        visData = [1, 3, data, actual];

        if (result !== undefined) {
            expect(result, result).toBe(undefined);
        }
    } catch (e) {
        throw e;
    }
});

test('test_1_4', () => {
    const data= TEST_DATA_1_4;
    const candidates = copyCandidates(data.candidates);
    const jobOffers = copyJobOffers(data.jobOffers);

    try {
        const actual = selectCandidatesForJobOffers(candidates, jobOffers);
        const result = checkResult(actual, data);
        visData = [1, 4, data, actual];

        if (result !== undefined) {
            expect(result, result).toBe(undefined);
        }
    } catch (e) {
        throw e;
    }
});

test('test_1_5', () => {
    const data= TEST_DATA_1_5;
    const candidates = copyCandidates(data.candidates);
    const jobOffers = copyJobOffers(data.jobOffers);

    try {
        const actual = selectCandidatesForJobOffers(candidates, jobOffers);
        const result = checkResult(actual, data);
        visData = [1, 5, data, actual];

        if (result !== undefined) {
            expect(result, result).toBe(undefined);
        }
    } catch (e) {
        throw e;
    }
});

function setVisualisation(data) {
    const content = jobOffersToString(data[2].expected, data[3], `test_${data[0]}_${data[1]} `);
    json.push({
        "scenarioId": String(data[0]),
        "sentenceId": String(data[1]),
        "content": content
    });
    // fs.writeFileSync(`visualization-data${data[0]}-${data[1]}.html`, content);
}

function checkResult(actual, data) {
    if (!actual) {
        return "Your implementation should return the job offers filled with candidates and selected candidates, but was null.";
    }
    const checkResults = [];
    const expected = data.expected;
    for (const position in expected) {
        if (!actual[position]) {
            errors.push(position);
            checkResults.push(`Missing data for position '${position}' in result.`);
        } else if (!actual[position].candidates) {
            errors.push(position);
            checkResults.push(`Missing data for candidates for position '${position}' in result.`);
        } else if (actual[position].candidates.length !== expected[position].candidates.length) {
            errors.push(position);
            checkResults.push(`Number of candidates for position '${position}' doesn't match:\n\tExpected: ${expected[position].candidates.length}\n\tActual: ${actual[position].candidates.length}`);
        } else if (!actual[position].selectedCandidates) {
            errors.push(position);
            checkResults.push(`Missing data for selected candidates for position '${position}' in result.`);
        } else if (actual[position].selectedCandidates.length !== expected[position].selectedCandidates.length) {
            errors.push(position);
            checkResults.push(`Number of selected candidates for position '${position}' doesn't match:\n\tExpected: ${expected[position].selectedCandidates.length}\n\tActual: ${actual[position].selectedCandidates.length}`);
        } else {
            for (let i = 0; i < expected[position].selectedCandidates.length; i++) {
                const expectedCandidate = expected[position].selectedCandidates[i];
                const actualCandidate = actual[position].selectedCandidates[i];

                let expectedRate = 0;
                expectedCandidate.qualifications.map(qual => expectedRate += qual.experience ? qual.experience : 0);
                expectedRate /= expected[position].qualifications.length;

                let actualRate = 0;
                actualCandidate.qualifications.map(qual => actualRate += qual.experience ? qual.experience : 0);
                actualRate /= expected[position].qualifications.length;
                const expectedPercentMatching = (expectedRate * 100).toFixed(2);
                const actualPercentMatching = (actualRate * 100).toFixed(2);

                if (expectedPercentMatching !== actualPercentMatching) {
                    errors.push(position);
                    checkResults.push(`Matching qualifications doesn't match for selected candidate ${i + 1} for position ${position}:\n\tExpected: ${expectedPercentMatching} %\n\tActual: ${actualPercentMatching} %`);
                }
            }
        }
    }
    return checkResults.length !== 0 ? `- ${checkResults.join('\n- ')}`: undefined;
}

function copyCandidates(candidates) {
    return candidates.map(candidate => {
            return {
                'name': candidate.name,
                'position': candidate.position,
                'qualifications': candidate.qualifications,
                'rate': 0
            }
        });
}

function copyJobOffers(jobOffers) {
    const jobOffersCopy = {};
    for (const position in jobOffers) {
        jobOffersCopy[position] = {
            'description': jobOffers[position].description,
            'numberOfPositions': jobOffers[position].numberOfPositions,
            'qualifications': jobOffers[position].qualifications,
            'candidates': [],
            'selectedCandidates': []
        };
    }
    return jobOffersCopy;
}

const adjectives = [
    "Funny", "Smart", "Creative", "Brilliant", "Talented",
    "Energetic", "Resourceful", "Innovative", "Dynamic", "Savvy"
];

const nouns = [
    "Oracle", "Guru", "Master", "Ninja", "Wizard",
    "Champion", "Expert", "Genius", "Pro", "Maestro"
];

const names = new Set();

function generateCandidateName() {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
}

function jobOffersToString(expected, actual, prefix = '') {
    let result = [];

    for (const position in expected) {
        result.push(`<div style='font-family: sans-serif; display: inline-block; margin: 1rem; padding: 1rem; color: #333; background-color: whitesmoke; border-radius: 12px; border: 1px solid #0002;'>`);
        if (actual[position]) {
            result.push(`<h2>Position: ${position}</h2>\n`);
        } else {
            result.push(`<h2 style="color: #800;">Position: ${position} (Missing)</h2>\n`);
        }
        result.push(`<p>${expected[position].description}</p>\n`);
        result.push(`<div>`);
        result.push("     <div>");
        result.push("         <h3>Qualifications:</h3>\n");
        result.push(`         <div style="display: flex;"><div style="margin: 0.5rem 1rem 0.5rem 0;">${expected[position].qualifications.join("</div><div style=\"margin: 0.5rem 1rem 0.5rem 0;\">")}</div></div>\n`);
        result.push(`        <p>Number of positions: ${expected[position].numberOfPositions}</p>\n`);

        if (actual[position] && actual[position].candidates) {
            if (actual[position].candidates.length === expected[position].candidates.length) {
                result.push(`        <p>Number of candidates: ${expected[position].candidates.length}</p>\n`);
            } else {
                result.push(`        <p>Number of candidates: ${expected[position].candidates.length} <span style="color: #800;">(${actual[position].candidates.length})</span></p>\n`);
            }
        } else {
            result.push(`        <p style="color: #800;">Number of candidates: ${expected[position].candidates.length} (Missing)</p>\n`);
        }
        result.push(`    </div>`);
        result.push("    <div>");
        result.push("        <h3>Selected Candidates:</h3>\n");
        result.push(candidatesToString(expected[position].selectedCandidates, actual[position].selectedCandidates, expected[position].qualifications));
        result.push("    </div>");
        result.push("</div>\n");
        result.push("</div>\n");
    }

    return `<div>${result.join('')}</div>`;
}

function candidatesToString(expected, actual, qualifications) {
    if (!expected || expected.length === 0) {
        return "<p>No candidates selected</p>\n";
    }

    let result = "<table style='margin: 0.5rem 0; border: 1px solid #0002; border-radius: 12px; text-align: center; vertical-align: top; width: 100%;'>\n";
    result += "<tr><th>Name</th><th>Position</th><th>Qualifications</th><th>Matching</th></tr>\n";

    for (let i = 0; i < expected.length; i++) {
        const expectedCandidate = expected[i];
        let expectedRate = 0;
        let actualCandidate = null;
        let actualRate = 0;
        let actualPercentMatching = (0.0).toFixed(2);

        if (actual && i < actual.length) {
            actualCandidate = actual[i];
            actualCandidate.qualifications.map(qual => actualRate += qual.experience ? qual.experience : 0);
            actualRate  /= qualifications.length;
            actualPercentMatching = (actualRate * 100).toFixed(2);
        }

        expectedCandidate.qualifications.map(qual => expectedRate += qual.experience ? qual.experience : 0);
        expectedRate  /= qualifications.length;
        const expectedPercentMatching = (expectedRate * 100).toFixed(2);
        const candidateData = [
            [
                expectedCandidate.name,
                actualCandidate ? actualCandidate.name : "(Missing)"
            ],
            [
                expectedCandidate.position,
                actualCandidate ? actualCandidate.position : "(Missing)"
            ],
            [
                qualificationsToString(expectedCandidate.qualifications),
                actualCandidate ? qualificationsToString(actualCandidate.qualifications) : "(Missing)"
            ],
            [
                `${expectedPercentMatching} %`,
                actualCandidate ? `${actualPercentMatching} %` : "(Missing)"
            ]
        ]

        const color = i % 2 === 0 ? '#0000' : '#0002';
        result += `<tr style="background-color: ${color};">\n`;
        for (let data of candidateData) {
            result += "<td>";
            if (data[0] === data[1]) {
                result += data[0];
            } else {
                result += `${data[0]}<br/><span style="color: #800;">${data[1]}</span>`;
            }
            result += "</td>";
        }
        result += `</tr>\n`;
    }

    result += "</table>\n";
    return result;
}

function qualificationsToString(qualifications) {
    return `<div style="text-align: center; display: inline-flex;"><div style="margin: 0.5rem 1rem 0.5rem 0;">${qualifications.map(qual => qual.experience ? `${qual.name} <div style="font-size: 0.85rem;">(${(qual.experience * 100).toFixed(2)}%)</div>` : qual.name).join("</div><div style=\"margin: 0.5rem 1rem 0.5rem 0;\">")}</div></div>`;
}
