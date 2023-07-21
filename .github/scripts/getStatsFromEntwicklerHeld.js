import challengeData from "./challengeData.json" assert { type: "json" }

async function getStatsFromEntwicklerHeld(challengeId, challengeUrl) {

  const complexityDict = ["", "Easy", "Medium", "Hard", "Hardcore"]

  const processedData = await Promise.all(
    challengeData.challengeData.map( async entry => {

      const fetchResponse = await fetch(`https://tasks.platform.entwicklerheld.de/api/campaign/${entry.idEH}/details/`, {
        headers: {
          "Origin": "https://platform.entwicklerheld.de",
          //"Referer": challengeUrl
        }
      });
      const { title, slug, complexity, statistics, technology } = await fetchResponse.json();

      entry.urlEH = challengeData.baseUrlEH + (entry.urlEH != "") ? entry.urlEH : `${slug}?technology=${technology.language}`;
      entry.urlSolution = (entry.urlSolution != "") ? `${challengeData.baseUrlSolution}${entry.urlSolution}` : `${challengeData.baseUrlSolution}${slug}`;
      entry.difficulty = {
        complexity,
        name: complexityDict[complexity],
        bar: Array(4).fill("▮", 0, complexity).fill("▯", complexity).join("")
      }

      entry.statistics = statistics
      entry.statistics.succesRate = Math.round(statistics.solutionsCount / (statistics.acceptancesCount / 100));

      const succesRateRounded = Math.round(entry.statistics.succesRate/10);
      entry.statistics.succesRateBar = Array(10).fill("█", 0, succesRateRounded).fill("░", succesRateRounded).join("");

      entry.technology = technology.language;
      entry.title = title;

      return entry;
    })
  )

  const markdown = writeOverviewMarkDown(processedData);
  console.log(processedData, JSON.stringify(processedData), markdown)

}



function writeOverviewMarkDown(data) {

  const lines = [];

  lines.push("# pano9000 EntwicklerHeld Challenges")
  lines.push("")
  lines.push("I use this repository to save and present my solutions for the challenges on the [EntwicklerHeld](https://platform.entwicklerheld.de/) coding challenge platform.")
  lines.push("")
  lines.push("Click on the challenge names for more details and to see the solution")
  lines.push("")
  lines.push("## Solved Challenges Sorted by Solution Date")
  lines.push("")
  lines.push("Challenge Name | Difficulty | Stats (Success Rate/Accepted/Solved) | Date Solved | Language")
  lines.push("---|---|---|---|---|")

  data.forEach(entry => {
    lines.push(`[${entry.title}](${entry.urlSolution}) | ${entry.difficulty.bar} / \`${entry.difficulty.name}\` | ${entry.statistics.succesRateBar} ${entry.statistics.succesRate}% / ${entry.statistics.acceptancesCount} / ${entry.statistics.solutionsCount} | ${entry.dateSolved} | ${entry.technology}`)
  })

  return lines.join("\n");

}

getStatsFromEntwicklerHeld("3f237f37-6776-4e8b-a12a-378749f3e97f", "https://platform.entwicklerheld.de/challenge/maps-and-polygons?technology=java");