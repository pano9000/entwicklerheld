#include <gtest/gtest.h>
#include "NumberConversionCpp.hpp"

TEST(TestOne, FirstScenario)
{
        std::string expected, result;

        expected = "100";
        ASSERT_NO_THROW(result = toBin(4)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=4.";

        expected = "1111";
        ASSERT_NO_THROW(result = toBin(15)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=15.";

        expected = "0";
        ASSERT_NO_THROW(result = toBin(0)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=0.";

        expected = "1000010011";
        ASSERT_NO_THROW(result = toBin(531)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=531.";

        expected = "10001100010010110001010";
        ASSERT_NO_THROW(result = toBin(4597130)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string.";
}

TEST(TestOne, SecondScenario)
{
        std::string expected, result;

        expected = "10";
        ASSERT_NO_THROW(result = toHex(16)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=16.";

        expected = "ABCD";
        ASSERT_NO_THROW(result = toHex(43981)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=43981.";

        expected = "0";
        ASSERT_NO_THROW(result = toHex(0)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=0.";

        expected = "DEADBEEF";
        ASSERT_NO_THROW(result = toHex(3735928559)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=3735928559.";

        expected = "EF98";
        ASSERT_NO_THROW(result = toHex(61336)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string.";
}

TEST(TestOne, ThirdScenario)
{
        std::string expected, result;

        expected = "G";
        ASSERT_NO_THROW(result = toBase(16, 17)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=16 and base=17.";

        expected = "200112";
        ASSERT_NO_THROW(result = toBase(500, 3)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=500 and base=3.";

        expected = "77AK";
        ASSERT_NO_THROW(result = toBase(89122, 23)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=89122 and base=23.";

        expected = "0";
        ASSERT_NO_THROW(result = toBase(0, 23)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=0 and base=23.";

        expected = "U";
        ASSERT_NO_THROW(result = toBase(30, 31)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string for input decimalNumber=30 and base=31.";

        expected = "7MD6";
        ASSERT_NO_THROW(result = toBase(123456, 25)) << "The function threw an unexpected exception.";
        ASSERT_EQ(result, expected) << "The function returned an incorrect string.";
}