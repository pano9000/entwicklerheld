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

  const openBrackets = input.match(openingRegEx);
  const closedBrackets = input.match(closingRegEx);
  const combinedBrackets = input.match(bracketsRegEx);


  if (openBrackets === null && closedBrackets === null) return true;
  
  // refactor: simplify?
  if ((!openBrackets && closedBrackets) ||  (openBrackets && !closedBrackets)) return false;

  if (openBrackets.length !== closedBrackets.length) return false;
  console.log("combined", combinedBrackets)



  let valid = true;
  let currDepth = -1;
  let currBaseIndex;
  for (let i=0; i < combinedBrackets.length; i++) {
    //console.log(combinedBrackets[i])
    if (currDepth == -1) {
      currBaseIndex = i;
     // console.log("currBaseInd", currBaseIndex)
    }
    if (combinedBrackets[i].match(openingRegEx)) {
      currDepth += 1;
     console.log("open, currDepth:", currDepth, combinedBrackets[i])
    }
    if (combinedBrackets[i].match(closingRegEx)) {
      const matchingDepth = combinedBrackets[currBaseIndex+currDepth];
      let a = bracketPairs.get(matchingDepth);

      if (a === combinedBrackets[i]) {
        //console.log("matches ok")
      } else {
        //console.log("no match")
        console.log("matchy", currBaseIndex, currDepth, matchingDepth)

        console.log("closing", a, combinedBrackets[i], "currDepth:", currDepth, currBaseIndex, combinedBrackets[currBaseIndex+currDepth], combinedBrackets[i], )

        valid = false;
        break;
      }

      console.log("closing", a, combinedBrackets[i], "currDepth:", currDepth, currBaseIndex, combinedBrackets[currBaseIndex+currDepth], combinedBrackets[i], )
      //console.log("yo, closing", currDepth, combinedBrackets[i-1], combinedBrackets[i])
      currDepth -= 1;
    }
    //console.log(currDepth)
  }

  return valid

};

console.log(isPaired('([{}({}[])])'))