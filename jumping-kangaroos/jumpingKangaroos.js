export function isCompletable(numbers) {

  console.log("*****START ", numbers)

  
  const recursiveTest = (numbers, currentFieldIndex = 0, currentCount = 0, results = []) => {

      if (currentFieldIndex >= numbers.length-1) return [true, currentCount];

      let currentFieldValue = numbers[currentFieldIndex];
      if (currentFieldValue === 0) return [false, currentCount];

      console.log("currFieldIndex: ", currentFieldIndex, "currentFieldValue: ", currentFieldValue);

      //results
      while(currentFieldValue > 0) {
        //  currentCount++;
          
          let nextFieldIndex = currentFieldIndex+currentFieldValue;
          console.log("next: ", nextFieldIndex)
          
          let currentResult = recursiveTest(numbers, nextFieldIndex, currentCount, [...results]);
          if (currentResult[0] == true) return [true, currentCount];
          //if (currentResult[0] == true) {
            results = [...results, currentResult];
          //}
          currentFieldValue--;
       
      }
        console.log("before res in rec:", results, "\ncurr: ", currentFieldIndex, currentCount)
      return results[0]

  }


  const resultsFromRecurs = recursiveTest(numbers)[0]

  console.log("*****before end \n", JSON.stringify(resultsFromRecurs), "\n****end")
  //return resultsFromRecurs.some(result => result[0] === true)
  return resultsFromRecurs

}

//isCompletable([2,2, 0,3])
isCompletable([5,4,3,2,1,0,2])

export function isCompletable2(numbers) {

    //TODO Implement this in scenario 1, 2 & 3
  //  console.log("*********START ", numbers)


   // console.log(numbers[numbers.length-1])
   // console.log(numbers[numbers.length-1] - numbers[numbers.length-3])
   // console.log(numbers[numbers[0]])
    /*

    start: index[0] -> 1
    1st: a = index[0] + value of index[0] - 1 -> 1 + 1 - 1 = 1 / index[1]
    2nd: b = index[1] + value of index[1] - 1 -> 2 + 2 - 1 = 3 / index[3]
    -> done - true

    1
    2
    1
    1
------------------------

    start: index[0] -> 2
    1st: a = index[0] + value of index[0] - 1 -> 2 + 2 - 1 = 3 / index[3]
    2nd: b = index[3] + value of index[3] - 1 -> 0 + 0 - 1 = -1 / index[3]
    -> done - false -> result < 0

    2
    2
    0
    1

    */

/**
 * @param {number} - number to use for calculation
 * @return {number[]} - array of possible jumps lengths
 */
const getPossibleJumpLengths = (number) => {
    const numberArray = [];
    for (let i = number - 1; i > 0; i--) {
        numberArray.push(i);
    }
    return numberArray;
}

/* 
const checkIfCompleteable = (fields, getPossibleJumpLengths(number), ) {
    if ()
    fields[0]


    return checkIfCompleteable([fields.slice(currentValue)])
}
 */

    let count = 0;

    for (let currentIndex = 0; currentIndex < numbers.length;) {
       // console.log("currentindex", currentIndex, ", value numbers[currentIndex]", numbers[currentIndex])

        if (numbers[currentIndex] === 0 && currentIndex < numbers.length-1) {
        //    console.log(numbers, "false", "----------end\n")
            return false;
        }
/*
        if (numbers[numbers[currentIndex]] === 0) {
            console.log("in second if")
            let numbersCurr = numbers[currentIndex];
            let needToContinue = true;
            while (numbersCurr > 0 && needToContinue === true) {
                numbersCurr--;
                if (numbers[numbersCurr] !== 0) {
                    count += numbers[numbersCurr];
                    currentIndex += numbers[numbersCurr];
                    needToContinue = false;
                }
            }

        }
*/
        count += numbers[currentIndex];
        currentIndex += numbers[currentIndex];
        //console.log("after COUNT:", count, "after currentIndex", currentIndex)

        if (count >= numbers.length-1) {
       //     console.log(numbers, "true", "\n----------end\n")
            return true
        }
    }
}


// 2 2 0 1



/*

2 can jump [2, 2, 0, 1]
    1 -> jumpts to index 1, with value 2 -> is it end of array? no ->
        2 -> jumps to index 3 with value 1 -> is it end of array? yes ->
            finished
        1 -> jumps to index 2 with value 0 -> is it end of array? no ->
            no jumps left

    2 -> jumps to index 2, with value 0
        -> no jumps left


base case:
    if (value === 0 and currentIndex !== originalArray.length-1) return false;

*/

export function getMinimalNumberOfJumps(numbers){
    //TODO Implement this in scenario 3

    //
}
