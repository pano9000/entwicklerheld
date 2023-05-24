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

  const bracketPairsClosedOpen = new Map([
    [ "}", "{" ],
    [ "]", "[" ],
    [ ")", "(" ]
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
  //console.log("combined", combinedBrackets)


  /**
   * crate array with entries per depth, then when finding a closing bracket, check the current depth array for a matching opening brakcet
   */
  const depthArr = [];
  const result = []
  let currDepV2 = -1;
  for (let i=0; i < combinedBrackets.length; i++) {
    if (combinedBrackets[i].match(openingRegEx)) {
      currDepV2 += 1;
      if (depthArr[currDepV2] === undefined) {
        depthArr[currDepV2] = [];
      }
      depthArr[currDepV2].push(combinedBrackets[i])

    } else {
      const currentMatchingOpenBracket = bracketPairsClosedOpen.get(combinedBrackets[i]);
      if (currDepV2 < 0) return false
      const currentDepthHasMatchingBracket = depthArr[currDepV2].includes(currentMatchingOpenBracket)
      if (currentDepthHasMatchingBracket === false) return false
     // console.log("index", i, "current closed bracket", combinedBrackets[i], "matchingOpenBrac", currentMatchingOpenBracket, currentDepthHasMatchingBracket, depthArr[currDepV2])
      //console.log("elseee", combinedBrackets[i], depthArr[currDepV2], bracketPairsClosedOpen.get(combinedBrackets[i]))
      //console.log(depthArr[currDepV2].indexOf(bracketPairsClosedOpen.get(combinedBrackets[i])))
      currDepV2 -= 1;
    }
  }

  return true

 // console.log("depth", depthArr, result)
/*
  let valid = true;
  let currDepth = -1;
  let currBaseIndex;
  for (let i=0; i < combinedBrackets.length; i++) {

    console.log("\n---nustart----\n", "current Index", i, "currentChar", combinedBrackets[i], "--------")
    console.log(combinedBrackets)

    if (currDepth == -1) {
      currBaseIndex = i;
    }
    if (combinedBrackets[i].match(openingRegEx)) {
      currDepth += 1;
      continue
    }

    if (combinedBrackets[i].match(closingRegEx)) {
      const matchingDepth = combinedBrackets[currBaseIndex+currDepth];
      let a = bracketPairs.get(matchingDepth);
      console.log("bbb", combinedBrackets[currBaseIndex+currDepth], currBaseIndex+ currDepth, "/", currBaseIndex, currDepth, a)

      if (a === combinedBrackets[i]) {
        console.log("slice test", i, combinedBrackets[i], combinedBrackets.splice(i-1, 2))
        console.log(combinedBrackets)

        currBaseIndex = i
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
*/
};

//console.log(isPaired('([{}({}[])])'))
console.log(isPaired("('asd(sad')"))
console.log(isPaired('\\left(\\begin{array}{cc} \\frac{1}{3} & x\\\\ \\mathrm{e}^{x} &... x^2 \\end{array}\\right)'
))