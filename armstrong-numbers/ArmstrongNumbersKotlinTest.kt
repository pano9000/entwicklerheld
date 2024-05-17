import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.Assert.assertEquals
import de.entwicklerheld.armstrongNumbersKotlin.isArmstrongNumber

class ArmstrongNumbersKotlinTest {
    @Before
    fun setupTest() {
        println("\n##polylith[testStarted")
    }
    @After
    fun teardownTest() {
        println("##polylith[testFinished")
    }
    @Test
    fun test_1_1() {
        val numberToCheck = 0
        val actual = isArmstrongNumber(numberToCheck)
        val expected = true
        val explanation = getExplanation(numberToCheck, expected)
        assertEquals(explanation, actual, expected)
    }
    @Test
    fun test_1_2() {
        val numberToCheck = 5
        val actual = isArmstrongNumber(numberToCheck)
        val expected = true
        val explanation = getExplanation(numberToCheck, expected)
        assertEquals(explanation, actual, expected)
    }
    @Test
    fun test_1_3() {
        val numberToCheck = 10
        val actual = isArmstrongNumber(numberToCheck)
        val expected = false
        val explanation = getExplanation(numberToCheck, expected)
        assertEquals(explanation, actual, expected)
    }
    @Test
    fun test_1_4() {
        for (testData in testData) {
            val numberToCheck = testData.numberToCheck
            val actual = isArmstrongNumber(numberToCheck)
            val expected = testData.result
            val explanation = getExplanation(numberToCheck, expected)
            assertEquals(explanation, actual, expected)
        }
    }

    private fun getExplanation(number: Int, isArmstrongNumber: Boolean): String {
        return if (number == 0) {
            "0 is an Armstrong number, because it contains no digits, and the empty sum (0) raised to the power of 0 is equal to 0."
        } else if (isArmstrongNumber) {
            "$number is an Armstrong number, because ${armstrongExplanation(number)}"
        } else {
            "$number is not an Armstrong number, because it does not satisfy the Armstrong condition."
        }
    }

    private fun armstrongExplanation(number: Int): String {
        var temp = number
        val numberOfDigits = number.toString().length
        val explanation = StringBuilder()

        while (temp != 0) {
            val digit = temp % 10
            explanation.append("$digit^$numberOfDigits")
            if (temp / 10 != 0) {
                explanation.append(" + ")
            }
            temp /= 10
        }

        return explanation.toString() + " = $number"
    }

    companion object {
        val testData = arrayOf(
            TestData(153, true),
            TestData(100, false),
            TestData(9474, true),
            TestData(9475, false),
            TestData(9926315, true),
            TestData(9926314, false)
        )
    }

    data class TestData(val numberToCheck: Int, val result: Boolean)
}