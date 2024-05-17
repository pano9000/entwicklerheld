using System;
using System.Collections.Generic;
using LuhnCsharpImplementation;
using NUnit.Framework;

namespace LuhnCsharpTests
{
    public class Tests
    {
        [Test]
        public void Test1()
        {
            var result1 = LuhnAlgorithm.IsValid("1");
            Assert.False(result1, "Expected result 'False' for the String '1' but was: " + result1);
            
            var result2 = LuhnAlgorithm.IsValid("059");
            Assert.True(result2, "Expected result 'True' for the String '059' but was: " + result2);
            
            var result5 = LuhnAlgorithm.IsValid("055 444 285");
            Assert.True(result5, "Expected result 'True' for the String '055 444 285' but was: " + result5);
            
            var result12 = LuhnAlgorithm.IsValid("059a");
            Assert.False(result12, "Expected result 'False' for the String '059a' but was: " + result12);
            
            var result14 = LuhnAlgorithm.IsValid("055# 444$ 285");
            Assert.False(result14, "Expected result 'False' for the String '055# 444$ 285' but was: " + result14);
            
            var result16 = LuhnAlgorithm.IsValid("0000 0");
            Assert.True(result16, "Expected result 'True' for the String '0000 0' but was: " + result16);

            var result3 = LuhnAlgorithm.IsValid("59");
            Assert.True(result3, "Expected result 'True' for the String '59' but was: " + result3);

            var result4 = LuhnAlgorithm.IsValid("0");
            Assert.False(result4, "Expected result 'False' for the String '0' but was: " + result4);

            var result6 = LuhnAlgorithm.IsValid("055 444 286");
            Assert.False(result6, "Expected result 'False' for the String '055 444 286' but was: " + result6);

            var result7 = LuhnAlgorithm.IsValid("8273 1232 7352 0569");
            Assert.False(result7, "Expected result 'False' for the String '8273 1232 7352 0569' but was: " + result7);

            var result8 = LuhnAlgorithm.IsValid("1 2345 6789 1234 5678 9012");
            Assert.False(result8,
                "Expected result 'False' for the String '1 2345 6789 1234 5678 9012' but was: " + result8);

            var result9 = LuhnAlgorithm.IsValid("1 2345 6789 1234 5678 9013");
            Assert.False(result9,
                "Expected result 'False' for the String '1 2345 6789 1234 5678 9013' but was: " + result9);

            var result10 = LuhnAlgorithm.IsValid("095 245 88");
            Assert.True(result10, "Expected result 'True' for the String '095 245 88' but was: " + result10);

            var result11 = LuhnAlgorithm.IsValid("234 567 891 234");
            Assert.True(result11, "Expected result 'True' for the String '234 567 891 234' but was: " + result11);

            var result13 = LuhnAlgorithm.IsValid("055-444-285");
            Assert.False(result13, "Expected result 'False' for the String '055-444-285' but was: " + result13);

            var result15 = LuhnAlgorithm.IsValid(" 0");
            Assert.False(result15, "Expected result 'False' for the String ' 0' but was: " + result15);

            var result17 = LuhnAlgorithm.IsValid("091");
            Assert.True(result17, "Expected result 'True' for the String '091' but was: " + result17);

            var result18 = LuhnAlgorithm.IsValid("9999999999 9999999999 9999999999 9999999999");
            Assert.True(result18,
                "Expected result 'True' for the String '9999999999 9999999999 9999999999 9999999999' but was: " +
                result18);

            var result19 = LuhnAlgorithm.IsValid("109");
            Assert.True(result19, "Expected result 'True' for the String '109' but was: " + result19);

            var result20 = LuhnAlgorithm.IsValid("055b 444 285");
            Assert.False(result20, "Expected result 'False' for the String '055b 444 285' but was: " + result20);

            var result21 = LuhnAlgorithm.IsValid(":9");
            Assert.False(result21, "Expected result 'False' for the String ':9' but was: " + result21);

            var result22 = LuhnAlgorithm.IsValid("59%59");
            Assert.False(result22, "Expected result 'False' for the String '59%59' but was: " + result22);
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
    }
}