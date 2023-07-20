

async function getStatsFromEntwicklerHeld(challengeId, challengeUrl) {


  const fetchResponse = await fetch(`https://tasks.platform.entwicklerheld.de/api/campaign/${challengeId}/details/`, {
    headers: {
      "Origin": "https://platform.entwicklerheld.de",
      "Referer": challengeUrl
    }
  });
  const json = await fetchResponse.json();


  const succesRate = Math.round(json.statistics.solutionsCount / (json.statistics.acceptancesCount / 100))

  console.log(json.statistics, succesRate)


}


getStatsFromEntwicklerHeld("3f237f37-6776-4e8b-a12a-378749f3e97f", "https://platform.entwicklerheld.de/challenge/maps-and-polygons?technology=java");
getStatsFromEntwicklerHeld("cd14ba5e-a1f3-4b78-b770-bea57a23db7a", "https://platform.entwicklerheld.de/challenge/cinema-seat-reservation?technology=javascript");