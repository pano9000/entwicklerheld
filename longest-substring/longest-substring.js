export function findLongestSubstring(string1, string2) {

  let longestSubstring = {
      substrings: [],

      get currLength() {
          return this.substrings[0]?.length || 0
      },

      add(substring) {
          if (substring.length > this.currLength) {
              this.substrings = [substring]
          } else {
              this.substrings.push(substring)
          }
      },

      toString() {
          return this.substrings.join(" ")
      }
  }

  for (let i = 0; i < string1.length + 1; i++) {

      for (let j = 1; j < string1.length + 1; j++) {
          const substr = string1.slice(i, j);

          // if the substring is not >= the current longest string -> skip
          if (!(substr.length >= longestSubstring.currLength) || !string2.includes(substr)) {
              continue;
          }

          longestSubstring.add(substr);
      }

  }

  return longestSubstring.toString();
}