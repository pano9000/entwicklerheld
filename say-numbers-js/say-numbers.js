/*
Transform integer numbers to their english word!
*/

function getWord(number) {


  const numbStr = String(number)
  const numbLen = numbStr.length
  console.log("\n-----\nstartnumber", numbStr, "\n----");
  //console.log(numbLen, numbStr, numbLen % 3)

const tens = new Map([
  [0, "zero"],
  [1, "one"],
  [2, "two"],
  [3, "three"],
  [4, "four"],
  [5, "five"],
  [6, "six"],
  [7, "seven"],
  [8, "eight"],
  [9, "nine"],
  [1_0, "ten"],
  [1_1, "eleven"],
  [1_2, "twelve"],
  [1_3, "thirteen"],
  [1_4, "fourteen"],
  [1_5, "fifteen"],
  [1_6, "sixteen"],
  [1_7, "seventeen"],
  [1_8, "eighteen"],
  [1_9, "nineteen"],

]);

const tys = new Map([
  [2, "twenty"],
  [3, "thirty"],
  [4, "fourty"],
  [5, "fifty"],
  [6, "sixty"],
  [7, "fifty"],
  [8, "eighty"],
  [9, "ninety"],
]);

const biggies = new Map([
  [0, "hundred"],
  [1, "thousand"],
  [2, "million"],
  [3, "billion"],
  [4, "trillion"],
])

const getStuff = (depth, pos) => {


  
}

/*
let depth = -1;
for (let i = numbLen; i > 0; i--) {
  depth++;
  console.log(
    depth,
    numbStr.charAt(i-1).padEnd(depth+1, "0"),
    tens.get(
      parseInt(numbStr.charAt(i-1))
    )
  )
}
*/

const splitIntoArray = () => {
  let j = 0;
  let arr = [];
  let arrDepth = 0;
  for (let i = numbLen; i > 0; i--) {
    if ((j >= 3)) {
      j = 0;
      arrDepth++;
    } 
    j++;
    if (!arr[arrDepth]) {
      //arr[arrDepth] = ["", "", ""]
      arr[arrDepth] = [];
    };
    arr[arrDepth].push(numbStr[i-1])
    //console.log(i, j, arr, arrDepth)

    //pad the array with 0
    if (i === 1 && arr[arrDepth].length < 3) {
      const pad = new Array(3 - arr[arrDepth].length).fill("0")
      arr[arrDepth] = [...arr[arrDepth], ...pad]
    }
  }

  return arr;

}


const getStringFromSplitArray = (splitArr) => {

  console.log("shplitarr", splitArr)

  const strArr = [];
  for (let block = splitArr.length - 1; block > -1; block--) {

    console.log("blocki", splitArr[block])
    if (!strArr[block]) {
      strArr[block] = [];
    };


//    for (let numIndex = 0; numIndex < splitArr[block].length; numIndex++) {
    for (let numIndex = splitArr[block].length -1 ; numIndex > -1; numIndex--) {
      console.log("num", numIndex, splitArr[block][numIndex])

      const currNumber = splitArr[block][numIndex];
      const prevNumber = splitArr[block][numIndex-1];

      if (currNumber == 0) {
        continue;
      }

      if (numIndex === 2) {
        let suffix = biggies.get( parseInt( 0 ));
        let currStr = tens.get( parseInt(currNumber  ));
        console.log("num in hun", currNumber, "currBlock", block, suffix);
        strArr[block].push(currStr, suffix);

        continue;

      }

      if (numIndex === 1) {
        console.log("second pos", currNumber+prevNumber)
        const specNum = tens.get( parseInt(currNumber+prevNumber))
        if (specNum !== undefined) {
          console.log("sepcnum", specNum)
          strArr[block].push(specNum);
          break;
        }
        const tysStr = tys.get(parseInt(currNumber));
        console.log("tys", tysStr);
        strArr[block].push(tysStr);
        continue;
      }

      let str = tens.get( parseInt(currNumber  ));

      strArr[block].push(str)
    }

    if (block !== 0) {
      console.log("yo", biggies.get( parseInt( block )))
      strArr[block].push(biggies.get( parseInt( block )))
    }

  }

  return strArr

  //console.log("a", strArr)
}

const split =   splitIntoArray();
console.log("splitt", split)
const stringi = getStringFromSplitArray(split);

console.log("\n-----\nstartnumber", numbStr, "\nstringi", stringi);

//console.log("a", splitIntoArray())

/*console.log(


);
*/

//arr.reverse()



//[ [ '1', '1' ], [ '9', '4', '1' ] ]

/*
[ '9', '4', '1' ]

0 -> take 1 series and append "hundred"
1 -> check if num > 1
      -> if yes -> take arr[1] + append 0, then search in 1_0 series
      -> if no -> take arr[1] & arr[2] and 
2 -> take 1 series -> no appending

*/


//console.log(tens.get(2), tens.get(1_000), tens.get(40), tens.get(9))
//[1_100_000]

}

getWord(513)
getWord(41)
getWord(234)
getWord(19)
getWord(1_519)
getWord(102_519)
getWord(123_519)
getWord(13_519)
getWord(5_123_519)
getWord(51_123_519)
getWord(523_123_519)
getWord(10_516_123_519)
getWord(1_100_516_123_519)




//getWord(52123519)


//getWord(1149)
//getWord(12049)
//getWord(22049)

