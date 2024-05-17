using System;

namespace LuhnCsharpImplementation
{
    public static class LuhnAlgorithm
    {
        public static Boolean IsValid(String number)
        {
            char[] cleanedNumberChar = number.Replace(" ", "").ToCharArray();
            if (cleanedNumberChar.Length < 2) return false;

            int sum = 0;
            bool odd = true;
            for (int i = cleanedNumberChar.Length - 1; i >= 0; i--) {
                if (!System.Char.IsDigit(cleanedNumberChar[i])) return false;
                int currentInt = cleanedNumberChar[i] - '0';
                odd = !odd;

                if (!odd) {
                    sum += currentInt;
                    continue;
                }

                int doubledDigit = currentInt * 2;
                doubledDigit = doubledDigit > 9 ? (doubledDigit - 9) : doubledDigit;
                sum += doubledDigit;
             }

            return (sum % 10 == 0);

        }
    }
}