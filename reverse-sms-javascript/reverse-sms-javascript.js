import twilio from "twilio"

export class ReverseSMSService {
    constructor(account_sid, auth_token) {
        this.account_sid = account_sid;
        this.auth_token = auth_token;
    }

    static reverseSmsAndCountPalindromes(body) {

        const reverseString = [];
        let currentWord = "";
        let palindromeCount = 0;
        for (let i = body.length-1; i >= 0; i--) {
            const currCharIsSpace = (body[i] == " ");

            if (!currCharIsSpace) {
                currentWord += body[i];
            }
            
            if (currCharIsSpace || i == 0) {
                reverseString.push(currentWord);
                if (this.#isPalindrome(currentWord)) {
                    palindromeCount++;
                };
                currentWord = "";
            }
        }

        return [reverseString.join(" "), palindromeCount];
        
    }

    async sendReverseSms(from, to, body) {
        // Implement this in scenario 2
    }

    static receiveSms(data) {
      const twiml = new twilio.twiml.MessagingResponse();
      const [ reverseText, palindromeCount ] = this.reverseSmsAndCountPalindromes(data.Body);
      const replyBody = `${reverseText} (${palindromeCount} palindromes)`;
      twiml.message(replyBody);
      return twiml.toString();
      }

    /**
     * 
     * @param {*} word
     * @returns Boolean 
     */
    static #isPalindrome(word) {
        const wordLowercase = word.replace(/[.,!&]/g, "").toLowerCase(); //@TODO - should also filter out numbers I guess?
        if (wordLowercase.length === 0) return false; //@TODO - make this nicer
        let j = 0;
        for (let i = wordLowercase.length - 1; i>= 0; i--) {
            if (wordLowercase[i] !== wordLowercase[j]) {
                return false;
            }
            j++;
        }
        return true;
    }
}