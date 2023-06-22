import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { ReverseSMSService } from './reverse-sms-javascript.js';
const app = express()

app.set('view engine', 'hbs');
app.set('views', "templates");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function get_promotion_code() {
    let current_date = new Date();
    current_date.setHours(current_date.getHours() + 2); // set timezone offset to +2 (Central European Summer Time)

    let promotion_code;

    if (current_date >= new Date("2023-06-01T00:00:00.000+02:00")) {
        return "entwicklerheld-20";
    } else if (current_date >= new Date("2023-05-01T00:00:00.000+02:00")) {
        return "EH-Python-Challenge";
    } else {
        return "entwicklerheld-challenge";
    }
}

app.get('/', (request, response) => {
    let promotion_code = get_promotion_code();
    response.render('index', {
        promotion_code: promotion_code
    });
})


app.post('/', async (request, response) => {
    let promotion_code = get_promotion_code();

    const account_sid = request.body['accountSID']
    const auth_token = request.body['authToken']
    const from = request.body['fromPhoneNumber']
    const to = request.body['toPhoneNumber']
    const sms = request.body['sms']

    let reverseSMSService = new ReverseSMSService(account_sid, auth_token);
    let result = await reverseSMSService.sendReverseSms(from, to, sms);

    let status_code, msg;
    if (result === undefined || result === null) {
        status_code = 500
        msg = "Your sendReverseSms method returned undefined or null."
    }
    else {
        status_code = result[0]
        msg = result[1]
    }

    response.render('index', {
        promotion_code: promotion_code,
        status_code: status_code,
        msg: msg,
        auth_token: auth_token,
        success: status_code === 200
    });
})

app.post("/api/receive_sms", (request, response) => {
    let data = request.body;
    let responseString = ReverseSMSService.receiveSms(data);
    response = response.status(200)
    response.send(responseString);
})

export default app;