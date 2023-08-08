export function isCompletable(numbers) {

  const recursiveCheckJumps = (numbers, currentFieldIndex = 0) => {
      if (currentFieldIndex >= numbers.length-1) return true;
      
      let currentFieldValue = numbers[currentFieldIndex];
      if (currentFieldValue === 0) return false;

      while(currentFieldValue > 0) {
          let nextFieldIndex = currentFieldIndex+currentFieldValue;

          let currentResult = recursiveCheckJumps(numbers, nextFieldIndex);
          if (currentResult === true) return true;
          currentFieldValue--;
      }
      return false;
  }

  return recursiveCheckJumps(numbers)
}


export function getMinimalNumberOfJumps(numbers){

  const values = [ ];
  const steps = [];
  let stepsCount = 0;
  const recursiveTest = (numbers, values, currentFieldIndex = 0) => {

      let currentFieldValue = numbers[currentFieldIndex];
      if (currentFieldIndex >= numbers.length-1) return [true, steps[stepsCount]];
      if (currentFieldValue === 0) return [false, steps[stepsCount]];

      if (steps[stepsCount] == undefined) {
        steps[stepsCount] = [];
      }

      while(currentFieldValue > 0) {

        let nextFieldIndex = currentFieldIndex+currentFieldValue;


        //temp
        if (steps[stepsCount] == undefined) {
          steps[stepsCount] = [];
        }
        //
        steps[stepsCount].push(currentFieldValue);

        const currentResult = recursiveTest(numbers, values, nextFieldIndex);

        if (currentResult[0] == true) {
          //steps[stepsCount].push(true) //temp
          values.push(currentResult[1]);
          stepsCount++;
        }
        else if (currentResult[0] == false) {
          steps[stepsCount].push(false) //temp
          stepsCount++;
        }
        else {

        }
        currentFieldValue--;

      }

      return values;

  }

  const resultsFromRecurs = recursiveTest(numbers, values)

  if (values.length == 0) return 0;

  console.log(JSON.stringify(resultsFromRecurs));


  return resultsFromRecurs.reduce( (accum, currentVal) => {

    if (currentVal[1].length < accum[1].length) {
      accum = currentVal;
    }

    return accum;

  }).length

}
//getMinimalNumberOfJumps(  [ 2,4,3,5,1,1,2,0,1,1 ])
//getMinimalNumberOfJumps( [3,0,2,1,2] );
//getMinimalNumberOfJumps( [2,2,0,3,1,2,0,1] )
getMinimalNumberOfJumps([  3,2,0,1,2 ])