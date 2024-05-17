using System;
using System.Collections.Generic;
using ArmstrongNumbersCsharpImplementation;
using NUnit.Framework;

namespace ArmstrongNumbersCsharpTests
{
    public class Tests
    {
        [Test]
        public void Test_1_1()
        {
            int numberToCheck = 0;
            bool actual = ArmstrongNumbersCsharp.IsArmstrongNumber(numberToCheck);
            bool expected = true;
            string explanation = getExplanation(numberToCheck, expected);
            Assert.AreEqual(expected, actual, explanation);
        }
        [Test]
        public void Test_1_2()
        {
            int numberToCheck = 5;
            bool actual = ArmstrongNumbersCsharp.IsArmstrongNumber(numberToCheck);
            bool expected = true;
            string explanation = getExplanation(numberToCheck, expected);
            Assert.AreEqual(expected, actual, explanation);
        }
        [Test]
        public void Test_1_3()
        {
            int numberToCheck = 10;
            bool actual = ArmstrongNumbersCsharp.IsArmstrongNumber(numberToCheck);
            bool expected = false;
            string explanation = getExplanation(numberToCheck, expected);
            Assert.AreEqual(expected, actual, explanation);
        }
        [Test]
        public void Test_1_4()
        {
            for (int i = 0; i < testData.Length; i++) {
                int numberToCheck = testData[i].NumberToCheck;
                bool actual = ArmstrongNumbersCsharp.IsArmstrongNumber(numberToCheck);
                bool expected = testData[i].Result;
                string explanation = getExplanation(numberToCheck, expected);
                Assert.AreEqual(expected, actual, explanation);
            }
        }

        [SetUp]
        public void BaseSetUp()
        {
            Console.WriteLine("##polylith[testStarted");
        }

        [TearDown]
        public void BaseTearDown()
        {
            Console.WriteLine("##polylith[testFinished");
        }

        private static string getExplanation(int number, bool isArmstrongNumber) {
            if (number == 0) {
                return "0 is an Armstrong number, because it contains no digits, and the empty sum (0) raised to the power of 0 is equal to 0.";
            }
            if (isArmstrongNumber) {
                return number + " is an Armstrong number, because " + ArmstrongExplanation(number);
            } else {
                return number + " is not an Armstrong number, because it does not satisfy the Armstrong condition.";
            }
        }

        private static string ArmstrongExplanation(int number) {
            int temp = number;
            int numberOfDigits = number.ToString().Length;
            List<string> explanation = new List<string>();

            while (temp != 0) {
                int digit = temp % 10;
                explanation.Add(digit + "^" + numberOfDigits);
                if (temp / 10 != 0) {
                    explanation.Add(" + ");
                }
                temp /= 10;
            }

            return string.Join("", explanation) + " = " + number;
        }

        TestData[] testData = new TestData[]{
                new TestData(153, true),
                new TestData(100, false),
                new TestData(9474, true),
                new TestData(9475, false),
                new TestData(9926315, true),
                new TestData(9926314, false)
        };

        class TestData {
            public int NumberToCheck;
            public bool Result;

            public TestData(int numberToCheck, bool result) {
                this.NumberToCheck = numberToCheck;
                this.Result = result;
            }
        }
    }
}