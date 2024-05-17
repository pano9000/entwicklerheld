namespace ArmstrongNumbersCsharpImplementation
{
    public static class ArmstrongNumbersCsharp
    {
        public static bool IsArmstrongNumber(int numberToCheck) {
            if (numberToCheck > -1 && numberToCheck < 10) return true;
            if (numberToCheck >= 10 && numberToCheck <= 99) return false;

            string numberStr = numberToCheck.ToString();
            int sum = 0;
            foreach (char charDigit in numberStr) {
                double digit = System.Char.GetNumericValue(charDigit);
                sum += (int)(System.Math.Pow(digit, numberStr.Length));
            }
            return sum == numberToCheck;
        }
    }
}