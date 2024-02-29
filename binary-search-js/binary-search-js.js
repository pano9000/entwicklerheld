import { Result } from "./result.js";

export const find = (array, element) => {

  let step = 0;

  const searchRange = {
    start: 0,
    end: array.length - 1,
    remainingElements: array.length
  };

  while (searchRange.remainingElements > 0) {

    let indexMiddle = Math.floor((searchRange.remainingElements - 1) / 2);
    let currentValueIndex = indexMiddle + searchRange.start;

    if (array[currentValueIndex] === element) {
      return new Result(step, currentValueIndex);
    }

    if (array[currentValueIndex] > element) {
      searchRange.end = currentValueIndex - 1;
    }
    else {
      searchRange.start = currentValueIndex + 1;
    }

    searchRange.remainingElements = searchRange.end - searchRange.start + 1;
    step++;
  }

  return new Result(step, -1)

};