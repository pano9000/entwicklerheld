const emojiShortcodeRegEx = /:[\w]+:/ig;

const allowedEmojis = new Set([
  "angry",
  "happy",
  "love",
  "nerdy",
  "sad",
  "shocked",
  "sleepy",
  "thumb",
  "tongue",
]);

/**
 * @param {string} text 
 */
export function replaceEmojis(text) {

  return text.replaceAll(emojiShortcodeRegEx, (match) => {
    const normalizedMatch = match.toLowerCase().replaceAll(":", "");

    return (allowedEmojis.has(normalizedMatch)) 
      ? `<span class="emoji emoji-${normalizedMatch}"> </span>`
      : match;
  })

}