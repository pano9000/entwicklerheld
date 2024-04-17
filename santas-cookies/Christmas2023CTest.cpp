#include <gtest/gtest.h>
#include <cstring>

extern "C"
{
#include "Christmas2023C.h"
}

class CookieFinderTest : public testing::Test {
protected:
    void SetUp() override {
    }
};

int getArraySize(char **array) {
    if (array == NULL) {
        return 0;  // Handle the case of a NULL pointer
    }

    int size = 0;
    while (array[size] != NULL) {
        size++;
    }

    return size;
}

/* Helper function to format the output of the CookieFinder function into a pretty string like ['***', '***', '***'] */
char *formatPrettyOutput(char **output) {
    int totalSize = 1000;
    char *formattedOutput = (char *) malloc(sizeof(char) * totalSize);

    // Check if memory allocation was successful
    if (formattedOutput == NULL) {
        // Handle the case of memory allocation failure
        return NULL;
    }

    // Initialize the string to an empty string
    formattedOutput[0] = '\0';

    int size = getArraySize(output);

    strcat(formattedOutput, "[");
    for (int i = 0; i < size; i++) {
        // Allocate memory for the individual strings
        char *temp = (char *) malloc(strlen(output[i]) + 3); // +3 for quotes and null terminator

        // Check if memory allocation was successful
        if (temp == NULL) {
            // Handle the case of memory allocation failure
            free(formattedOutput);
            return NULL;
        }

        // Construct the formatted string
        snprintf(temp, strlen(output[i]) + 3, "'%s'", output[i]);
        strcat(formattedOutput, temp);

        // Free the temporary memory
        free(temp);

        if (i < size - 1) {
            strcat(formattedOutput, ", ");
        }
    }
    strcat(formattedOutput, "]");
    return formattedOutput;
}


TEST(CookieFinderTest, NoColumns) {
// GIVEN
    char *inputRaw[] = {
            "",
            NULL
    };
    char *input = formatPrettyOutput(inputRaw);

// WHEN
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

// THEN
    char *expectedRaw[] = {
            "",
            NULL
    };
    char *expected = formatPrettyOutput(expectedRaw);

// THEN
    ASSERT_STREQ(expected, actual) << "For input: " << input;
}

TEST(CookieFinderTest, NoCookies) {
    // GIVEN
    char *inputRaw[] = {
            " ",
            " ",
            " ",
            NULL
    };
    char *input = formatPrettyOutput(inputRaw);

    // WHEN
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

    // THEN
    char *expectedRaw[] = {
            " ",
            " ",
            " ",
            NULL
    };
    char *expected = formatPrettyOutput(expectedRaw);

    // THEN
    ASSERT_STREQ(expected, actual) << "For input: " << input;
}

TEST(CookieFinderTest, CookiesurroundedBySpaces) {
    // GIVEN
    char *inputRaw[] = {
            "   ",
            " * ",
            "   ",
            NULL
    };
    char *input = formatPrettyOutput(inputRaw);

    // WHEN
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

    // THEN
    char *expectedRaw[] = {
            "111",
            "1*1",
            "111",
            NULL
    };
    char *expected = formatPrettyOutput(expectedRaw);

    // THEN
    ASSERT_STREQ(expected, actual) << "For input: " << input;
}

TEST(CookieFinderTest, Normal) {
    // Given
    // ·*·*· ··*·· ··*·· ·····
    char *inputRaw[] = {
            " * * ",
            "  *  ",
            "  *  ",
            "     ",
            NULL
    };

    char *input = formatPrettyOutput(inputRaw);

    // When
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

    // Then
    // 1*3*1 13*31 ·2*2· ·111·
    char *expectedRaw[] = {
            "1*3*1",
            "13*31",
            " 2*2 ",
            " 111 ",
            NULL
    };
    char *expected = formatPrettyOutput(expectedRaw);

    ASSERT_STREQ(expected, actual) << "For input: " << input;
}

TEST(CookieFinderTest, SpaceSurroundedByCookies) {
    // GIVEN
    char *inputRaw[] = {
            "***",
            "* *",
            "***",
            NULL
    };
    char *input = formatPrettyOutput(inputRaw);

    // WHEN
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

    // THEN
    char *expectedRaw[] = {
            "***",
            "*8*",
            "***",
            NULL
    };
    char *expected = formatPrettyOutput(expectedRaw);

    // THEN
    ASSERT_STREQ(expected, actual) << "For input: " << input;
}

TEST(CookieFinderTest, CookieFieldWithOnlyCookies) {
    // GIVEN
    char *inputRaw[] = {
            "***",
            "***",
            "***",
            NULL
    };
    char *input = formatPrettyOutput(inputRaw);

    // WHEN
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

    // THEN
    char *expectedRaw[] = {
            "***",
            "***",
            "***",
            NULL
    };
    char *expected = formatPrettyOutput(expectedRaw);

    // THEN
    ASSERT_STREQ(expected, actual) << "For input: " << input;
}

TEST(CookieFinderTest, VerticalLine) {
    // GIVEN
    char *inputRaw[] = {
            " ",
            "*",
            " ",
            "*",
            " ",
            NULL
    };
    char *input = formatPrettyOutput(inputRaw);

    // WHEN
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

    // THEN
    char *expectedRaw[] = {
            "1",
            "*",
            "2",
            "*",
            "1",
            NULL
    };
    char *expected = formatPrettyOutput(expectedRaw);

    // THEN
    ASSERT_STREQ(expected, actual) << "For input: " << input;
}

TEST(CookieFinderTest, HorizontalLine) {
    // GIVEN
    char *inputRaw[] = {" * * ", NULL};
    char *input = formatPrettyOutput(inputRaw);

    // WHEN
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

    // THEN
    char *expectedRaw[] = {"1*2*1", NULL};
    char *expected = formatPrettyOutput(expectedRaw);

    ASSERT_STREQ(expected, actual) << "For input: " << input << " (horizontal line)";
}

TEST(CookieFinderTest, HorizontalLineCookiesAtEdges) {
    // GIVEN
    char *inputRaw[] = {"*   *", NULL};
    char *input = formatPrettyOutput(inputRaw);

    // WHEN
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

    // THEN
    char *expectedRaw[] = {"*1 1*", NULL};
    char *expected = formatPrettyOutput(expectedRaw);

    ASSERT_STREQ(expected, actual) << "For input: " << input << " (horizontal line with cookies at edges)";
}

TEST(CookieFinderTest, VerticalLineCookiesAtEdges) {
    // GIVEN
    char *inputRaw[] = {
            "*",
            " ",
            " ",
            " ",
            "*",
            NULL
    };
    char *input = formatPrettyOutput(inputRaw);

    // WHEN
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

    // THEN
    char *expectedRaw[] = {
            "*",
            "1",
            " ",
            "1",
            "*",
            NULL
    };
    char *expected = formatPrettyOutput(expectedRaw);

    ASSERT_STREQ(expected, actual) << "For input: " << input << " (vertical line with cookies at edges)";
}


TEST(CookieFinderTest, Cross) {
    // GIVEN
    char *inputRaw[] = {
            "  *  ",
            "  *  ",
            "*****",
            "  *  ",
            "  *  ",
            NULL
    };
    char *input = formatPrettyOutput(inputRaw);

    // WHEN
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

    // THEN
    char *expectedRaw[] = {
            " 2*2 ",
            "25*52",
            "*****",
            "25*52",
            " 2*2 ",
            NULL
    };
    char *expected = formatPrettyOutput(expectedRaw);
    ASSERT_STREQ(expected, actual) << "For input: " << input << " (cross)";
}

TEST(CookieFinderTest, LargeCookieField) {
    // GIVEN
    char *inputRaw[] = {
            " *  * ",
            "  *   ",
            "    * ",
            "   * *",
            " *  * ",
            "      ",
            NULL
    };

    char *input = formatPrettyOutput(inputRaw);

    // WHEN
    char **actualRaw = cookieFinder(inputRaw);
    char *actual = formatPrettyOutput(actualRaw);

    // THEN
    char *expectedRaw[] = {
            "1*22*1",
            "12*322",
            " 123*2",
            "112*4*",
            "1*22*2",
            "111111",
            NULL  // Terminate the array with a NULL pointer
    };
    char *expected = formatPrettyOutput(expectedRaw);
    ASSERT_STREQ(expected, actual) << "For input: " << input << " (large cookie field)";
}