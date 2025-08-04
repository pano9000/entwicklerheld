from unittest import TestCase, main
import xmlrunner
from crypto_square_python.task import cipher_text
from crypto_square_python.visualization import Visualization


class CryptoSquarePythonTest(TestCase):
    visualization = Visualization()

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_1(self):
        value = ""
        expected = ""
        actual = cipher_text(value)
        message = f"An empty plaintext results in an empty ciphertext, but was: '{actual}'"
        self.assertEqual(actual, expected, message)

    def test_2(self):
        value = "... --- ..."
        expected = ""
        actual = cipher_text(value)
        message = f"Normalization results in empty plaintext\nGiven: '{value}'\nExpected: '{expected}'\nActual: '{actual}'"
        self.assertEqual(actual, expected, message)

    def test_3(self):
        value = "A"
        expected = "a"
        actual = cipher_text(value)
        message = f"Lowercase\nGiven: '{value}'\nExpected: '{expected}'\nActual: '{actual}'"
        self.assertEqual(actual, expected, message)

    def test_4(self):
        value = " b "
        expected = "b"
        actual = cipher_text(value)
        message = f"Remove spaces\nGiven: '{value}'\nExpected: '{expected}'\nActual: '{actual}'"
        self.assertEqual(actual, expected, message)

    def test_5(self):
        value = "@1,%!"
        expected = "1"
        actual = cipher_text(value)
        message = f"Remove punctuation\nGiven: '{value}'\nExpected: '{expected}'\nActual: '{actual}'"
        self.assertEqual(actual, expected, message)

    def test_6(self):
        value = "This is fun!"
        expected = "tsf hiu isn"
        actual = cipher_text(value)
        message = f"9 character plaintext results in 3 chunks of 3 characters\nGiven: '{value}'\nExpected: '{expected}'\nActual: '{actual}'"
        self.assertEqual(actual, expected, message)

    def test_7(self):
        value = "Chill out."
        expected = "clu hlt io "
        actual = cipher_text(value)
        message = f"8 character plaintext results in 3 chunks, the last one with a trailing space\nGiven: '{value}'\nExpected: '{expected}'\nActual: '{actual}'"
        self.assertEqual(actual, expected, message)

    def test_8(self):
        for data in test_8_data:
            value = data['value']
            expected = data['expected']
            actual = cipher_text(value)
            message = f"Given: '{value}'\nExpected: '{expected}'\nActual: '{actual}'"
            self.assertEqual(actual, expected, message)


test_8_data = [
    {
        'value': 'If man was meant to stay on the ground, god would have given us roots.',
        'expected': 'imtgdvs fearwer mayoogo anouuio ntnnlvt wttddes aohghn  sseoau '
    },
    {
        'value': 'Have a nice day!',
        'expected': 'hae and via ecy'
    },
    {
        'value': 'Feed the cat.',
        'expected': 'fta eht ee  dc '
    },
    {
        'value': 'The quick brown fox jumps over the lazy dog.',
        'expected': 'tcnmrz hkfpty eboshd qrxoeo uojvlg iwuea '
    },
    {
        'value': 'Pack my box with five dozen liquor jugs.',
        'expected': 'pbhoqg aofzus cxieo  kwvnr  mielj  ytdiu '
    },
    {
        'value': 'Six big devils from Japan quickly forgot how to waltz.',
        'expected': 'seoqfot ivmuowz xijirt  blacgo  ispkow  gfalta  drnyhl '
    },
    {
        'value': 'We all live in a yellow submarine.',
        'expected': 'wiysi eveun aelbe lilm  lnoa  lawr '
    }
]


if __name__ == '__main__':
    with open('results.xml', 'wb') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )