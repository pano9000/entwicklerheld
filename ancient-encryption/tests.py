import unittest
import xmlrunner
import random

from ancientencryption.task import VigenereCipher

tests = ([
        [
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ",
            "a",
            "Entwicklerhelden are having fun while coding.",
            "Entwicklerhelden are having fun while coding."
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ",
            "b",
            "Entwicklerhelden are having fun while coding.",
            "Fouxjdlmfsifmefo bsf ibwjoh gvo xijmf dpejoh."
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ",
            "ab",
            "Entwicklerhelden are having fun while coding.",
            "Eotxidkmeshfleeo brf iawiog fvn wiime cpdjnh."
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ",
            "cB",
            "Entwicklerhelden are having fun while coding.",
            "GOvYkDmMgSjFnEgO BtF IcXkOi hVp yIkMg ePfJpH."
        ],[
            "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
            "iliketrains",
            "I like public transportation.",
            "Q tsox pcodqn dvtesxbjblbssg."
        ],[
            "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ ",
            "iliketrains",
            "I like public transportation.",
            "QKtsoxQpBoCqnHCvtDsxAIAlAssF."
        ],[
            "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ ",
            "iliketrains",
            "!!!!????",
            "!!!!????"
        ],[
            "abcdefghijklmnopqrstuvwxyz",
            "password",
            "ALL CAPS WILL NOT BE TRANSFORMED, YOU KNOW.",
            "ALL CAPS WILL NOT BE TRANSFORMED, YOU KNOW."
        ],[ # Hard Test
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ",
            "azcxevgtirkpmnokqjshufwdyb",
            "Entwicklerhelden are having fun while coding.",
            "EMvTmxqEmIrtxqsx jJl mwyGog hRr CAqCo oBrsDp."
        ],[
            "abcdefghijklmnopqrstuvwxyz;ABCDEFGHIJKLMNOPQRSTUVXYZ,._?! ",
            "Be yourself; everyone else is already taken.",
            "This is a hard test, is it?",
            "qlhPnBIrekm;qhuxvPGhdhwk;x_"
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ,._?! ",
            "I hope you are enjoying this task!",
            "No one can make you feel inferior without your consent.",  # Eleanor Roosevelt
            "qngCCi!AoH!mroddLxIxnrkkspvxdKiGB? hAvDysxMItrqgnrFnBRd"
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ,._?! ",
            "A room without books is like a body without a soul.",  # Marcus Tullius Cicero
            "If you have an idea for a challenge, feel free to contact the admins ;)",
            "deqMCG!DiOlnuG!jrskrewJ!lhml lkfBjCZvnxlztyqedrHIk?OmKoqF!PpxgoxFhoGn;)"
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ,._?! ",
            "Be the change that you wish to see in the world.",  # Mahatma Ghandi
            "For this one, I rolled my head about the keyboard, I swear!",
            "bsqsAlhugoAk!!_grHkJsx!IGrodtr!sfstBmsAldjAMszdmE!!_gwvghrl"
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ,._?! ",
            "So many books, so little time.",  # Frank Zappa
            "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",  # Albert Einstein
            "GKnltuGmhGnkJ!!ABetvBMp:!MpqdpawuqrFC!bBrjzolsB!DBNIthhMG;d.ar!U'zxmpHnCMldroazCMsEldsCzmqXFrq."
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ,._?! 1234567890",
            "Cg8SDjQTS0G2DFE197cMGUQ5XY43XLA6", # password
            "Do not go where the path may lead, go instead where there is no path and leave a trail.", # Pharse
            "1u_1RCF,2!?9HXIUrdgBVU5bL54qLXE6F1_ZR9Z26sK2Gu.8cngB,_Ul.MbkLZO,Rgq,sj!XHkK2ZJt1?ptMO1B"  # Solution 
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,._?! []@#'|<>$%&/()=-+*~1234567890",
            "bL3]0NYGHUSZ%92a!.#[@Lnf468B|1MZ", # password
            "Whoever is happy will make others happy too.", # Pharse
            "XSg|uR%cP<o[%ngyA*//)hzfd0_P68Q&th0]o_+c,@[r"  # Solution 
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ,._?! []@#'|<>$%&/()=-+*~{}1234567890",
            "E?34KsPky2C!5aB~_K#u8{]MA0(1S9XH", # password
            "Spread love everywhere you go. Let no one ever come to you without leaving happier.", # Pharse
            "*(j8KvjvMmGx9vFe}]&yo3A|OtL7]Zq)I+XgZ*!xCVG{9r6}&X>{qcA|OtLm.r!VZ+XeOs|sL87|5pQ6[_y"  # Solution 
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,._?! 1234567890",
            "YPZ7GA2zLELFi8N45BMF06OW39kfHXN1", # password
            "The future belongs to those who believe in the beauty of their dreams.", # Pharse
            "BW?.LUkT_IAGmi.gaTBYn,2?gqo5?!.VZT5eKV6oTRAYpbC59B1Yx,_.XrrjP9C40TZiYl"  # Solution 
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,._?! 1234567890",
            "j30MBd51PO8DGZ4VDRXRWNF96b2BN7Qc", # password
            "You will face many defeats in life, but never let yourself be defeated.", # Pharse
            "2gtBXlfbET8FKOfVQ0MU,SJ9otWJ,..ko7ZBCxnV_SsHXOeZWGf a!XcggWCR.Tgo70 FgV"  # Solution 
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,._?! 1234567890",
            "rDWRT80g76ZDHMT1NJs3Ai9QnCP4E5X2", # password
            "Life is either a daring adventure or nothing at all.", # Pharse
            "_L.VIfr6adcKL?I1CMsjIveFnF58Rnbivs53Iknzdd7JwM7VNUDT"  # Solution 
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,._?! 1234567890",
            "W63vp8RO7y0YYVJzfh2nEI4K195tOTML", # password
            "Only a life lived for others is a life worthwhile.", # Pharse
            "uidTe8GZeDdN4?!Di77BVxh?8clLD.!AW,dDubG5kPs e_RKj3"  # Solution 
        ],[
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ,._?! 1234567890",
            "EmRZ30JIJ5r1XLCOT4D2OdH7VNk968oR", # password
            "Life is a long lesson in humility.", # Pharse
            "auX?Xh_xJZCe5Rr,YlVf_3PjKUEkdiw6?8"  # Solution 
        ]
    ])


class Test(unittest.TestCase):

    def test_constructor(self):
        alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ"
        password = "a"
        actual = VigenereCipher(alphabet, password)
        self.assertTrue(hasattr(actual, "alphabet"), "VigenereCipher should contain an alphabet variable to store the alphabet.")
        self.assertTrue(hasattr(actual, "password"), "VigenereCipher should store the password as internal variable called password.")
        
    def test_encode(self):
        # Example Tests
        actual = VigenereCipher("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ", "ab")
        result = actual.encode("Entwicklerhelden are having fun while coding.")
        self.assertEqual(result, "Eotxidkmeshfleeo brf iawiog fvn wiime cpdjnh.",\
            "\nYou tried to encode '{}'\n  by using alphabet '{}'\n  and password '{}'\nExpected:\n  '{}'\nBut was:\n  {}".format(
                    	                                                                                         tests[2][2],
                                                                                                                 tests[2][0],
                                                                                                                 tests[2][1],
                                                                                                                 tests[2][3],
                                                                                                                 result))
        for test in tests:
            actual = VigenereCipher(test[0], test[1])
            result = actual.encode(test[2])
            self.assertEqual(result, test[3],\
                "\nYou tried to encode '{}'\n  by using alphabet '{}'\n  and password '{}'\nExpected:\n  '{}'\nBut was:\n  {}".format(
                                                                                                                    test[2],
                                                                                                                    test[0],
                                                                                                                    test[1],
                                                                                                                    test[3],
                                                                                                                    result))
        
    def test_decode(self):
        # Example Tests
        actual = VigenereCipher("aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ", "iliketrains")
        result = actual.decode("Q tsox pcodqn dvtesxbjblbssg.")
        self.assertEqual(result, "I like public transportation.",\
            "\nYou tried to decode '{}'\n  by using alphabet '{}'\n  and password '{}'\nExpected:\n  '{}'\nBut was:\n  {}".format(
                    	                                                                                         tests[4][3],
                                                                                                                 tests[4][0],
                                                                                                                 tests[4][1],
                                                                                                                 tests[4][2],
                                                                                                                 result))
        for test in tests:
            actual = VigenereCipher(test[0], test[1])
            result = actual.decode(test[3])
            self.assertEqual(result, test[2],\
                "\nYou tried to decode '{}'\n  by using alphabet '{}'\n  and password '{}'\nExpected:\n  '{}'\nBut was:\n  {}".format(
                                                                                                                    test[3],
                                                                                                                    test[0],
                                                                                                                    test[1],
                                                                                                                    test[2],
                                                                                                                    result))

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

if __name__ == '__main__':
    with open('results.xml', 'wb') as output:
        unittest.main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False, buffer=False, catchbreak=False)