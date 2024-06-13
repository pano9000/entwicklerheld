from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse, Message
from whatsapp_bot.openai_client import EntwicklerHeldChatCompletion
from typing import Tuple


class WhatsappBot:
    def __init__(self, account_sid: str, auth_token: str):
        self.account_sid = account_sid
        self.auth_token = auth_token
        self._client = None
        self.user_contexts = {};

    def get_twilio_client(self):
        if self._client is not None:
            return self._client
        self._client = Client(self.account_sid, self.auth_token)
        return self._client

    def receive_message(self, values):
        # current_bot_no below should not be something user controlled, 
        # but instead come from within the class for security reasons
        current_user_no = values.get("From")
        current_bot_no = values.get("To") #aka this whatsapp bot's number
        current_msg_body = values.get("Body")

        # in production here you would also do some additional validation,
        # if the values are valid whatsapp numbers etc.
        if any(v is None for v in [current_user_no, current_bot_no, current_msg_body]):
            raise Exception("Empty 'From', 'To' or 'Body' value found, aborting.")


        if current_msg_body == "❌":
            self.clear_user_context(current_user_no, current_bot_no)
            self.send_message(current_user_no, current_bot_no, "Context cleared.")
            return

        self.create_context_entry("user", current_msg_body, current_user_no)

        bot_msg = self.get_bot_response_msg(current_user_no)

        if bot_msg[0] is True:
            self.create_context_entry("assistant", bot_msg[1], current_user_no)
        
        self.send_message(current_user_no, current_bot_no, bot_msg[1])


    def create_context_entry(self, role: str, content: str, user_no: str) -> None:
        current_user_context = self.user_contexts.get(user_no)

        if current_user_context is None:
            current_user_context = [];

        current_user_context.append({
            "role": role,
            "content": content
        })
        self.user_contexts[user_no] = current_user_context


    def clear_user_context(self, user_no: str, bot_no: str) -> None: 
        self.user_contexts.pop(user_no, None)


    def send_message(self, user_no: str, bot_no: str, msg_body: str) -> None:
        self.get_twilio_client().messages.create(
            from_=bot_no,
            body=msg_body,
            to=user_no
        )

    def get_bot_response_msg(self, user_no: str) -> Tuple[bool, str]:
        try:
            bot_response = EntwicklerHeldChatCompletion.create(model="gpt-3.5-turbo", messages=self.user_contexts.get(user_no))
            bot_msg = bot_response["choices"][0]["message"]["content"]
            return (True, bot_msg)
        except Exception as e:
            # do some extra error handling/logging here
            print(e)
            return (False, "Something went wrong, please try again later")
