export function selectCandidatesForJobOffers(candidateList, jobOffers) {

  for (const jobName in jobOffers) {
      jobOffers[jobName]["candidates"] = candidateList.filter(candidate => candidate.position === jobName);

      const matchingCandidates = getMatchingCandidates(jobOffers[jobName]["candidates"], jobOffers[jobName].qualifications);
      jobOffers[jobName]["selectedCandidates"] = calculateMatchRate(matchingCandidates, jobOffers[jobName]["numberOfPositions"]);
      sortMatchingCandidates(jobOffers[jobName]["selectedCandidates"])

      jobOffers[jobName]["selectedCandidates"].splice(jobOffers[jobName]["numberOfPositions"])
  }

  return jobOffers;
}


function getMatchingCandidates(candidateList, requiredQualifications) {

  const minRequiredQualificationMatchCount = Math.ceil(requiredQualifications.length / 2);
  const matchingCandidates = candidateList.filter(candidate => {

      const matchingQualificationCount = candidate["qualifications"].reduce((accum, currentQualification) => {
          return (requiredQualifications.includes(currentQualification["name"])) ? ++accum : accum;
      }, 0);
      return (matchingQualificationCount >= minRequiredQualificationMatchCount);
  })

  return matchingCandidates
}


function calculateMatchRate(matchingCandidates, numberOfPositions) {

  return matchingCandidates.map(matchingCandidate => {
      const totalExperience = matchingCandidate["qualifications"].reduce((accum, current) => accum += current["experience"], 0)
      matchingCandidate["matchRate"] = (totalExperience != 0) ? totalExperience / numberOfPositions : 0;
      return matchingCandidate
  })

}

function sortMatchingCandidates(matchingCandidates) {

  matchingCandidates.sort((curr, next) => {
      if (curr["matchRate"] > next["matchRate"]) return -1;
      if (curr["matchRate"] > next["matchRate"]) return 1;
      return 0
  })

}