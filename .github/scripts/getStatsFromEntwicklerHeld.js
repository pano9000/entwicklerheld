import challengeData from "./challengeData.json" assert { type: "json" }
import { writeFileSync }  from "fs";


async function getStatsFromEntwicklerHeld() {

  const processedData = await processData(challengeData);
  createOverviewMarkdownFile(processedData);
  createSingleMarkdownFiles(processedData);

}


function writeReadmeMd(file, content) {
  try {
    writeFileSync(file, content);
  }
  catch(err) {
    console.error(err);
    throw err;
  }
}

async function getDataFromApi(idEH) {

  try {
    const fetchResponse = await fetch(`https://tasks.platform.entwicklerheld.de/api/campaign/${idEH}/details/`, {
      headers: {
        "Origin": "https://platform.entwicklerheld.de"
      }
    });

    const { title, slug, complexity, statistics, technology } = await fetchResponse.json();

    //validate expected types
    const isExpectedStrings = [title, slug, technology.language].every(entry => typeof(entry) === "string" && entry.length > 0);
    const isExpectedNumbers = [complexity, statistics.solutionsCount, statistics.acceptancesCount].every(entry => typeof(entry) === "number");

    if (isExpectedStrings === false || isExpectedNumbers === false) {
      throw new Error("Api Data Validation Failed. Received back unexpected data");
    };

    return {
      title,
      slug,
      complexity,
      statistics,
      language: technology.language
    }
  }
  catch(err) {
    console.error(err);
    throw err;
  }
}

async function processData(challengeData) {

  const complexityDict = ["Easy", "Medium", "Hard", "Hardcore"];

  const processedData = await Promise.all(
    challengeData.challengeData.map( async entry => {

      const { title, slug, complexity, statistics, language } = await getDataFromApi(entry.idEH);

      entry.urlEH = (entry.urlEH != "") ? `${challengeData.baseUrlEH}${entry.urlEH}` : `${challengeData.baseUrlEH}${slug}?technology=${language}`;
      entry.urlSolution = (entry.urlSolution != "") ? `${challengeData.baseUrlSolution}${entry.urlSolution}` : `${challengeData.baseUrlSolution}${slug}`;

      entry.difficulty = {
        complexity,
        name: complexityDict[complexity-1],
        bar: Array(4).fill("▮", 0, complexity).fill("▯", complexity).join("")
      };

      entry.statistics = statistics;
      entry.statistics.succesRate = Math.round(statistics.solutionsCount / (statistics.acceptancesCount / 100));

      const succesRateRounded = Math.round(entry.statistics.succesRate/10);
      entry.statistics.succesRateBar = Array(10).fill("█", 0, succesRateRounded).fill("░", succesRateRounded).join("");

      entry.language = language;
      entry.title = title;

      return entry;
    })
  )

  return processedData
}


function createOverviewMarkdownFile(data) {

  const lines = [];

  lines.push("# pano9000 EntwicklerHeld Challenges")
  lines.push("");
  lines.push("I use this repository to save and present my solutions for the challenges on the [EntwicklerHeld](https://platform.entwicklerheld.de/) coding challenge platform.");
  lines.push("");
  lines.push("Click on the challenge names for more details and to see the solution.")
  lines.push("");
  lines.push(`List Last updated: **${new Date().toISOString().slice(0,10)}**`);
  lines.push("");
  lines.push("### Difficulty Levels (According to EntwicklerHeld)");
  lines.push("");
  lines.push("▮▯▯▯ = `Easy`", "", "▮▮▯▯ = `Medium`", "", "▮▮▮▯ = `Hard`", "", "▮▮▮▮ = `Hardcore`", "");
  lines.push("## Overview");
  lines.push(`Language | Total | ▮▯▯▯ | ▮▮▯▯ | ▮▮▮▯ | ▮▮▮▮`);
  lines.push(getTableHeadingMarkdown(lines));
  getCountGroupedByLanguage(data).forEach(group => {
    lines.push(`${group[0]} | ${Array.from(group[1].values()).join(" | ")}`);
  });
  lines.push("## Solved Challenges Sorted by Solution Date");
  lines.push("");
  lines.push("Challenge Name | Difficulty | Overall Success Rate @EH | Overall Solved/Accepted @EH | Date Solved | Language");
  lines.push(getTableHeadingMarkdown(lines));

  data.forEach(entry => {
    lines.push(`[${entry.title}](${entry.urlSolution}) | ${entry.difficulty.bar} | ${entry.statistics.succesRateBar} ${entry.statistics.succesRate}% | ${entry.statistics.solutionsCount} / ${entry.statistics.acceptancesCount} | ${entry.dateSolved} | ${entry.language}`)
  })

  lines.push("## Solved Challenges Sorted by Difficulty, then Solution Date")
  lines.push("")
  lines.push("Challenge Name | Difficulty | Overall Success Rate @EH | Overall Solved/Accepted @EH | Date Solved | Language")
  lines.push(getTableHeadingMarkdown(lines));

  // sort descending by difficulty first, then by solution date
  data.sort( (a, b) => b.difficulty.complexity - a.difficulty.complexity || new Date(b.dateSolved) - new Date(a.dateSolved));

  data.forEach(entry => {
    lines.push(`[${entry.title}](${entry.urlSolution}) | ${entry.difficulty.bar} | ${entry.statistics.succesRateBar} ${entry.statistics.succesRate}% | ${entry.statistics.solutionsCount} / ${entry.statistics.acceptancesCount} | ${entry.dateSolved} | ${entry.language}`)
  })

  lines.push("## Solved Challenges Sorted by Success Rate, then Solution Date")
  lines.push("")
  lines.push("Challenge Name | Difficulty | Overall Success Rate @EH | Overall Solved/Accepted @EH | Date Solved | Language")
  lines.push(getTableHeadingMarkdown(lines));

  // sort descending by succesRate Ascending first, then by solution date
  data.sort( (a, b) => a.statistics.succesRate - b.statistics.succesRate || new Date(b.dateSolved) - new Date(a.dateSolved));

  data.forEach(entry => {
    lines.push(`[${entry.title}](${entry.urlSolution}) | ${entry.difficulty.bar} | ${entry.statistics.succesRateBar} ${entry.statistics.succesRate}% | ${entry.statistics.solutionsCount} / ${entry.statistics.acceptancesCount} | ${entry.dateSolved} | ${entry.language}`)
  })



  const content = lines.join("\n");

  writeReadmeMd("./README.md", content);

}


function createSingleMarkdownFiles(data) {

  data.forEach(entry => {
    const lines = [];

    lines.push(`# ${entry.title}`)
    lines.push("");
    lines.push(`My solution for the ['${entry.title}' Challenge](${entry.urlEH}) on the [EntwicklerHeld](https://platform.entwicklerheld.de/) Code Challenge Platform.`);
    lines.push("");
    lines.push("## Description");
    lines.push(entry.description.replaceAll("\\n", "\n\n"));
    lines.push("");
    lines.push("## Challenge Info")
    lines.push(`Data last updated: ${new Date().toISOString().slice(0,10)}`);
    lines.push("Difficulty | Overall Success Rate @EH | Overall Solved/Accepted @EH | Date Solved | Language");
    lines.push(getTableHeadingMarkdown(lines));
    lines.push(`${entry.difficulty.bar} | ${entry.statistics.succesRateBar} ${entry.statistics.succesRate}% | ${entry.statistics.solutionsCount} / ${entry.statistics.acceptancesCount} | ${entry.dateSolved} | ${entry.language}`);
    lines.push("");
    lines.push("## Comment");
    lines.push(entry.comment.replaceAll("\\n", "\n\n"));

    const content = lines.join("\n");
    const folder = entry.urlSolution.split("/").at(-1)
    writeFileSync(`./${folder}/README.md`, content);

  })


}

function getTableHeadingMarkdown(lines) {
  return Array(lines.at(-1).split("|").length)
          .fill("---|")
          .join("");
}

function getCountGroupedByLanguage(data) {


  // create a map for the counts, with 1-4 representing the difficulty levels
  const getInitCountMap = () => {
    return new Map([
      ["total", 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ])
  };

  const totalsLabel = "**Totals**";

  const counts = data.reduce(
    (counts, current) => {

      if (!counts.has(current.language)) counts.set(current.language, getInitCountMap());

      // update current Language Entry and Totals Entry
      [counts.get(current.language), counts.get(totalsLabel)].forEach(entry => {
        entry.set("total", entry.get("total") + 1)
        entry.set(current.difficulty.complexity, entry.get(current.difficulty.complexity) + 1)
      });

      return counts;
    },
    new Map([[totalsLabel, getInitCountMap()]])
  );

  // add bold formatting for totals
  counts.get(totalsLabel).forEach((val, key, map) => map.set(key, `**${val}**`));

  // temporary remove Totals, so that we can add it later to the end of the sorted list
  const totals = new Map([[totalsLabel, counts.get(totalsLabel)]]);
  counts.delete(totalsLabel);

  return [...Array.from(counts).sort((a, b) => b[1].get("total") - a[1].get("total")), ...Array.from(totals)];

}

await getStatsFromEntwicklerHeld();
