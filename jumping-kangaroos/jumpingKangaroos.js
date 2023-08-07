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


  const queue = [];
  let shortestCount;

  numbers
  //TODO Implement this in scenario 3

  //
}
