export function selectCandidatesForJobOffers(candidateList, jobOffers) {

  for (const job in jobOffers) {
      console.log(job, jobOffers[job].qualifications);

      jobOffers[job]["candidates"] = selectAppliedCandidates(candidateList, job)
      const matchingCandidates = selectMatchingCandidates(candidateList, jobOffers[job].qualifications);
      jobOffers[job]["selectedCandidates"] = matchingCandidates; //TODO -> filter for ranking etc,
      jobOffers[job]["selectedCandidates"] = calcTotalExperiences(matchingCandidates)
      console.log(jobOffers[job]["selectedCandidates"])
      sortMatchingCandidates(jobOffers[job]["selectedCandidates"])
      jobOffers[job]["selectedCandidates"].splice(jobOffers[job]["numberOfPositions"])
  }
  //console.log("can--------", candidateList, "-------\n")
  console.log("job--------", JSON.stringify(jobOffers), "-------\n")
  return jobOffers;
}



function selectAppliedCandidates(candidateList, jobName) {
  const appliedCandidates = candidateList.filter(candidate => candidate.position === jobName);
  return appliedCandidates
}

function selectMatchingCandidates(candidateList, qualifications) {
  const filteredCandidates = candidateList.filter(candidate => {
      let matchingQualCount = 0;
      candidate["qualifications"].forEach(candQual => {
          const included = qualifications.includes(candQual["name"]);
          if (included) matchingQualCount++;
      })
      const minReqQualMatch = Math.ceil(qualifications.length / 2);

      const hasEnoughQualMatching = (matchingQualCount >= minReqQualMatch);

      return hasEnoughQualMatching
  })
  
  console.log("filtere", filteredCandidates.length, filteredCandidates);
  return filteredCandidates
}

function sortMatchingCandidates(matchingCandidates, numberOfPositions) {

  matchingCandidates.sort( (curr, next) => {
      if (curr["experienceSum"] > next["experienceSum"]) {
          return -1
      } else if (curr["experienceSum"] > next["experienceSum"]) {
          return 1
      } else {
          return 0
      }
  })

}

function calcTotalExperiences(matchingCandidates) {


  const abc = matchingCandidates.map(matchingCandidate => {
      const totalExperience = matchingCandidate["qualifications"].reduce((accum, current, index) => {
          accum += current["experience"]
          
          return accum
      }, 0)
      matchingCandidate["experienceSum"] = totalExperience;
      return matchingCandidate
  })


  return abc
}