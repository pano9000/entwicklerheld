export function getPascalsTriangleRow(rowNumber) {
  const pascalsTriangle = [[1]];

  // loop through the rowNumbers and create a sub-array for each row
  for (let i = rowNumber; i > 0; i--) {
      pascalsTriangle.push([1]);
      
      // "aliases" to make code easier to read
      let currentRowIndex = pascalsTriangle.length-1;
      let previousRowIndex = pascalsTriangle.length-2;
      
      // loop through the previous row of the current row and do the calculation of the Pascal's triangle
      pascalsTriangle[previousRowIndex].forEach( (num, currentIndex, currentArray) => {
          let nextNumberInPreviousArray = (pascalsTriangle[previousRowIndex][currentIndex+1] !== undefined) ? pascalsTriangle[previousRowIndex][currentIndex+1] : 0;
          pascalsTriangle[currentRowIndex].push( num + nextNumberInPreviousArray )
      })
  }

  return pascalsTriangle[rowNumber];
}