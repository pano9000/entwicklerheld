from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse, Message
from whatsapp_bot.openai_client import EntwicklerHeldChatCompletion


class WhatsappBot:
    def __init__(self, account_sid: str, auth_token: str):
        self.account_sid = account_sid
        self.auth_token = auth_token
        self._client = None

    def get_twilio_client(self):
        if self._client is not None:
            return self._client
        self._client = Client(self.account_sid, self.auth_token)
        return self._client

    def receive_message(self, values):
        # implement this
        pass
