#include "NumberConversionCpp.hpp"
#include <iostream>
#include <cmath>
#include <string>

std::string toBin(uint32_t decimalNumber)
{
	// Edge case of 0
	if (decimalNumber == 0)
	{
		return "0";
	}

	uint32_t exponent = std::floor(log2(decimalNumber));
	std::string binaryString = "";

	for (int i = exponent; i >= 0; i--)
	{
		int pow_result = std::pow(2, i);

		if (pow_result > decimalNumber)
		{
			binaryString += "0";
		} 
		else 
		{
			decimalNumber -= pow_result;
			binaryString += "1";
		}
	}
	return binaryString;
}

std::string toHex(uint32_t decimalNumber)
{
	// Implement
	return "";
}

std::string toBase(uint32_t decimalNumber, uint32_t base)
{
	// Implement
	return "";
}