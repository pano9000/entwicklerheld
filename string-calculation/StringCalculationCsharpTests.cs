using System;
using System.Collections.Generic;
using StringCalculationCsharpImplementation;
using NUnit.Framework;

namespace StringCalculationCsharpTests
{
    public class Tests
    {
        [Test]
        public void TestScenario1()
        {
            // 1
            Assert.AreEqual(5, StringCalculationCsharp.Answer("What is 5?"));
            // 2
            Assert.AreEqual(2, StringCalculationCsharp.Answer("What is 1 plus 1?"));
            // 3
            Assert.AreEqual(55, StringCalculationCsharp.Answer("What is 53 plus 2?"));    
            // 4
            Assert.AreEqual(16, StringCalculationCsharp.Answer("What is 4 minus -12?"));
            // 5
            Assert.AreEqual(-75, StringCalculationCsharp.Answer("What is -3 multiplied by 25?"));
            // 6
            Assert.AreEqual(-11, StringCalculationCsharp.Answer("What is 33 divided by -3?"));
            
            
            // 7- Other
            Assert.AreEqual(-11, StringCalculationCsharp.Answer("What is -1 plus -10?"));

            Assert.AreEqual(45801, StringCalculationCsharp.Answer("What is 123 plus 45678?"));

        }

        [Test]
        public void TestComplex()
        {
            // 1
            Assert.AreEqual(3, StringCalculationCsharp.Answer("What is 1 plus 1 plus 1?"));
            // 2
            Assert.AreEqual(8, StringCalculationCsharp.Answer("What is 1 plus 5 minus -2?"));
            // 3
            Assert.AreEqual(-8, StringCalculationCsharp.Answer("What is -3 plus 7 multiplied by -2?"));
            
            // 4 Other
            Assert.AreEqual(3, StringCalculationCsharp.Answer("What is 20 minus 4 minus 13?"));
            Assert.AreEqual(14, StringCalculationCsharp.Answer("What is 17 minus 6 plus 3?"));
            Assert.AreEqual(-12, StringCalculationCsharp.Answer("What is 2 multiplied by -2 multiplied by 3?"));
            Assert.AreEqual(2, StringCalculationCsharp.Answer("What is -12 divided by 2 divided by -3?"));
        }

        [Test]
        public void TestExceptions()
        {
            Assert.Throws<ArgumentException>(() => StringCalculationCsharp.Answer("What is Love?"));

            Assert.Throws<ArgumentException>(() => StringCalculationCsharp.Answer("What is 52 cubed?"));

            try
            {
                var answer =
                    StringCalculationCsharp.Answer(
                        "What is the answer to the ultimate question of life, the universe, and everything?");
                Assert.AreEqual(answer, 42);
                Console.WriteLine("##polylith[testFinished");
                Console.WriteLine("WHAT WAS THE QUESTION?");
                Console.WriteLine("##polylith[testStarted");
            }
            catch (ArgumentException)
            {

            }
            catch (AssertionException)
            {
                
            }
            
            
            Assert.Throws<ArgumentException>(() =>
                StringCalculationCsharp.Answer("Who is the President of the United States?"));

            Assert.Throws<ArgumentException>(() => StringCalculationCsharp.Answer("What is 1 plus?"));

            Assert.Throws<ArgumentException>(() => StringCalculationCsharp.Answer("What is?"));

            Assert.Throws<ArgumentException>(() => StringCalculationCsharp.Answer("What is 1 plus plus 2?"));

            Assert.Throws<ArgumentException>(() => StringCalculationCsharp.Answer("What is 1 plus 2 1?"));

            Assert.Throws<ArgumentException>(() => StringCalculationCsharp.Answer("What is 1 2 plus?"));

            Assert.Throws<ArgumentException>(() => StringCalculationCsharp.Answer("What is plus 1 2?"));
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