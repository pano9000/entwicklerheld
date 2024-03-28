from enum import Enum

class VigenereCipher(object):

	class __ProcessMode(Enum):
		Encode = 1
		Decode = -1

	def __init__(self, alphabet: str, password: str):
		self.alphabet = alphabet
		self.password = password
		self.__password_index_current = 0

	def __next_password_index_step(self):
		current_index_is_end_of_password = (self.__password_index_current + 1) >= len(self.password)
		self.__password_index_current = 0 if current_index_is_end_of_password else self.__password_index_current + 1


	def __process_message(self, message: str, mode: __ProcessMode) -> str:

		self.__password_index_current = 0
		processed_msg = ""

		for char in message:
			char_alph_index = self.alphabet.find(char)
			shift_by = self.alphabet.find(self.password[self.__password_index_current])
			processed_char = char if (char_alph_index == -1) else (self.__process_character(char_alph_index, shift_by, mode))
			processed_msg += processed_char
			self.__next_password_index_step()

		return processed_msg


	def __process_character(self, char_alph_index: int, shift_by: int, mode: __ProcessMode) -> str:

		straight_shift_result = char_alph_index + (shift_by * mode.value)

		if mode.value == 1:
			shift_result_is_in_bounds = straight_shift_result <= (len(self.alphabet) - 1)
			wrapped_shift_result = shift_by - ((len(self.alphabet)) - char_alph_index)
		else:
			shift_result_is_in_bounds = (straight_shift_result >= 0)
			wrapped_shift_result = len(self.alphabet) - (shift_by - char_alph_index)

		shift_result = (straight_shift_result) if (shift_result_is_in_bounds) else wrapped_shift_result
		return self.alphabet[shift_result]


	def encode(self, message: str) -> str:
		return self.__process_message(message, self.__ProcessMode.Encode)


	def decode(self, message: str) -> str:
		return self.__process_message(message, self.__ProcessMode.Decode)
