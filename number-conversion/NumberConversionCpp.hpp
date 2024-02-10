#ifndef NUMBER_CONVERSION_CPP_H
#define NUMBER_CONVERSION_CPP_H

#include <iostream>
#include <string>

#define printf(fmt, ...) cout << "printf() is not supported by this Framework. Please use cout."

std::string toBin(uint32_t decimalNumber);

std::string toHex(uint32_t decimalNumber);

std::string toBase(uint32_t decimalNumber, uint32_t base);

#endif