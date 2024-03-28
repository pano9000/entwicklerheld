class VigenereCipher(object):

	def __init__(self, alphabet: str, password: str):
		self.alphabet = alphabet
		self.password = password
		self.__password_current_index = 0
		pass

	def encode(self, message: str):
		self.__password_current_index = 0
		print("_|_", self.alphabet, "_|_", self.password, "_|_", message)
		encoded_msg = ""
		for i in range(0, len(message)):
			curr_char = message[i]
			shift_val = self.alphabet.find(self.password[self.__password_current_index])
			alphab_index = self.alphabet.find(curr_char)
			encoded_char = message[i] if alphab_index == -1 else self.__get_alphabet_s(alphab_index, shift_val)
			encoded_msg += encoded_char
			print(curr_char, shift_val, alphab_index, encoded_char)
	
			self.__password_step()

		return encoded_msg
		
	def decode(self, message: str):
		pass

	def __password_step(self):
		if (self.__password_current_index + 1 >= len(self.password)):
			self.__password_current_index = 0
		else:
			self.__password_current_index += 1
	
	def __get_alphabet_s(self, alphab_index, shift):

		shift_is_in_bounds = (alphab_index + shift) <= (len(self.alphabet) - 1)
		wrapped_shift = shift - ((len(self.alphabet)) - alphab_index)

		wrapped_i = (alphab_index + shift) if (shift_is_in_bounds) else wrapped_shift
		return self.alphabet[wrapped_i]


"""
loop through password -> until every char of message is done

	get A) index of current password char inside the alphabet
	get B) index of current message char inside alphabet
	shift index B) by the value of A), and get character at that pos
	-> encoded char found
	-> index number determines how many steps the char from the message is shifted from its original position

"""

ciph = VigenereCipher(alphabet="aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",password="iliketrains")
print("return: ", ciph.encode("I like public transportation."))
