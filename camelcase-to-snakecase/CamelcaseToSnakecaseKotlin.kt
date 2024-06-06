fun camelcaseToSnakeCase(map: Map<String, Any>): Map<String, Any> {

    val convertedMap = mutableMapOf<String, Any>();
    for (key in map.keys) {
        val snakeKey = camelcaseToSnakeCaseKey(key);
        val mapValue = map.get(key);

        when (mapValue) {
            is Map<*, *> -> convertedMap.put(snakeKey, camelcaseToSnakeCase(mapValue as Map<String, Any>));
            is List<*> -> convertedMap.put(snakeKey, camelcaseToSnakeCase(mapValue));
            else -> convertedMap.put(snakeKey, mapValue as Any)
        }
    }

    return convertedMap.toMap()
}

fun camelcaseToSnakeCase(list: List<*>): List<*> {

    val convertedList =  mutableListOf<Any>();
    for (item in list) {
        when (item) {
            is Map<*, *> -> convertedList.add(camelcaseToSnakeCase(item as Map<String, Any>));
            is List<*> -> convertedList.add(camelcaseToSnakeCase(item))
            else -> convertedList.add(item as Any);
        }
    }
    return convertedList;
}

fun camelcaseToSnakeCaseKey(camelKey: String): String {
    var snakeKey = "";
    for (i in 0..camelKey.length - 1) {
        snakeKey += camelKey[i].lowercase();

        if (i + 1 > camelKey.length - 1) {
            continue;
        }
        
        if (camelKey[i].isLowerCase() && camelKey[i+1].isUpperCase()) {
            snakeKey += "_";
        }
    }

    return snakeKey
}


/**
 *  If you are interested in the Kotlin conference ticket, set the variable to true. Otherwise, set it to false.
 */
fun isInterestInConferenceTicket(): Boolean {
    return false;
}
