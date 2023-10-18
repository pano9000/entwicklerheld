/**
 * Return a Run Length Encoded version of the string
 * @param {string} text 
 * @returns {string} Run Length Encoded String
 */
export function encode(text) {
  const encodedParts = [];

  let currentEnc = [0, text[0]];
  for (let i = 0; i < text.length; i++) {
    if (currentEnc[1] !== text[i]) {
      encodedParts.push(currentEnc.join(""));
      currentEnc = [0, text[i]];
    }

    currentEnc[0]++;

    if (i === text.length-1) {
      encodedParts.push(currentEnc.join(""));
    }
  }

  return encodedParts.join("");
}

//Bonus function -> Decode :-)
/**
 * Decode a Run Length Encoded string
 * @param {string} text 
 * @returns {string} Decoded Run Length Encoded String
 */
export function decode(text) {
  const decodedParts = [];

  for (let i = 0; i < text.length; i+=2) {
      const runLength = parseInt(text[i]);
      const encChar = text[i+1];
      if (runLength == NaN) {
        throw new Error(`Invalid run length at index ${i}, could not parse into a valid Integer: ${text[i]}`);
      }
      const decodedPart = new Array(runLength).fill(encChar).join("");
      decodedParts.push(decodedPart);

  }
  return decodedParts.join("");
}