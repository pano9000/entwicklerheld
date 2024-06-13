from unittest import TestCase, main, mock
from unittest.mock import MagicMock
import os
from openai.openai_object import OpenAIObject
from twilio.rest.api.v2010.account import MessageList
from werkzeug.exceptions import HTTPException
from xmlrunner import xmlrunner
from whatsapp_bot import task
from whatsapp_bot.task import WhatsappBot
from whatsapp_bot.visualization import Visualization


class WhatsappBotTest(TestCase):
    visualization = Visualization()

    def setUp(self):
        print("##polylith[testStarted")
        self.maxDiff = None

    def tearDown(self):
        print("##polylith[testFinished")

    @classmethod
    def tearDownClass(cls) -> None:
        WhatsappBotTest.visualization.write()

    def test_receive_simple_message(self):
        values = {'AccountSid': '',
                  'ApiVersion': '2010-04-01',
                  'Body': 'Hi',
                  'From': 'whatsapp:+11234567890',
                  'MessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                  'NumMedia': '0',
                  'NumSegments': '1',
                  'ProfileName': 'EntwicklerHeld',
                  'ReferralNumMedia': '0',
                  'SmsMessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                  'SmsSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                  'SmsStatus': 'received',
                  'To': 'whatsapp:+12345678901',
                  'WaId': '4912345678901'}
        from whatsapp_bot.wsgi import app

        import whatsapp_bot.wsgi
        whatsapp_bot.wsgi.bot = WhatsappBot(os.getenv("ACCOUNT_SID", "ACfe3af2c38f2f4b4ed95211addccfcc9e"),
                                            os.getenv("AUTH_TOKEN", "e0ed804258945f427a8085455911c638"))
        with app.test_client() as client:
            with mock.patch.object(MessageList, 'create') as fake_create:
                with mock.patch.object(task.EntwicklerHeldChatCompletion, 'create',
                                       new=CopyingMock.create_with_return_value(response_1)) as fake_create_completion:
                    response = client.post("/api/receive_message", data=values)
                    fake_create_completion.assert_called_once_with(
                        model="gpt-3.5-turbo",
                        messages=[{'role': 'user', 'content': 'Hi'}]
                    )
                    self.assertEqual(response.status_code, 200, "Status code should be 200")
                    fake_create.assert_called_once_with(
                        from_='whatsapp:+12345678901',
                        body='Hello! How can I assist you today?',
                        to='whatsapp:+11234567890'
                    )

    def test_receive_multiple_message(self):
        values = {'AccountSid': '',
                  'ApiVersion': '2010-04-01',
                  'Body': 'Was ist EntwicklerHeld?',
                  'From': 'whatsapp:+11234567890',
                  'MessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                  'NumMedia': '0',
                  'NumSegments': '1',
                  'ProfileName': 'EntwicklerHeld',
                  'ReferralNumMedia': '0',
                  'SmsMessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                  'SmsSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                  'SmsStatus': 'received',
                  'To': 'whatsapp:+12345678901',
                  'WaId': '4912345678901'}
        from whatsapp_bot.wsgi import app


        with app.test_client() as client:
            import whatsapp_bot.wsgi
            whatsapp_bot.wsgi.bot = WhatsappBot(os.getenv("ACCOUNT_SID", "ACfe3af2c38f2f4b4ed95211addccfcc9e"),
                                                os.getenv("AUTH_TOKEN", "e0ed804258945f427a8085455911c638"))

            # FIRST MESSAGE: Was ist EntwicklerHeld? ------------------------------------------------------------------
            with mock.patch.object(MessageList, 'create') as fake_create:
                with mock.patch.object(task.EntwicklerHeldChatCompletion, 'create',
                                       new=CopyingMock.create_with_return_value(response_2_1)) as fake_create_completion:
                    response = client.post("/api/receive_message", data=values)
                    fake_create_completion.assert_called_once_with(
                        model="gpt-3.5-turbo",
                        messages=[{'role': 'user', 'content': 'Was ist EntwicklerHeld?'}]
                    )
                    self.assertEqual(response.status_code, 200, "Status code should be 200")
                    fake_create.assert_called_once_with(
                        from_='whatsapp:+12345678901',
                        body='EntwicklerHeld ist eine Plattform, die Entwicklern und IT-Fachleuten dabei hilft, '
                             'ihre Fähigkeiten zu verbessern, neue Technologien zu lernen und berufliche Chancen zu '
                             'entdecken. Es bietet eine Vielzahl von Ressourcen, wie Online-Kurse, Tutorials, '
                             'praktische Übungen und Projekte, um Entwicklern dabei zu helfen, sich in verschiedenen '
                             'Programmiersprachen, Frameworks und Technologien weiterzuentwickeln. Zudem bietet '
                             'EntwicklerHeld eine Jobbörse, auf der Unternehmen Stellenangebote für Entwickler '
                             'veröffentlichen können.',
                        to='whatsapp:+11234567890'
                    )

            # SECOND MESSAGE: Und kostet das was? ---------------------------------------------------------------------
            with mock.patch.object(MessageList, 'create') as fake_create:
                with mock.patch.object(task.EntwicklerHeldChatCompletion, 'create',
                                       new=CopyingMock.create_with_return_value(response_2_2)) as fake_create_completion:
                    values_2 = {'AccountSid': '',
                                'ApiVersion': '2010-04-01',
                                'Body': 'Und kostet das was?',
                                'From': 'whatsapp:+11234567890',
                                'MessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                'NumMedia': '0',
                                'NumSegments': '1',
                                'ProfileName': 'EntwicklerHeld',
                                'ReferralNumMedia': '0',
                                'SmsMessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                'SmsSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                'SmsStatus': 'received',
                                'To': 'whatsapp:+12345678901',
                                'WaId': '4912345678901'}

                    response = client.post("/api/receive_message", data=values_2)

                    fake_create_completion.assert_called_once_with(
                        model="gpt-3.5-turbo",
                        messages=[{'role': 'user', 'content': 'Was ist EntwicklerHeld?'},
                                  {'role': 'assistant',
                                   'content': 'EntwicklerHeld ist eine Plattform, die Entwicklern und IT-Fachleuten '
                                              'dabei hilft, ihre Fähigkeiten zu verbessern, neue Technologien zu '
                                              'lernen und berufliche Chancen zu entdecken. Es bietet eine Vielzahl '
                                              'von Ressourcen, wie Online-Kurse, Tutorials, praktische Übungen und '
                                              'Projekte, um Entwicklern dabei zu helfen, sich in verschiedenen '
                                              'Programmiersprachen, Frameworks und Technologien weiterzuentwickeln. '
                                              'Zudem bietet EntwicklerHeld eine Jobbörse, auf der Unternehmen '
                                              'Stellenangebote für Entwickler veröffentlichen können.'},
                                  {'role': 'user', 'content': 'Und kostet das was?'}]
                    )
                    self.assertEqual(response.status_code, 200, "Status code should be 200")
                    fake_create.assert_called_once_with(
                        from_='whatsapp:+12345678901',
                        body='Für Entwickler ist die Plattform komplett kostenfrei. Unternehmen können '
                             'kostenpflichtige Stellenanzeigen schalten.',
                        to='whatsapp:+11234567890'
                    )

            # THIRD MESSAGE: ❌ ---------------------------------------------------------------------------------------
            with mock.patch.object(MessageList, 'create') as fake_create:
                with mock.patch.object(task.EntwicklerHeldChatCompletion, 'create') as fake_create_completion:
                    values_3_delete = {'AccountSid': '',
                                       'ApiVersion': '2010-04-01',
                                       'Body': '❌',
                                       'From': 'whatsapp:+11234567890',
                                       'MessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                       'NumMedia': '0',
                                       'NumSegments': '1',
                                       'ProfileName': 'EntwicklerHeld',
                                       'ReferralNumMedia': '0',
                                       'SmsMessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                       'SmsSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                       'SmsStatus': 'received',
                                       'To': 'whatsapp:+12345678901',
                                       'WaId': '4912345678901'}
                    response = client.post("/api/receive_message", data=values_3_delete)
                    # OpenAI must not be called
                    fake_create_completion.assert_not_called()

                    self.assertEqual(response.status_code, 200, "Status code should be 200")
                    fake_create.assert_called_once_with(
                        from_='whatsapp:+12345678901',
                        body='Context cleared.',
                        to='whatsapp:+11234567890'
                    )

                # FIRST MESSAGE: Was ist EntwicklerHeld? --------------------------------------------------------------
                with mock.patch.object(MessageList, 'create') as fake_create:
                    with mock.patch.object(task.EntwicklerHeldChatCompletion, 'create',
                                           new=CopyingMock.create_with_return_value(response_2_1)) as fake_create_completion:
                        response = client.post("/api/receive_message", data=values)
                        fake_create_completion.assert_called_once_with(
                            model="gpt-3.5-turbo",
                            messages=[{'role': 'user', 'content': 'Was ist EntwicklerHeld?'}]
                        )
                        self.assertEqual(response.status_code, 200, "Status code should be 200")
                        fake_create.assert_called_once_with(
                            from_='whatsapp:+12345678901',
                            body='EntwicklerHeld ist eine Plattform, die Entwicklern und IT-Fachleuten dabei hilft, '
                                 'ihre Fähigkeiten zu verbessern, neue Technologien zu lernen und berufliche Chancen '
                                 'zu entdecken. Es bietet eine Vielzahl von Ressourcen, wie Online-Kurse, Tutorials, '
                                 'praktische Übungen und Projekte, um Entwicklern dabei zu helfen, '
                                 'sich in verschiedenen Programmiersprachen, Frameworks und Technologien '
                                 'weiterzuentwickeln. Zudem bietet EntwicklerHeld eine Jobbörse, auf der Unternehmen '
                                 'Stellenangebote für Entwickler veröffentlichen können.',
                            to='whatsapp:+11234567890'
                        )

    def test_multiple_tenants(self):
        values = {'AccountSid': '',
                  'ApiVersion': '2010-04-01',
                  'Body': 'Was ist EntwicklerHeld?',
                  'From': 'whatsapp:+11234567890',
                  'MessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                  'NumMedia': '0',
                  'NumSegments': '1',
                  'ProfileName': 'EntwicklerHeld',
                  'ReferralNumMedia': '0',
                  'SmsMessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                  'SmsSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                  'SmsStatus': 'received',
                  'To': 'whatsapp:+12345678901',
                  'WaId': '4912345678901'}
        from whatsapp_bot.wsgi import app


        with app.test_client() as client:
            import whatsapp_bot.wsgi
            whatsapp_bot.wsgi.bot = WhatsappBot(os.getenv("ACCOUNT_SID", "ACfe3af2c38f2f4b4ed95211addccfcc9e"),
                                                os.getenv("AUTH_TOKEN", "e0ed804258945f427a8085455911c638"))

            # FIRST MESSAGE OF FIRST USER: Was ist EntwicklerHeld? ----------------------------------------------------
            with mock.patch.object(MessageList, 'create') as fake_create:
                with mock.patch.object(task.EntwicklerHeldChatCompletion, 'create',
                                       new=CopyingMock.create_with_return_value(response_2_1)) as fake_create_completion:
                    response = client.post("/api/receive_message", data=values)
                    fake_create_completion.assert_called_once_with(
                        model="gpt-3.5-turbo",
                        messages=[{'role': 'user', 'content': 'Was ist EntwicklerHeld?'}]
                    )
                    self.assertEqual(response.status_code, 200, "Status code should be 200")
                    fake_create.assert_called_once_with(
                        from_='whatsapp:+12345678901',
                        body='EntwicklerHeld ist eine Plattform, die Entwicklern und IT-Fachleuten dabei hilft, '
                             'ihre Fähigkeiten zu verbessern, neue Technologien zu lernen und berufliche Chancen zu '
                             'entdecken. Es bietet eine Vielzahl von Ressourcen, wie Online-Kurse, Tutorials, '
                             'praktische Übungen und Projekte, um Entwicklern dabei zu helfen, sich in verschiedenen '
                             'Programmiersprachen, Frameworks und Technologien weiterzuentwickeln. Zudem bietet '
                             'EntwicklerHeld eine Jobbörse, auf der Unternehmen Stellenangebote für Entwickler '
                             'veröffentlichen können.',
                        to='whatsapp:+11234567890'
                    )

            # FIRST MESSAGE OF SECOND USER: Hola  ---------------------------------------------------------------------
            with mock.patch.object(MessageList, 'create') as fake_create:
                with mock.patch.object(task.EntwicklerHeldChatCompletion, 'create',
                                       new=CopyingMock.create_with_return_value(response_3_1)) as fake_create_completion:
                    values_2 = {'AccountSid': '',
                                'ApiVersion': '2010-04-01',
                                'Body': '¡Hola!',
                                'From': 'whatsapp:+11234567892',
                                'MessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                'NumMedia': '0',
                                'NumSegments': '1',
                                'ProfileName': 'EntwicklerHeld_2',
                                'ReferralNumMedia': '0',
                                'SmsMessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                'SmsSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                'SmsStatus': 'received',
                                'To': 'whatsapp:+12345678901',
                                'WaId': '4912345678901'}

                    response = client.post("/api/receive_message", data=values_2)

                    fake_create_completion.assert_called_once_with(
                        model="gpt-3.5-turbo",
                        messages=[{'role': 'user', 'content': '¡Hola!'}]
                    )
                    self.assertEqual(response.status_code, 200, "Status code should be 200")
                    fake_create.assert_called_once_with(
                        from_='whatsapp:+12345678901',
                        body='¡Hola! ¿En qué puedo ayudarte hoy?',
                        to='whatsapp:+11234567892'
                    )

            # THIRD MESSAGE: ❌ ---------------------------------------------------------------------------------------
            with mock.patch.object(MessageList, 'create') as fake_create:
                with mock.patch.object(task.EntwicklerHeldChatCompletion, 'create') as fake_create_completion:
                    values_3_delete = {'AccountSid': '',
                                       'ApiVersion': '2010-04-01',
                                       'Body': '❌',
                                       'From': 'whatsapp:+11234567890',
                                       'MessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                       'NumMedia': '0',
                                       'NumSegments': '1',
                                       'ProfileName': 'EntwicklerHeld',
                                       'ReferralNumMedia': '0',
                                       'SmsMessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                       'SmsSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                       'SmsStatus': 'received',
                                       'To': 'whatsapp:+12345678901',
                                       'WaId': '4912345678901'}
                    response = client.post("/api/receive_message", data=values_3_delete)
                    # OpenAI must not be called
                    fake_create_completion.assert_not_called()

                    self.assertEqual(response.status_code, 200, "Status code should be 200")
                    fake_create.assert_called_once_with(
                        from_='whatsapp:+12345678901',
                        body='Context cleared.',
                        to='whatsapp:+11234567890'
                    )

                # FIRST MESSAGE: Was ist EntwicklerHeld? --------------------------------------------------------------
                with mock.patch.object(MessageList, 'create') as fake_create:
                    with mock.patch.object(task.EntwicklerHeldChatCompletion, 'create',
                                           new=CopyingMock.create_with_return_value(response_2_1)) as fake_create_completion:
                        response = client.post("/api/receive_message", data=values)
                        fake_create_completion.assert_called_once_with(
                            model="gpt-3.5-turbo",
                            messages=[{'role': 'user', 'content': 'Was ist EntwicklerHeld?'}]
                        )
                        self.assertEqual(response.status_code, 200, "Status code should be 200")
                        fake_create.assert_called_once_with(
                            from_='whatsapp:+12345678901',
                            body='EntwicklerHeld ist eine Plattform, die Entwicklern und IT-Fachleuten dabei hilft, '
                                 'ihre Fähigkeiten zu verbessern, neue Technologien zu lernen und berufliche Chancen '
                                 'zu entdecken. Es bietet eine Vielzahl von Ressourcen, wie Online-Kurse, Tutorials, '
                                 'praktische Übungen und Projekte, um Entwicklern dabei zu helfen, '
                                 'sich in verschiedenen Programmiersprachen, Frameworks und Technologien '
                                 'weiterzuentwickeln. Zudem bietet EntwicklerHeld eine Jobbörse, auf der Unternehmen '
                                 'Stellenangebote für Entwickler veröffentlichen können.',
                            to='whatsapp:+11234567890'
                        )

                with mock.patch.object(MessageList, 'create') as fake_create:
                    with mock.patch.object(task.EntwicklerHeldChatCompletion, 'create',
                                           new=CopyingMock.create_with_return_value(response_3_1)) as fake_create_completion:
                        values_2 = {'AccountSid': '',
                                    'ApiVersion': '2010-04-01',
                                    'Body': '¡Hola!',
                                    'From': 'whatsapp:+11234567892',
                                    'MessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                    'NumMedia': '0',
                                    'NumSegments': '1',
                                    'ProfileName': 'EntwicklerHeld_2',
                                    'ReferralNumMedia': '0',
                                    'SmsMessageSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                    'SmsSid': 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                                    'SmsStatus': 'received',
                                    'To': 'whatsapp:+12345678901',
                                    'WaId': '4912345678901'}

                        response = client.post("/api/receive_message", data=values_2)

                        fake_create_completion.assert_called_once_with(
                            model="gpt-3.5-turbo",
                            messages=[{'role': 'user', 'content': '¡Hola!'},
                                      {'role': 'assistant', 'content': '¡Hola! ¿En qué puedo ayudarte hoy?'},
                                      {'role': 'user', 'content': '¡Hola!'}]
                        )
                        self.assertEqual(response.status_code, 200, "Status code should be 200")
                        fake_create.assert_called_once_with(
                            from_='whatsapp:+12345678901',
                            body='¡Hola! ¿En qué puedo ayudarte hoy?',
                            to='whatsapp:+11234567892'
                        )

    @classmethod
    def setUpClass(cls) -> None:
        from whatsapp_bot.wsgi import app, handle_exception
        app.register_error_handler(HTTPException, handle_exception)


def create_openai_object(payload: dict):
    result = MagicMock()
    message = MagicMock()
    choice = MagicMock()
    choice.__str__ = MagicMock(return_value=str(payload["choices"]))
    choice.__getitem__ = MagicMock(side_effect=lambda key: payload["choices"][key])
    message.__str__ = MagicMock(return_value=str(payload["choices"][0]["message"]))
    message.__getitem__ = MagicMock(side_effect=lambda key: payload["choices"][0]["message"][key])
    message.role = payload["choices"][0]["message"]["role"]
    message.content = payload["choices"][0]["message"]["content"]
    choice.message = message
    result.choices = [choice]
    result.__str__ = MagicMock(return_value=str(payload))
    result.__getitem__ = MagicMock(side_effect=lambda key: payload[key])
    return result


response_1 = create_openai_object({
    "id": "chatcmpl-7bUIwDFHgxbaRKdTptG0dO6w2ptLS",
    "object": "chat.completion",
    "created": 1689168982,
    "model": "gpt-3.5-turbo-0613",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "Hello! How can I assist you today?"
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 8,
        "completion_tokens": 9,
        "total_tokens": 17
    }
})

response_2_1 = create_openai_object({
    "id": "chatcmpl-7bUIwDFHgxbaRKdTptG0dO6w2ptLS",
    "object": "chat.completion",
    "created": 1689168982,
    "model": "gpt-3.5-turbo-0613",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "EntwicklerHeld ist eine Plattform, die Entwicklern und IT-Fachleuten dabei hilft, "
                           "ihre Fähigkeiten zu verbessern, neue Technologien zu lernen und berufliche Chancen zu "
                           "entdecken. Es bietet eine Vielzahl von Ressourcen, wie Online-Kurse, Tutorials, "
                           "praktische Übungen und Projekte, um Entwicklern dabei zu helfen, sich in verschiedenen "
                           "Programmiersprachen, Frameworks und Technologien weiterzuentwickeln. Zudem bietet "
                           "EntwicklerHeld eine Jobbörse, auf der Unternehmen Stellenangebote für Entwickler "
                           "veröffentlichen können."
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 8,
        "completion_tokens": 9,
        "total_tokens": 17
    }
})
response_2_2 = create_openai_object({
    "id": "chatcmpl-7bUIwDFHgxbaRKdTptG0dO6w2ptLS",
    "object": "chat.completion",
    "created": 1689168982,
    "model": "gpt-3.5-turbo-0613",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": 'Für Entwickler ist die Plattform komplett kostenfrei. Unternehmen können kostenpflichtige '
                           'Stellenanzeigen schalten.'
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 8,
        "completion_tokens": 9,
        "total_tokens": 17
    }
})

response_3_1 = create_openai_object({
    "id": "chatcmpl-7bUIwDFHgxbaRKdTptG0dO6w2ptLS",
    "object": "chat.completion",
    "created": 1689168982,
    "model": "gpt-3.5-turbo-0613",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "¡Hola! ¿En qué puedo ayudarte hoy?"
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 8,
        "completion_tokens": 9,
        "total_tokens": 17
    }
})

response_3_2 = create_openai_object({
    "id": "chatcmpl-7bUIwDFHgxbaRKdTptG0dO6w2ptLS",
    "object": "chat.completion",
    "created": 1689168982,
    "model": "gpt-3.5-turbo-0613",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "EntwicklerHeld es una plataforma online diseñada para personas interesadas en el "
                           "desarrollo de software y tecnología. Ofrecemos cursos, tutoriales y recursos para "
                           "aprender y mejorar en distintas áreas de programación, como desarrollo web, móvil, "
                           "inteligencia artificial, big data, entre otros. Nuestro objetivo es brindar una "
                           "experiencia de aprendizaje accesible y de calidad a través de contenido actualizado y "
                           "práctico. También contamos con una comunidad activa donde los usuarios pueden "
                           "interactuar, compartir conocimientos y resolver dudas. "
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 8,
        "completion_tokens": 9,
        "total_tokens": 17
    }
})


class CopyingMock(MagicMock):
    def __call__(self, *args, **kwargs):
        from copy import deepcopy
        args = deepcopy(args)
        kwargs = deepcopy(kwargs)
        return super(CopyingMock, self).__call__(*args, **kwargs)

    @staticmethod
    def create_with_return_value(return_value):
        mock = CopyingMock()
        mock.return_value = return_value
        return mock


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )

