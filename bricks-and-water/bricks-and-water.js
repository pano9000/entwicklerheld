export function bricksAndWater(bricksArray) {
  // collect the subsets in an array -> start with the first Array 
  // let subsetArr = [[bricksArray[startSubsetIndex]]];
  let subsetArr = [];

  // accumulator for the bricks, in which we can store water in, will be calculated later on
  let maxAmountSum = 0;

  // store the Indexnumber that we processed last, start of with 0;
  let processedIndexUpUntil = 0;

  let startSubsetIndex = 0;
  let endSubsetIndex;

  // function to get the starting Index of the subset
  const getSubsetIndexStart = ( startSubsetIndex ) => {
    // if this is the first time we run, find the first element greater than 0
    if ((startSubsetIndex === 0) && (processedIndexUpUntil === 0)) {
      //find the first element that is greater than 0 -> that is the first barrier we can store water in
      return bricksArray.findIndex( element => element > 0 );
    }
    // if it is not the first time we run, use the last element of the last subset
    return processedIndexUpUntil;
  }

  // find the next barrier
  const getSubsetIndexEnd = (startSubsetIndex) => {

    // check if there is another number that equally big or bigger than the startSubsetIndex, but is greater than the startSubsetIndex itself
    // if true, return the first time it appears (findIndex returns first appearance)
    if (bricksArray.some((element, index) => element >= bricksArray[startSubsetIndex] && index > startSubsetIndex)) {
      return bricksArray.findIndex( (element, index, array) => element >= bricksArray[startSubsetIndex] && index > startSubsetIndex)
    }

    // if above check fails, try to find the next highest number other than the startSubsetIndex
    let secondHighest = 0; // auxiliary accumulator
    let secondHighestIndex; // this is the value we care about

    bricksArray.forEach( (element, index) => {
      if (element > secondHighest && index > startSubsetIndex ) {
        secondHighest = element;
        secondHighestIndex = index;
      }
    })

    // if above does not find any match, just use the last brick of bricksArray
    if (secondHighestIndex === undefined) {
      return bricksArray.length-1;
    }

    return secondHighestIndex;

  }

  while (processedIndexUpUntil < bricksArray.length-1) {
    // save value in startSubsetIndex
    startSubsetIndex = getSubsetIndexStart(startSubsetIndex);
    endSubsetIndex = getSubsetIndexEnd(startSubsetIndex);

    //console.log("start*****\n", "bricksarray", bricksArray, "endsubsetIndex", endSubsetIndex, "length", bricksArray.length-1, );

    subsetArr.push(bricksArray.slice(startSubsetIndex, endSubsetIndex+1))
    processedIndexUpUntil = endSubsetIndex;
  }



  // calculate the water that can be stored in each subset and return the maxAmountSum
  subsetArr.forEach( subset => {
    maxAmountSum += subset.reduce( (accumulator, currentValue) => {
       //console.log("subset", subset, "accum", accumulator, "maxamountsum", maxAmountSum)
       let maxBlockHeight = (subset[0]>=subset[subset.length-1]) ? subset[subset.length-1] : subset[0];
       //console.log("maxblock", maxBlockHeight)
       if (maxBlockHeight - currentValue > 0) {
         return accumulator += maxBlockHeight - currentValue;
       } else {
         return accumulator;
       }
    }, 0)
  });

  //console.log("\nend******\n")
  return maxAmountSum;
}