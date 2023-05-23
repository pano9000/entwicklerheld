/**
 * Check if the given string has valid matching brackets
 * @param input string to check
 */
export const isPaired = (input) => {

  //throw new Error('You have to implement this function');
  const bracketPairs = new Map([
      [ "{", "}" ],
      [ "[", "]" ],
      [ "(", ")" ]
  ])

  const openingRegEx = /[\{\[\(]/g;
  const closingRegEx = /[\}\]\)]/g;
  const bracketsRegEx = /[\{\[\(\}\]\)]/g
 // console.log("***start", input)
 // console.log("open:", input.match(openingRegEx));
 // console.log("close:", input.match(closingRegEx));

 /*
 for every opening bracket, do one indent
*/
  const openBrackets = input.match(openingRegEx);
  const closedBrackets = input.match(closingRegEx);
  const combinedBrackets = input.match(bracketsRegEx);
  if (openBrackets === null && closedBrackets === null) return true;
  
  // refactor: simplify?
  if ((!openBrackets && closedBrackets) ||  (openBrackets && !closedBrackets)) return false;

  if (openBrackets.length !== closedBrackets.length) return false;
  console.log("combined", combinedBrackets)
  
  const result = combinedBrackets.every( (currBracket, index) => {

      console.log("mapevery", index, currBracket)
      const matchingBracket = bracketPairs.get(currBracket)
      
      const halfLengthIndex = Math.floor( (combinedBrackets.length-1) / 2);
      if (index > halfLengthIndex) return true; //onlyl check "half" the array

      console.log("half", Math.floor( (combinedBrackets.length-1) / 2))
      console.log("in map", currBracket, combinedBrackets[combinedBrackets.length-1-index], matchingBracket)
      return combinedBrackets[combinedBrackets.length-1-index] === matchingBracket

  });
  
  //const result = ""

  //console.log(result)
  return result
  
};

console.log(isPaired("[({})]{}()"))