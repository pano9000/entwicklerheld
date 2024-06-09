using System;
using System.Collections.Generic;
using RomanNumeralsCsharpImplementation;
using NUnit.Framework;

namespace RomanNumeralsCsharpTests
{
    public class Tests
    {
        [Test]
        public void Number_1_is_i()
        {
            Assert.AreEqual("I", 1.ToRoman());
        }

        [Test]
        public void Number_2_is_ii()
        {
            Assert.AreEqual("II", 2.ToRoman());
        }

        [Test]
        public void Number_4_is_iv()
        {
            Assert.AreEqual("IV", 4.ToRoman());
        }
        
        [Test]
        public void Number_3_is_iii()
        {
            Assert.AreEqual("III", 3.ToRoman());
        }

        [Test]
        public void Number_9_is_ix()
        {
            Assert.AreEqual("IX", 9.ToRoman());
        }
        
        [Test]
        public void Number_49_is_xlix()
        {
            Assert.AreEqual("XLIX", 49.ToRoman());
        }
        [Test]
        public void Number_1024_is_mxxiv()
        {
            Assert.AreEqual("MXXIV", 1024.ToRoman());
        }

        [Test]
        public void Other_Numbers()
        {
            Assert.AreEqual("V", 5.ToRoman(), "Expected result V for number 5");
            Assert.AreEqual("VI", 6.ToRoman(), "Expected result VI for number 6");
            Assert.AreEqual("XXVII", 27.ToRoman(), "Expected result XXVII for number 27");
            Assert.AreEqual("XLVIII", 48.ToRoman(), "Expected result XLVIII for number 48");
            Assert.AreEqual("LIX", 59.ToRoman(), "Expected result LIX for number 59");
            Assert.AreEqual("XCIII", 93.ToRoman(), "Expected result XCIII for number 93");
            Assert.AreEqual("CXLI", 141.ToRoman(), "Expected result CXLI for number 141");
            Assert.AreEqual("CLXIII", 163.ToRoman(), "Expected result CLXIII for number 163");
            Assert.AreEqual("CDII", 402.ToRoman(), "Expected result CDII for number 402");
            Assert.AreEqual("DLXXV", 575.ToRoman(), "Expected result DLXXV for number 575");
            Assert.AreEqual("CMXI", 911.ToRoman(), "Expected result CMXI for number 911");
            Assert.AreEqual("MMM", 3000.ToRoman(), "Expected result MMM for number 3000");
            Assert.AreEqual("XVI", 16.ToRoman(), "Expected result XVI for number 16");
            Assert.AreEqual("LXVI", 66.ToRoman(), "Expected result LXVI for number 66");
            Assert.AreEqual("CLXVI", 166.ToRoman(), "Expected result CLXVI for number 166");
            Assert.AreEqual("DCLXVI", 666.ToRoman(), "Expected result DCLXVI for number 666");
            Assert.AreEqual("MDCLXVI", 1666.ToRoman(), "Expected result MDCLXVI for number 1666");
            Assert.AreEqual("MMMI", 3001.ToRoman(), "Expected result MMMI for number 3001");
            Assert.AreEqual("MMMCMXCIX", 3999.ToRoman(), "Expected result MMMCMXC for number 3999");
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