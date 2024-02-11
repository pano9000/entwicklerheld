#include "NumberConversionCpp.hpp"
#include <algorithm>
#include <cmath>
#include <iostream>
#include <string>

const short int ASCII_BASE_OFFSET = 55;
const short int BINARY_BASE = 2;
const short int HEX_BASE = 16;

std::string toBin(uint32_t decimalNumber)
{
	return toBase(decimalNumber, BINARY_BASE);
}

std::string toHex(uint32_t decimalNumber)
{
	return toBase(decimalNumber, HEX_BASE);
}

std::string toBase(uint32_t decimalNumber, uint32_t base)
{

	if (base < 2 || base > 32)
	{
		throw std::invalid_argument("Base must be between 2 and 32");
	}

	// Edge case of 0
	if (decimalNumber == 0)
	{
		return "0";
	}

	std::string convertedString = "";

	while (decimalNumber > 0)
	{
		uint32_t convValue = decimalNumber % base;

		// Set value for next iteration
		decimalNumber = decimalNumber / base;

		// digit to ASCII
		if (convValue <= 9) {
			// +'0' to get the ASCII representation of the digit
			convertedString += static_cast<char>(convValue + '0');
		} else {
			convertedString += static_cast<char>(convValue + ASCII_BASE_OFFSET);
		}
	}
	std::reverse(convertedString.begin(), convertedString.end());
	return convertedString;
}