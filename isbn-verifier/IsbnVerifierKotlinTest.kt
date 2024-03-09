import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.Assert.assertEquals

class IsbnVerifierKotlinTest {
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
        val isbn = "3-598-21508-8"
        assertEquals("ISBN $isbn should be valid", true, isValid(isbn))
    }
    @Test
    fun test_1_2() {
        val isbn = "3-598-21508-9"
        assertEquals("ISBN $isbn should be invalid", false, isValid(isbn))
    }
    @Test
    fun test_1_3() {
        for ((isbn, expectedResult) in data()) {
            val actualResult = isValid(isbn)
            val expectedValidity = if (expectedResult) "valid" else "invalid"
            val actualValidity = if (actualResult) "valid" else "invalid"
            assertEquals(
                "ISBN $isbn validity test should be $expectedValidity, but was $actualValidity",
                expectedResult,
                actualResult
            )
        }
    }

    companion object {
        fun data(): Collection<Pair<String, Boolean>> {
            return listOf(
                "3-598-21507-X" to true,
                "ABCDEFG3-598-21507-XQWERTYUI" to false,
                "3-598-21507-A" to false,
                "4-598-21507-B" to false,
                "3-598-P1581-X" to false,
                "3-598-2X507-9" to false,
                "3598215088" to true,
                "359821507X" to true,
                "359821507" to false,
                "3598215078X" to false,
                "00" to false,
                "3-598-21507" to false,
                "3-598-21515-X" to false,
                "" to false,
                "134456729" to false,
                "3132P34035" to false,
                "3598P215088" to false,
                "98245726788" to false
            )
        }
    }
}