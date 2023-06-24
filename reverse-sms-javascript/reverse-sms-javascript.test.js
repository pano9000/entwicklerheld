import 'regenerator-runtime/runtime.js'
import {ReverseSMSService} from "./reverse-sms-javascript.js"
import nock from "nock";
import app from "./server.js";
import supertest from "supertest";
import { expect } from "chai";



function checkResultReverseFunction(input_body, expected_body, expected_palindrome_count, result) {
  expect(result, "Result should not be undefined.").not.to.be.undefined;
expect(result, "Result should not be null.").not.to.be.null;
let [actual_body, actual_palindrome_count] = result;
expect(
    [actual_body, actual_palindrome_count],
    `The reversion of the sms '${input_body}' should be '${expected_body}'. Palindrome count should be ${expected_palindrome_count}.`
).to.deep.equal([expected_body, expected_palindrome_count]);
}

let sms_to_reverse = [
  ["Twilio", 0],
  ["SMS", 1],
  ["Twilio is fast as some next level racecar!", 2],
  ["Deliver at scale with proven APIs for SMS", 1],
  ["Twilio is a cloud communications platform for building SMS, Voice & Messaging applications on an API built for global scale.", 2],
  ["()()", 0],
  [")(()", 1],
];

let hidden_sms_to_reverse = ["Launching a trusted SMS solution is easy with MessagingX. Twilio gives you developer-friendly APIs, scalability, and built-in software for compliance, routing, and advanced use cases. All to help you get to market faster, and with unmatched deliverability.", 2];











it('test_reversion_of_string', () => {
      let service = new ReverseSMSService("ACfe3af2c38f2f4b4ed95211addccfcc9e", "e0ed804258945f427a8085455911c638");

    expect(ReverseSMSService.reverseSmsAndCountPalindromes(""), "The reversion of an empty sms should be an empty sms and the palindrome count should be 0.").to.deep.equal(["", 0]);

    let body = sms_to_reverse[0][0]
    let result = ReverseSMSService.reverseSmsAndCountPalindromes(body);
    let expected_body = body.split("").reverse().join("");
    let expected_palindrome_count = sms_to_reverse[0][1]
    checkResultReverseFunction(body, expected_body, expected_palindrome_count, result);

    body = sms_to_reverse[1][0]
    result = ReverseSMSService.reverseSmsAndCountPalindromes(body);
    expected_body = body.split("").reverse().join("");
    expected_palindrome_count = sms_to_reverse[1][1]
    checkResultReverseFunction(body, expected_body, expected_palindrome_count, result);

    body = sms_to_reverse[2][0]
    result = ReverseSMSService.reverseSmsAndCountPalindromes(body);
    expected_body = body.split("").reverse().join("");
    expected_palindrome_count = sms_to_reverse[2][1]
    checkResultReverseFunction(body, expected_body, expected_palindrome_count, result);

    for (let [body_in_loop, expected_palindrome_count_loop] of sms_to_reverse.slice(3)) {
          result = ReverseSMSService.reverseSmsAndCountPalindromes(body_in_loop);
        let expected_body_in_loop = body_in_loop.split("").reverse().join("");
        checkResultReverseFunction(body_in_loop, expected_body_in_loop, expected_palindrome_count_loop, result);
    }
});

describe("test_send_sms", () => {

  let service = new ReverseSMSService("ACfe3af2c38f2f4b4ed95211addccfcc9e", "e0ed804258945f427a8085455911c638");

  let input_body = hidden_sms_to_reverse[0];
  let expected_body = input_body.split("").reverse().join("");
  let expected_palindrome_count = hidden_sms_to_reverse[1];

  const scope = nock("https://api.twilio.com").post(
      uri => {
            if (uri.indexOf("Messages.json") !== -1) {
                return uri;
          }
      },
      body => {
            let result = true;
          if (body === undefined || body === null) {
                result = false;
                console.log("fail nock 1")

          }
          if (!("To" in body)) {
                result = false;
                console.log("fail nock 2")

          }
          if (body["To"] !== "+15005550010") {
                result = false;
                console.log("fail nock 3")

          }
          if (!("From" in body)) {
                result = false;
                console.log("fail nock 4")

          }
          if (body["From"] !== "+15005550006") {
                result = false;
                console.log("fail nock 5")

          }
          if (!("Body" in body)) {
                result = false;
                console.log("fail nock 6")

          }
          if (body["Body"] !== `${expected_body} (${expected_palindrome_count} palindromes)`) {
                result = false;
                console.log("fail nock 7", body["Body"])

          }
          console.log("result nock", result)
          if (!result) {
                throw Error("You have to send the sms by calling the correct Client method and passing from, to, and the reversed sms as body!");
          }
          return true;
      }
  ).reply(200, {
        body: `${expected_body} (${expected_palindrome_count} palindromes)`,
      numSegments: '1',
      direction: 'outbound-api',
      from: '+15005550006',
      to: '+15005550010',
      dateUpdated: "2023-06-14T08:07:32.000Z",
      price: null,
      errorMessage: null,
      uri: '/2010-04-01/Accounts/ACfe3af2c38f2f4b4ed95211addccfcc9e/Messages/SMd2b7e86aca0e36ba8db565da72dc765b.json',
      accountSid: 'ACfe3af2c38f2f4b4ed95211addccfcc9e',
      numMedia: '0',
      status: 'queued',
      messagingServiceSid: null,
      sid: 'SMd2b7e86aca0e36ba8db565da72dc765b',
      dateSent: null,
      dateCreated: "2023-06-14T08:07:32.000Z",
      errorCode: null,
      priceUnit: 'USD',
      apiVersion: '2010-04-01',
      subresourceUris: {
            media: '/2010-04-01/Accounts/ACfe3af2c38f2f4b4ed95211addccfcc9e/Messages/SMd2b7e86aca0e36ba8db565da72dc765b/Media.json'
      }
  })

  it("Valid", async () => {
    let result = await service.sendReverseSms("+15005550006", "+15005550010", input_body);
    expect(scope.isDone(), "You have to call the right method of the Twilio SDK!").to.equal(true);

    expect(result, "Result should not be undefined.").not.to.be.undefined;
    expect(result, "Result should not be null.").not.to.be.null;
    expect(result).to.deep.equal([200, "Successfully sent"])

    nock.cleanAll();


  })

  it("Invalid From", async () => {
    let result = await service.sendReverseSms("+15005550007", "+15005550010", "");
    expect(result, "Result should not be undefined.").not.to.be.undefined;
    expect(result, "Result should not be null.").not.to.be.null;
    expect(result).to.deep.equal([400, "The From phone number +15005550007 is not a valid, SMS-capable inbound phone number or short code for your account."])

    nock.cleanAll();

  })

  it("Invalid To", async () => {


    let result = await service.sendReverseSms("+15005550006", "+15005550001", "");
    expect(result, "Result should not be undefined.").not.to.be.undefined;
    expect(result, "Result should not be null.").not.to.be.null;
    expect(result).to.deep.equal([400, "The 'To' number +15005550001 is not a valid phone number."])

    nock.cleanAll();
  })

})

it('test_receive_sms', async () => {
      let input_body = hidden_sms_to_reverse[0]
    await supertest(app)
        .post("/api/receive_sms")
        .send({
              "Body": input_body,
            "MessageSid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "SmsSid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "AccountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "MessagingServiceSid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "From": "+14017122661",
            "To": "+15558675310",
            "NumMedia": 0
        })
        .expect(200)
        .then((response) => {
              let expected_body = input_body.split("").reverse().join("");
            let expected_palindrome_count = hidden_sms_to_reverse[1];
            try {
                  expect(response.text, "The response of your API didn't match the expected one.")
                    .to.deep.equal('<?xml version="1.0" encoding="UTF-8"?><Response><Message>REVERSED_BODY (PALINDROME_COUNT palindromes)</Message></Response>'
                        .replace("REVERSED_BODY", expected_body)
                        .replace("PALINDROME_COUNT", expected_palindrome_count)
                    )
            } catch (error) {
                  expect(response.text, "The response of your API didn't match the expected one.")
                    .to.deep.equal('<?xml version="1.0" encoding="UTF-8"?><Response><Message><Body>REVERSED_BODY (PALINDROME_COUNT palindromes)</Body></Message></Response>'
                        .replace("REVERSED_BODY", expected_body)
                        .replace("PALINDROME_COUNT", expected_palindrome_count)
                    )
            }
        })
});