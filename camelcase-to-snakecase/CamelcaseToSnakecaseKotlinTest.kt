import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test

class CamelcaseToSnakecaseKotlinTest {
    @Before
    fun setupTest() {
        println("\n##polylith[testStarted")
    }

    @After
    fun teardownTest() {
        println("\n##polylith[testFinished")
    }

    @Test
    fun testSimpleCamelCaseToSnakeCase() {
        // GIVEN a map with book name, price and author
        val map = mapOf(
            "bookName" to "The Pragmatic Programmer",
            "price" to 29.99,
            "author" to mapOf(
                "firstName" to "Andy",
                "lastName" to "Hunt"
            )
        )
        // WHEN
        val actualResult = camelcaseToSnakeCase(map)
        // THEN
        val expectedResult = mapOf(
            "book_name" to "The Pragmatic Programmer",
            "price" to 29.99,
            "author" to mapOf(
                "first_name" to "Andy",
                "last_name" to "Hunt"
            )
        )
        assertTwoMapsAreEqual(expectedResult, actualResult)
    }

    @Test
    fun testSimpleCamelCaseToSnakeCaseRandom() {
        // GIVEN a map with camelCase keys
        val map = mapOf(
            "firstName" to "Max",
            "lastName" to "Mustermann"
        )
        // WHEN
        val actualResult = camelcaseToSnakeCase(map)
        // THEN
        val expectedResult = mapOf(
            "first_name" to "Max",
            "last_name" to "Mustermann"
        )
        assertTwoMapsAreEqual(expectedResult, actualResult)
    }

    @Test
    fun testCamelCaseToSnakeCase() {
        // GIVEN book name, price and multiple authors with nested phone numbers
        val map = mapOf(
            "bookName" to "The Pragmatic Programmer",
            "price" to 29.99,
            "authors" to listOf(
                mapOf(
                    "firstName" to "Andy",
                    "lastName" to "Hunt",
                    "phoneNumbers" to listOf(
                        mapOf(
                            "type" to "home",
                            "phoneNumber" to "49 228 42150-0"
                        ),
                        mapOf(
                            "type" to "mobile",
                            "phoneNumber" to "0173-9568472"
                        )
                    )
                ),
                mapOf(
                    "firstName" to "Dave",
                    "lastName" to "Thomas",
                    "phoneNumbers" to listOf(
                        mapOf(
                            "type" to "home",
                            "phoneNumber" to "49 228 42150-0"
                        ),
                        mapOf(
                            "type" to "mobile",
                            "phoneNumber" to "0173-9568472"
                        )
                    )
                )
            )
        )
        // WHEN
        val actualResult = camelcaseToSnakeCase(map)
        // THEN
        val expectedResult = mapOf(
            "book_name" to "The Pragmatic Programmer",
            "price" to 29.99,
            "authors" to listOf(
                mapOf(
                    "first_name" to "Andy",
                    "last_name" to "Hunt",
                    "phone_numbers" to listOf(
                        mapOf(
                            "type" to "home",
                            "phone_number" to "49 228 42150-0"
                        ),
                        mapOf(
                            "type" to "mobile",
                            "phone_number" to "0173-9568472"
                        )
                    )
                ),
                mapOf(
                    "first_name" to "Dave",
                    "last_name" to "Thomas",
                    "phone_numbers" to listOf(
                        mapOf(
                            "type" to "home",
                            "phone_number" to "49 228 42150-0"
                        ),
                        mapOf(
                            "type" to "mobile",
                            "phone_number" to "0173-9568472"
                        )
                    )
                )
            )
        )
        assertTwoMapsAreEqual(expectedResult, actualResult)
    }

    @Test
    fun testCamelCaseToSnakeCaseRandom() {
        // GIVEN a map with camelCase keys
        val map = mapOf(
            "firstName" to "Max",
            "lastName" to "Mustermann",
            "address" to mapOf(
                "streetAddress" to "Rheinwerkallee 4",
                "city" to "Bonn",
                "state" to "CA",
                "postalCode" to "53227"
            ),
            "phoneNumbers" to listOf(
                mapOf(
                    "type" to "home",
                    "number" to "49 228 42150-0"
                ),
                mapOf(
                    "type" to "mobile",
                    "number" to "0173-9568472"
                )
            )
        )
        // WHEN
        val actualResult = camelcaseToSnakeCase(map)
        // THEN
        val expectedResult = mapOf(
            "first_name" to "Max",
            "last_name" to "Mustermann",
            "address" to mapOf(
                "street_address" to "Rheinwerkallee 4",
                "city" to "Bonn",
                "state" to "CA",
                "postal_code" to "53227"
            ),
            "phone_numbers" to listOf(
                mapOf(
                    "type" to "home",
                    "number" to "49 228 42150-0"
                ),
                mapOf(
                    "type" to "mobile",
                    "number" to "0173-9568472"
                )
            )
        )
        assertTwoMapsAreEqual(expectedResult, actualResult)
    }

    @Test
    fun testMoreNestedComplexRandom() {
        // GIVEN a map with camelCase keys
        val map = mapOf(
            "firstName" to "Max",
            "lastName" to "Mustermann",
            "address" to mapOf(
                "streetAddress" to "Rheinwerkallee 4",
                "city" to "Bonn",
                "state" to "CA",
                "postalCode" to "53227",
                "phoneNumbers" to listOf(
                    mapOf(
                        "type" to "home",
                        "phoneNumber" to "49 228 42150-0"
                    ),
                    mapOf(
                        "type" to "mobile",
                        // germany phone number
                        "phoneNumber" to "0173-9568472"
                    )
                )
            )
        )
        // WHEN
        val actualResult = camelcaseToSnakeCase(map)
        // THEN
        val expectedResult = mapOf(
            "first_name" to "Max",
            "last_name" to "Mustermann",
            "address" to mapOf(
                "street_address" to "Rheinwerkallee 4",
                "city" to "Bonn",
                "state" to "CA",
                "postal_code" to "53227",
                "phone_numbers" to listOf(
                    mapOf(
                        "type" to "home",
                        "phone_number" to "49 228 42150-0"
                    ),
                    mapOf(
                        "type" to "mobile",
                        "phone_number" to "0173-9568472"
                    )
                )
            )
        )
        assertTwoMapsAreEqual(expectedResult, actualResult)
    }

    private fun assertTwoMapsAreEqual(expectedResult: Map<String, Any>, actualResult: Map<String, Any>) {
        val firstDifference = firstDifference(expectedResult, actualResult);
        val niceErrorMessage = "Expected: $expectedResult\nActual: $actualResult\nFirst difference: $firstDifference"
        assertEquals(niceErrorMessage, expectedResult, actualResult)
    }

    private fun firstDifference(expected: Map<*, *>, actual: Map<*, *>): String {
        for ((key, value) in expected) {
            if (!actual.containsKey(key)) {
                return "Key '$key' is missing in the actual map."
            } else {
                val expectedValue = expected[key]
                val actualValue = actual[key]
                if (expectedValue is Map<*, *> && actualValue is Map<*, *>) {
                    val nestedDifference = firstDifference(expectedValue, actualValue)
                    if (nestedDifference.isNotEmpty()) {
                        return nestedDifference
                    }
                } else if (expectedValue != actualValue) {
                    return "Difference at key '$key'. Expected: $expectedValue, Actual: $actualValue."
                }
            }
        }

        for (key in actual.keys) {
            if (!expected.containsKey(key)) {
                return "Unexpected key '$key' in the actual map."
            }
        }

        return ""
    }
}
