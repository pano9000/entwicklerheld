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
      try {
        const twilioClient = twilio(this.account_sid, this.auth_token);
        const replyBody = ReverseSMSService.#getString(body);
        console.log("replyBody", replyBody)
        const response = await twilioClient.messages.create({body: replyBody, from, to});
        if (twilioClient.httpClient.lastResponse.statusCode == 200) {
            return [200, "Successfully sent"]
        }
        // here it should handle any codes other than 200
        // twilio client throws an error for certain codes, but not sure, if it does it for all
        // -> read the Twilio docs and adjust here accordingly -- if this was "production" code
      }
      catch(error) {
          return [error.status, error.message]
      }
    }

    static receiveSms(data) {
      const twiml = new twilio.twiml.MessagingResponse();
      const replyBody = this.#getString(data.Body);
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


  static #getString(data) {
    const reversedArr = this.reverseSmsAndCountPalindromes(data);
    const [ reverseText, palindromeCount ] = reversedArr;
    return `${reverseText} (${palindromeCount} palindromes)`;
  }

}