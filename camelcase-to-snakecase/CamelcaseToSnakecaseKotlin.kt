fun camelcaseToSnakeCase(map: Map<String, Any>): Map<String, Any> {
    println("-----------Start: " + map.toString() + "------\n");
    val convertedMap = mutableMapOf<String, Any>();

    for (key in map.keys) {
        val snakeKey = camelcaseToSnakeCaseKey(key);
        //println(key + "//" + snakeKey)

        if (map.get(key) is Map<*, *>) {
            @Suppress("UNCHECKED_CAST")
            val submap = map.get(key) as Map<String, Any>;
            
            convertedMap.put(snakeKey, camelcaseToSnakeCase(submap));
            println(key + " // recursive added to new map as " + snakeKey)
        } 
        else if (map.get(key) is List<*>) {
            println("list found // " + snakeKey);
            var sublist = map.get(key) as List<*>;

            //camelcaseToSnakeCase(sublist)
            var b =  mutableListOf<Any>();

            for (item in sublist) {
                println("in list: " + item.toString())

                if (item is Map<*, *>) {
                    println("item is map")
                    //val submap = map.get(key) as Map<String, Any>;
                    b.add(camelcaseToSnakeCase(item as Map<String, Any>));
                    println("result " + b)

                    
                    //var result = camelcaseToSnakeCase(item as Map<String, Any>);
                    //println("result " + result)
                }

            }
            convertedMap.put(snakeKey, b);

        }
        else {
            val valuee = map.get(key) as Any;
            println(key + " // added to new map as " + snakeKey)
            convertedMap.put(snakeKey, valuee)
        }
        
    }

    println("---------------End: " + convertedMap.toString() + "\n----------\n");

    return convertedMap.toMap()
}

/*
fun camelcaseToSnakeCase(list: List<*>): List<*> {
    println("Start Listi: " + list.toString())
    val convertedList = mutableListOf<Any>();

    for (entry in list) {
        convertedList.add(camelcaseToSnakeCase(entry))
        
    }
    return convertedList
}
 */

fun camelcaseToSnakeCaseKey(camelKey: String): String {
    var snakeKey = "";
    for (i in 0..camelKey.length - 1) {
        snakeKey += camelKey[i].lowercase();

        if (i+1 > camelKey.length - 1) {
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
