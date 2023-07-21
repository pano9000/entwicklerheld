import challengeData from "./challengeData.json" assert { type: "json" }
import { writeFileSync }  from "fs";


async function getStatsFromEntwicklerHeld() {

  const processedData = await processData(challengeData);
  const overviewMarkdown = createOverviewMarkdown(processedData);
  //console.log(processedData, JSON.stringify(processedData), overviewMarkdown)
  writeReadmeMd(overviewMarkdown);

}


function writeReadmeMd(content) {
  try {
    writeFileSync("../../README.md", content);
  }
  catch(err) {
    console.err(err);
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

      entry.urlEH = challengeData.baseUrlEH + (entry.urlEH != "") ? entry.urlEH : `${slug}?technology=${language}`;
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


function createOverviewMarkdown(data) {

  const lines = [];

  lines.push("# pano9000 EntwicklerHeld Challenges")
  lines.push("");
  lines.push("I use this repository to save and present my solutions for the challenges on the [EntwicklerHeld](https://platform.entwicklerheld.de/) coding challenge platform.")
  lines.push("")
  lines.push("Click on the challenge names for more details and to see the solution")
  lines.push("### Difficulty Levels (According to EntwicklerHeld)");
  lines.push("");
  lines.push("▮▯▯▯ = `Easy`", "", "▮▮▯▯ = `Medium`", "", "▮▮▮▯ = `Hard`", "", "▮▮▮▮ = `Hardcore`", "");
  lines.push("## Solved Challenges Sorted by Solution Date")
  lines.push("")
  lines.push("Challenge Name | Difficulty | Overall Success Rate @EH | Overall Accepted / Solved @EH | Date Solved | Language")
  lines.push("---|---|---|---|---|---|");

  data.forEach(entry => {
    lines.push(`[${entry.title}](${entry.urlSolution}) | ${entry.difficulty.bar} | ${entry.statistics.succesRateBar} ${entry.statistics.succesRate}% | ${entry.statistics.acceptancesCount} / ${entry.statistics.solutionsCount} | ${entry.dateSolved} | ${entry.language}`)
  })

  lines.push("## Solved Challenges Sorted by Difficulty, then Solution Date")
  lines.push("")
  lines.push("Challenge Name | Difficulty | Overall Success Rate @EH | Overall Accepted / Solved @EH | Date Solved | Language")
  lines.push("---|---|---|---|---|---|");


  // sort descending by difficulty first, then by solution date
  data.sort( (a, b) => b.difficulty.complexity - a.difficulty.complexity || new Date(b.dateSolved) - new Date(a.dateSolved));

  data.forEach(entry => {
    lines.push(`[${entry.title}](${entry.urlSolution}) | ${entry.difficulty.bar} | ${entry.statistics.succesRateBar} ${entry.statistics.succesRate}% | ${entry.statistics.acceptancesCount} / ${entry.statistics.solutionsCount} | ${entry.dateSolved} | ${entry.language}`)
  })



  return lines.join("\n");

}


await getStatsFromEntwicklerHeld();