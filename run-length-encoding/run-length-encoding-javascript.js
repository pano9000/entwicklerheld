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