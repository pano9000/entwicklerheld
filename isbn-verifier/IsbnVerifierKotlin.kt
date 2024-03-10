fun isValid(stringToVerify: String): Boolean {

    val cleanedString = stringToVerify.trim().uppercase();

    if (cleanedString.length < 10 || cleanedString.length > 13) {
        return false;
    }

    var sum = 0;
    var multiplicator = 10;
    for (i in 0..cleanedString.length - 1) {

        val currentChar = cleanedString[i];

        if (!currentChar.isDigit()) {

            //skip on allowed separators '-' and ' '
            if (currentChar == '-' || currentChar == ' ') {
                continue;
            }

            val isEndOfString = (i == cleanedString.length - 1);

            //only allowed non-digit is 'X' at the end of the string
            if (!(isEndOfString && currentChar == 'X')) {
                return false;
            }

        }

        val ASCII_OFFSET = 48;
        var value = if (currentChar == 'X') 10 else currentChar.code - ASCII_OFFSET;

        sum += value * multiplicator--
    }

    //if not exactly 10 digits were 'processed' -> invalid ISBN 
    if (multiplicator != 0) return false;

    return (sum % 11 == 0)

}
