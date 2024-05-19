using System;
using System.Collections.Generic;
using System.Linq;
using AllergiesCsharpImplementation;
using NUnit.Framework;

namespace AllergiesCsharpTests
{
    public class Tests
    {
        [Test]
        public void Test_1_1()
        {
            var score = 0;
            var allergen = Allergen.Eggs;
            var sut = new Allergies(score);
            var actual = sut.IsAllergicTo(allergen);
            Assert.False(
                actual,
                string.Format(
                    "With score {0} IsAllergicTo({1}) should return false, but was true.",
                    score,
                    allergen.ToString()
                )
            );
        }

        [Test]
        public void Test_1_2()
        {
            var score = 1;
            var allergen = Allergen.Eggs;
            var sut = new Allergies(score);
            var actual = sut.IsAllergicTo(allergen);
            Assert.True(
                actual,
                string.Format(
                    "With score {0} IsAllergicTo({1}) should return true, but was false.",
                    score,
                    allergen.ToString()
                )
            );
        }

        [Test]
        public void Test_1_3()
        {
            var score = 17;
            var allergen = Allergen.Tomatoes;
            var sut = new Allergies(score);
            var actual = sut.IsAllergicTo(allergen);
            Assert.True(
                actual,
                string.Format(
                    "With score {0} IsAllergicTo({1}) should return true, but was false.",
                    score,
                    allergen.ToString()
                )
            );
        }

        [Test]
        public void Test_1_4()
        {
            List<dynamic> dataList = Data_1_4();

            for (int i = 0; i < dataList.Count; i++)
            {
                var data = dataList[i];
                var sut = new Allergies(data.Score);
                var actual = sut.IsAllergicTo(data.Allergen);
                var expected = data.Expected;

                if (expected) {
                    Assert.True(
                        actual,
                        string.Format(
                            "With score {0} IsAllergicTo({1}) should return true, but was false.",
                            data.Score,
                            data.Allergen.ToString()
                        )
                    );
                } else {
                    Assert.False(
                        actual,
                        string.Format(
                            "With score {0} IsAllergicTo({1}) should return false, but was true.",
                            data.Score,
                            data.Allergen.ToString()
                        )
                    );
                }

            }
        }

        [Test]
        public void Test_2_1()
        {
            var score = 0;
            var sut = new Allergies(score);
            var actual = sut.List();
            Assert.NotNull(
                actual,
                "The returned result should be an array, but was null."
            );
            Assert.AreEqual(
                0,
                actual.Length,
                string.Format(
                    "With score {0}, the returned array should be empty, but was {1}",
                    score,
                    actual.Length
                )
            );
        }

        [Test]
        public void Test_2_2()
        {
            var score = 1;
            var sut = new Allergies(score);
            var actual = sut.List();
            Assert.NotNull(
                actual,
                "The returned result should be an array, but was null."
            );
            Assert.AreEqual(
                1,
                actual.Length,
                string.Format(
                    "With score {0}, the returned array should contain one allergen, but was {1}.",
                    score,
                    actual.Length
                )
            );
            Assert.AreEqual(
                actual[0],
                Allergen.Eggs,
                string.Format(
                    "With score {0}, the returned array should contain {1}.",
                    score,
                    Allergen.Eggs.ToString()
                )
            );
        }

        [Test]
        public void Test_2_3()
        {
            List<dynamic> dataList = Data_2_3();

            for (int i = 0; i < dataList.Count; i++)
            {
                var data = dataList[i];
                var score = data.Score;
                var sut = new Allergies(data.Score);
                Allergen[] actual = sut.List();
                Allergen[] expected = data.Expected;

                Assert.NotNull(
                    actual,
                    "The returned result should be an array, but was null."
                );
                var expectedStr = string.Join(", ", expected.Select(w => w.ToString()));
                var actualStr = string.Join(", ", actual.Select(w => w.ToString()));
                Assert.AreEqual(
                    expected.Length,
                    actual.Length,
                    string.Format(
                        "With score {0}, the returned array should contain {1} allgeren{2}, but was {3}.\nexpected: [ {4} ]\nactual: [ {5} ]",
                        score,
                        expected.Length,
                        expected.Length > 1 ? "s" : "",
                        actual.Length,                        
                        expectedStr,
                        actualStr
                    )
                );
                
                for (int j = 0; j < expected.Length; j++)
                {
                    Assert.True(
                        actual.Contains(expected[j]),
                        string.Format(
                            "With score {0}, the returned array should contain {1}.\nexpected: [ {2} ]\nactual: [ {3} ]",
                            score,
                            expected[j].ToString(),
                            expectedStr,
                            actualStr
                        )
                    );
                }
            }
        }

        [Test]
        public void Test_3_1()
        {
            Allergen[] allergens = new Allergen[] { };
            var actual = Allergies.CreateAllergy(allergens);

            Assert.NotNull(
                actual,
                "The returned result should be an array, but was null."
            );
            var expected = 0;
            var allergensStr = string.Join(", ", allergens.Select(w => w.ToString()));
            Assert.AreEqual(
                expected,
                actual.score,
                string.Format(
                    "With no given allergens, the resulting score should be 0, but was {0}",
                    actual.score
                )
            );
        }

        [Test]
        public void Test_3_2()
        {
            Allergen[] allergens = new Allergen[] { Allergen.Eggs };
            var actual = Allergies.CreateAllergy(allergens);

            Assert.NotNull(
                actual,
                "The returned result should be an array, but was null."
            );
            var expected = 1;
            var allergensStr = string.Join(", ", allergens.Select(w => w.ToString()));
            Assert.AreEqual(
                expected,
                actual.score,
                string.Format(
                    "With the given allergens [ {0} ], the resulting score should be {1}, but was {2}",
                    allergensStr,
                    expected,
                    actual.score
                )
            );
        }

        [Test]
        public void Test_3_3()
        {
            List<dynamic> dataList = Data_3_3();

            for (int i = 0; i < dataList.Count; i++)
            {
                var data = dataList[i];
                Allergen[] allergens = data.Allergens;
                var actual = Allergies.CreateAllergy(allergens);
                
                Assert.NotNull(
                    actual,
                    "The returned result should be an array, but was null."
                );
                var expected = data.Expected;
                var allergensStr = string.Join(", ", allergens.Select(w => w.ToString()));
                Assert.AreEqual(
                    expected,
                    actual.score,
                    string.Format(
                        "With the given allergens [ {0} ], the resulting score should be {1}, but was {2}",
                        allergensStr,
                        expected,
                        actual.score
                    )
                );
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

        private List<dynamic> Data_1_4()
        {
            List<dynamic> list = new List<dynamic>();
            dynamic data = new TestData();
            data.Score = 3;
            data.Allergen = Allergen.Eggs;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 2;
            data.Allergen = Allergen.Eggs;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 255;
            data.Allergen = Allergen.Eggs;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 0;
            data.Allergen = Allergen.Peanuts;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 2;
            data.Allergen = Allergen.Peanuts;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 7;
            data.Allergen = Allergen.Peanuts;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 5;
            data.Allergen = Allergen.Peanuts;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 255;
            data.Allergen = Allergen.Peanuts;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 0;
            data.Allergen = Allergen.Shellfish;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 4;
            data.Allergen = Allergen.Shellfish;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 14;
            data.Allergen = Allergen.Shellfish;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 10;
            data.Allergen = Allergen.Shellfish;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 255;
            data.Allergen = Allergen.Shellfish;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 0;
            data.Allergen = Allergen.Strawberries;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 8;
            data.Allergen = Allergen.Strawberries;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 28;
            data.Allergen = Allergen.Strawberries;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 20;
            data.Allergen = Allergen.Strawberries;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 255;
            data.Allergen = Allergen.Strawberries;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 0;
            data.Allergen = Allergen.Tomatoes;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 16;
            data.Allergen = Allergen.Tomatoes;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 56;
            data.Allergen = Allergen.Tomatoes;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 40;
            data.Allergen = Allergen.Tomatoes;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 255;
            data.Allergen = Allergen.Tomatoes;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 0;
            data.Allergen = Allergen.Chocolate;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 32;
            data.Allergen = Allergen.Chocolate;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 112;
            data.Allergen = Allergen.Chocolate;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 80;
            data.Allergen = Allergen.Eggs;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 255;
            data.Allergen = Allergen.Chocolate;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 0;
            data.Allergen = Allergen.Pollen;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 64;
            data.Allergen = Allergen.Pollen;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 224;
            data.Allergen = Allergen.Pollen;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 160;
            data.Allergen = Allergen.Pollen;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 255;
            data.Allergen = Allergen.Pollen;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 0;
            data.Allergen = Allergen.Cats;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 128;
            data.Allergen = Allergen.Cats;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 192;
            data.Allergen = Allergen.Cats;
            data.Expected = true;
            list.Add(data);

            data = new TestData();
            data.Score = 64;
            data.Allergen = Allergen.Cats;
            data.Expected = false;
            list.Add(data);

            data = new TestData();
            data.Score = 255;
            data.Allergen = Allergen.Cats;
            data.Expected = true;
            list.Add(data);

            return list;
        }

        private List<dynamic> Data_2_3()
        {
            List<dynamic> list = new List<dynamic>();
            dynamic data = new TestData();
            data.Score = 2;
            data.Expected = new Allergen[] { Allergen.Peanuts };
            list.Add(data);

            data = new TestData();
            data.Score = 8;
            data.Expected = new Allergen[] { Allergen.Strawberries };
            list.Add(data);

            data = new TestData();
            data.Score = 3;
            data.Expected = new Allergen[] {
                Allergen.Eggs,
                Allergen.Peanuts
            };
            list.Add(data);

            data = new TestData();
            data.Score = 5;
            data.Expected = new Allergen[] {
                Allergen.Eggs,
                Allergen.Shellfish
            };
            list.Add(data);

            data = new TestData();
            data.Score = 248;
            data.Expected = new Allergen[] {
                Allergen.Strawberries,
                Allergen.Tomatoes,
                Allergen.Chocolate,
                Allergen.Pollen,
                Allergen.Cats
            };
            list.Add(data);

            data = new TestData();
            data.Score = 255;
            data.Expected = new Allergen[] {
                Allergen.Eggs,
                Allergen.Peanuts,
                Allergen.Shellfish,
                Allergen.Strawberries,
                Allergen.Tomatoes,
                Allergen.Chocolate,
                Allergen.Pollen,
                Allergen.Cats
            };
            list.Add(data);

            data = new TestData();
            data.Score = 509;
            data.Expected = new Allergen[] {
                Allergen.Eggs,
                Allergen.Shellfish,
                Allergen.Strawberries,
                Allergen.Tomatoes,
                Allergen.Chocolate,
                Allergen.Pollen,
                Allergen.Cats
            };
            list.Add(data);

            data = new TestData();
            data.Score = 257;
            data.Expected = new Allergen[] { Allergen.Eggs };
            list.Add(data);

            return list;
        }

        private List<dynamic> Data_3_3()
        {
            List<dynamic> list = new List<dynamic>();
            dynamic data = new TestData();
            data.Expected = 2;
            data.Allergens = new Allergen[] { Allergen.Peanuts };
            list.Add(data);

            data = new TestData();
            data.Expected = 5;
            data.Allergens = new Allergen[] {
                Allergen.Eggs,
                Allergen.Shellfish
            };
            list.Add(data);

            data = new TestData();
            data.Expected = 3;
            data.Allergens = new Allergen[] {
                Allergen.Eggs,
                Allergen.Peanuts
            };
            list.Add(data);

            data = new TestData();
            data.Expected = 8;
            data.Allergens = new Allergen[] { Allergen.Strawberries };
            list.Add(data);
            
            data = new TestData();
            data.Expected = 255;
            data.Allergens = new Allergen[] {
                Allergen.Eggs,
                Allergen.Peanuts,
                Allergen.Shellfish,
                Allergen.Strawberries,
                Allergen.Tomatoes,
                Allergen.Chocolate,
                Allergen.Pollen,
                Allergen.Cats
            };
            list.Add(data);

            data = new TestData();
            data.Expected = 248;
            data.Allergens = new Allergen[] {
                Allergen.Strawberries,
                Allergen.Tomatoes,
                Allergen.Chocolate,
                Allergen.Pollen,
                Allergen.Cats
            };
            list.Add(data);

            data = new TestData();
            data.Expected = 81;
            data.Allergens = new Allergen[] {
                Allergen.Eggs,
                Allergen.Tomatoes,
                Allergen.Pollen
            };
            list.Add(data);            

            return list;
        }

    }
}