export function isAnagram(firstWord, secondWord) {
  // if length is not the same, it is not an anagram -> return false
  if (!(firstWord.length === secondWord.length)) return false;

  // convert words to lowercase, create an Array out of them
  // and sort them alphabetically 
  const firstWordSorted = Array.from(firstWord.toLowerCase()).sort();
  const secondWordSorted = Array.from(secondWord.toLowerCase()).sort();

  // check if letters are in both arrays, if -> return false
  for (let i=0; i < firstWordSorted.length; i++) {
    if (!(firstWordSorted[i] === secondWordSorted[i])) return false;
  }

  // if previous checks passed, we can assume the words are an anagram -> return true;
  return true;
}