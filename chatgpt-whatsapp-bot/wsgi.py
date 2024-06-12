import datetime
import json
import os
from flask import Flask, render_template, request

from whatsapp_bot.task import WhatsappBot

app = Flask(__name__)

try:
    with open(os.path.expanduser("~/twilio_credentials.json"), "r") as file:
        twilio_credentials = json.loads(file.read())
        sid = twilio_credentials["account_sid"]
        token = twilio_credentials["auth_token"]

except FileNotFoundError:
    sid = ""
    token = ""

bot = WhatsappBot(account_sid=sid, auth_token=token)

@app.get("/")
def index():
    current_date = datetime.datetime.now(tz=datetime.timezone(datetime.timedelta(hours=2)))
    if current_date >= datetime.datetime(year=2023, month=9, day=1, tzinfo=datetime.timezone(datetime.timedelta(hours=2))):
        promotion_code = "eh-challenge-20"
    elif current_date >= datetime.datetime(year=2023, month=8, day=1, tzinfo=datetime.timezone(datetime.timedelta(hours=2))):
        promotion_code = "EH-SMS-WHATSAPP-20"
    elif current_date >= datetime.datetime(year=2023, month=7, day=1, tzinfo=datetime.timezone(datetime.timedelta(hours=2))):
        promotion_code = "ENTWICKLERHELD-SMS-20"
    elif current_date >= datetime.datetime(year=2023, month=6, day=1, tzinfo=datetime.timezone(datetime.timedelta(hours=2))):
        promotion_code = "entwicklerheld-20"
    elif current_date >= datetime.datetime(year=2023, month=5, day=1, tzinfo=datetime.timezone(datetime.timedelta(hours=2))):
        promotion_code = "EH-Python-Challenge"
    else:
        promotion_code = "entwicklerheld-challenge"

    return render_template("index.html", promotion_code=promotion_code)

@app.post("/")
def save_credentials():
    account_sid = request.form['accountSID']
    auth_token = request.form['authToken']
    with open(os.path.expanduser("~/twilio_credentials.json"), "w") as file:
        # We write the credentials to the file system to allow the bot to be restarted without having to re-enter the credentials
        # This file system is not persisted when your workspace is deleted
        file.write(json.dumps({"account_sid": account_sid, "auth_token": auth_token}))
    global bot
    bot = WhatsappBot(account_sid, auth_token)
    current_date = datetime.datetime.now(tz=datetime.timezone(datetime.timedelta(hours=2)))
    if current_date >= datetime.datetime(year=2023, month=8, day=1, tzinfo=datetime.timezone(datetime.timedelta(hours=2))):
        promotion_code = "EH-SMS-WHATSAPP-20"
    elif current_date >= datetime.datetime(year=2023, month=7, day=1, tzinfo=datetime.timezone(datetime.timedelta(hours=2))):
        promotion_code = "ENTWICKLERHELD-SMS-20"
    elif current_date >= datetime.datetime(year=2023, month=6, day=1, tzinfo=datetime.timezone(datetime.timedelta(hours=2))):
        promotion_code = "entwicklerheld-20"
    elif current_date >= datetime.datetime(year=2023, month=5, day=1, tzinfo=datetime.timezone(datetime.timedelta(hours=2))):
        promotion_code = "EH-Python-Challenge"
    else:
        promotion_code = "entwicklerheld-challenge"
    return render_template("index.html", status_code=200, auth_token=auth_token,  promotion_code=promotion_code)


@app.post("/api/receive_message")
def receive_message():
    values = request.values
    response = bot.receive_message(values)
    return str(response)


if __name__ == "__main__":
    try:
        with open(os.path.expanduser("~/twilio_credentials.json"), "r") as file:
            twilio_credentials = json.loads(file.read())
            sid = twilio_credentials["account_sid"]
            token = twilio_credentials["auth_token"]
    except FileNotFoundError:
        print("~/twilio_credentials.json not found.")

    app.run(host="0.0.0.0", port=8037, debug=True)


def handle_exception(e):
    e.show_exception = True
    print(e)
    raise Exception(e.description)
