class FlattenArrayPython:

    @staticmethod
    def flatten(iterable):
        result = []
        for item in iterable:
            if type(item) == list:
                flattenedSubArray = FlattenArrayPython.flatten(item)
                result = [*result, *flattenedSubArray]
            elif (item != None):
                result.append(item)
        return result