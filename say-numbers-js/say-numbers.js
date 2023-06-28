/*
Transform integer numbers to their english word!
*/

export default function getWord(number) {


  const numbStr = String(number);
  const numbLen = numbStr.length;
  console.log("\n-----\nstartnumber", numbStr, "\n----");

  const dict = [];

  dict[0] = new Map([
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

  dict[1] = new Map([
    [2, "twenty"],
    [3, "thirty"],
    [4, "fourty"],
    [5, "fifty"],
    [6, "sixty"],
    [7, "fifty"],
    [8, "eighty"],
    [9, "ninety"],
  ]);

  dict[2] = new Map([
    [0, "hundred"],
    [1, "thousand"],
    [2, "million"],
    [3, "billion"],
  ])


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
      arr[arrDepth] = [];
    };
    arr[arrDepth].push(numbStr[i-1])

    //pad the array with 0
    if (i === 1 && arr[arrDepth].length < 3) {
      const pad = new Array(3 - arr[arrDepth].length).fill("0")
      arr[arrDepth] = [...arr[arrDepth], ...pad]
    }
  }

  return arr;

}


const getStringFromSplitArray = (splitArr) => {

  console.log("shplitarr", 
    splitArr, 
    splitArr.length === 1,
    splitArr[0].every(item => item == 0)
  )

  const strArr = [];

  for (let block = splitArr.length - 1; block > -1; block--) {

    console.log("blocki", splitArr[block])
    if (!strArr[block]) {
      strArr[block] = [];
    };


    //speical case for zero
    if (splitArr.length === 1 && splitArr[0].every(item => item == 0)) {
      strArr[block].push(dict[0].get(0))
      return strArr
    }

    const currBlock = splitArr[block];
    strArr[block].push(getWordOfBlock(splitArr[block]).join(" "))
    console.log("block0word", getWordOfBlock(splitArr[block]))

    if (block !== 0) {
      console.log("yo", dict[2].get( parseInt( block )))
      strArr[block].push(dict[2].get( parseInt( block )))
    }
    strArr[block] = strArr[block].join(" ")

    //    for (let numIndex = 0; numIndex < splitArr[block].length; numIndex++) {
/*     for (let numIndex = splitArr[block].length -1 ; numIndex > -1; numIndex--) {
      console.log("num", numIndex, splitArr[block][numIndex])

      const currNumber = splitArr[block][numIndex];
      const prevNumber = splitArr[block][numIndex-1];

      if (numIndex !== 2 && currNumber == 0) {
        continue;
      }

      if (numIndex === 2 &&  splitArr[block][2] != 0) {
        let suffix = dict[2].get( parseInt( 0 ));
        let currStr = dict[0].get( parseInt(currNumber  ));
        console.log("num in hun", currNumber, "currBlock", block, suffix);
        strArr[block].push(currStr, suffix);

        continue;

      }

      if (numIndex === 1) {
        console.log("second pos", currNumber+prevNumber)
        const specNum = dict[0].get( parseInt(currNumber+prevNumber))
        if (specNum !== undefined) {
          console.log("sepcnum", specNum)
          strArr[block].push(specNum);
          break;
        }
        const tysStr = dict[1].get(parseInt(currNumber));
        const abc = dict[0].get( parseInt(prevNumber));
        const tensStr = (abc == "zero") ? "" : "-"+abc
        console.log("tys", tysStr, "tens", abc);
        strArr[block].push(`${tysStr}${tensStr}`);
        break;
        continue;
      }

      let str = dict[0].get( parseInt(currNumber  ));
      console.log("yo")
      strArr[block].push(str)
    } */



  }
  console.log(strArr.reverse().join(" "))
  return strArr.reverse().join(" ")

}

const split = splitIntoArray();
console.log("splitt", split)
const stringi = getStringFromSplitArray(split);

console.log("\n-----\nstartnumber", numbStr, "\nstringi", stringi);

function getWordOfBlock(block) {
  const blockResult = []
  if (block[2] != 0) {
    console.log("block2", block[2])
    blockResult.push(dict[0].get(parseInt(block[2])), dict[2].get(0))
  }

  console.log("getbloy", block[1]+block[0], parseInt(block[1]+block[0]))
  if (block[1] == "1") {

    if (dict[0].get(parseInt(block[1]+block[0])) !== undefined) {
      blockResult.push(dict[0].get(parseInt(block[1]+block[0])));
      return blockResult;
    }
  }

  if (block[1] !== "0") {
    const rest = `${dict[1].get(parseInt(block[1]))}-${dict[0].get(parseInt(block[0]))}`
    blockResult.push(rest)
    return blockResult
  }

  if (block[0] !== "0") {
    blockResult.push(dict[0].get(parseInt(block[0])))
    return blockResult
  }

  return blockResult

}



/**
 * split
 * getStringsFromArray
 * printString
 */

}
/*
getWord(513)
getWord(41)
getWord(234)
getWord(19)
getWord(1_519)
getWord(102_519)
getWord(123_519)
getWord(13_519)

getWord(51_123_519)
getWord(523_123_519)
getWord(10_516_123_519)
getWord(1_100_516_123_519)
getWord(987_654_321_123)
getWord(222)
*/

getWord(0)
getWord(1)
getWord(12)
getWord(10)
getWord(100)
getWord(5_123_519)


//getWord(52123519)


//getWord(1149)
//getWord(12049)
//getWord(22049)

