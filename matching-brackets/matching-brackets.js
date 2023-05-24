/**
 * Check if the given string has valid matching brackets
 * @param input string to check
 */

export const isPaired = (input) => {

  const bracketPairs = new Map([
    [ "}", "{" ],
    [ "]", "[" ],
    [ ")", "(" ]
  ]);

  const openingRegEx = /[\{\[\(]/g;
  const closingRegEx = /[\}\]\)]/g;
  const bracketsRegEx = /[\{\[\(\}\]\)]/g;

  const combinedBrackets = input.match(bracketsRegEx);
  const openBrackets = input.match(openingRegEx);
  const closedBrackets = input.match(closingRegEx);

  if (combinedBrackets === null) return true
  // refactor: simplify?
  if ((!openBrackets && closedBrackets) ||  (openBrackets && !closedBrackets)) return false;
  if (openBrackets.length !== closedBrackets.length) return false;

  const depthArr = [];
  let currDepth = -1;
  for (let i=0; i < combinedBrackets.length; i++) {
    let currentChar = combinedBrackets[i];
    if (currentChar.match(openingRegEx)) {
      currDepth++;
      if (depthArr[currDepth] === undefined) {
        depthArr[currDepth] = [];
      }
      depthArr[currDepth].push(currentChar);

    } else {
      if (currDepth < 0) return false;

      const currentMatchingOpenBracket = bracketPairs.get(currentChar);
      const currentDepthHasMatchingBracket = depthArr[currDepth].includes(currentMatchingOpenBracket)
      if (currentDepthHasMatchingBracket === false) return false
      currDepth--;
    }
  }

  return true

};