class VigenereCipher(object):

	def __init__(self, alphabet: str, password: str):
		self.alphabet = alphabet
		self.password = password
		self.__password_index_current = 0


	def __process(self, message: str, mode: int):
		self.__password_index_current = 0
		processed_msg = ""

		for char in message:
			char_alph_index = self.alphabet.find(char)
			shift_val = self.alphabet.find(self.password[self.__password_index_current])

			char_process_func = self.__get_alphabet_e if (mode == 0) else (self.__get_alphabet_d)
			processed_char = char if (char_alph_index == -1) else (char_process_func(char_alph_index, shift_val))

			processed_msg += processed_char
			print(processed_msg) 
			self.__next_password_index_step()

		return processed_msg


	def __next_password_index_step(self):
		current_index_is_end_of_password = (self.__password_index_current + 1) >= len(self.password)
		self.__password_index_current = 0 if current_index_is_end_of_password else self.__password_index_current + 1


	def __get_alphabet_e(self, char_alph_index: int, shift_by: int, direction: int = 1) -> str:

		shift_result = char_alph_index + (shift_by * direction)
		shift_result_is_in_bounds = (shift_result) <= (len(self.alphabet) - 1)
		wrapped_shift_val = shift_by - ((len(self.alphabet)) - char_alph_index)

		wrapped_index = (char_alph_index + shift_by) if (shift_result_is_in_bounds) else wrapped_shift_val
		return self.alphabet[wrapped_index]


	def __get_alphabet_d(self, char_alph_index, shift):

		shift_is_in_bounds = (char_alph_index - shift >= 0)
		wrapped_shift = len(self.alphabet) - (shift - char_alph_index)
		wrapped_index = (char_alph_index - shift) if (shift_is_in_bounds) else wrapped_shift
		return self.alphabet[wrapped_index]


	def encode(self, message: str):
		return self.__process(message, 0)


	def decode(self, message: str):
		return self.__process(message, 1)


ciph = VigenereCipher(alphabet="aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",password="iliketrains")
print("return: ", ciph.decode("Q tsox pcodqn dvtesxbjblbssg."))
