import twilio from "twilio"

export class ReverseSMSService {
    constructor(account_sid, auth_token) {
        this.account_sid = account_sid;
        this.auth_token = auth_token;
    }

    static reverseSmsAndCountPalindromes(body) {
        // Implement this in scenario 1
    }

    async sendReverseSms(from_, to, body) {
        // Implement this in scenario 2
    }

    static receiveSms(data) {
        // Implement this in scenario 3
    }
}