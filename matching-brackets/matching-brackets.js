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

  const openBracketsChars = [...bracketPairs.values()];
  const closedBracketsChars = [...bracketPairs.keys()];
  const bracketsCharsClass = `[${["", ...closedBracketsChars, ...openBracketsChars].join("\\")}]`;
  const bracketsRegEx = new RegExp(bracketsCharsClass, "g");

  const foundBrackets = input.match(bracketsRegEx);
  if (foundBrackets === null) return true;

  const openBrackets = foundBrackets.filter(character => openBracketsChars.includes(character));
  const closedBrackets = foundBrackets.filter(character => closedBracketsChars.includes(character));

  if (openBrackets.length !== closedBrackets.length) return false;

  const depthArr = [];
  let currDepth = -1;
  for (let i=0; i < foundBrackets.length; i++) {
    let currentChar = foundBrackets[i];
    if (openBrackets.includes(currentChar)) {
      currDepth++;
      if (depthArr[currDepth] === undefined) {
        depthArr[currDepth] = [];
      }
      depthArr[currDepth].push(currentChar);

    } else {
      if (currDepth < 0) return false;

      const currentMatchingOpenBracket = bracketPairs.get(currentChar);
      const currentDepthHasMatchingBracket = depthArr[currDepth].includes(currentMatchingOpenBracket);
      if (currentDepthHasMatchingBracket !== true) return false;
      currDepth--;
    }
  }

  return true

};