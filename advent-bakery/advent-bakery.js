export function divideCookies(cookies, plates) {

  console.log("*******start", `cookies: ${cookies}, plates: ${plates} \n`)

  // create array of numbers to subtract -> e.g. for 4 remaining cookies-> [1,2,3,4]

  /**
   * Helper function to createa an array of numbers to be subtracted in the cookieRecursion function
   */
  const numbersToSubtract = (number) => {
      const array = []
      for (let i = 1; i <= number; i++) {
          array.push(i);
      }
      return array;
  } 

  // since no plate can remain empty, we can assume we only need to take care of the remaining cookies
  // and sove some valuable computing time here for the recursive function
  const remainingCookies = cookies - plates;
  const maxDepth = plates;

  /**
   * Recursively "distribute" the remaining cookies to all plates, used memoization to speed things up
   */
  const cookieRecursion = (remainingCookiesRec, path = [], currentDepth = 0, memo = {}, subtractArray = numbersToSubtract(remainingCookiesRec)) => {

      let memoKey = `${path.sort().join(",")}+${currentDepth}`;

      if (memoKey in memo) return memo

      if (remainingCookiesRec === 0) {
          //if we reach 0 -> we have distributed all cookies, goal reached
          memo[memoKey] = path.sort();
          return memo;
      }

      if (currentDepth >= maxDepth) {
          return memo;
      }

      subtractArray.forEach( number => {
          const remainder = remainingCookiesRec - number;
          //console.log(`${remainingCookiesRec} - ${number} = ${remainder}`, path)
          cookieRecursion(remainder, [...path, number], currentDepth+1, memo);
      }) 
      return memo
  }

  // takes the object that is returned, then converts the values into an array
  const cookieRecursionResults = Object.values(cookieRecursion(remainingCookies));

  //add an array for each "missing" plate, since we know that no plate may remain empty
  const addMissingPlates = (() => {
      let arrayLength = cookieRecursionResults.length;

      while (arrayLength < plates) {
          cookieRecursionResults[arrayLength] = [0]
          arrayLength++;
      }
  })();
  
  const distributeCookiesToPlates =
      cookieRecursionResults
          .map(result => {
              if (result.length < plates) {
                  for (let i = result.length; i < plates; i++) {
                      result.push(0);
                  }
              }
              return result
                      .map(cookieInResult => cookieInResult + 1)
                      .sort();
          })
          .filter(result => {
              let sumOfCookiesOnPlate = result.reduce( (cookieAccumulator, currentCookie) => cookieAccumulator + currentCookie )
              if (sumOfCookiesOnPlate === cookies) return true
          })
          .sort();

  const filterForUniqueResults = 
      distributeCookiesToPlates
          .map(result => JSON.stringify(result))
          .filter( (stringifiedResult, currentIndex, array) => {
              if (currentIndex !== array.lastIndexOf(stringifiedResult)) return false
              return true
          })
          .map(stringifiedResult => JSON.parse(stringifiedResult));

  return filterForUniqueResults
}
